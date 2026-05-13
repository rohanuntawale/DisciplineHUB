import { motion } from "framer-motion";

export default function Footer() {
  return (
    <footer className="mt-12 text-center text-sm text-gray-400">
      <motion.svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-12">
        <motion.path
          d="M0,0 C300,100 900,0 1200,80 L1200,120 L0,120 Z"
          fill="currentColor"
          animate={{ y: [0, -6, 0] }}
          transition={{ repeat: Infinity, duration: 8 }}
        />
      </motion.svg>
      <p>Made with ❤️ for you both.</p>
    </footer>
  );
}
