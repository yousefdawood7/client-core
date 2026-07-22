import { headers } from "next/headers";
import PageContainer from "@/components/page-container";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import ChangePasswordForm from "@/features/profile/components/change-password-form";
import ProfileInfoCard from "@/features/profile/components/profile-info-card";
import UpdateInfoForm from "@/features/profile/components/update-info-form";
import { auth } from "@/lib/better-auth/auth";

export default async function ProfilePage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const user = session?.user;

  return (
    <PageContainer title="My Profile" subtitle="Manage your account settings">
      <div className="flex flex-col gap-6">
        <Card>
          <CardContent className="flex flex-col gap-6 py-6">
            <ProfileInfoCard name={user?.name} role={user?.role} image={user?.image} />
            <Separator className="bg-border/40" />
            <UpdateInfoForm name={user?.name} email={user?.email} />
          </CardContent>
        </Card>
        <ChangePasswordForm />
      </div>
    </PageContainer>
  );
}
