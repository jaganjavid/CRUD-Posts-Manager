import { motion } from "framer-motion";
import { useState } from "react";

const menuVariants = {
  closed: { scale: 0, opacity: 0 },
  open: { scale: 1, opacity: 1 },
};

const itemVariants = {
  closed: { x: -50, opacity: 0 },
  open: { x: 0, opacity: 1 },
};

export default function MenuReveal() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div style={{ position: "relative", width: 100, height: 100 }}>
      <motion.div
        style={{
          width: 50,
          height: 50,
          backgroundColor: "#FF5733",
          borderRadius: "50%",
          position: "absolute",
          top: 0,
          left: 0,
          cursor: "pointer",
        }}
        onClick={() => setIsOpen(!isOpen)}
      />
      <motion.div
        initial="closed"
        animate={isOpen ? "open" : "closed"}
        variants={menuVariants}
        transition={{ duration: 0.5 }}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: 100,
          height: 100,
          backgroundColor: "#33A1FF",
          borderRadius: "50%",
        }}
      >
        {["Item 1", "Item 2", "Item 3"].map((item, i) => (
          <motion.div
            key={i}
            variants={itemVariants}
            transition={{ delay: 0.3 + i * 0.2 }}
            style={{ marginBottom: 10, color: "#fff" }}
          >
            {item}
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
}
