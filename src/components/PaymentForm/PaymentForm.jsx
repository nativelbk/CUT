"use client";

import { useState } from "react";
import apiRequest from "@/utils/apiRequest";
import { useRouter } from "next/navigation";
import Snackbar from "@mui/material/Snackbar";

export default function PaymentForm({ formData, setFormData }) {
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    await apiRequest("http://localhost:3001/panneau/1", {
      method: "POST",
      body: {
        ...formData,
        dimensions: `${formData.longueur}m x ${formData.largeur}m`,
      },
    });
    setFormData({ longueur: "", largeur: "", localisation: "" });
    handleClick();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-lg mx-auto p-6 space-y-6 bg-white rounded-2xl shadow-xl  border border-gray-200"
    >
      <Snackbar
        open={open}
        autoHideDuration={5000}
        onClose={handleClose}
        message="Panneau créé avec succès !"
      />
      <h2 className="text-2xl font-bold text-gray-900 text-center">
        Ajouter un panneau
      </h2>
      <p className="text-sm text-gray-600 text-center">
        Veuillez remplir les informations suivantes pour ajouter un nouveau
        panneau. Assurez-vous que toutes les données sont correctes avant de
        soumettre.
      </p>
      <div className="space-y-4">
        <input
          type="number"
          name="longueur"
          value={formData?.longueur}
          onChange={handleChange}
          placeholder="Longueur (en mètres)"
          className="w-full py-3 px-4 rounded-lg bg-gray-50 border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue focus:bg-white"
        />
        <input
          type="number"
          name="largeur"
          value={formData?.largeur}
          onChange={handleChange}
          placeholder="Largeur (en mètres)"
          className="w-full py-3 px-4 rounded-lg bg-gray-50 border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue focus:bg-white"
        />
        <input
          type="text"
          name="localisation"
          value={formData?.localisation}
          onChange={handleChange}
          placeholder="Localisation"
          className="w-full py-3 px-4 rounded-lg bg-gray-50 border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue focus:bg-white"
        />
      </div>
      <button
        type="submit"
        className="w-full py-3 rounded-lg bg-blue text-white font-semibold shadow-lg  transition-all duration-300 "
      >
        Ajouter
      </button>
    </form>
  );
}
