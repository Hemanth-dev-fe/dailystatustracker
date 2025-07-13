'use client';

import CardData from "@/components/dailyStatus/CardData";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function UsersPage() {
  // const { username } = useParams();
  const router = useRouter();
  /* const [isClient, setIsClient] = useState(false); //  Wait for client
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    setIsClient(true); // Mark that we’re on client side
  }, []);

  useEffect(() => {
    if (isClient && username) {
      const loggedInUser = sessionStorage.getItem("loggedInUser");

      if (loggedInUser === username.toLowerCase()) {
        setAuthorized(true); //  Allow render
      } else {
        router.push("/form"); //  Redirect if not authorized
      }
    }
  }, [isClient, username]);

  //  Don’t render anything until we know if it's authorized or not
  if (!isClient || !authorized) return null; */

  return (
    <>
      <CardData />
    </>
  );
}
