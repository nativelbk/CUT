"use client";

import LinkComponent from "@/components/LinkComponent/LinkComponent";
import { useRouter, usePathname } from "next/navigation";
import { BiLogOut } from "react-icons/bi";
import { IoIosAddCircle } from "react-icons/io";
import { IoIosNotifications } from "react-icons/io";
import { GoHome } from "react-icons/go";
import { AiOutlineCreditCard } from "react-icons/ai";
import { createContext, useEffect, useState } from "react";
import { socket } from "@/socket";
import Badge from "@mui/material/Badge";
import { IoMdGrid } from "react-icons/io";

export const UidContext = createContext();

export default function PageLayout({ children }) {
  const path = usePathname();
  const router = useRouter();
  const [uid, setUid] = useState(localStorage?.getItem("userId"));
  const io = socket();
  useEffect(() => {
    io.emit("join", uid);
  }, [uid]);

  const userType = localStorage?.getItem("type");
  const [notification, setNotification] = useState(0);

  useEffect(() => {
    io.on("notification", (data) => {
      console.log("Got new notification");
      setNotification((a) => a + 1);
    });
  }, [localStorage]);

  return (
    <UidContext.Provider
      value={{
        io,
      }}
    >
      <main className=" flex bg-gradient-to-br from-white to-gray-100  w-screen pr-9 pl-3 justify-between h-screen items-center gap-3 ">
        <section className=" w-[30%] flex flex-col justify-between bg-blue basis-72 h-[95%] rounded-md ">
          <section className="flex mt-8 flex-col items-center gap-2 justify-center ">
            <LinkComponent
              active={path === "/panneaux"}
              text={"Panneaux"}
              link={"/panneaux"}
              icon={<GoHome />}
            />
            {userType === "user" && (
              <LinkComponent
                active={path === "/mes-demandes"}
                text={"Mes demandes"}
                link={"/mes-demandes"}
                second
                icon={<AiOutlineCreditCard />}
              />
            )}
            {userType !== "user" && (
              <LinkComponent
                active={path === "/demandes"}
                text={"Demandes"}
                link={"/demandes"}
                second
                icon={<AiOutlineCreditCard />}
              />
            )}
            {userType === "user" && (
              <LinkComponent
                active={path === "/ajouter"}
                text={"Ajouter panneau"}
                link={"/ajouter"}
                icon={<IoIosAddCircle />}
                second
              />
            )}

            <LinkComponent
              active={path === "/notification"}
              text={"Notification"}
              link={"/notification"}
              onClick={() => setNotification(0)}
              second
              icon={
                <Badge color="secondary" badgeContent={notification}>
                  <IoIosNotifications />
                </Badge>
              }
            />

            {userType !== "user" && (
              <LinkComponent
                active={path === "/grilles"}
                text={"Grilles"}
                link={"/grilles"}
                second
                icon={<IoMdGrid />}
              />
            )}
          </section>
          <section
            onClick={() => router.push("/login")}
            className="flex mb-8 items-center justify-center gap-3 text-white cursor-pointer "
          >
            <BiLogOut /> Se deconnecter
          </section>
        </section>
        <section className=" overflow-y-scroll   w-[70%] h-[95%] rounded-md ">
          {children}
        </section>
      </main>
    </UidContext.Provider>
  );
}
