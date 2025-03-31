import profilePic from "../assets/jerry.png";
import { delay, motion } from "framer-motion";

const container = (delay) => ({
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: delay },
  },
});

// Use the container animation in your Hero component
<motion.h1
  variants={container(0.5)}
  initial="hidden"
  animate="visible"
  className="pb-16 text-6xl font-thin tracking-tight lg:mt-16 lg:text-8xl"
>
  Hon. Jerry Pineda
</motion.h1>;

const Hero = () => {
  return (
    <div className="border-b border-blue-400 pb-4 lg: mb-35 scroll-smooth py-20">
      <div className="flex flex-wrap">
        <div className="w-full lg:w-1/2 p-6">
          <div className="flex flex-col items-center lg:items-start">
            <motion.h1
              variants={container(0.5)}
              initial="hidden"
              animate="visible"
              className="pb-16 text-6xl font-thin tracking-tight lg:mt-16  lg:text-8xl"
            >
              Hon. Jerry Pineda
            </motion.h1>
            <motion.span
              variants={container(0.5)}
              initial="hidden"
              animate="visible"
              className="bg-gradient-to-r from-blue-500 via-slate-500 to-blue-800 bg-clip-text text-4xl tracking-tight text-transparent"
            >
              BARANGAY CAPTAIN
            </motion.span>
            <motion.p
              variants={container(1)}
              initial="hidden"
              animate="visible"
              className="my-2 max-w-xl py-6 font-light tracking-tighter text-2xl"
            >
              Good day! As your Barangay Captain of San Juan, I am committed to
              improving our community by focusing on health, safety, education,
              jobs, and the environment. Together, with your support, we can
              make Barangay San Juan a safer, cleaner, and more progressive
              place for everyone.
            </motion.p>
          </div>
        </div>
        <div className="w-full lg:w-1/2 lg:p-8">
          <motion.div
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 1, dealy: 1.2 }}
            className="flex justify-center bg-gradient-to-r from-cyan-100 to-blue-100 rounded-xl"
          >
            <img src={profilePic} alt="Hon. Jerry Pineda" />
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
