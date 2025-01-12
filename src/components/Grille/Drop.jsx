import React from "react";
import { HiDotsVertical } from "react-icons/hi";
import "./drop.css";
import Dialog from "@/components/Dialog/Dialog4";

export default function Drop({
  min_largeur,
  max_largeur,
  montant,
  min_longueur,
  max_longueur,
  setGrille,
  grille,
  id,
}) {
  return (
    <div className="select h-[24px] overflow-visible">
      <div
        className="selected  "
        data-default="All"
        data-one="option-1"
        data-two="option-2"
        data-three="option-3"
      >
        <HiDotsVertical color="black" />
      </div>
      <div className="options">
        <section>
          <input id="all" name="option" type="radio" />
          <label className="option" data-txt="Options"></label>
        </section>
        <div title="option-1">
          <Dialog
            min_largeur={min_largeur}
            max_largeur={max_largeur}
            montant={montant}
            min_longueur={min_longueur}
            max_longueur={max_longueur}
            setGrille={setGrille}
            grille={grille}
            id={id}
          />
        </div>
        {/* <div title="option-2">
          <input id="option-2" name="option" type="radio" />
          <label className="option" data-txt="option-2"></label>
        </div>
        <div title="option-3">
          <input id="option-3" name="option" type="radio" />
          <label className="option" data-txt="option-3"></label>
        </div> */}
      </div>
    </div>
  );
}
