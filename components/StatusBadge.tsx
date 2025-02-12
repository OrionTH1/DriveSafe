import { StatusIcon } from "@/constants";
import clsx from "clsx";
import Image from "next/image";

function StatusBadge({ status }: { status: Status }) {
  return (
    <div
      className={clsx("status-badge", {
        "bg-green-600": status === "scheduled",
        "bg-blue-600": status === "pending",
        "bg-red-600": status === "canceled",
      })}
    >
      <Image
        src={StatusIcon[status]}
        width={24}
        height={24}
        alt={`${status} icon`}
        className="h-fit w-3"
      />
      <p
        className={clsx("text-12-semibold capitalize", {
          "text-green-500": status === "scheduled",
          "text-blue-500": status === "pending",
          "text-red-500": status === "canceled",
        })}
      >
        {status}
      </p>
    </div>
  );
}

export default StatusBadge;
