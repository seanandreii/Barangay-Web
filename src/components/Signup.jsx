import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../firebase";
import { useNavigate } from "react-router-dom";
import { doc, setDoc } from "firebase/firestore";
import { Typography } from "@material-tailwind/react";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [houseNumber, setHouseNumber] = useState("");
  const [spotCheckDate, setSpotCheckDate] = useState("");
  const [name, setName] = useState("");
  const [monthlySalary, setMonthlySalary] = useState(""); // New state
  const [familyMembers, setFamilyMembers] = useState([]);
  const [isMember4ps, setIsMember4ps] = useState(false);
  const [error, setError] = useState("");
  const [isFetchingLocation, setIsFetchingLocation] = useState(false);
  const navigate = useNavigate();

  const handleAddMember = () => {
    setFamilyMembers([
      ...familyMembers,
      { name: "", gender: "Male", relationship: "" },
    ]);
  };

  const handleMemberChange = (index, field, value) => {
    const updatedMembers = [...familyMembers];
    updatedMembers[index][field] = value;
    setFamilyMembers(updatedMembers);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsFetchingLocation(true);

    const getLocation = () =>
      new Promise((resolve, reject) => {
        if (!navigator.geolocation) {
          reject(new Error("Geolocation is not supported by your browser."));
        } else {
          navigator.geolocation.getCurrentPosition(
            (position) => resolve(position.coords),
            (error) => reject(error)
          );
        }
      });

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const userId = userCredential.user.uid;

      let location = { latitude: null, longitude: null };
      try {
        const coords = await getLocation();
        location = {
          latitude: coords.latitude,
          longitude: coords.longitude,
        };
      } catch (locationError) {
        console.warn("Location fetch failed:", locationError.message);
      }

      await setDoc(doc(db, "users", userId), {
        email,
        houseNumber,
        spotCheckDate,
        name,
        monthlySalary,
        familyMembers,
        isMember4ps,
        location,
      });

      navigate("/login");
    } catch (error) {
      setError("Failed to create an account or save data");
      console.error("Error saving user data:", error);
    } finally {
      setIsFetchingLocation(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen py-16">
      <div className="w-full max-w-md">
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        >
          <Typography className="pb-1 tracking-tight lg:mt-16 my-10  text-center mx-auto text-4xl font-extrabold text-gray-800 lg:text-6xl">
            SIGN UP
          </Typography>
          {error && <p className="text-red-500 text-xs italic">{error}</p>}

          {/* Email and Password */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              House Number
            </label>
            <input
              type="text"
              value={houseNumber}
              onChange={(e) => setHouseNumber(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Date of Spot Check
            </label>
            <input
              type="date"
              value={spotCheckDate}
              onChange={(e) => setSpotCheckDate(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
            />
          </div>

          {/* Monthly Salary */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Monthly Salary
            </label>
            <input
              type="number"
              value={monthlySalary}
              onChange={(e) => setMonthlySalary(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
              placeholder="Enter salary"
            />
          </div>

          {/* Family Members Section */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Family Members
            </label>
            {familyMembers.map((member, index) => (
              <div key={index} className="mb-2 border-b-2 border-gray-200 pb-2">
                <div className="flex gap-2 mb-2">
                  <input
                    type="text"
                    placeholder="Name"
                    value={member.name}
                    onChange={(e) =>
                      handleMemberChange(index, "name", e.target.value)
                    }
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
                  />
                  <select
                    value={member.gender}
                    onChange={(e) =>
                      handleMemberChange(index, "gender", e.target.value)
                    }
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                </div>
                <input
                  type="text"
                  placeholder="Relationship"
                  value={member.relationship}
                  onChange={(e) =>
                    handleMemberChange(index, "relationship", e.target.value)
                  }
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
                />
              </div>
            ))}
            <button
              type="button"
              onClick={handleAddMember}
              className="text-blue-500 underline text-sm"
            >
              Add Family Member
            </button>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Are you a member of 4ps?
            </label>
            <select
              value={isMember4ps}
              onChange={(e) => setIsMember4ps(e.target.value === "Yes")}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
            >
              <option value="No">No</option>
              <option value="Yes">Yes</option>
            </select>
          </div>

          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full"
            type="submit"
            disabled={isFetchingLocation}
          >
            {isFetchingLocation ? "Submitting..." : "Submit"}
          </button>
        </form>
      </div>
    </div>
  );
}
