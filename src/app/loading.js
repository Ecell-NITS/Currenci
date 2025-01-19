"use client";

import "./globals.scss";

export default function Loading() {
  console.log("Loading component is rendering...");
  return (
    <div className="loading-container">
      <div className="spinner"></div>
      <p>Loading...</p>
    </div>
  );
}
