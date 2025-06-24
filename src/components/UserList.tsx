/* eslint-disable @typescript-eslint/no-explicit-any */
import { useQuery } from "@tanstack/react-query";

export default function UserList() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["users"],
    queryFn: () =>
      fetch("https://jsonplaceholder.typicode.com/users")
        .then((res) => res.json())
        .catch((err) => {
          throw err;
        }),
  });

  if (isLoading) return <p className="text-gray-500">Loading...</p>;
  if (isError) return <p className="text-red-500">Something went wrong!</p>;

  return (
    <div className="max-w-md mx-auto mt-10 space-y-4">
      {data.map((user: any) => (
        <div
          key={user?.id}
          className="bg-green p-4 rounded-2xl shadow hover:shadow-md transition"
        >
          <h2 className="text-lg font-semibold">{user?.name}</h2>
          <p className="text-sm text-gray-500">{user?.email}</p>
        </div>
      ))}
    </div>
  );
}
