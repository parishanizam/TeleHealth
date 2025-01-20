import Logout from "./Logout";
import ClientListHeader from "./ClientListHeader";

function ClinicianHeader() {
  const handleLogout = () => {
    console.log("Logged out");
    // Implement your logout logic here
  };

  return (
    <div className="flex flex-col w-full max-md:max-w-full">
      {/* Logout Header */}
      <div className="flex flex-col justify-center items-center w-full text-base font-bold leading-none whitespace-nowrap h-[57px] text-slate-900 max-md:max-w-full">
        <div className="flex flex-wrap items-center max-w-full min-h-[73px] w-[1402px]">
          <div className="flex shrink-0 self-stretch my-auto h-[73px] w-[42px]" />
          <Logout onClick={handleLogout} />
        </div>
      </div>

      {/* Client List Header */}
      <ClientListHeader />
    </div>
  );
}

export default ClinicianHeader;
