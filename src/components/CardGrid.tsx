// CardGrid.tsx
import { motion, HTMLMotionProps, Variants } from "framer-motion";
import { Children, ReactNode } from "react";

interface CardGridProps extends Omit<HTMLMotionProps<"section">, "ref"> {
  children?: ReactNode;
  staggerDelay?: number; // optional stagger delay
}

const CardGrid: React.FC<CardGridProps> = ({ children, staggerDelay = 0.15, ...props }) => {
  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 40, scale: 0.85 },
    visible: { opacity: 1, y: 0, scale: 1 },
  };

  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: staggerDelay,
      },
    },
  };

  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, amount: 0.2 }}
      variants={containerVariants}
      className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 relative"
      {...props}
    >
      {Children.map(children, (child, index) => (
        <motion.div
          key={index}
          variants={cardVariants}
          transition={{ type: "spring", stiffness: 120, damping: 20 }}
          className="w-full"
        >
          {child}
        </motion.div>
      ))}
    </motion.section>
  );
};

export default CardGrid;
