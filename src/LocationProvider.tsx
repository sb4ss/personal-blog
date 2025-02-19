import { AnimatePresence } from "motion/react";
import { ReactNode } from "react";

function LocationProvider({ children }: { children: ReactNode }) {
  return <AnimatePresence>{children}</AnimatePresence>;
}

export default LocationProvider;
