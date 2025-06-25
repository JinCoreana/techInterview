import { useState } from "react";

export default function UserList() {
  const { data, errors, loading } = useFetch();
  //use fetch and @tanstack/react-query to make an GET request to https://jsonplaceholder.typicode.com/users and handle 3 cases, error, loading and success

  if (!errors) return <>Error</>;
  if (loading) return <>isLoading</>;
  return <>{data} </>;
}

export const useFetch = async () => {
  const [data, setData] = useState<any>();
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState<any>(null);

  try {
    await fetch("https://jsonplaceholder.typicode.com/users").then((res) =>
      setData(res.json())
    );
    setLoading(false);
  } catch (error) {
    setErrors(error);
  }

  return { data, loading, errors };
};
