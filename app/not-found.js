import { TriangleAlert } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="w-full h-screen flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-900 p-4">
      <TriangleAlert className="w-24 h-24 text-red-600 dark:text-red-400" />
      <h1 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-gray-100 mt-4">
        Page Not Found
      </h1>
      <p className="text-gray-600 dark:text-gray-400 text-center mt-2">
        The page you are looking for does not exist or has been moved.
      </p>
      <Link
        href="/"
        className="mt-6 bg-red-600 dark:bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-700 dark:hover:bg-red-600 transition duration-300"
      >
        Go Back Home
      </Link>
    </div>
  );
}
