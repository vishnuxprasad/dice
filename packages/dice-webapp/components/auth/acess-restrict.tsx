import { serverSession } from "@/lib/auth";
import { redirect } from "next/navigation";

export default function withAuth(WrappedComponent: any, roles: string[]) {
  const authComponent = async ({ ...props }) => {
    const session = await serverSession();
    if (!session) redirect("/auth");
    else if (!roles.includes(session.user.role)) redirect("/auth");
    return <WrappedComponent {...props} />;
  };

  return authComponent;
}
