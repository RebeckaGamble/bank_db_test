import CreateForm from "./CreateForm";

export const metadata = {
  title: "Create Account",
};

export default function createPage() {
  return (
    <div className="bg-slate-50 h-[calc(100vh-220px)] w-full dark:bg-[#121212]">
      <CreateForm />
    </div>
  );
}
