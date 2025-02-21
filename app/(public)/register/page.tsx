import RegisterForm from "@/components/forms/RegisterForm";
import Image from "next/image";

async function Register() {
  return (
    <div className="flex h-screen max-h-screen">
      <section className="remove-scrollbar container">
        <div className="w-full max-w-[960px] flex flex-col py-10">
          <Image
            src="/assets/icons/logo-full.svg"
            width={1000}
            height={1000}
            alt="DriveSafe"
            className="mb-12 h-10 w-fit"
          />

          <RegisterForm />

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
  );
}

export default Register;
