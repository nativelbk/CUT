"use client";

import useFetchData from "@/hooks/useFetchData";
import { useEffect, useState } from "react";

export default function Table() {
  const [selectedRows, setSelectedRows] = useState([]);

  const { data } = useFetchData("http://localhost:5000/payment");

  console.log(data);

  const handleCheckboxChange = (name) => {
    setSelectedRows((prev) =>
      prev.includes(name) ? prev.filter((row) => row !== name) : [...prev, name]
    );
  };

  return (
    <div className="overflow-x-auto w-full">
      <table className="min-w-full table-auto border-collapse">
        <thead>
          <tr className="bg-[#F6F4FF]  text-left text-[#9E9EBA] text-sm font-medium">
            <th className="p-3">
              <input type="checkbox" className="accent-[#D8D7E6]" />
            </th>
            <th className="p-3">NOM</th>
            <th className="">MOIS/ANNEE</th>
            <th className="">STATUT</th>
            <th className=" text-right">SOMME</th>
          </tr>
        </thead>
        <tbody>
          {data?.length &&
            data?.map((item) => (
              <tr
                key={item.name}
                className="border-b border-[#EAEAEA] hover:bg-[#F9F9F9]  transition"
              >
                <td className="p-3">
                  <input
                    type="checkbox"
                    checked={selectedRows.includes(item.name)}
                    onChange={() => handleCheckboxChange(item.name)}
                    className="accent-[#7F56D9] text-[#7F56D9] focus:ring-[#7F56D9]"
                  />
                </td>
                <td className=" text-[#344054] text-sm">
                  {item.firstname} {item.lastname}
                </td>
                <td className=" p-2">
                  <div className="flex flex-col justify-start items-start  gap-2">
                    <span className="bg-green-100 text-blue py-1 px-2 rounded-full text-xs font-medium">
                      ● {item.month}
                    </span>
                    <span className="text-xs font-semibold text-[#667085]">
                      {item.year}
                    </span>
                  </div>
                </td>
                <td className="">
                  <span className="bg-green-100 text-green-600 py-1 px-2 rounded-full text-xs font-medium">
                    ● OK
                  </span>
                </td>
                <td className=" text-right text-[#344054] text-sm">
                  100.000Ar
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}
