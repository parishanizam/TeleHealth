/**
 * Author: Promish Kandel, Mitchell Weingust, Jasmine Sun-Hu, Parisha Nizam
 * Date: January 17, 2025
 * Purpose: Displays AddClientPage and its content
 */

import AddClient from "../components/AddClient/AddClient";
import { Header } from "../../parents/components/Header";

function AddClientPage() {
  return (
    <div className="min-h-screen flex flex-col px-5 pt-2.5 pb-80 bg-white max-md:pb-24">
      <Header title="Add Client" role="clinician" />

      <div className="flex flex-col items-center justify-center flex-grow">
        <AddClient />
      </div>
    </div>
  );
}

export default AddClientPage;
