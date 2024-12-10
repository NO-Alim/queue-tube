import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Loading = () => {
  return (
    <Tabs defaultValue="note" className="flex flex-col gap-3">
      {/* Tabs List */}
      <TabsList className="grid grid-cols-2 max-w-80">
        <TabsTrigger value="note">
          <Skeleton className="h-5 w-16" /> {/* Placeholder for "Notes" Tab */}
        </TabsTrigger>
        <TabsTrigger value="description">
          <Skeleton className="h-5 w-24" />{" "}
          {/* Placeholder for "Description" Tab */}
        </TabsTrigger>
      </TabsList>

      {/* Notes Tab Skeleton */}
      <TabsContent value="note" className="flex flex-col gap-3 max-w-[800px]">
        {[...Array(3)].map((_, index) => (
          <div
            key={index}
            className="flex flex-col gap-2 p-4 border rounded-md bg-gray-100"
          >
            {/* Time and Divider */}
            <div className="flex items-center gap-3">
              <Skeleton className="h-5 w-12" /> {/* Placeholder for Time */}
              <Skeleton className="flex-grow h-[1px] rounded" /> {/* Divider */}
            </div>
            {/* Text Lines */}
            <Skeleton className="h-4 w-3/4 rounded" />
            <Skeleton className="h-4 w-5/6 rounded" />
            <Skeleton className="h-4 w-2/3 rounded" />
          </div>
        ))}
      </TabsContent>

      {/* Description Tab Skeleton */}
      <TabsContent value="description">
        <Skeleton className="h-6 w-1/2 rounded" />{" "}
        {/* Placeholder for description content */}
        <Skeleton className="h-4 w-3/4 rounded mt-3" />
        <Skeleton className="h-4 w-full rounded" />
        <Skeleton className="h-4 w-5/6 rounded" />
      </TabsContent>
    </Tabs>
  );
};

export default Loading;
