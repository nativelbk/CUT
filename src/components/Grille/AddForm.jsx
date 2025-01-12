"use client";

import { useState } from "react";
import year from "@/year.json";
import month from "@/month.json";
import apiRequest from "@/utils/apiRequest";
import { useRouter } from "next/navigation";
import Snackbar from "@mui/material/Snackbar";

export default function GrilleForm({
  min_longueur = "",
  max_longueur = "",
  min_largeur = "",
  max_largeur = "",
  montant = "",
  setGrille,
  grille,
  handleClose,
}) {
  const [formData, setFormData] = useState({
    min_longueur,
    max_longueur,
    min_largeur,
    max_largeur,
    montant,
  });

  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose1 = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  console.log(formData);
  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log("salut");
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form submitted:");
    const grille = await apiRequest(`http://localhost:3001/grille`, {
      method: "POST",
      body: {
        ...formData,
      },
    });
    console.log(grille);
    setGrille((val) => [...val, grille.data.data]);
    handleClose();
    handleClick();
  };

  return (
    <div onSubmit={handleSubmit} className="max-w-md mx-auto p-4 space-y-4">
      <Snackbar
        open={open}
        autoHideDuration={5000}
        onClose={handleClose1}
        message="Panneau crée avec succès!!"
      />
      <div>
        <span>Longueur</span>
        <div className="flex space-x-4">
          <input
            type="number"
            name="min_longueur"
            value={formData.min_longueur}
            onChange={handleChange}
            placeholder="Longueur minimun"
            className="w-full py-2 px-3 rounded-lg bg-white border border-gray-300 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            X
          </div>
          <input
            type="number"
            name="max_longueur"
            value={formData.max_longueur}
            onChange={handleChange}
            placeholder="Longueur maximum"
            className="w-full py-2 px-3 rounded-lg bg-white border border-gray-300 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>
      <div>
        <span>Largeur</span>
        <div className="flex space-x-4">
          <input
            type="number"
            name="min_largeur"
            value={formData.min_largeur}
            onChange={handleChange}
            placeholder="Largeur minimum"
            className="w-full py-2 px-3 rounded-lg bg-white border border-gray-300 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            X
          </div>
          <input
            type="number"
            name="max_largeur"
            onChange={handleChange}
            value={formData.max_largeur}
            placeholder="Largeur maximum"
            className="w-full py-2 px-3 rounded-lg bg-white border border-gray-300 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>
      <div>
        <span>Montant</span>
        <input
          type="number"
          name="montant"
          value={formData.montant}
          onChange={handleChange}
          placeholder="Montant"
          className="w-full py-2 px-3 rounded-lg bg-white border border-gray-300 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <button
        type="submit"
        className="w-full py-2 rounded-lg bg-blue text-white font-semibold shadow-md hover:bg-blue-600 transition"
        onClick={handleSubmit}
      >
        Ajouter
      </button>
    </div>
  );
}
