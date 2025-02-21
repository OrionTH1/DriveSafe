import LoginForm from "@/components/forms/LoginForm";

import Image from "next/image";
import Link from "next/link";

async function Login() {
  return (
    <div className="flex h-screen max-h-screen">
      <section className="remove-scrollbar container my-auto">
        <div className="sub-container max-w-[31rem]">
          <Image
            src="/assets/icons/logo-full.svg"
            width={1000}
            height={1000}
            alt="drive safe"
            className="mb-12 h-10 w-fit"
          />

          <LoginForm />

          <p className="mt-4 text-dark-600 text-14-medium">
            If you does not have a register in our company, please&nbsp;
            <Link href={"/register"} className="text-green-500">
              create here
            </Link>
          </p>

          <div className="text-14-regular mt-20 flex justify-between">
            <p className="justify-items-end text-dark-600 xl:text-left">
              © 2025 DriveSafe
            </p>
          </div>
        </div>
      </section>

      <Image
        src="/assets/images/onboarding-img.png"
        width={640}
        height={1000}
        alt="patient"
        className="side-img max-w-[50%] rounded-ss-xl rounded-b-xl"
      />
    </div>
  );
}

export default Login;
