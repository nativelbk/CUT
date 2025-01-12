// components/ProductCard.tsx
import React from "react";
import { TbArrowAutofitWidth } from "react-icons/tb";
import { TbArrowAutofitHeight } from "react-icons/tb";
import { IoPricetagOutline } from "react-icons/io5";
import Drop from "./Drop";

const AdminGrille = ({
  min_largeur,
  max_largeur,
  montant,
  min_longueur,
  max_longueur,
  setGrille,
  grille,
  id,
}) => {
  return (
    <div className="bg-white shadow-md relative rounded-xl p-6 max-w-sm flex flex-col items-center text-center">
      <Drop
        min_largeur={min_largeur}
        max_largeur={max_largeur}
        montant={montant}
        min_longueur={min_longueur}
        max_longueur={max_longueur}
        setGrille={setGrille}
        grille={grille}
        id={id}
      />
      <div className="w-16 h-16 bg-gray-300 rounded-full mb-4"></div>

      <div className="flex flex-col justify-start w-full">
        <p className="text-gray-700 w-full  flex justify-center items-center gap-2">
          <span className="font-medium">
            <TbArrowAutofitWidth color="#009ee2" />
          </span>
          {min_largeur}m à &nbsp;
          {max_largeur}m
        </p>
        <p className="text-gray-700 text-start flex justify-center items-center gap-2 ">
          <span className="font-medium">
            <TbArrowAutofitHeight color="#009ee2" />
          </span>{" "}
          {min_longueur}m à &nbsp;
          {max_longueur}m
        </p>
        <p className="text-gray-700 flex items-center justify-center gap-2 text-start">
          <span className="font-medium">
            <IoPricetagOutline color="#009ee2" />
          </span>{" "}
          {montant}Ar
        </p>
      </div>
    </div>
  );
};

export default AdminGrille;
