"use client";
import HomeButton from "@/components/HomeButton";

function Home() {
  return (
    <div className="flex w-full flex-col space-y-14 ">
      <main className="admin-main">
        <section className="w-full space-y-4">
          <h1 className="header">Welcome 👋</h1>
          <p className="text-dark-700">
            Start the day with managing new appointments
          </p>
        </section>

        <section className="flex flex-col lg:flex-row justify-evenly w-full gap-6">
          <HomeButton
            label="Request a service"
            description="Request your service with our car insurance"
            icon="/assets/icons/appointments.svg"
            redirect="/services/request"
          />
          <HomeButton
            label="View a service"
            description="View your peding services"
            icon="/assets/icons/appointments.svg"
            redirect="/services/list"
          />
        </section>
        {/* <DataTable columns={columns} data={} /> */}
      </main>
    </div>
  );
}

export default Home;
