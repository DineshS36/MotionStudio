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
  COLOR_SURFACE,
  COLOR_SURFACE_BORDER,
  COLOR_WHITE,
  FONT_MONO,
  FONT_SANS,
  VIDEO_HEIGHT,
  VIDEO_WIDTH,
} from "../constants";

export const Scene3: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Entrance spring
  const sceneEntrance = spring({
    frame,
    fps,
    config: { damping: 14, mass: 0.9, stiffness: 100 },
  });

  // Outro transition
  const sceneExit = interpolate(frame, [105, 120], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  const sceneScale = interpolate(frame, [105, 120], [1, 0.9], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Rotation for circular HUD elements
  const outerRotation = frame * 0.6;
  const innerRotation = -frame * 0.9;

  // Headline entrance
  const textY = interpolate(sceneEntrance, [0, 1], [50, 0]);
  const textOpacity = interpolate(frame, [10, 30], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Data frequency bars (16 bars)
  const barCount = 18;

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
        opacity: sceneEntrance * sceneExit,
        transform: `scale(${sceneScale})`,
        padding: "0 80px",
        boxSizing: "border-box",
        zIndex: 2,
      }}
    >
      {/* Central Rotating HUD Rings */}
      <svg
        width={700}
        height={700}
        viewBox="0 0 700 700"
        style={{
          position: "absolute",
          top: "46%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          opacity: 0.35,
          pointerEvents: "none",
        }}
      >
        {/* Outer Ring */}
        <circle
          cx="350"
          cy="350"
          r="320"
          fill="none"
          stroke="rgba(255, 255, 255, 0.15)"
          strokeWidth="1.5"
        />

        {/* Outer Segmented Dashed Ring (Rotating CW) */}
        <circle
          cx="350"
          cy="350"
          r="290"
          fill="none"
          stroke={COLOR_LIME}
          strokeWidth="2.5"
          strokeDasharray="40 25 15 25"
          transform={`rotate(${outerRotation} 350 350)`}
        />

        {/* Middle Cyan Ring */}
        <circle
          cx="350"
          cy="350"
          r="240"
          fill="none"
          stroke={COLOR_CYAN_ACCENT}
          strokeWidth="1"
          strokeDasharray="4 8"
        />

        {/* Inner Tech Ring (Rotating CCW) */}
        <circle
          cx="350"
          cy="350"
          r="190"
          fill="none"
          stroke="rgba(255, 255, 255, 0.4)"
          strokeWidth="2"
          strokeDasharray="60 15 30 15"
          transform={`rotate(${innerRotation} 350 350)`}
        />

        {/* Reticle Crosshairs */}
        <line
          x1="350"
          y1="100"
          x2="350"
          y2="600"
          stroke="rgba(255, 255, 255, 0.12)"
          strokeWidth="1"
        />
        <line
          x1="100"
          y1="350"
          x2="600"
          y2="350"
          stroke="rgba(255, 255, 255, 0.12)"
          strokeWidth="1"
        />
      </svg>

      {/* Top Category Badge */}
      <div
        style={{
          marginBottom: 32,
          display: "flex",
          alignItems: "center",
          gap: 12,
          padding: "8px 22px",
          backgroundColor: COLOR_SURFACE,
          border: `1px solid ${COLOR_SURFACE_BORDER}`,
          borderRadius: 20,
        }}
      >
        <span
          style={{
            fontFamily: FONT_MONO,
            fontSize: 20,
            letterSpacing: "0.2em",
            color: COLOR_CYAN_ACCENT,
            fontWeight: 600,
          }}
        >
          // PHASE: ARCHITECT
        </span>
      </div>

      {/* Main Headline */}
      <div
        style={{
          fontFamily: FONT_SANS,
          fontSize: 98,
          fontWeight: 800,
          color: COLOR_WHITE,
          lineHeight: 1.05,
          textAlign: "center",
          textTransform: "uppercase",
          letterSpacing: "-0.02em",
          transform: `translateY(${textY}px)`,
          opacity: textOpacity,
          zIndex: 3,
        }}
      >
        BUILD WHAT
        <br />
        <span
          style={{
            color: COLOR_LIME,
            textShadow: `0 0 50px rgba(182, 255, 53, 0.5)`,
          }}
        >
          COMES NEXT.
        </span>
      </div>

      {/* Animated Data Visualization / Frequency Spectrum Bars */}
      <div
        style={{
          marginTop: 64,
          display: "flex",
          alignItems: "flex-end",
          gap: 8,
          height: 90,
          zIndex: 3,
        }}
      >
        {Array.from({ length: barCount }).map((_, i) => {
          // Deterministic height variation based on frame and index
          const baseWave = Math.sin(frame * 0.18 + i * 0.45);
          const secondWave = Math.cos(frame * 0.12 + i * 0.28);
          const rawHeight = (baseWave + secondWave + 2) / 4;
          const barHeight = Math.max(12, Math.floor(rawHeight * 85));

          const isLime = i % 3 === 0;

          return (
            <div
              key={i}
              style={{
                width: 10,
                height: barHeight,
                backgroundColor: isLime ? COLOR_LIME : COLOR_WHITE,
                opacity: isLime ? 0.95 : 0.45,
                borderRadius: 2,
                boxShadow: isLime ? `0 0 10px ${COLOR_LIME}` : "none",
              }}
            />
          );
        })}
      </div>

      {/* Telemetry Status Grid Cards */}
      <div
        style={{
          marginTop: 60,
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 20,
          width: "100%",
          maxWidth: 640,
          zIndex: 3,
        }}
      >
        <div
          style={{
            padding: "16px 20px",
            backgroundColor: "rgba(17, 20, 30, 0.8)",
            border: "1px solid rgba(255, 255, 255, 0.08)",
            borderRadius: 6,
          }}
        >
          <div
            style={{
              fontFamily: FONT_MONO,
              fontSize: 14,
              color: COLOR_MUTED,
              letterSpacing: "0.15em",
            }}
          >
            INTELLIGENCE
          </div>
          <div
            style={{
              fontFamily: FONT_MONO,
              fontSize: 22,
              color: COLOR_LIME,
              fontWeight: 700,
              marginTop: 4,
            }}
          >
            AUTONOMOUS
          </div>
        </div>

        <div
          style={{
            padding: "16px 20px",
            backgroundColor: "rgba(17, 20, 30, 0.8)",
            border: "1px solid rgba(255, 255, 255, 0.08)",
            borderRadius: 6,
          }}
        >
          <div
            style={{
              fontFamily: FONT_MONO,
              fontSize: 14,
              color: COLOR_MUTED,
              letterSpacing: "0.15em",
            }}
          >
            EXECUTION
          </div>
          <div
            style={{
              fontFamily: FONT_MONO,
              fontSize: 22,
              color: COLOR_WHITE,
              fontWeight: 700,
              marginTop: 4,
            }}
          >
            REALTIME 60FPS
          </div>
        </div>
      </div>
    </div>
  );
};
