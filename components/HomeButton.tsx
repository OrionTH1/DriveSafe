import Image from "next/image";
import { Button } from "./ui/button";
import Link from "next/link";

interface HomeButtonProps {
  label: string;
  description: string;
  icon: string;
  redirect: string;
}

function HomeButton({ label, description, icon, redirect }: HomeButtonProps) {
  return (
    <div
      className={
        "flex flex-1 flex-col gap-10 rounded-2xl bg-cover p-8 shadow-lg bg-approved"
      }
    >
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-4">
          <Image
            src={icon}
            width={32}
            height={32}
            alt={label}
            className="size-8 w-fit"
          />
          <h2 className="text-32-bold text-white">{label}</h2>
        </div>
        <p className="text-14-regular">{description}</p>
      </div>
      <Link href={redirect} className="flex items-center gap-2">
        <Button className="w-full shad-primary-btn text-14-regular">
          {label}
          <Image
            src={"/assets/icons/link.svg"}
            width={11}
            height={11}
            alt="Link icon"
          />
        </Button>
      </Link>
    </div>
  );
}

export default HomeButton;
