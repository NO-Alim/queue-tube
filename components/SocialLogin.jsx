import { Button } from "@/components/ui/button";
import Image from "next/image";

const SocialLogin = () => {
  return (
    <>
      <div className="text-center text-gray-500">or Signup with</div>
      <form>
        <div className="flex justify-center gap-2">
          <Button
            className="py-2 border-gray-600/30 border rounded-md flex items-center gap-2 justify-center"
            type="submit"
            name="action"
            value="google"
          >
            <Image src="/google.png" alt="google" width={40} height={40} />
            <span>Google</span>
          </Button>
        </div>
      </form>
    </>
  );
};

export default SocialLogin;
