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

export const Scene4: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Part A: "DON'T JUST WATCH." (Frames 0 to 45)
  const partASpring = spring({
    frame,
    fps,
    config: { damping: 11, mass: 0.6, stiffness: 130 },
  });

  const partAOpacity = interpolate(frame, [0, 10, 36, 44], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const partAScale = interpolate(partASpring, [0, 1], [0.85, 1]);

  // Flash between Part A and Part B (around frame 42 to 46)
  const flashOpacity = interpolate(frame, [40, 43, 47], [0, 0.8, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Part B: "CREATE THE FUTURE." (Frames 45 to 90)
  const partBSpring = spring({
    frame: frame - 44,
    fps,
    config: { damping: 12, mass: 0.7, stiffness: 140 },
  });

  const partBOpacity = interpolate(frame, [43, 50], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const partBScale = interpolate(partBSpring, [0, 1], [1.3, 1]);

  // Outro transition for Scene 4
  const sceneExit = interpolate(frame, [78, 90], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
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
        opacity: sceneExit,
        padding: "0 80px",
        boxSizing: "border-box",
        zIndex: 2,
      }}
    >
      {/* High-impact flash transition */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: VIDEO_WIDTH,
          height: VIDEO_HEIGHT,
          backgroundColor: COLOR_LIME,
          opacity: flashOpacity,
          pointerEvents: "none",
          zIndex: 10,
        }}
      />

      {/* PART A: DON'T JUST WATCH */}
      {frame < 46 && (
        <div
          style={{
            position: "absolute",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            opacity: partAOpacity,
            transform: `scale(${partAScale})`,
          }}
        >
          <div
            style={{
              fontFamily: FONT_MONO,
              fontSize: 22,
              letterSpacing: "0.3em",
              color: "#FF453A",
              marginBottom: 24,
            }}
          >
            // WARNING: PASSIVITY DETECTED
          </div>

          <div
            style={{
              fontFamily: FONT_SANS,
              fontSize: 100,
              fontWeight: 900,
              color: COLOR_WHITE,
              textAlign: "center",
              lineHeight: 1.05,
              textTransform: "uppercase",
              letterSpacing: "-0.03em",
            }}
          >
            DON&apos;T JUST
            <br />
            <span style={{ color: "#FF453A" }}>WATCH.</span>
          </div>
        </div>
      )}

      {/* PART B: CREATE THE FUTURE */}
      {frame >= 43 && (
        <div
          style={{
            position: "absolute",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            opacity: partBOpacity,
            transform: `scale(${partBScale})`,
          }}
        >
          {/* Tech Target Box Header */}
          <div
            style={{
              fontFamily: FONT_MONO,
              fontSize: 20,
              letterSpacing: "0.25em",
              color: COLOR_CYAN_ACCENT,
              marginBottom: 24,
            }}
          >
            [ INITIATE CREATOR PROTOCOL ]
          </div>

          {/* Bold Text */}
          <div
            style={{
              fontFamily: FONT_SANS,
              fontSize: 110,
              fontWeight: 900,
              color: COLOR_WHITE,
              lineHeight: 0.95,
              textAlign: "center",
              textTransform: "uppercase",
              letterSpacing: "-0.03em",
            }}
          >
            CREATE
          </div>

          <div
            style={{
              fontFamily: FONT_SANS,
              fontSize: 115,
              fontWeight: 900,
              color: COLOR_LIME,
              lineHeight: 0.95,
              textAlign: "center",
              textTransform: "uppercase",
              letterSpacing: "-0.03em",
              marginTop: 10,
              textShadow: `0 0 60px rgba(182, 255, 53, 0.7)`,
            }}
          >
            THE FUTURE.
          </div>

          {/* Underline HUD bar */}
          <div
            style={{
              marginTop: 40,
              width: 320,
              height: 4,
              backgroundColor: COLOR_LIME,
              boxShadow: `0 0 15px ${COLOR_LIME}`,
            }}
          />

          <div
            style={{
              marginTop: 24,
              fontFamily: FONT_MONO,
              fontSize: 18,
              letterSpacing: "0.2em",
              color: COLOR_MUTED,
            }}
          >
            EXECUTION OVER INTENTION
          </div>
        </div>
      )}
    </div>
  );
};
