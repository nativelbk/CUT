// import React, { useState } from "react";
// import Image from "next/image";

// const PayLocationCard = ({
//   image,
//   localisation,
//   dimensions,
//   statut,
//   id,
//   changeStatut,
// }) => {
// const [form, setForm] = useState({
//   montant: "",
//   amount: "",
// });

//   return (
//     <div className="w-full max-w-md h-fit p-4 bg-white rounded-lg shadow-md border border-blue flex items-center">
//       {/* Section image */}
//       <div className="w-24 relative overflow-hidden h-24 bg-gray-200 rounded mr-4">
//         <Image src={image} fill alt="a" />
//       </div>

//       {/* Contenu */}
//       <div className="flex-1 text-gray-500">
//         <p className="mb-2">
//           <span className="font-medium text-gray-700">Localisation: </span>
//           {/* -18.090224, 49.394388 */}
//           {localisation}
//         </p>
//         <p className="mb-2">
//           <span className="font-medium text-gray-700">Dimensions: </span>
//           {dimensions}
//         </p>
//         <p>
//           <span className="font-medium text-gray-700">Statut: </span>
//           <span
//             className={` ${
//               statut === "0"
//                 ? "bg-orange-200 text-yellow-800"
//                 : statut === "1"
//                 ? "bg-yellow-200 text-yellow-800"
//                 : "text-green-800 bg-green-200"
//             }  px-2 py-1 rounded`}
//           >
//             {statut === "0"
//               ? "En attente de paiement"
//               : statut === "1"
//               ? "En attente de validation"
//               : "Approuvé"}
//           </span>
//         </p>
//       </div>

// {
//   /* Indicateur bleu */
// }
// {
//   statut === "0" && (
//     <div className="ml-4">
//       {/* <div className="w-6 h-6 bg-blue rounded-full"></div> */}
//       <SimpleDialogDemo
//         changeStatut={changeStatut}
//         id={id}
//         form={form}
//         setForm={setForm}
//       />
//     </div>
//   );
// }
//     </div>
//   );
// };

// export default PayLocationCard;

import Dialog from "@/components/Dialog/Qr";
import SimpleDialogDemo from "@/components/Dialog/Dialog";
import { useState } from "react";
import QRCode from "react-qr-code";
import { MdCancel } from "react-icons/md";

const LocationCard = ({
  localisation,
  dimensions,
  statut,
  autorisation,
  changeStatut,
  id,
}) => {
  const qrCodeData = `https://maps.google.com/?q=${localisation}`;
  const [form, setForm] = useState({
    montant: "",
    amount: "",
  });

  const getStatutLabel = (statut) => {
    switch (statut) {
      case "0":
        return {
          text: "En attente de validation",
          bg: "bg-orange-200",
          textColor: "text-orange-800",
        };
      case "1":
        return {
          text: "En attente de paiement",
          bg: "bg-yellow-200",
          textColor: "text-yellow-800",
        };
      case "2":
        return {
          text: "Approuvée",
          bg: "bg-green-200",
          textColor: "text-green-800",
        };
      default:
        return {
          text: "Refusée",
          bg: "bg-red-200",
          textColor: "text-red-800",
        };
    }
  };

  const { text, bg, textColor } = getStatutLabel(statut);

  return (
    <div className="w-[90%]  p-6 bg-white rounded-2xl h-fit shadow-lg  border border-gray-200 hover:shadow-xl transition-shadow duration-300">
      <div className="flex gap-6">
        {/* Section Détails */}
        <div className="w-[65%]">
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-900">
              Détails du panneau
            </h2>
            <div className="h-1 w-24 bg-blue-600 rounded-full mt-2"></div>
          </div>
          <div className="text-gray-700 space-y-4">
            <p>
              <span className="font-semibold text-gray-800">
                Localisation :{" "}
              </span>
              {localisation}
            </p>
            <p>
              <span className="font-semibold text-gray-800">Dimensions : </span>
              {dimensions}
            </p>
            <p>
              <span className="font-semibold text-gray-800">
                Autorisation :{" "}
              </span>
              {autorisation}
            </p>
            <p>
              <span className="font-semibold text-gray-800">Statut : </span>
              <span
                className={`px-4 py-1 text-sm font-medium rounded-lg ${bg} ${textColor} inline-block `}
              >
                {text}
              </span>
            </p>
          </div>
        </div>
        {/* Section QR Code */}
        <div className="w-[35%] flex flex-col items-center justify-center">
          <p className="text-gray-600 mb-4 text-center text-sm">
            Scannez le QR Code pour plus d&apos;informations :
          </p>
          <div className="p-4 bg-gray-50 rounded-xl shadow-md hover:scale-105 transition-transform duration-300">
            <QRCode
              style={{ height: "100%", width: "100%" }}
              value={qrCodeData}
              size={128}
            />
          </div>
        </div>
      </div>
      <div className="flex items-center gap-4 justify-between mt-4 ">
        <div className="w-full">
          <Dialog localisation={localisation} autorisation={autorisation} />
        </div>
        {statut == 0 && (
          <button className="w-full flex items-center justify-center gap-2 bg-red-500 text-white rounded ">
            <MdCancel className="w-[20px] h-[20px]" /> Annuler la demande
          </button>
        )}
        {statut == 1 && (
          <div className="ml-4">
            {/* <div className="w-6 h-6 bg-blue rounded-full"></div> */}
            <SimpleDialogDemo
              changeStatut={changeStatut}
              id={id}
              form={form}
              setForm={setForm}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default LocationCard;
