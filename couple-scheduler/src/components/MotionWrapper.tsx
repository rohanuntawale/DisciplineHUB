import { FC, ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/router";

type Props = { children: ReactNode };

export const MotionWrapper: FC<Props> = ({ children }) => {
  const { route } = useRouter();
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={route}
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0, transition: { duration: 0.4 } }}
        exit={{ opacity: 0, x: -30, transition: { duration: 0.3 } }}
        className="min-h-screen"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};
