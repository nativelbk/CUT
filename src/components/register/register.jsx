"use client";

import { useState } from "react";
import { FaEnvelope, FaLock } from "react-icons/fa";
import Link from "next/link";
import apiRequest from "@/utils/apiRequest";
import { useRouter } from "next/navigation";
import { IoAddCircle } from "react-icons/io5";

export default function RegisterForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = {
      email,
      password,
    };

    console.log("Données du formulaire:", formData);
    const { error } = await apiRequest("http://localhost:5000/auth/register/", {
      method: "POST",
      body: formData,
    });
    if (!error) {
      router.push("/ecolage");
    }
  };

  return (
    <div className="flex items-center justify-center  h-screen">
      <div className=" rounded-lg px-8 py-6 w-full max-w-md">
        <div>
          <h2 className=" text-6xl uppercase  text-center font-bold text-blue ">
            Bienvenue
          </h2>
          <p className="text-center text-gray mb-6">Créer votre compte ici</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-blue-500 font-semibold mb-2">
              Email
            </label>
            <div className="relative">
              <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                className="pl-10 w-full border focus:border-gray-300 rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-blue-500 font-semibold mb-2">
              Mot de passe
            </label>
            <div className="relative">
              <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Mot de passe"
                className="pl-10 w-full border focus:border-gray-300 rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue"
                required
              />
            </div>
          </div>

          <div className="text-right">
            <Link href="/login" className="text-sm text-gray hover:underline">
              Vous avez un compte?
            </Link>
          </div>
          <button
            type="submit"
            className="w-full bg-blue text-white font-semibold gap-2 items-center justify-center flex py-2 px-4 rounded-lg hover:bg-blue transition duration-300"
          >
            <IoAddCircle />
            CREER
          </button>
        </form>
      </div>
    </div>
  );
}
