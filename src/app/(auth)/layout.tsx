import vector from "@/assets/Vector.svg";
import vector1 from "@/assets/vector1.svg";
import a from "@/assets/a.jpg";
import Image from "next/image";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className=" flex back bg-gradient-to-br from-white to-gray-100 justify-between gap-12 items-center px-10 ">
      <Image
        src={vector}
        alt="vector"
        width={80}
        height={80}
        className="absolute right-0 bottom-4 "
      />
      <Image
        src={vector1}
        alt="vector"
        width={120}
        height={120}
        className="absolute right-20 rotate-45 top-20 "
      />
      <div className=" w-[50%]  h-[90vh] bg-blue overflow-hidden relative rounded-3xl bg-gray-400 ">
        <Image src={a} fill alt="photo" className=" absolute top-[-25px] " />
      </div>
      <div className="w-[50%] relative ">{children}</div>
    </main>
  );
}
