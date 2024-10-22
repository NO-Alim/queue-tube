"use client";

import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";
import Image from "next/image";
const Logo = ({ className = "" }) => {
  const { theme } = useTheme();

  return (
    <div>
      <Image
        className={cn("max-w-[150px]", className)}
        src={theme === "dark" ? "/logo_white.png" : "/logo_black.png"}
        alt="queue tube"
        width={150}
        height={0}
      />
    </div>
  );
};

export default Logo;
