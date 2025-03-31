import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import { Typography } from "@material-tailwind/react";

const Announcement = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedAnnouncement, setSelectedAnnouncement] = useState(null);

  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "announcement"));
        const announcementList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setAnnouncements(announcementList);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAnnouncements();
  }, []);

  const handleAnnouncementClick = (announcement) => {
    setSelectedAnnouncement(announcement);
  };

  const closeModal = () => {
    setSelectedAnnouncement(null);
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen py-20">
      <Typography className="pb-1 tracking-tight lg:mt-16  text-center mx-auto text-4xl font-extrabold text-gray-800 lg:text-6xl">
        NEWS
      </Typography>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {announcements.map(({ id, text, image, timestamp }) => (
          <div
            key={id}
            className="bg-white shadow rounded-lg p-4 cursor-pointer hover:shadow-lg transition-shadow"
            onClick={() =>
              handleAnnouncementClick({ id, text, image, timestamp })
            }
          >
            {image && (
              <img
                src={image}
                alt="Announcement"
                className="w-full h-48 object-cover rounded-md mb-4"
              />
            )}
            {text && <p className="text-gray-600">{text}</p>}
            <p className="text-sm text-gray-400 mt-4">
              {timestamp
                ? new Date(timestamp.seconds * 1000).toLocaleString()
                : "No date available"}
            </p>
          </div>
        ))}
      </div>

      {selectedAnnouncement && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg p-6 max-w-lg w-full relative">
            <button
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
              onClick={closeModal}
            >
              &times;
            </button>
            {selectedAnnouncement.image && (
              <img
                src={selectedAnnouncement.image}
                alt="Announcement"
                className="w-full h-64 object-cover rounded-md mb-4"
              />
            )}
            {selectedAnnouncement.text && (
              <p className="text-gray-800 text-lg">
                {selectedAnnouncement.text}
              </p>
            )}
            <p className="text-sm text-gray-400 mt-4">
              {selectedAnnouncement.timestamp
                ? new Date(
                    selectedAnnouncement.timestamp.seconds * 1000
                  ).toLocaleString()
                : "No date available"}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Announcement;
