import React, { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import { Typography } from "@material-tailwind/react";

const Citizens = () => {
  const [citizens, setCitizens] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCitizens = async () => {
      try {
        setLoading(true);
        const querySnapshot = await getDocs(collection(db, "users"));
        const citizenList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        // Sort citizens by monthly salary (ascending order)
        const sortedCitizens = citizenList.sort(
          (a, b) => (a.monthlySalary || 0) - (b.monthlySalary || 0)
        );

        setCitizens(sortedCitizens);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCitizens();
  }, []);

  return (
    <div className="p-8 bg-gray-100 min-h-screen py-20">
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

      <Typography className="pb-1 tracking-tight lg:mt-16 my-10 text-center mx-auto text-4xl font-extrabold text-gray-800 lg:text-6xl">
        CITIZENS
      </Typography>

      <div className="overflow-x-auto bg-white shadow rounded-lg">
        {citizens.length > 0 ? (
          <table className="min-w-full table-auto border-collapse border border-gray-200">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-4 py-2 text-left text-gray-700">Name</th>
                <th className="px-4 py-2 text-left text-gray-700">Address</th>
                <th className="px-4 py-2 text-left text-gray-700">
                  Monthly Salary
                </th>
                <th className="px-4 py-2 text-left text-gray-700">
                  Qualification
                </th>
              </tr>
            </thead>
            <tbody>
              {citizens.map((citizen) => (
                <tr
                  key={citizen.id}
                  className="border-t border-gray-200 hover:bg-gray-100"
                >
                  <td className="px-4 py-2">{citizen.name || "N/A"}</td>
                  <td className="px-4 py-2">{citizen.address || "N/A"}</td>
                  <td className="px-4 py-2">
                    {citizen.monthlySalary
                      ? `₱ ${citizen.monthlySalary.toLocaleString()}`
                      : "N/A"}
                  </td>
                  <td className="px-4 py-2">
                    {citizen.monthlySalary < 30000 ? (
                      <span className="text-green-600 font-bold">
                        Qualified
                      </span>
                    ) : (
                      <span className="text-red-600 font-bold">
                        Not Qualified
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          !loading && (
            <p className="text-gray-500 text-center">No citizens found.</p>
          )
        )}
      </div>
    </div>
  );
};

export default Citizens;
