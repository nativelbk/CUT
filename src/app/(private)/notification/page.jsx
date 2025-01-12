"use client";

import { useEffect, useState } from "react";
import Notification from "@/components/Notification/Notification";

export default function Ecolage() {
  const [notification, setNotification] = useState([]);
  useEffect(() => {
    async function fetchData() {
      const a = await fetch(
        localStorage.getItem("type") === "user"
          ? `http://localhost:3001/notification/${localStorage.getItem(
              "userId"
            )}`
          : `http://localhost:3001/notification`
      );
      const b = await a.json();
      setNotification(b.data);
    }
    fetchData();
  }, []);
  //w-full h-full flex  items-center
  return (
    <div className=" w-full gap-3 flex  flex-wrap justify-start items-start overflow-y-scroll ">
      {notification.map((e, i) => (
        <Notification key={i} {...e} />
      ))}{" "}
    </div>
  );
}
