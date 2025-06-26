import { useQuery } from "@tanstack/react-query";

export default function UserList() {
  //use fetch and @tanstack/react-query to make an GET request to https://jsonplaceholder.typicode.com/users and handle 3 cases, error, loading and success
  const { isLoading, isError, data } = useQuery({
    queryKey: ["mock"],
    queryFn: async () => {
      const res = await fetch("https://jsonplaceholder.typicode.com/users");
      const data = await res.json();
      return data;
    },
  });
  console.log(data);
  if (isError) return <>error</>;
  return (
    <>
      {data?.map((obj: any) => {
        return <p>{obj.name}</p>;
      })}
    </>
  );
}
