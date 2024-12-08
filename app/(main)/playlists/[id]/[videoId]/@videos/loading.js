import { Skeleton } from "@/components/ui/skeleton";

const Loading = () => {
  return (
    <div className="mt-6 lg:mt-0 w-full lg:max-w-[350px] space-y-4">
      {[...Array(3)].map((_, index) => (
        <div
          key={index}
          className="flex items-center space-x-2 bg-gray-300 p-6 rounded"
        >
          <Skeleton className="w-6 h-6 rounded-full" />
          <Skeleton className="h-4 rounded w-full" />
        </div>
      ))}
    </div>
  );
};

export default Loading;
