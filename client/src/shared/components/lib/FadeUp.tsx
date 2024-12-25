'use client';

import { useRef } from 'react';
import { motion, useInView } from 'motion/react';

//##########################################################################################
// FADE UP TYPES
//##########################################################################################
type FadeUpProps = {
  delay?: number;
  duration?: number;
  children?: React.ReactNode;
};

//##########################################################################################
// FADE UP COMPONENT
//##########################################################################################
export const FadeUp: React.FC<FadeUpProps> = ({
  delay,
  duration,
  children,
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      variants={{
        hidden: { opacity: 0, y: 15 },
        visible: { opacity: 1, y: 0 },
      }}
      initial='hidden'
      animate={isInView ? 'visible' : 'hidden'}
      transition={{ delay, type: 'spring', duration: duration || 0.5 }}
    >
      {children}
    </motion.div>
  );
};

export default FadeUp;
