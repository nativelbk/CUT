import Dialog from "@/components/Dialog/Qr";
import QRCode from "react-qr-code";

const LocationCard = ({ localisation, dimensions, statut, autorisation }) => {
  const qrCodeData = `https://maps.google.com/?q=${localisation}`;

  const getStatutLabel = (statut) => {
    switch (statut) {
      case "0":
        return {
          text: "En attente de paiement",
          bg: "bg-orange-200",
          textColor: "text-orange-800",
        };
      case "1":
        return {
          text: "En attente de validation",
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
    <div className="w-[90%] flex p-6 bg-white rounded-2xl shadow-lg gap-6 border border-gray-200 hover:shadow-xl transition-shadow duration-300">
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
            <span className="font-semibold text-gray-800">Localisation : </span>
            {localisation}
          </p>
          <p>
            <span className="font-semibold text-gray-800">Dimensions : </span>
            {dimensions}
          </p>
          <p>
            <span className="font-semibold text-gray-800">Autorisation : </span>
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
        {statut === "2" && (
          <div className="mt-6">
            <Dialog localisation={localisation} autorisation={autorisation} />
          </div>
        )}
      </div>

      {/* Section QR Code */}
      <div className="w-[35%] flex flex-col items-center justify-center">
        <p className="text-gray-600 mb-4 text-center text-sm">
          Scannez le QR Code pour plus d'informations :
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
  );
};

export default LocationCard;
