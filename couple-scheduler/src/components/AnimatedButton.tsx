import { motion } from "framer-motion";

type Props = {
  onClick: () => void;
  children: React.ReactNode;
  variant?: "primary" | "secondary";
};

export default function AnimatedButton({ onClick, children, variant = "primary" }: Props) {
  const cls =
    variant === "primary"
      ? "bg-indigo-600 hover:bg-indigo-500"
      : "bg-gray-700 hover:bg-gray-600";

  return (
    <motion.button
      whileTap={{ scale: 0.92 }}
      whileHover={{ scale: 1.05, boxShadow: "0px 0px 8px rgb(99,102,241)" }}
      onClick={onClick}
      className={`px-4 py-2 rounded text-white transition ${cls}`}
      type="button"
    >
      {children}
    </motion.button>
  );
}
