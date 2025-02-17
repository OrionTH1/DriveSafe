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
  // const appointments = {
  //   totalCount: 10,
  //   scheduleCount: 0,
  //   pendingCount: 0,
  //   canceledCount: 0,
  //   documents: [
  //     {
  //       $collectionId: "67b0f8930005e6e0b9a7",
  //       $createdAt: "2025-02-16T16:16:35.924+00:00",
  //       $databaseId: "67a79dbf000f660fbdd2",
  //       $id: "67b20f6300301e6ae748",
  //       $permissions: [],
  //       $updatedAt: "2025-02-16T16:16:35.924+00:00",
  //       note: "123",
  //       reason: "123",
  //       reasonForCancellation: "",
  //       serviceName: "Rent a car",
  //       status: "pending",
  //       userId: "67b038b100069cd9768c",
  //       userName: "Matheus Emanoel",
  //     },
  //   ],
  // };

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
          columns={adminColumns}
          data={services.documents as Service[]}
        />
      </main>
    </div>
  );
}

export default ListService;
