import * as React from "react";

export function useDetectDarkMode() {
  const [isDarkMode, setIsDarkMode] = React.useState(false);

  function handleUpdateState(e: { matches: boolean }) {
    setIsDarkMode(e.matches);
  }
  React.useEffect(() => {
    if (!window && !window.matchMedia) return;
    window
      .matchMedia("(prefers-color-scheme: dark)")
      .addEventListener("change", handleUpdateState);

    // Clean up
    return () =>
      window
        .matchMedia("(prefers-color-scheme: dark)")
        .removeEventListener("change", handleUpdateState);
  }, []);

  // Simply returns a boolean indicating if dark mode (all we need for this)
  return isDarkMode;
}
