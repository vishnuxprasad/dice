import Navbar from "@/components/navbar/navbar";
import { CredentialCard } from "@/components/student/credential-card";

export default function Page() {
  return (
    <div>
      <Navbar className="mb-10" />
      <div className="flex flex-col gap-4">
        <CredentialCard
          imageLink={"https://i.pravatar.cc/150?u=a04258114e29026302d"}
          title={"B.Tech Certificate"}
          issuer={"KTU"}
          issueDate={"22/10/2024"}
        />
        <CredentialCard
          imageLink={"https://i.pravatar.cc/150?u=a04258114e29026302d"}
          title={"M.Tech Certificate"}
          issuer={"CUSAT"}
          issueDate="10/05/2026"
        />
        <CredentialCard
          imageLink={"https://i.pravatar.cc/150?u=a04258114e29026302d"}
          title={"B.Tech Certificate"}
          issuer={"CUSAT"}
          issueDate="10/05/2026"
        />
        <CredentialCard
          imageLink={"https://i.pravatar.cc/150?u=a04258114e29026302d"}
          title={"B.Tech Certificate"}
          issuer={"CUSAT"}
          issueDate="10/05/2026"
        />
        <CredentialCard
          imageLink={"https://i.pravatar.cc/150?u=a04258114e29026302d"}
          title={"B.Tech Certificate"}
          issuer={"CUSAT"}
          issueDate="10/05/2026"
        />
        <CredentialCard
          imageLink={"https://i.pravatar.cc/150?u=a04258114e29026302d"}
          title={"B.Tech Certificate"}
          issuer={"CUSAT"}
          issueDate="10/05/2026"
        />
        <CredentialCard
          imageLink={"https://i.pravatar.cc/150?u=a04258114e29026302d"}
          title={"B.Tech Certificate"}
          issuer={"CUSAT"}
          issueDate="10/05/2026"
        />
      </div>
    </div>
  );
}
