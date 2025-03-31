import React, { useState } from "react";
import { db } from "../firebase";
import { collection, addDoc } from "firebase/firestore";
import { Typography } from "@material-tailwind/react";
import logo from "../assets/sanjuan-logo.png";

const IndigencyForm = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    civilStatus: "",
    address: "",
    income: "",
    purpose: "",
  });
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate the form
    if (!formData.fullName || !formData.address || !formData.purpose) {
      setErrorMessage("Please fill in all required fields.");
      return;
    }

    try {
      // Save data to the `indigency` collection
      await addDoc(collection(db, "indigency"), formData);
      setSuccessMessage("Request submitted successfully.");
      setErrorMessage("");
      setFormData({
        fullName: "",
        civilStatus: "",
        address: "",
        income: "",
        purpose: "",
      });
    } catch (error) {
      setErrorMessage("Error submitting request. Please try again.");
      console.error("Error adding document: ", error);
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 bg-white p-6 rounded-lg shadow-md py-16">
      <img className="m-auto size-32" src={logo} />
      <Typography className="pb-1 tracking-tight lg:mt-16  text-center mx-auto text-4xl my-8 font-extrabold text-gray-800 lg:text-6xl">
        INDIGENCY REQUEST
      </Typography>

      {successMessage && (
        <p className="text-green-500 mb-4 text-center">{successMessage}</p>
      )}
      {errorMessage && (
        <p className="text-red-500 mb-4 text-center">{errorMessage}</p>
      )}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block font-medium">Full Name</label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label className="block font-medium">Civil Status</label>
            <input
              type="text"
              name="civilStatus"
              value={formData.civilStatus}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
        </div>
        <div>
          <label className="block font-medium">Address</label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div>
          <label className="block font-medium">Income</label>
          <input
            type="number"
            name="income"
            value={formData.income}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div>
          <label className="block font-medium">Purpose</label>
          <textarea
            name="purpose"
            value={formData.purpose}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md"
          ></textarea>
        </div>

        <div className="text-center">
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-6 rounded-md hover:bg-blue-600"
          >
            Submit Request
          </button>
        </div>
      </form>
      <div className="mt-6 text-sm text-gray-500">
        <p className="uppercase font-bold">Special Note on the Dry Seal:</p>
        <ul className="list-disc pl-5">
          <li>Place the Dry Seal if available.</li>
          <li>
            If the Barangay has no Dry Seal, then leave the lower part of the
            Certificate empty.
          </li>
          <li>
            If the Certificate contains "Not Valid Without Seal," then the seal
            must be placed.
          </li>
          <li>
            If "Not Valid Without Seal" is present but no seal has been placed,
            then the Certificate is not valid and not accepted.
          </li>
        </ul>
      </div>
    </div>
  );
};

export default IndigencyForm;
