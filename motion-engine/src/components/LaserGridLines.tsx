import React from "react";
import { useCurrentFrame, interpolate, Easing } from "remotion";
import { COLOR_LIME, VIDEO_HEIGHT, VIDEO_WIDTH } from "../constants";

export const LaserGridLines: React.FC<{ progress: number }> = ({ progress }) => {
  const frame = useCurrentFrame();

  // Progress is normalized 0 to 1
  const line1Length = 1000;
  const lineOffset1 = interpolate(progress, [0, 1], [line1Length, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  const line2Length = 800;
  const lineOffset2 = interpolate(progress, [0.2, 1], [line2Length, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  return (
    <svg
      width={VIDEO_WIDTH}
      height={VIDEO_HEIGHT}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        pointerEvents: "none",
      }}
    >
      <defs>
        <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="4" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Horizontal Assembling Laser Line */}
      <line
        x1={60}
        y1={860}
        x2={1020}
        y2={860}
        stroke={COLOR_LIME}
        strokeWidth="2"
        strokeDasharray={line1Length}
        strokeDashoffset={lineOffset1}
        filter="url(#glow)"
        opacity={0.8}
      />

      {/* Cross Diagonal Laser Line */}
      <line
        x1={60}
        y1={1060}
        x2={1020}
        y2={1060}
        stroke="rgba(255, 255, 255, 0.3)"
        strokeWidth="1.5"
        strokeDasharray={line2Length}
        strokeDashoffset={lineOffset2}
      />

      {/* Small moving sensor node along line1 */}
      {progress > 0.1 && (
        <circle
          cx={60 + (960 * (1 - lineOffset1 / line1Length))}
          cy={860}
          r={5 + 2 * Math.sin(frame * 0.2)}
          fill={COLOR_LIME}
          filter="url(#glow)"
        />
      )}
    </svg>
  );
};
