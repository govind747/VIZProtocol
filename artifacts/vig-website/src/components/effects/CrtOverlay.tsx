import React from "react";

export function CrtOverlay() {
  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      <div className="absolute inset-0 scanlines opacity-30"></div>
      <div className="absolute inset-0 bg-black/10 crt-flicker"></div>
      <div 
        className="absolute inset-0 opacity-50"
        style={{
          boxShadow: "inset 0 0 150px rgba(0,0,0,0.9)",
          background: "radial-gradient(circle at center, transparent 50%, rgba(0,0,0,0.4) 100%)"
        }}
      ></div>
    </div>
  );
}
