import React, { useState, useEffect } from 'react';

interface CounterProps {
  end: number;
  label: string;
  duration?: number;
}

export default function Counter({ end, label, duration = 2000 }: CounterProps) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime: number | null = null;
    let animationFrameId: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      const percentage = Math.min(progress / duration, 1);
      
      setCount(Math.floor(end * percentage));

      if (percentage < 1) {
        animationFrameId = requestAnimationFrame(animate);
      }
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [end, duration]);

  return (
    <div className="text-center">
      <div className="text-4xl font-bold text-blue-600 mb-2">{count}</div>
      <div className="text-gray-600">{label}</div>
    </div>
  );
}