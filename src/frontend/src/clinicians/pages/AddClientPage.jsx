import AddClient from "../components/AddClient/AddClient";
import { Header } from "../components/Header";

function AddClientPage() {
  return (
    <div className="min-h-screen flex flex-col px-5 pt-2.5 pb-80 bg-white max-md:pb-24">
      <Header title="Add Client" />

      <div className="flex flex-col items-center justify-center flex-grow">
        <AddClient />
      </div>
    </div>
  );
}

export default AddClientPage;
