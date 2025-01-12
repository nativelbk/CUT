"use client";

import { useEffect } from "react";
import Chart from "chart.js/auto"; // Import Chart.js correctement

export default function Home() {
  useEffect(() => {
    // Initialisation du graphique avec Chart.js
    const ctx = document.getElementById("statsChart");
    if (ctx) {
      new Chart(ctx, {
        type: "doughnut",
        data: {
          labels: ["Approuvé", "En attente", "Rejeté"],
          datasets: [
            {
              label: "Statistiques des panneaux",
              data: [50, 30, 20], // Exemple de données
              backgroundColor: ["#22c55e", "#facc15", "#ef4444"],
              borderWidth: 1,
            },
          ],
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              position: "bottom",
            },
          },
        },
      });
    }
  }, []);

  return (
    <div className="flex flex-col gap-6 p-6 bg-gray-50 w-full rounded-md shadow-lg">
      {/* Carte Interactive */}
      <div className="h-48 w-full rounded-md overflow-hidden shadow-md">
        <iframe
          title="Carte interactive"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31290.963119931166!2d49.374388!3d-18.090224!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTjCsDA1JzI0LjgiUyA0OcKwMjMnMzcuNCJF!5e0!3m2!1sen!2smg!4v1684266166810!5m2!1sen!2smg"
          className="w-full h-full"
          allowFullScreen=""
          loading="lazy"
        ></iframe>
      </div>

      {/* Informations Détailées */}
      <div className="bg-white p-4 rounded-md shadow-md">
        <h2 className="text-xl font-semibold text-gray-700">
          Détails du panneau
        </h2>
        <p className="text-sm text-gray-500">
          Localisation: -18.090224, 49.394388
        </p>
        <p className="text-sm text-gray-500">Dimensions: 1m x 1m</p>
        <p className="text-sm text-gray-500">Autorisation: 26/11/2024</p>
        <p className="text-sm">
          Statut: <span className="text-green-600 font-bold">Approuvé</span>
        </p>
      </div>

      {/* Boutons d'Action */}
      <div className="flex gap-4">
        <button className="bg-blue-500 text-white px-4 py-2 rounded-md shadow hover:bg-blue-600 transition">
          Modifier
        </button>
        <button className="bg-red-500 text-white px-4 py-2 rounded-md shadow hover:bg-red-600 transition">
          Supprimer
        </button>
      </div>
    </div>
  );
}
