
import { MotionProps } from 'framer-motion';

// Fade in animation variants
export const fadeIn = (direction: 'up' | 'down' | 'left' | 'right' = 'up', delay: number = 0): MotionProps => {
  const directions = {
    up: { y: 40 },
    down: { y: -40 },
    left: { x: 40 },
    right: { x: -40 }
  };
  
  return {
    initial: {
      ...directions[direction],
      opacity: 0
    },
    animate: {
      x: 0,
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
        delay
      }
    }
  };
};

// Stagger children animation variants
export const staggerContainer = (staggerChildren: number = 0.1, delayChildren: number = 0): MotionProps => {
  return {
    initial: {},
    animate: {
      transition: {
        staggerChildren,
        delayChildren
      }
    }
  };
};

// Scale animation variants
export const scaleVariants = (delay: number = 0): MotionProps => {
  return {
    initial: { scale: 0.8, opacity: 0 },
    animate: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
        delay
      }
    }
  };
};

// Text animation with staggered children
export const textContainer = {
  initial: {
    opacity: 0
  },
  animate: (i = 1) => ({
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: i * 0.1 }
  })
};

export const textVariant = (delay: number = 0) => {
  return {
    initial: {
      y: 20,
      opacity: 0
    },
    animate: {
      y: 0,
      opacity: 1,
      transition: {
        type: "tween",
        ease: "easeInOut",
        duration: 0.5,
        delay
      }
    }
  };
};

// Slide in animation for modals or panels
export const slideIn = (direction: 'up' | 'down' | 'left' | 'right', type: string, delay: number, duration: number): MotionProps => {
  const directionValues = {
    up: { y: '100%' },
    down: { y: '-100%' },
    left: { x: '100%' },
    right: { x: '-100%' }
  };

  return {
    initial: directionValues[direction],
    animate: {
      x: 0,
      y: 0,
      transition: {
        type,
        delay,
        duration,
        ease: 'easeOut'
      }
    }
  };
};

// Zoom in animation
export const zoomIn = (delay: number, duration: number): MotionProps => {
  return {
    initial: {
      scale: 0,
      opacity: 0
    },
    animate: {
      scale: 1,
      opacity: 1,
      transition: {
        type: 'tween',
        delay,
        duration,
        ease: 'easeOut'
      }
    }
  };
};
