import React, { useState, useEffect } from "react";
import { collection, getDocs, addDoc } from "firebase/firestore";
import { db } from "../firebase";
import { jsPDF } from "jspdf";
import { useLocation, Link } from "react-router-dom";
import { FaPlus, FaPrint, FaFileUpload } from "react-icons/fa";
import { Typography } from "@material-tailwind/react";

import { img } from "framer-motion/client";

const Dashboard = () => {
  const [users, setUsers] = useState([]);
  const [indigencyRequests, setIndigencyRequests] = useState([]);
  const [clearanceRequests, setClearanceRequests] = useState([]);
  const [announcements, setAnnouncements] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeSection, setActiveSection] = useState("users");
  const [newAnnouncement, setNewAnnouncement] = useState({
    text: "",
    image: null,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const usersSnapshot = await getDocs(collection(db, "users"));
        const indigencySnapshot = await getDocs(collection(db, "indigency"));
        const clearanceSnapshot = await getDocs(collection(db, "clearance"));
        const announcementsSnapshot = await getDocs(
          collection(db, "announcement")
        );

        setUsers(
          usersSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
        );
        setIndigencyRequests(
          indigencySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
        );
        setClearanceRequests(
          clearanceSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
        );
        setAnnouncements(
          announcementsSnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }))
        );
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleAnnouncementSubmit = async (e) => {
    e.preventDefault();
    if (!newAnnouncement.text && !newAnnouncement.image) {
      alert("Enter Text or Upload Image");
      return;
    }
    try {
      const announcementData = {
        text: newAnnouncement.text,
        image: newAnnouncement.image ? newAnnouncement.image : null,
        timestamp: new Date(),
      };
      await addDoc(collection(db, "announcement"), announcementData);
      setAnnouncements((prev) => [...prev, announcementData]);
      setNewAnnouncement({ text: "", image: null });
    } catch (err) {
      alert("Error adding announcement: " + err.message);
    }
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewAnnouncement((prev) => ({ ...prev, image: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePrintPDF = (request, type) => {
    const doc = new jsPDF();
    const today = new Date();
    const currentYear = today.getFullYear();

    doc.setFont("timesnewroman", "bold");
    doc.setFontSize(16);

    doc.text("Republic of the Philippines", 105, 14, { align: "center" });
    doc.text("Province of Pampanga", 105, 20, { align: "center" });
    doc.text("Municipality of Mexico", 105, 26, { align: "center" });
    doc.text("Barangay San Juan", 105, 32, { align: "center" });

    doc.text(
      "_______________________________________________________________________________________________",
      105,
      40,
      {
        align: "center",
      }
    );

    doc.setFont("timesnewroman", "bold");
    doc.setFontSize(12);
    doc.text(`TO WHOM IT MAY CONCERN:`, 20, 52);

    if (type === "indigency") {
      doc.text(
        `This is to certify that Mr./Ms. ${request.fullName}, residing at ${request.address},`,
        20,
        68
      );
      doc.text(
        `is among the indigent families of Barangay ${
          request.barangay || "San Juan"
        }. Their annual income`,
        20,
        78
      );
      doc.text(
        `does not exceed Php 169,824.00, as determined by the National Economic Development Authority.`,
        20,
        84
      );
      doc.text(
        `This certificate is issued upon the request of the individual for the purpose of:`,
        20,
        100
      );
      doc.text(`${request.purpose}.`, 20, 110);
    } else if (type === "clearance") {
      doc.text(
        `This is to certify that Mr./Ms. ${request.fullName}, residing at ${request.address},`,
        20,
        58
      );
      doc.text(
        `has been granted Barangay Clearance for the purpose of ${request.purpose}.`,
        20,
        66
      );
    }

    doc.text(
      `Issued this ______ day of ______, ${currentYear}. at Barangay San Juan.`,
      20,
      130
    );

    doc.setFont("helvetica", "bold");
    doc.text(`_________________________`, 20, 150);
    doc.text("Signature of Barangay Captain", 20, 155);

    const fileName =
      type === "indigency"
        ? `${request.fullName}-Certificate-of-Indigency.pdf`
        : `${request.fullName}-Barangay-Clearance.pdf`;

    doc.save(fileName);
  };

  const formatValue = (key, value) => {
    if (key === "location" && value && value.latitude && value.longitude) {
      return (
        <a
          href={`https://www.google.com/maps?q=${value.latitude},${value.longitude}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 underline"
        >
          View on Map
        </a>
      );
    }
    if (typeof value === "object" && value !== null) {
      return JSON.stringify(value, null, 2);
    }
    return value || "N/A";
  };

  const reorderedKeys = [
    "name",
    ...Object.keys(users[0] || {}).filter(
      (key) => key !== "name" && key !== "id"
    ),
    "id",
  ];

  const filteredUsers = users.filter((user) =>
    JSON.stringify(user).toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredIndigencyRequests = indigencyRequests.filter((req) =>
    JSON.stringify(req).toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredClearanceRequests = clearanceRequests.filter((req) =>
    JSON.stringify(req).toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-blue-600 text-white p-4 shadow-lg">
        <h2 className="text-3xl my-4">Dashboard</h2>
        <ul>
          <li
            className={`mb-4 cursor-pointer text-2xl ${
              activeSection === "users" ? "font-bold" : ""
            }`}
            onClick={() => setActiveSection("users")}
          >
            Users
          </li>
          <li
            className={`mb-4 cursor-pointer text-2xl ${
              activeSection === "requests" ? "font-bold" : ""
            }`}
            onClick={() => setActiveSection("requests")}
          >
            Document Requests
          </li>
          <li
            className={`mb-4 cursor-pointer text-2xl ${
              activeSection === "announcements" ? "font-bold" : ""
            }`}
            onClick={() => setActiveSection("announcements")}
          >
            Announcements
          </li>
          <Link
            to="/adminsignup"
            className="text-white bg-gradient-to-r from-gray-500 via-gray-600 to-gray-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:white dark:focus:whitefont-medium rounded-lg text-sm px-5 py-2.5 mx-4"
          >
            Admin Sign-Up
          </Link>
        </ul>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        <h1 className="text-2xl font-bold mb-4">
          {activeSection === "users" ? "Users" : "Search..."}
        </h1>

        <div className="mb-4">
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="p-2 border border-gray-300 rounded-md w-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {loading && <p className="text-gray-500">Loading...</p>}
        {error && <p className="text-red-500">{error}</p>}

        {activeSection === "users" && (
          <div className="bg-white shadow-lg rounded-lg p-4">
            {/* User Table */}
            <Typography
              className="text-4xl font-extrabold text-gray-800 lg:text-6xl"
              as="h1"
            >
              USERS
            </Typography>
            {filteredUsers.length > 0 ? (
              <table className="min-w-full table-auto border-collapse border border-gray-200">
                <thead>
                  <tr className="bg-gray-50">
                    {reorderedKeys.map((key) => (
                      <th
                        key={key}
                        className="px-4 py-2 text-left text-gray-700 capitalize"
                      >
                        {key}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.map((user) => (
                    <tr
                      key={user.id}
                      className="border-t border-gray-200 hover:bg-gray-100 transition duration-200"
                    >
                      {reorderedKeys.map((key) => (
                        <td key={key} className="px-4 py-2">
                          {formatValue(key, user[key])}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              !loading && <p>No users found.</p>
            )}
          </div>
        )}

        {activeSection === "requests" && (
          <div>
            {/* Clearance Requests */}
            <Typography
              className="text-4xl font-extrabold text-gray-800 lg:text-6xl"
              as="h1"
            >
              Barangay Clearance
            </Typography>
            <div className="bg-white shadow-lg rounded-lg mb-8 p-4">
              {filteredClearanceRequests.length > 0 ? (
                <table className="min-w-full table-auto border-collapse border border-gray-200">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="px-4 py-2 text-left">Name</th>
                      <th className="px-4 py-2 text-left">Address</th>
                      <th className="px-4 py-2 text-left">Purpose</th>
                      <th className="px-4 py-2 text-left">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredClearanceRequests.map((request) => (
                      <tr
                        key={request.id}
                        className="border-t border-gray-200 hover:bg-gray-100 transition duration-200"
                      >
                        <td className="px-4 py-2">{request.fullName}</td>
                        <td className="px-4 py-2">{request.address}</td>
                        <td className="px-4 py-2">{request.purpose}</td>
                        <td className="px-4 py-2">
                          <button
                            onClick={() => handlePrintPDF(request, "clearance")}
                            className="bg-blue-500 text-white px-2 py-1 rounded-md flex items-center"
                          >
                            <FaPrint className="mr-1" /> Print
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <p>No clearance requests found.</p>
              )}
            </div>

            {/* Indigency Requests */}
            <Typography
              className="text-4xl font-extrabold text-gray-800 lg:text-6xl"
              as="h1"
            >
              Barangay Indigency
            </Typography>
            <div className="bg-white shadow-lg rounded-lg p-4">
              {filteredIndigencyRequests.length > 0 ? (
                <table className="min-w-full table-auto border-collapse border border-gray-200">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="px-4 py-2 text-left">Name</th>
                      <th className="px-4 py-2 text-left">Address</th>
                      <th className="px-4 py-2 text-left">Purpose</th>
                      <th className="px-4 py-2 text-left">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredIndigencyRequests.map((request) => (
                      <tr
                        key={request.id}
                        className="border-t border-gray-200 hover:bg-gray-100 transition ```jsx
                        duration-200"
                      >
                        <td className="px-4 py-2">{request.fullName}</td>
                        <td className="px-4 py-2">{request.address}</td>
                        <td className="px-4 py-2">{request.purpose}</td>
                        <td className="px-4 py-2">
                          <button
                            onClick={() => handlePrintPDF(request, "indigency")}
                            className="bg-green-500 text-white px-2 py-1 rounded-md flex items-center"
                          >
                            <FaPrint className="mr-1" /> Print
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <p>No indigency requests found.</p>
              )}
            </div>
          </div>
        )}

        {activeSection === "announcements" && (
          <div>
            <Typography
              className="text-4xl font-extrabold text-gray-800 lg:text-6xl"
              as="h1"
            >
              Announcements
            </Typography>

            <form onSubmit={handleAnnouncementSubmit} className="mb-6">
              <textarea
                placeholder="Description"
                value={newAnnouncement.text}
                onChange={(e) =>
                  setNewAnnouncement({
                    ...newAnnouncement,
                    text: e.target.value,
                  })
                }
                className="w-full p-2 border border-gray-300 rounded-md mb-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input type="file" onChange={handleFileUpload} className="mb-2" />
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded-md flex items-center"
              >
                <FaPlus className="mr-1" /> Post Announcement
              </button>
            </form>

            <div className="bg-white shadow-lg rounded-lg p-4">
              {announcements.length > 0 ? (
                announcements.map((announcement, idx) => (
                  <div key={idx} className="mb-4 border-b pb-4">
                    {announcement.text && <p>{announcement.text}</p>}
                    {announcement.image && (
                      <img
                        src={announcement.image}
                        alt="Announcement"
                        className="w-full h-auto mt-2 rounded-md"
                      />
                    )}
                    <small className="text-gray-500">
                      Posted on{" "}
                      {new Date(announcement.timestamp).toLocaleString()}
                    </small>
                  </div>
                ))
              ) : (
                <p>No announcements yet.</p>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Dashboard;
