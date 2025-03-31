import { FaInstagram, FaGoogle, FaFacebook } from "react-icons/fa6";
import logo from "../assets/sanjuan-logo.png";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Define a custom marker icon for better display on Leaflet
const customMarker = new L.Icon({
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

const Footer = () => {
  const socialLinks = [
    { label: "Facebook", icon: FaFacebook },
    { label: "Instagram", icon: FaInstagram },
    { label: "Google", icon: FaGoogle },
  ];

  return (
    <div className="app min-h-screen flex items-end justify-center font-poppins">
      <div className="py-16 grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-2 grid-cols-1 bg-blue-500 text-white w-full p-4 relative">
        {/* Logo and Info Section */}
        <div className="mb-6">
          <div className="footer-img flex items-center">
            <img src={logo} alt="San Juan Logo" className="w-16 h-auto" />
            <span className="text-3xl font-bold pl-2 text-white">
              San Juan Mexico
            </span>
          </div>
          <div className="infos text-gray-400 mt-2">
            <span>Copyright © 2024 GROUP HUG.</span>
            <span>All rights reserved</span>
          </div>
          <div className="footer-icons flex items-center space-x-3 mt-3">
            {socialLinks.map((socialLink, index) => {
              const Icon = socialLink.icon;
              return (
                <Icon
                  key={`social-${index}`}
                  className="w-14 h-14 p-2 rounded-full bg-blue-500 hover:bg-white hover:text-blue-300 cursor-pointer"
                />
              );
            })}
          </div>
        </div>

        {/* Office Hours, Address, and Contact Section */}
        <div className="mb-6 text-gray-200">
          <div>
            <h4 className="font-bold">OFFICE HOURS:</h4>
            <p>Monday - Friday</p>
            <p>08:00AM - 05:00PM</p>
          </div>
          <div className="mt-4">
            <h4 className="font-bold">ADDRESS:</h4>
            <p>Barangay Hall,</p>
            <p>San Juan, Mexico</p>
          </div>
          <div className="mt-4">
            <h4 className="font-bold">CONTACT:</h4>
            <p>mexico@gmail.com</p>
          </div>
        </div>

        {/* Leaflet Map Section */}
        <div className="flex justify-center items-center">
          <MapContainer
            center={[15.1268745, 120.703379]}
            zoom={12} // Lower zoom level to zoom out
            style={{ width: "80%", height: "200px" }}
            className="rounded-lg"
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            <Marker position={[15.1268745, 120.703379]} icon={customMarker}>
              <Popup>San Juan, Mexico, Pampanga</Popup>
            </Marker>
          </MapContainer>
        </div>
      </div>
    </div>
  );
};

export default Footer;
