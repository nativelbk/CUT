// import React from "react";
// import Image from "next/image";
// import { RxDimensions } from "react-icons/rx";
// import { MdAlternateEmail } from "react-icons/md";
// import { RiBillLine } from "react-icons/ri";
// import { FaMoneyBillWave } from "react-icons/fa6";
// import { CiLocationOn } from "react-icons/ci";
import SimpleDialog2 from "@/components/Dialog/Dialog2";
import SimpleDialog3 from "@/components/Dialog/Dialog3";

// const ChoiceCard = ({
//   image,
//   localisation,
//   dimensions,
//   User,
//   Facture,
//   id,
//   removeItem,
// }) => {
//   return (
//     <div className="w-[80%] p-4 h-fit bg-white rounded-lg shadow-md border flex items-center">
//       {/* Contenu */}
//       <div className="flex-1 text-gray-500">
//         <p className="flex items-center gap-4  ">
//           <span className="font-medium text-gray-700">
//             <CiLocationOn color="#009ee2" />{" "}
//           </span>
//           {localisation}
//         </p>
//         <p className="flex items-center gap-4  ">
//           <span className="font-medium  text-gray-700">
//             <RxDimensions color="#009ee2" />
//           </span>
//           {dimensions}
//         </p>
//         <p className="flex items-center gap-4  ">
//           <span className="font-medium text-gray-700">
//             <MdAlternateEmail color="#009ee2" />
//           </span>
//           {User.email}
//         </p>
//         <p className="flex items-center gap-4  ">
//           <span className="font-medium text-gray-700">
//             <RiBillLine color="#009ee2" />
//           </span>
//           {Facture?.number}
//         </p>
//         <p className="flex items-center gap-4  ">
//           <span className="font-medium text-gray-700">
//             <FaMoneyBillWave color="#009ee2" />
//           </span>
//           {Facture?.number}
//         </p>
//         {/* <p>
//           <span className="font-medium text-gray-700">Statut: </span>
//           <span className="bg-yellow-200 text-yellow-800 px-2 py-1 rounded">
//             En attente
//           </span>
//         </p> */}
//       </div>

//       {/* Indicateurs de statut */}
// <div className="flex flex-col gap-2 ml-4">
//   <SimpleDialog2 id={id} removeItem={removeItem} user={User} />
//   <SimpleDialog3 id={id} removeItem={removeItem} user={User} />
// </div>
//     </div>
//   );
// };

// export default ChoiceCard;

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
  removeItem,
  User,
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
        <div className="flex w-[50%] justify-center  gap-4 ml-4">
          <SimpleDialog3 id={id} removeItem={removeItem} user={User} />
          <SimpleDialog2 id={id} removeItem={removeItem} user={User} />
        </div>
      </div>
    </div>
  );
};

export default LocationCard;
