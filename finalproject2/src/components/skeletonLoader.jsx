import { Card } from "flowbite-react";

export default function SkeletonLoader() {
  return (
    <Card>
      <div className="w-full h-96 mb-4 p-4 rounded-xl bg-gray-200"></div>
      <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
      <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
      <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
      <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
      <div className="flex items-center mt-4"></div>
    </Card>
  );
}
