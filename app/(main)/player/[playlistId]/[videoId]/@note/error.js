"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TriangleAlert } from "lucide-react";

const SidebarVideosError = ({ error }) => {
  return (
    <Tabs defaultValue="note" className=" flex flex-col gap-3">
      <TabsList className="grid grid-cols-2 max-w-80">
        <TabsTrigger value="note">Notes</TabsTrigger>
        <TabsTrigger value="description">Description</TabsTrigger>
      </TabsList>
      <TabsContent value="note" className=" flex flex-col gap-3 max-w-[800px]">
        <div className="mt-6 lg:mt-0 w-full space-y-4 border border-red-500 rounded p-4 flex flex-col items-center justify-center">
          <span>
            <TriangleAlert className=" w-20 h-20 text-red-500" />
          </span>
          <p className=" bg-red-600/40 md:text-lg capitalize p-2 rounded ">
            {error.message}
          </p>
        </div>
      </TabsContent>
      <TabsContent
        value="description"
        className=" flex flex-col gap-3 max-w-[800px]"
      >
        <div className="mt-6 lg:mt-0 w-full space-y-4 border border-red-500 rounded p-4 flex flex-col items-center justify-center">
          <span>
            <TriangleAlert className=" w-20 h-20 text-red-500" />
          </span>
          <p className=" bg-red-600/40 md:text-lg capitalize p-2 rounded ">
            {error.message}
          </p>
        </div>
      </TabsContent>
    </Tabs>
  );
};

export default SidebarVideosError;
