import React from "react";
import { motion } from "framer-motion";
import { Card, CardBody, Avatar, Typography } from "@material-tailwind/react";

// Animation Variants
const cardVariants = {
  offscreen: { opacity: 0, y: 50 },
  onscreen: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const sectionVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 1 } },
};

function TeamCard({ img, name, title }) {
  return (
    <motion.div
      variants={cardVariants}
      initial="offscreen"
      whileInView="onscreen"
      viewport={{ once: true, amount: 0.5 }}
    >
      <Card className="rounded-lg bg-white shadow-md transition-transform transform hover:scale-105 hover:shadow-lg">
        <CardBody className="text-center p-4">
          <Avatar
            src={img}
            alt={name}
            variant="circular"
            size="xl"
            className="mx-auto mb-4 object-cover rounded-full border-2 border-gray-200"
          />
          <Typography
            variant="h5"
            className="font-semibold text-gray-800 text-lg mb-1"
          >
            {name}
          </Typography>
          <Typography className="text-gray-600 text-sm font-medium mb-2">
            {title}
          </Typography>
        </CardBody>
      </Card>
    </motion.div>
  );
}

const members = [
  {
    img: "./src/assets/HON4.png",
    name: "Hon. Michael M. Ruegas",
    title: "BARANGAY COUNCILOR",
  },
  {
    img: "./src/assets/HON1.png",
    name: "Hon. Fredito T. Tengco",
    title: "BARANGAY COUNCILOR",
  },
  {
    img: "./src/assets/HON6.png",
    name: "Hon. Jessie L. Crisostomo",
    title: "BARANGAY COUNCILOR",
  },
  {
    img: "./src/assets/HON5.png",
    name: "Hon. Ardie P. Bondoc",
    title: "BARANGAY COUNCILOR",
  },
  {
    img: "./src/assets/HON3.png",
    name: "Hon. Arlene L. Atienza",
    title: "BARANGAY COUNCILOR",
  },
  {
    img: "./src/assets/HON2.png",
    name: "Hon. Dante C. Dizon",
    title: "BARANGAY COUNCILOR",
  },
];

export function About() {
  return (
    <motion.section
      className="min-h-screen py-12 px-8 bg-gray-50"
      variants={sectionVariants}
      initial="initial"
      animate="animate"
    >
      <div className="container mx-auto py-20">
        <div className="text-center mb-12">
          <Typography
            variant="h2"
            className="text-4xl font-extrabold text-gray-800 lg:text-6xl"
          >
            ABOUT
          </Typography>
          <Typography
            variant="h1"
            className="bg-gradient-to-r from-blue-500 via-slate-500 to-blue-800 bg-clip-text text-3xl font-light tracking-tight text-transparent lg:text-5xl"
          >
            BARANGAY COUNCILORS
          </Typography>
        </div>
        <motion.div
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
          initial="initial"
          animate="animate"
          viewport={{ once: true }}
        >
          {members.map((props, key) => (
            <TeamCard key={key} {...props} />
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
}

export default About;
