import { Status } from "@/types";
import clsx from "clsx";
import Image from "next/image";

interface StatCardProps {
  type: Status;
  count: number;
  label: string;
  icon: string;
}

function StatCard({ count = 0, label, icon, type }: StatCardProps) {
  return (
    <div
      className={clsx("stat-card", {
        "bg-appointments": type === "scheduled",
        "bg-cancelled": type === "canceled",
        "bg-pending": type === "pending",
      })}
    >
      <div className="flex items-center gap-4">
        <Image
          src={icon}
          width={32}
          height={32}
          alt={label}
          className="size-8 w-fit"
        />
        <h2 className="text-32-bold text-white">{count}</h2>
      </div>
      <p className="text-14-regular">{label}</p>
    </div>
  );
}

export default StatCard;
