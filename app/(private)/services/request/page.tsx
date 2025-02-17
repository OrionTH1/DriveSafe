import ServiceForm from "@/components/forms/ServiceForm";
async function RequestService() {
  return (
    <div className="w-full mx-auto flex max-w-7xl flex-col space-y-14 ">
      <main className="">
        <ServiceForm type="create" />
      </main>
    </div>
  );
}

export default RequestService;
