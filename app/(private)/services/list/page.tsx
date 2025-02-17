import { DataTable } from "@/components/table/DataTable";
import StatCard from "@/components/StatCard";

import { userColumns } from "@/components/table/columns";
import type { Service } from "@/types/appwrite.types";
import { getServiceByUserId } from "@/lib/actions/service.actions";
import { verifySession } from "@/lib/session";
import { logout } from "@/lib/actions/auth.actions";
import { redirect } from "next/navigation";

async function ListService() {
  const session = await verifySession();
  if (!session.isAuth) {
    await logout();
    return redirect("/login");
  }
  const services = await getServiceByUserId(session.userId);

  if (!services)
    throw new Error(
      "An error occured while trying to retrieve all services. Please try again"
    );
  return (
    <div className="mx-auto flex max-w-7xl flex-col space-y-14">
      <main className="admin-main">
        <section className="w-full space-y-4">
          <h1 className="header">Welcome 👋</h1>
          <p className="text-dark-700">
            Here you can manage your services requested
          </p>
        </section>

        <section className="admin-stat">
          <StatCard
            type="approved"
            count={services.scheduleCount}
            label="Approved services"
            icon="/assets/icons/check.svg"
          />

          <StatCard
            type="pending"
            count={services.pendingCount}
            label="Pending services"
            icon="/assets/icons/pending.svg"
          />

          <StatCard
            type="canceled"
            count={services.canceledCount}
            label="Canceled services"
            icon="/assets/icons/cancelled.svg"
          />
        </section>

        <DataTable
          columns={userColumns}
          data={services.documents as Service[]}
        />
      </main>
    </div>
  );
}

export default ListService;
