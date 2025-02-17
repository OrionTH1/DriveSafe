import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { SearchParamProps, Status } from "@/types";
import StatusBadge from "@/components/StatusBadge";

async function Success({ searchParams }: SearchParamProps) {
  const serviceName = ((await searchParams)?.serviceName as string) || "";
  const serviceStatus =
    ((await searchParams)?.serviceStatus as Status) || "pending";
  return (
    <div className="flex max-h-screen px-[5%]">
      <div className="success-img">
        <section className="flex flex-col items-center">
          <Image
            src="/assets/gifs/success.gif"
            width={300}
            height={280}
            alt="success"
            unoptimized
          />

          <h2 className="header mb-6 max-w-[600px] text-center">
            Your <span className="text-green-500">service request</span> has
            been successfully submited
          </h2>
          <p>We will be in touch shortly to confirm.</p>
        </section>
        <section className="request-details">
          <p>Service requested detais:</p>
          <div className="flex items-center gap-3">
            <p className="whitespace-nowrap">Request: {serviceName}</p>
          </div>
          <div className="flex items-center gap-2">
            Status:
            <StatusBadge status={serviceStatus} />
          </div>
        </section>

        <Button variant="outline" className="shad-primary-btn" asChild>
          <Link href={`/services/request`}>New Request</Link>
        </Button>

        <p className="copytight">© 2025 DriveSafe</p>
      </div>
    </div>
  );
}

export default Success;
