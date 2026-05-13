import { FC, ReactNode } from "react";
import { motion } from "framer-motion";

type Props = {
  title: string;
  owner: "me" | "gf";
  children?: ReactNode;
  bgImage?: string;
};

export const Card: FC<Props> = ({ title, owner, children, bgImage }) => {
  const ownerColor = owner === "me" ? "bg-indigo-600" : "bg-pink-600";

  return (
    <motion.div
      whileHover={{ y: -6, rotate: -1, scale: 1.02 }}
      className="relative rounded-xl shadow-xl overflow-hidden p-4 bg-white/90 text-gray-900 dark:bg-gray-800 dark:text-gray-100"
    >
      {bgImage && (
        <img
          src={bgImage}
          alt=""
          className="absolute inset-0 w-full h-full object-cover opacity-10 pointer-events-none"
        />
      )}
      <div className="flex items-center mb-2 relative">
        <span className={`px-2 py-0.5 rounded text-xs text-white ${ownerColor}`}>
          {owner === "me" ? "You" : "GF"}
        </span>
        <h3 className="ml-2 font-semibold">{title}</h3>
      </div>
      <div className="relative">{children}</div>
    </motion.div>
  );
};
