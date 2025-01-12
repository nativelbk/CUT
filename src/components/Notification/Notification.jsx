import Link from "next/link";
import React from "react";

const Notification = ({ isRead, titre, id }) => {
  const handleClick = async (e) => {
    await fetch(`http://localhost:3001/notification/${id}`, {
      method: "PATCH",
    });
  };
  console.log(titre);
  const title =
    titre === "new"
      ? "Nouvelle demande"
      : `Demande ${titre === "accepted" ? "acceptée" : "refusée"}`;
  const desc =
    titre === "new"
      ? "Bonne nouvelle ! Une nouvelle demande vient d’être ajoutée. Cliquez ici pour la découvrir et y répondre rapidement."
      : titre === "declined"
      ? "❌ Votre demande a été refusée. Veuillez consulter votre espace personnel pour plus de détails."
      : "✅ Votre demande a été acceptée avec succès. Consultez les détails dans votre espace personnel";
  return (
    <Link
      className={` ${
        !isRead ? "bg-[#E1F1F4]" : "bg-white"
      } rounded-lg p-4 max-w-md h-fit shadow-md`}
      href={
        localStorage.getItem("type") === "user" ? "/mes-demandes" : "/demandes"
      }
      onClick={handleClick}
    >
      <h4 className="text-lg font-bold text-gray-800 mb-2">{title}</h4>
      <p className="text-sm text-gray-600">{desc}</p>
    </Link>
  );
};

export default Notification;
