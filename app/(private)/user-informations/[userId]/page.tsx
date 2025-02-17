import RegisterForm from "@/components/forms/RegisterForm";
import { getAllUserInformations } from "@/lib/actions/user.actions";
import { SearchParamProps } from "@/types";
import Image from "next/image";

async function UserInformations({ params }: SearchParamProps) {
  const { userId } = await params;
  const user = await getAllUserInformations(userId);
  // const user = {
  //   $collectionId: "67af9bf0000123eba8dc",
  //   $createdAt: "2025-02-15T06:48:24.227+00:00",
  //   $databaseId: "67a79dbf000f660fbdd2",
  //   $id: "67b038b80004a16fd99a",
  //   $permissions: [],
  //   $updatedAt: "2025-02-15T06:48:24.227+00:00",
  //   address: "321312321321d21",
  //   birthDate: "2006-02-15T05:47:05.000Z",
  //   disclosureConsent: true,
  //   driverLicenseDocumentId: "67b038b1000dbaa4f943",
  //   driverLicenseDocumentUrl:
  //     "https://cloud.appwrite.io/v1/storage/buckets/67a79fa000365fcb63b5/files/67b038b1000dbaa4f943/view?project=67a79d350037617bba14",
  //   driverLicenseEverBeenSuspended: false,
  //   driverLicenseExpirationDate: "2025-02-15T06:47:05.132Z",
  //   driverLicenseNumber: "321312321321d21",
  //   driverLicensePreviousViolations: "",
  //   email: "matheusemanoel987@gmail.com",
  //   gender: "Male",
  //   monthlyIncome: "US$ 1.000 - US$ 2.000",
  //   name: "Matheus Emanoel",
  //   occupation: "321312321321d21",
  //   password: "$2b$12$1lEHuFELNP..O91OCpqimeGKaKvw3JuB0y2yvQVuVtp/m1eAayQR6",
  //   phoneNumber: "+1213123123",
  //   privacyConsent: true,
  //   userId: "67b038b100069cd9768c",
  //   vehicleColor: "321312321321d21",
  //   vehicleCurrentMileage: "321312321321d21",
  //   vehicleFuelType: "Gasoline",
  //   vehicleHowWasAcquired: "I'm financing the vehicle.",
  //   vehicleIdentificationNumber: "321312321321d21",
  //   vehicleLicensePlateNumber: "321312321321d21",
  //   vehicleMakeModelYear: "321312321321d21",
  //   vehiclePreviousAccidentsOrDamage: "",
  //   vehicleUseFrequency: "Daily",
  // } as User;
  if (!user) throw new Error("User doesn't exists");

  return (
    <div>
      <div className="flex h-screen max-h-screen">
        <section className="remove-scrollbar container">
          <div className="w-full max-w-[960px] flex flex-col py-10">
            <RegisterForm
              user={user}
              documentUrl={user.driverLicenseDocumentUrl}
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
