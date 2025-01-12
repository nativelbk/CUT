// "use client";

// import GrilleForm from "@/components/Grille/GrilleForm";
// import ProductCard from "@/components/Grille/Grille";
// import PaymentForm from "@/components/PaymentForm/PaymentForm";

// import { useEffect, useState } from "react";
// export default function Payer() {
//   const [grille, setGrille] = useState([]);
//   useEffect(() => {
//     async function fetchData() {
//       const a = await fetch(`http://localhost:3001/grille`);
//       const b = await a.json();
//       setGrille(b.data);
//     }
//     fetchData();
//   }, []);
//   console.log(grille);
//   return (
//     <div className="h-full flex justify-center items-center ">
//       <PaymentForm />
//       {/* <div className="flex flex-col w-[300px] gap-4 h-full overflow-y-scroll ">
//         {grille.map((e, i) => (
//           <ProductCard setGrille={setGrille} grille={grille} key={i} {...e} />
//         ))}
//       </div> */}
//       {/* Section Droite */}
//       <div className="flex flex-col justify-between mt-8">
//         {/* Carte interactive */}
//         <div className="w-1/2 p-4 bg-gray-50 rounded-lg shadow-md">
//           <h3 className="text-lg font-semibold text-gray-800 mb-2">
//             Prévisualisation de localisation
//           </h3>
//           {true ? (
//             <iframe
//               title="Carte de localisation"
//               className="w-full h-48 rounded-lg"
//               src={`https://www.google.com/maps?q=${"-18.159064, 49.393217"}&output=embed`}
//             ></iframe>
//           ) : (
//             <p className="text-gray-500 text-sm">
//               Entrez une localisation pour voir l'aperçu ici.
//             </p>
//           )}
//         </div>

//         {/* Illustration */}
//         <div className="w-1/3 p-4 flex flex-col items-center bg-white rounded-lg shadow-md">
//           <img
//             src="/images/example-board.png"
//             alt="Illustration de panneau"
//             className="w-24 h-24 object-contain mb-4"
//           />
//           <p className="text-sm text-gray-600 text-center">
//             Une illustration des panneaux pour référence. Les dimensions seront
//             adaptées selon vos saisies.
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// }

"use client";

import GrilleForm from "@/components/Grille/GrilleForm";
import ProductCard from "@/components/Grille/Grille";
import PaymentForm from "@/components/PaymentForm/PaymentForm";
import { useEffect, useState } from "react";
import a from "@/assets/a.jpg";
import Image from "next/image";

export default function Payer() {
  const [position, setPosition] = useState("Toamasina");
  const [formData, setFormData] = useState({
    longueur: "",
    largeur: "",
    localisation: "",
  });
  useEffect(() => {
    if (formData.localisation) {
      setPosition(formData.localisation);
    } else {
      setPosition("Toamasina");
    }
  }, [formData.localisation]);

  // useEffect(() => {
  //   async function fetchData() {
  //     const a = await fetch(`http://localhost:3001/grille`);
  //     const b = await a.json();
  //     setGrille(b.data);
  //   }
  //   fetchData();
  // }, []);

  return (
    <div className="min-h-screen flex flex-col lg:flex-row gap-8 justify-center items-start p-8">
      {/* Formulaire de paiement */}
      <div className="flex-1 max-w-lg w-full">
        <PaymentForm setFormData={setFormData} formData={formData} />
      </div>

      {/* Section droite */}
      <div className="flex flex-col flex-1 gap-10 items-center w-full max-w-md">
        {/* Illustration */}
        <div className="w-full  overflow-hidden h-[300px] relative p-6 bg-white rounded-2xl shadow-xl flex flex-col items-center">
          <Image src={a} alt="Illustration de panneau" fill />
        </div>

        {/* Carte interactive */}
        <div className="w-full p-6 bg-white rounded-2xl shadow-xl">
          <h3 className="text-lg font-semibold text-gray-800 mb-4 text-center">
            Prévisualisation de localisation
          </h3>
          <iframe
            title="Carte de localisation"
            className="w-full h-64 rounded-lg border"
            src={`https://www.google.com/maps?q=${position}&output=embed`}
          ></iframe>
          <p className="text-sm text-gray-500 text-center mt-2">
            Localisation estimée en fonction des coordonnées fournies.
          </p>
        </div>
      </div>
    </div>
  );
}
