import { ModeToggle } from "@/components/mode-toggle";
import { LoginForm } from "./components/loginForm";

const LoginPage = () => {
  return (
    <div className="container flex items-center justify-center min-h-screen">
      <div className=" absolute top-5 right-[2rem]">
        <ModeToggle />
      </div>
      <LoginForm />
    </div>
  );
};

export default LoginPage;
