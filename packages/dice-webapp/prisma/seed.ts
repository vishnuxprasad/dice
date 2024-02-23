import { PrismaClient } from "@prisma/client";
import { hash } from "bcrypt";

const prisma = new PrismaClient();

type User = {
  id: string;
  name: string;
  email: string;
  password: string;
  role: string;
  image: string | null;
};

type SharedLink = {
  id: string;
  linkName: string | null;
  active: boolean;
  userId: string;
};

type StudentCredential = {
  id: string;
  credential_type: string;
  credential_link: string;
  issuer_address: string;
  transaction_id: string;
  issue_date: Date;
  verified: boolean | null;
  pending: boolean;
  userId: string;
};

async function addUser(
  name: string,
  email: string,
  password: string,
  role: string,
): Promise<User> {
  password = await hash(password, 12);
  return await prisma.user.upsert({
    where: { email },
    update: {},
    create: {
      name,
      email,
      password,
      role,
    },
  });
}

async function addCredential(
  type: string,
  issuer: User,
  reciever: User,
  pending: boolean = false,
): Promise<StudentCredential> {
  const wallet = await prisma.wallets.findFirst({
    where: {
      userId: issuer.id,
    },
  });

  if (!wallet) {
    throw new Error("Issuer wallet not found");
  }

  return await prisma.studentCredentials.create({
    data: {
      credential_type: type,
      credential_link: "https://example.com/credential.pdf",
      issuer_address: wallet.walletID,
      transaction_id: crypto.randomUUID(),
      userId: reciever.id,
      verified: true,
      pending: pending,
    },
  });
}

async function addRejectedCredential(
  type: string,
  issuer: User,
  reciever: User,
) {
  const wallet = await prisma.wallets.findFirst({
    where: {
      userId: issuer.id,
    },
  });

  if (!wallet) {
    throw new Error("Issuer wallet not found");
  }

  return await prisma.rejectedCredentials.create({
    data: {
      credential_type: type,
      credential_link: "https://example.com/rejected_credential.pdf",
      issuer_address: wallet.walletID,
      transaction_id: crypto.randomUUID(),
      userId: reciever.id,
      verified: false,
    },
  });
}

async function createSharedLink(
  userId: string,
  linkName: string,
): Promise<SharedLink> {
  const sharedLink = await prisma.sharedLink.create({
    data: {
      linkName,
      active: true,
      userId,
    },
  });

  return sharedLink;
}

async function addLinkEntry(
  sharedLink: SharedLink,
  studentCredential: StudentCredential,
) {
  await prisma.linkEntry.create({
    data: {
      sharedLinkId: sharedLink.id,
      studentCredentialId: studentCredential.id,
    },
  });
}

async function addStudent(name: string, email: string): Promise<User> {
  return await addUser(name, email, email, "STUDENT");
}

async function addInstitution(name: string, email: string): Promise<User> {
  return await addUser(name, email, email, "INSTITUTION");
}

async function addPendingInstitution(
  name: string,
  email: string,
): Promise<User> {
  return await addUser(name, email, email, "PENDING_INSTITUTION");
}

async function addAdmin(name: string, email: string): Promise<User> {
  return await addUser(name, email, email, "ADMIN");
}

async function addWallet(userId: string, walletID: string) {
  await prisma.wallets.upsert({
    where: { walletID },
    update: {},
    create: {
      walletID,
      userId,
    },
  });
}

async function main() {
  let student1 = await addStudent("John Doe", "john@doe.com");
  await addWallet(student1.id, "0x1233489809238948932");
  await addWallet(student1.id, "0x8980923812334948933");

  let institution1 = await addInstitution(
    "Kalam Technical University",
    "admin@ktu.com",
  );
  await addWallet(institution1.id, "0x2389482334189809932");

  let institution2 = await addInstitution(
    "Kerala University",
    "admin@kerala.com",
  );
  await addWallet(institution2.id, "0x4823341823899809932");

  let credential1 = await addCredential("BTECH", institution1, student1);
  let credential2 = await addCredential("BSC", institution2, student1);
  await addCredential("MTECH", institution1, student1, true);
  await addCredential("MSC", institution2, student1, true);
  await addRejectedCredential("BTECH", institution1, student1);
  await addRejectedCredential("BSC", institution2, student1);

  let sharedLink1 = await createSharedLink(
    student1.id,
    "Undergrad Credentials",
  );
  let sharedLink2 = await createSharedLink(
    student1.id,
    "Engineering Credentials",
  );
  let sharedLink3 = await createSharedLink(student1.id, "Degree Credentials");

  await addLinkEntry(sharedLink1, credential1);
  await addLinkEntry(sharedLink1, credential2);

  await addLinkEntry(sharedLink2, credential1);

  await addLinkEntry(sharedLink3, credential2);

  await addPendingInstitution("Cochin University", "admin@cusat.com");
  await addAdmin("Admin", "admin@dice.com");
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
