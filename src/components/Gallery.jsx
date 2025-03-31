import React from "react";
import { Typography } from "@material-tailwind/react";

export function Gallery() {
  const data = [
    { imgelink: "./src/assets/kap_clean.jpg" },
    { imgelink: "./src/assets/kap_event.jpg" },
    { imgelink: "./src/assets/kap_school.jpg" },
    { imgelink: "./src/assets/kap_curfew.jpg" },
    { imgelink: "./src/assets/kap_assembly.jpg" },
    { imgelink: "./src/assets/kap_ruding.jpg" },
  ];

  const [active, setActive] = React.useState("./src/assets/kap_ruding.jpg");

  return (
    <div className="flex flex-col items-center justify-center gap-8 p-6 py-20">
      {/* Header */}
      <div className="text-center">
        <Typography
          className="text-4xl font-extrabold text-gray-800 lg:text-6xl"
          as="h1"
        >
          GALLERY
        </Typography>
        <Typography
          variant="h2"
          className="bg-gradient-to-r from-blue-500 via-slate-500 to-blue-800 bg-clip-text text-3xl text-transparent lg:text-5xl"
        >
          BARANGAY SAN JUAN
        </Typography>
      </div>

      {/* Active Image Display */}
      <div className="relative w-full max-w-6xl">
        <img
          className="h-auto w-full max-w-full rounded-xl object-cover shadow-lg md:h-[480px]"
          src={active}
          alt="Active display"
        />
        <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity hover:opacity-100 bg-black/50">
          <Typography className="text-lg font-semibold text-white" as="h3">
            Click thumbnails to explore!
          </Typography>
        </div>
      </div>

      {/* Thumbnails */}
      <div className="grid w-full max-w-6xl grid-cols-2 gap-4 p-2 sm:grid-cols-3 lg:grid-cols-5">
        {data.map(({ imgelink }, index) => (
          <div key={index} className="relative">
            <img
              onClick={() => setActive(imgelink)}
              src={imgelink}
              className={`h-28 w-full cursor-pointer rounded-lg object-cover shadow-md transition-transform duration-300 hover:scale-105 hover:shadow-lg ${
                active === imgelink ? "ring-4 ring-blue-500" : ""
              }`}
              alt={`Gallery item ${index + 1}`}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
