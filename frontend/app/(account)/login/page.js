import LoginForm from "./LoginForm";

export const metadata = {
  title: "Login",
};

export default function loginPage() {
  return (
    <div className="bg-slate-50 h-[calc(100vh-220px)] w-full dark:bg-[#121212]">
      <LoginForm />
    </div>
  );
}
