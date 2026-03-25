import React from 'react';
import { motion } from 'motion/react';

export const AnimatedDNA: React.FC = () => {
  const helixPoints = 20;
  const radius = 60;
  const centerX = 400;
  
  return (
    <div className="absolute inset-0 overflow-hidden opacity-15 pointer-events-none">
      <svg 
        width="100%" 
        height="100%" 
        viewBox="0 0 800 500" 
        preserveAspectRatio="xMidYMid slice"
        className="min-h-full min-w-full"
      >
        <defs>
          {/* Gradient for strands */}
          <linearGradient id="strand1" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#F9C4B5" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#F9C4B5" stopOpacity="0.3" />
          </linearGradient>
          <linearGradient id="strand2" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#8268AB" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#8268AB" stopOpacity="0.3" />
          </linearGradient>
        </defs>
        
        {/* Animated DNA Helix */}
        {[...Array(helixPoints)].map((_, i) => {
          const angle = (i / helixPoints) * Math.PI * 4;
          const y = (i / helixPoints) * 500;
          
          // Left strand point
          const x1 = centerX + Math.cos(angle) * radius;
          // Right strand point
          const x2 = centerX + Math.cos(angle + Math.PI) * radius;
          
          return (
            <motion.g
              key={i}
              initial={{ opacity: 0, y: -50 }}
              animate={{ 
                opacity: [0, 1, 1, 0],
                y: [-50, y, y + 50, y + 100]
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.2
              }}
            >
              {/* Left strand sphere */}
              <motion.circle
                cx={x1}
                cy={0}
                r="8"
                fill="url(#strand1)"
                animate={{
                  scale: [1, 1.2, 1]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: i * 0.2
                }}
              />
              
              {/* Right strand sphere */}
              <motion.circle
                cx={x2}
                cy={0}
                r="8"
                fill="url(#strand2)"
                animate={{
                  scale: [1, 1.2, 1]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: i * 0.2 + 0.5
                }}
              />
              
              {/* Connecting line - only show when strands are close */}
              {Math.abs(Math.cos(angle)) < 0.3 && (
                <motion.line
                  x1={x1}
                  y1={0}
                  x2={x2}
                  y2={0}
                  stroke="#BFADD5"
                  strokeWidth="3"
                  strokeOpacity="0.6"
                  animate={{
                    strokeOpacity: [0.3, 0.8, 0.3]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: i * 0.2
                  }}
                />
              )}
            </motion.g>
          );
        })}
        
        {/* Continuous flowing strands */}
        <motion.path
          d={`M ${centerX - radius} 0 Q ${centerX} 125 ${centerX + radius} 250 T ${centerX - radius} 500`}
          stroke="#F9C4B5"
          strokeWidth="4"
          fill="none"
          strokeOpacity="0.3"
          animate={{
            pathLength: [0, 1],
            opacity: [0.2, 0.5, 0.2]
          }}
          transition={{
            pathLength: { duration: 3, repeat: Infinity, ease: "linear" },
            opacity: { duration: 3, repeat: Infinity, ease: "easeInOut" }
          }}
        />
        
        <motion.path
          d={`M ${centerX + radius} 0 Q ${centerX} 125 ${centerX - radius} 250 T ${centerX + radius} 500`}
          stroke="#8268AB"
          strokeWidth="4"
          fill="none"
          strokeOpacity="0.3"
          animate={{
            pathLength: [0, 1],
            opacity: [0.2, 0.5, 0.2]
          }}
          transition={{
            pathLength: { duration: 3, repeat: Infinity, ease: "linear", delay: 0.5 },
            opacity: { duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.5 }
          }}
        />
      </svg>
    </div>
  );
};
