import React, { useEffect, useRef, useState } from "react";

const FadeInSection = ({ children, className = "" }) => {
  const [isVisible, setVisible] = useState(false);
  const domRef = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // Toggles visibility based on scrolling up or down
          if (entry.isIntersecting) {
            setVisible(true);
          } else {
            setVisible(false);
          }
        });
      },
      {
        threshold: 0.2, // Triggers when 20% of the section is visible
      },
    );

    const current = domRef.current;
    if (current) observer.observe(current);

    return () => {
      if (current) observer.unobserve(current);
    };
  }, []);

  return (
    <div
      ref={domRef}
      className={`observe-section ${isVisible ? "is-visible" : ""} ${className}`}
    >
      {children}
    </div>
  );
};

export default FadeInSection;
