"use client";

import Table from "@/components/Table/Table";
import LocationCard from "@/components/Location/Location";
import ChoiceCard from "@/components/Location/LocationChoice";
import PayLocationCard from "@/components/Location/PayLocationCard";
import { useEffect, useState } from "react";

export default function Ecolage() {
  const [panneau, setPanneau] = useState([]);
  const [statut, setStatut] = useState("");
  const [localisation, setLocalisation] = useState("");
  useEffect(() => {
    async function fetchData() {
      const a = await fetch("http://localhost:3001/panneau/");
      const b = await a.json();
      setPanneau(b.data);
    }
    fetchData();
  }, []);
  return (
    <div className="flex">
      <div className="w-full h-full flex flex-col gap-3 items-center overflow-y-scroll ">
        {panneau.map((e, i) => (
          <LocationCard {...e} key={i} />
        ))}{" "}
      </div>
      {/* Section complémentaire */}
      <div className="flex flex-col gap-6 w-full md:w-1/3">
        {/* Exemple : Statistiques */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-4">Statistiques générales</h3>
          <ul className="text-gray-600 space-y-2">
            <li>
              Total de panneaux : <span className="font-bold">120</span>
            </li>
            <li>
              Approuvés : <span className="text-green-500 font-bold">80</span>
            </li>
            <li>
              En attente : <span className="text-yellow-500 font-bold">25</span>
            </li>
            <li>
              Rejetés : <span className="text-red-500 font-bold">15</span>
            </li>
          </ul>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-4">Filtrer les panneaux</h3>
          <form className="space-y-4">
            {/* Filtrer par statut */}
            <div>
              <label className="block text-gray-600 font-medium mb-2">
                Statut
              </label>
              <select
                className="w-full p-2 border rounded"
                value={statut}
                onChange={(e) => setStatut(e.target.value)}
              >
                <option value="">Tous</option>
                <option value="0">En attente de paiement</option>
                <option value="1">En attente de validation</option>
                <option value="2">Approuvé</option>
              </select>
            </div>

            {/* Filtrer par localisation */}
            <div>
              <label className="block text-gray-600 font-medium mb-2">
                Localisation
              </label>
              <input
                type="text"
                placeholder="Entrez une localisation"
                className="w-full p-2 border rounded"
                value={localisation}
                onChange={(e) => setLocalisation(e.target.value)}
              />
            </div>

            {/* Bouton Appliquer */}
            <button
              type="submit"
              className="w-full bg-blue text-white py-2 rounded hover:bg-blue-600"
            >
              Appliquer
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
