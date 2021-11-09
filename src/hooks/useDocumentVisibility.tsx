import * as React from "react";

export function useDocumentVisibility() {
  const [isVisible, setIsVisible] = React.useState(true);

  function handleVisibilityChange() {
    // This is a fairly naive implementation..doesn't account for prerender, etc.
    // But, I think it is okay for this demo.
    const isDocumentVisible = document.visibilityState === "visible";
    setIsVisible(isDocumentVisible);
  }
  React.useEffect(() => {
    window.addEventListener("visibilitychange", handleVisibilityChange);
    // Don't forget to clean up!
    return () =>
      window.removeEventListener("visibilitychange", handleVisibilityChange);
  }, []);

  return isVisible;
}
