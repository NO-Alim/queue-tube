"use client";

import { testAction } from "@/actions/playlistActions/test";
import { toast } from "sonner";

const Test = () => {
  const handleClick = async () => {
    try {
      const res = await testAction();
    } catch (error) {
      toast.error(error.message);
    }
  };
  return (
    <div>
      <button onClick={handleClick}>Click me</button>
    </div>
  );
};

export default Test;
