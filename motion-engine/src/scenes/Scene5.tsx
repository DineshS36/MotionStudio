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
  COLOR_WHITE,
  FONT_MONO,
  FONT_SANS,
  VIDEO_HEIGHT,
  VIDEO_WIDTH,
} from "../constants";

export const Scene5: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Smooth entrance spring
  const entrance = spring({
    frame,
    fps,
    config: { damping: 14, mass: 0.9, stiffness: 90 },
  });

  // Emblem draw progress (SVG strokeDashoffset)
  const emblemDraw = interpolate(frame, [0, 30], [300, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  // Pulse ring expanding
  const pulseScale = interpolate(frame, [15, 55], [0.8, 1.6], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });
  const pulseOpacity = interpolate(frame, [15, 30, 55], [0, 0.6, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Text entrance
  const textY = interpolate(entrance, [0, 1], [30, 0]);
  const textOpacity = interpolate(frame, [10, 28], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Subtitle entrance
  const subY = interpolate(frame, [22, 38], [20, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });
  const subOpacity = interpolate(frame, [22, 38], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Final graceful fade to black at the end
  const finalFade = interpolate(frame, [48, 60], [1, 0], {
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
        opacity: finalFade,
        padding: "0 80px",
        boxSizing: "border-box",
        zIndex: 2,
      }}
    >
      {/* Expanding Pulse Ring */}
      <div
        style={{
          position: "absolute",
          top: "40%",
          left: "50%",
          width: 300,
          height: 300,
          transform: `translate(-50%, -50%) scale(${pulseScale})`,
          borderRadius: "50%",
          border: `2px solid ${COLOR_LIME}`,
          opacity: pulseOpacity,
          pointerEvents: "none",
        }}
      />

      {/* Central Geometric Icon / Emblem */}
      <div
        style={{
          marginBottom: 48,
          position: "relative",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <svg width="180" height="180" viewBox="0 0 180 180">
          <defs>
            <filter id="emblem-glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="6" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Outer Diamond */}
          <polygon
            points="90,15 165,90 90,165 15,90"
            fill="none"
            stroke={COLOR_LIME}
            strokeWidth="3"
            strokeDasharray="300"
            strokeDashoffset={emblemDraw}
            filter="url(#emblem-glow)"
          />

          {/* Inner Inverted Diamond */}
          <polygon
            points="90,40 140,90 90,140 40,90"
            fill="rgba(182, 255, 53, 0.08)"
            stroke="rgba(255, 255, 255, 0.5)"
            strokeWidth="1.5"
            transform={`rotate(${frame * 0.5} 90 90)`}
          />

          {/* Central Core Glowing Point */}
          <circle
            cx="90"
            cy="90"
            r="8"
            fill={COLOR_LIME}
            filter="url(#emblem-glow)"
          />
        </svg>
      </div>

      {/* Main Title */}
      <div
        style={{
          fontFamily: FONT_SANS,
          fontSize: 88,
          fontWeight: 900,
          color: COLOR_WHITE,
          lineHeight: 1.05,
          textAlign: "center",
          letterSpacing: "-0.02em",
          transform: `translateY(${textY}px)`,
          opacity: textOpacity,
          textTransform: "uppercase",
        }}
      >
        THE FUTURE
        <br />
        IS BUILT.
      </div>

      {/* Hero Accent Subtitle */}
      <div
        style={{
          marginTop: 20,
          fontFamily: FONT_SANS,
          fontSize: 60,
          fontWeight: 800,
          color: COLOR_LIME,
          letterSpacing: "0.06em",
          textAlign: "center",
          textTransform: "uppercase",
          textShadow: `0 0 40px rgba(182, 255, 53, 0.6)`,
          transform: `translateY(${subY}px)`,
          opacity: subOpacity,
        }}
      >
        NOT WAITED FOR.
      </div>

      {/* Brand Signature */}
      <div
        style={{
          marginTop: 64,
          display: "flex",
          alignItems: "center",
          gap: 16,
          opacity: subOpacity,
        }}
      >
        <div
          style={{
            width: 40,
            height: 1,
            backgroundColor: "rgba(255, 255, 255, 0.2)",
          }}
        />
        <span
          style={{
            fontFamily: FONT_MONO,
            fontSize: 18,
            letterSpacing: "0.3em",
            color: COLOR_MUTED,
          }}
        >
          MOTIONSTUDIO // 2026
        </span>
        <div
          style={{
            width: 40,
            height: 1,
            backgroundColor: "rgba(255, 255, 255, 0.2)",
          }}
        />
      </div>
    </div>
  );
};
