"use client";

import PaymentForm from "@/components/PaymentForm/PaymentForm";
import GrilleForm from "@/components/Grille/GrilleForm";
import ProductCard from "@/components/Grille/AdminGrille";
import { useEffect, useState } from "react";
import Fab from "@mui/material/Fab";
import { Bs0Circle } from "react-icons/bs";
import Dialog from "@/components/Dialog/Dialog5";
export default function Payer() {
  const [grille, setGrille] = useState([]);
  useEffect(() => {
    async function fetchData() {
      const a = await fetch(`http://localhost:3001/grille`);
      const b = await a.json();
      setGrille(b.data);
    }
    fetchData();
  }, []);
  console.log(grille);
  return (
    <div className="h-full relative flex justify-center items-center ">
      <Fab
        color="primary"
        style={{
          position: "absolute",
          bottom: "14px",
          right: "14px",
        }}
        aria-label="add"
      >
        <Dialog setGrille={setGrille} />
      </Fab>
      <div className="flex flex-col w-full items-center gap-4 h-full overflow-y-scroll ">
        {grille.map((e, i) => (
          <ProductCard setGrille={setGrille} grille={grille} key={i} {...e} />
        ))}
      </div>
    </div>
  );
}
