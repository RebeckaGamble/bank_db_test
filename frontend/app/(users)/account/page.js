import UserAccount from "./UserAccount";

export const metadata = {
  title: "User Page",
};

export default function userPage() {
  return (
    <div className="bg-slate-50 h-[calc(100vh-220px)] w-full dark:bg-[#121212]">
      <UserAccount />
    </div>
  );
}
