"use client";
import PayLocationChoice from "@/components/Location/LocationChoice";
import { useEffect, useState } from "react";

export default function Ecolage() {
  const [panneau, setPanneau] = useState([]);
  useEffect(() => {
    async function fetchData() {
      const a = await fetch(`http://localhost:3001/panneau/pending`);
      const b = await a.json();
      console.log(b, "saljsdhkfv");
      setPanneau(b.data);
    }
    fetchData();
  }, []);

  function removeItem(id) {
    const filter = panneau.filter((a) => a.id !== id);
    setPanneau(filter);
  }
  return (
    <div className="w-full h-full flex justify-center  gap-3 flex-wrap overflow-y-scroll ">
      {panneau.map((e, i) => (
        <PayLocationChoice removeItem={removeItem} {...e} key={i} />
      ))}
    </div>
  );
}
