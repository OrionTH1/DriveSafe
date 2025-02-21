import RegisterForm from "@/components/forms/RegisterForm";
import { getAllUserInformations } from "@/lib/actions/user.actions";
import { SearchParamProps } from "@/types";
import Image from "next/image";

async function UserInformations({ params }: SearchParamProps) {
  const { userId } = await params;
  const user = await getAllUserInformations(userId);

  if (!user.data) throw new Error("User doesn't exists");

  return (
    <div>
      <div className="flex h-screen max-h-screen">
        <section className="remove-scrollbar container">
          <div className="w-full max-w-[960px] flex flex-col py-10">
            <RegisterForm
              user={user.data}
              documentUrl={user.data.driverLicenseDocumentUrl}
            />

            <p className="copyright pt-8">© 2025 DriveSafe</p>
          </div>
        </section>

        <Image
          src="/assets/images/register-img.png"
          width={680}
          height={1000}
          alt="register"
          className="side-img max-w-[50%]"
        />
      </div>
    </div>
  );
}

export default UserInformations;
