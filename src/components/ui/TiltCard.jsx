import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';

export const TiltCard = ({
  children,
  className = '',
  maxRotation = 8,
  scaleOnHover = 1.02,
  style = {},
  onClick
}) => {
  const cardRef = useRef(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    // Normalize coordinates from -1 to 1
    const xPct = (mouseX / width) - 0.5;
    const yPct = (mouseY / height) - 0.5;

    setRotateX(-yPct * maxRotation * 2);
    setRotateY(xPct * maxRotation * 2);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      animate={{
        rotateX,
        rotateY,
      }}
      whileHover={{ scale: scaleOnHover }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      style={{
        transformStyle: 'preserve-3d',
        perspective: 1000,
        ...style
      }}
      className={`tilt-card-container ${className}`}
    >
      {children}
    </motion.div>
  );
};
