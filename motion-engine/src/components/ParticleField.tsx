import React, { useMemo } from "react";
import { useCurrentFrame } from "remotion";
import { COLOR_LIME, VIDEO_HEIGHT, VIDEO_WIDTH } from "../constants";

interface ParticleDef {
  xSeed: number;
  ySeed: number;
  size: number;
  speed: number;
  drift: number;
  opacity: number;
}

export const ParticleField: React.FC<{ count?: number }> = ({ count = 35 }) => {
  const frame = useCurrentFrame();

  // Generate deterministic seeds once
  const particles: ParticleDef[] = useMemo(() => {
    const list: ParticleDef[] = [];
    for (let i = 0; i < count; i++) {
      const pseudoRand1 = ((i * 137.5) % 1000) / 1000;
      const pseudoRand2 = ((i * 243.7 + 19) % 1000) / 1000;
      const pseudoRand3 = ((i * 381.1 + 47) % 1000) / 1000;
      const pseudoRand4 = ((i * 517.9 + 89) % 1000) / 1000;

      list.push({
        xSeed: pseudoRand1 * VIDEO_WIDTH,
        ySeed: pseudoRand2 * VIDEO_HEIGHT,
        size: 2 + pseudoRand3 * 4,
        speed: 1.2 + pseudoRand4 * 2.5,
        drift: Math.sin(i * 1.5) * 40,
        opacity: 0.2 + pseudoRand3 * 0.6,
      });
    }
    return list;
  }, [count]);

  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: VIDEO_WIDTH,
        height: VIDEO_HEIGHT,
        pointerEvents: "none",
      }}
    >
      {particles.map((p, idx) => {
        // Deterministic position over time
        const yPos = (p.ySeed - frame * p.speed + VIDEO_HEIGHT * 2) % VIDEO_HEIGHT;
        const xPos =
          p.xSeed + Math.sin(frame * 0.03 + idx) * p.drift;

        return (
          <div
            key={idx}
            style={{
              position: "absolute",
              top: yPos,
              left: xPos,
              width: p.size,
              height: p.size,
              borderRadius: "50%",
              backgroundColor: COLOR_LIME,
              opacity: p.opacity * (0.8 + 0.2 * Math.sin(frame * 0.1 + idx)),
              boxShadow: `0 0 ${p.size * 3}px ${COLOR_LIME}`,
            }}
          />
        );
      })}
    </div>
  );
};
