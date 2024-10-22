import { ModeToggle } from "@/components/mode-toggle";
import { RegisterForm } from "./components/registerForm";

const RegisterPage = () => {
  return (
    <div className="container flex items-center justify-center min-h-screen">
      <div className=" absolute top-5 right-[2rem]">
        <ModeToggle />
      </div>
      <RegisterForm />
    </div>
  );
};

export default RegisterPage;
