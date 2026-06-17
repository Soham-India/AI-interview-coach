import React, { useState, useEffect } from "react";

const ParticleBackground = ({ count = 100 }) => {
  const [particles, setParticles] = useState([]);

  // Generate the particle field exactly once when the component mounts
  useEffect(() => {
    const generatedParticles = Array.from({ length: count }).map(() => ({
      id: Math.random().toString(36).substr(2, 9),
      size: Math.random() * 2 + 1,
      left: Math.random() * 100,
      top: -(Math.random() * 100),
      duration: Math.random() * 10 + 10,
      delay: Math.random() * 10,
    }));
    setParticles(generatedParticles);
  }, [count]);

  return (
    <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_center,#0a121f_0%,#050b14_100%)] overflow-hidden pointer-events-none select-none">
      {particles.map((p) => (
        <div
          key={p.id}
          className="particle-element"
          style={{
            width: `${p.size}px`,
            height: `${p.size}px`,
            left: `${p.left}vw`,
            top: `${p.top}vh`,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
          }}
        />
      ))}
    </div>
  );
};

export default ParticleBackground;