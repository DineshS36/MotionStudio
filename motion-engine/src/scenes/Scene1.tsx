import React from "react";
import {
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
  Easing,
} from "remotion";
import {
  COLOR_LIME,
  COLOR_MUTED,
  COLOR_SURFACE,
  COLOR_SURFACE_BORDER,
  COLOR_WHITE,
  FONT_MONO,
  FONT_SANS,
  VIDEO_HEIGHT,
  VIDEO_WIDTH,
} from "../constants";
import { ParticleField } from "../components/ParticleField";
import { LaserGridLines } from "../components/LaserGridLines";

export const Scene1: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Entrance spring for main headline
  const headlineSpring = spring({
    frame: frame - 15,
    fps,
    config: {
      damping: 14,
      mass: 0.8,
      stiffness: 90,
    },
  });

  // Fade in from black in first 15 frames
  const sceneOpacity = interpolate(frame, [0, 15], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Outro fade/zoom
  const sceneExit = interpolate(frame, [75, 90], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const sceneScale = interpolate(frame, [75, 90], [1, 1.08], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  // Line progress (assemble 0 to 45 frames)
  const lineProgress = interpolate(frame, [10, 50], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Headline tracking (letter-spacing contraction)
  const letterSpacing = interpolate(headlineSpring, [0, 1], [0.15, -0.02]);
  const headlineY = interpolate(headlineSpring, [0, 1], [40, 0]);
  const headlineOpacity = interpolate(frame, [15, 35], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Badge fade in
  const badgeOpacity = interpolate(frame, [5, 20], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Subtitle reveal
  const subOpacity = interpolate(frame, [35, 55], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const subY = interpolate(frame, [35, 55], [20, 0], {
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
        opacity: sceneOpacity * sceneExit,
        transform: `scale(${sceneScale})`,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: "0 80px",
        boxSizing: "border-box",
        zIndex: 2,
      }}
    >
      <ParticleField count={40} />
      <LaserGridLines progress={lineProgress} />

      {/* Tech System Indicator Badge */}
      <div
        style={{
          opacity: badgeOpacity,
          display: "flex",
          alignItems: "center",
          gap: 12,
          padding: "10px 24px",
          backgroundColor: COLOR_SURFACE,
          border: `1px solid ${COLOR_SURFACE_BORDER}`,
          borderRadius: 30,
          marginBottom: 36,
          boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
        }}
      >
        <span
          style={{
            display: "inline-block",
            width: 8,
            height: 8,
            borderRadius: "50%",
            backgroundColor: COLOR_LIME,
            boxShadow: `0 0 8px ${COLOR_LIME}`,
          }}
        />
        <span
          style={{
            fontFamily: FONT_MONO,
            fontSize: 22,
            letterSpacing: "0.2em",
            color: COLOR_LIME,
            fontWeight: 600,
          }}
        >
          SYS.01 // REBOOT PROTOCOL
        </span>
      </div>

      {/* Main Headline */}
      <div
        style={{
          fontFamily: FONT_SANS,
          fontSize: 104,
          fontWeight: 800,
          color: COLOR_WHITE,
          lineHeight: 1.05,
          textAlign: "center",
          letterSpacing: `${letterSpacing}em`,
          opacity: headlineOpacity,
          transform: `translateY(${headlineY}px)`,
          textTransform: "uppercase",
        }}
      >
        EVERYTHING
        <br />
        <span
          style={{
            color: COLOR_LIME,
            textShadow: `0 0 40px rgba(182, 255, 53, 0.5)`,
          }}
        >
          CHANGES.
        </span>
      </div>

      {/* Subtitle / Context Note */}
      <div
        style={{
          marginTop: 40,
          fontFamily: FONT_MONO,
          fontSize: 26,
          color: COLOR_MUTED,
          letterSpacing: "0.15em",
          textAlign: "center",
          opacity: subOpacity,
          transform: `translateY(${subY}px)`,
          maxWidth: 720,
        }}
      >
        THE OLD RULES NO LONGER APPLY.
      </div>
    </div>
  );
};
