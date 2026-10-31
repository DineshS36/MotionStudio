import React from "react";
import {
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
  Easing,
} from "remotion";
import {
  COLOR_CYAN_ACCENT,
  COLOR_LIME,
  COLOR_MUTED,
  COLOR_WHITE,
  FONT_MONO,
  FONT_SANS,
  VIDEO_HEIGHT,
  VIDEO_WIDTH,
} from "../constants";

export const Scene2: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Entrance spring for first word group ("THE WORLD")
  const word1Spring = spring({
    frame: frame - 5,
    fps,
    config: { damping: 12, mass: 0.6, stiffness: 140 },
  });

  // Entrance spring for second word group ("MOVES")
  const word2Spring = spring({
    frame: frame - 16,
    fps,
    config: { damping: 12, mass: 0.6, stiffness: 140 },
  });

  // Entrance spring for third word ("FAST.")
  const word3Spring = spring({
    frame: frame - 28,
    fps,
    config: { damping: 10, mass: 0.5, stiffness: 170 },
  });

  // Dynamic blur for explosive entrance
  const blur1 = interpolate(word1Spring, [0, 1], [15, 0]);
  const scale1 = interpolate(word1Spring, [0, 1], [1.8, 1]);
  const y1 = interpolate(word1Spring, [0, 1], [-80, 0]);

  const blur2 = interpolate(word2Spring, [0, 1], [15, 0]);
  const scale2 = interpolate(word2Spring, [0, 1], [1.8, 1]);
  const y2 = interpolate(word2Spring, [0, 1], [60, 0]);

  const blur3 = interpolate(word3Spring, [0, 1], [25, 0]);
  const scale3 = interpolate(word3Spring, [0, 1], [2.4, 1]);

  // Velocity gauge counter
  const velocity = Math.floor(
    interpolate(frame, [0, 75], [1200, 94850], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.bezier(0.16, 1, 0.3, 1),
    })
  );

  // Speed streak lines: horizontal streaks flying across
  const streakOffset = (frame * 65) % 1800;

  // Scene exit transition (warp zoom forward into Scene 3)
  const exitScale = interpolate(frame, [72, 90], [1, 2.0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.7, 0, 0.84, 0),
  });
  const exitOpacity = interpolate(frame, [78, 90], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: VIDEO_WIDTH,
        height: VIDEO_HEIGHT,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        opacity: exitOpacity,
        transform: `scale(${exitScale})`,
        padding: "0 80px",
        boxSizing: "border-box",
        zIndex: 2,
      }}
    >
      {/* High-speed streak lines */}
      <svg
        width={VIDEO_WIDTH}
        height={VIDEO_HEIGHT}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          pointerEvents: "none",
          opacity: 0.35,
        }}
      >
        <line
          x1={-300 + streakOffset}
          y1={420}
          x2={200 + streakOffset}
          y2={420}
          stroke={COLOR_LIME}
          strokeWidth="3"
        />
        <line
          x1={-500 + streakOffset * 1.3}
          y1={750}
          x2={100 + streakOffset * 1.3}
          y2={750}
          stroke={COLOR_CYAN_ACCENT}
          strokeWidth="2"
        />
        <line
          x1={-200 + streakOffset * 0.9}
          y1={1350}
          x2={300 + streakOffset * 0.9}
          y2={1350}
          stroke={COLOR_LIME}
          strokeWidth="2"
        />
        <line
          x1={-400 + streakOffset * 1.5}
          y1={1620}
          x2={150 + streakOffset * 1.5}
          y2={1620}
          stroke="#FFFFFF"
          strokeWidth="3"
        />
      </svg>

      {/* Kinetic Velocity Counter Badge */}
      <div
        style={{
          marginBottom: 40,
          display: "flex",
          alignItems: "center",
          gap: 16,
          padding: "8px 24px",
          backgroundColor: "rgba(182, 255, 53, 0.08)",
          border: `1px solid ${COLOR_LIME}`,
          borderRadius: 4,
          fontFamily: FONT_MONO,
          fontSize: 22,
          color: COLOR_LIME,
          letterSpacing: "0.2em",
        }}
      >
        <span>ACCELERATION:</span>
        <span style={{ fontWeight: 700, color: COLOR_WHITE }}>
          {velocity.toLocaleString()} KM/H
        </span>
      </div>

      {/* Line 1: THE WORLD */}
      <div
        style={{
          fontFamily: FONT_SANS,
          fontSize: 100,
          fontWeight: 900,
          color: COLOR_WHITE,
          lineHeight: 0.95,
          textTransform: "uppercase",
          letterSpacing: "-0.03em",
          transform: `scale(${scale1}) translateY(${y1}px)`,
          filter: `blur(${blur1}px)`,
          opacity: word1Spring,
          textAlign: "center",
        }}
      >
        THE WORLD
      </div>

      {/* Line 2: MOVES */}
      <div
        style={{
          fontFamily: FONT_SANS,
          fontSize: 120,
          fontWeight: 900,
          color: "transparent",
          WebkitTextStroke: `3px ${COLOR_WHITE}`,
          lineHeight: 0.95,
          textTransform: "uppercase",
          letterSpacing: "0.02em",
          transform: `scale(${scale2}) translateY(${y2}px)`,
          filter: `blur(${blur2}px)`,
          opacity: word2Spring,
          textAlign: "center",
          margin: "12px 0",
        }}
      >
        MOVES
      </div>

      {/* Line 3: FAST. */}
      <div
        style={{
          fontFamily: FONT_SANS,
          fontSize: 150,
          fontWeight: 900,
          color: COLOR_LIME,
          lineHeight: 0.9,
          textTransform: "uppercase",
          letterSpacing: "-0.04em",
          transform: `scale(${scale3})`,
          filter: `blur(${blur3}px)`,
          opacity: word3Spring,
          textAlign: "center",
          textShadow: `0 0 60px rgba(182, 255, 53, 0.6), 0 0 120px rgba(182, 255, 53, 0.3)`,
        }}
      >
        FAST.
      </div>

      {/* Bottom Subtext */}
      <div
        style={{
          marginTop: 60,
          fontFamily: FONT_MONO,
          fontSize: 22,
          letterSpacing: "0.25em",
          color: COLOR_MUTED,
          opacity: interpolate(frame, [35, 50], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        [ DELAY IS OBSOLESCENCE ]
      </div>
    </div>
  );
};
