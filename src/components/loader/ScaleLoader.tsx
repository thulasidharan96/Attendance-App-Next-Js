"use client";

import React, { JSX, useEffect, useState } from "react";
import { cssValue } from "./helpers/unitConverter";
import { LoaderHeightWidthRadiusProps } from "./helpers/props";
import { createAnimation } from "./helpers/animation";

const scale = createAnimation(
  "ScaleLoader",
  "0% {transform: scaley(1.0)} 50% {transform: scaley(0.4)} 100% {transform: scaley(1.0)}",
  "scale"
);

function ScaleLoader({
  loading = true,
  color = "#3fd48a",
  speedMultiplier = 1,
  cssOverride = {},
  height = 35,
  width = 4,
  radius = 0,
  margin = 2,
  className,
  ...additionalprops
}: LoaderHeightWidthRadiusProps & { className?: string }): JSX.Element | null {
  const [resolvedColor, setResolvedColor] = useState(color);

  useEffect(() => {
    if (className) {
      const element = document.createElement("div");
      element.className = className;
      document.body.appendChild(element);
      const computedColor = getComputedStyle(element).color;
      document.body.removeChild(element);
      setResolvedColor(computedColor);
    }
  }, [className, color]);

  const wrapper: React.CSSProperties = {
    display: "inherit",
    ...cssOverride,
  };

  const style = (i: number): React.CSSProperties => ({
    backgroundColor: resolvedColor,
    width: cssValue(width),
    height: cssValue(height),
    margin: cssValue(margin),
    borderRadius: cssValue(radius),
    display: "inline-block",
    animation: `${scale} ${1 / speedMultiplier}s ${
      i * 0.1
    }s infinite cubic-bezier(0.2, 0.68, 0.18, 1.08)`,
    animationFillMode: "both",
  });

  if (!loading) return null;

  return (
    <span style={wrapper} {...additionalprops}>
      {[...Array(5)].map((_, i) => (
        <span key={i} style={style(i)} />
      ))}
    </span>
  );
}

export default ScaleLoader;
