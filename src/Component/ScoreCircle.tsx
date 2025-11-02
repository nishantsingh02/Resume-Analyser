import { useEffect, useRef } from 'react';
import { motion, animate } from 'framer-motion';

// Define the props type
type ScoreCircleProps = {
  score?: number;
};

const ScoreCircle = ({ score = 75 }: ScoreCircleProps) => {
  const radius = 40;
  const stroke = 8;
  const normalizedRadius = radius - stroke / 2;
  const circumference = 2 * Math.PI * normalizedRadius;
  
  // Calculate the progress (0 to 1)
  const progress = score / 100;
  
  // Calculate the dash offset for the SVG
  const strokeDashoffset = circumference * (1 - progress);
  
  // Ref for the text element to animate its content
  const scoreRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const node = scoreRef.current;
    
    // Animate the text content from 0 to the target score
    const controls = animate(0, score, {
      duration: 1.5,
      ease: [0.17, 0.55, 0.55, 1], // A nice ease-out curve
      onUpdate(value) {
        // Update the text content of the span
        if (node) {
          node.textContent = Math.round(value).toString();
        }
      },
    });

    // Cleanup function
    return () => controls.stop();
  }, [score]); // Re-run animation if the score changes

  return (
    <motion.div
      className="relative w-[100px] h-[100px] drop-shadow-[0_4px_10px_rgba(110,7,243,0.3)]"
      // Add a springy hover effect
      whileHover={{ scale: 1.05 }}
      transition={{ type: 'spring', stiffness: 300, damping: 15 }}
    >
      <svg
        height="100%"
        width="100%"
        viewBox="0 0 100 100"
        className="transform -rotate-90"
      >
        {/* New Gradient Definition */}
        <defs>
          <linearGradient id="cool-grad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#8E2DE2" />
            <stop offset="100%" stopColor="#4A00E0" />
          </linearGradient>
        </defs>

        {/* Background circle */}
        <circle
          cx="50"
          cy="50"
          r={normalizedRadius}
          stroke="#e5e7eb" // Tailwind's gray-200
          strokeWidth={stroke}
          fill="transparent"
        />

        {/* Foreground (progress) circle */}
        <motion.circle
          cx="50"
          cy="50"
          r={normalizedRadius}
          stroke="url(#cool-grad)"
          strokeWidth={stroke}
          fill="transparent"
          strokeLinecap="round"
          strokeDasharray={circumference}
          // Animate the strokeDashoffset from full circumference (empty) to the target value
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset }}
          transition={{
            duration: 1.5,
            ease: [0.17, 0.55, 0.55, 1], // Match the text animation ease
          }}
        />
      </svg>

      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <div className="flex items-baseline space-x-0.5">
          <span
            ref={scoreRef}
            className="text-3xl font-bold text-slate-800"
          >
            0
          </span>
          <span className="text-base font-medium text-slate-500"></span>
        </div>
      </div>
    </motion.div>
  );
};

export default ScoreCircle;