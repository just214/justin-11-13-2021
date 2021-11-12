import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import { useDetectDarkMode } from "hooks/useDetectDarkMode";
import "react-loading-skeleton/dist/skeleton.css";

type SkeletonLoaderProps = {
  rows: number;
  variant: "ask" | "bid";
};

export const SkeletonLoader = (props: SkeletonLoaderProps) => {
  const isDarkMode = useDetectDarkMode();
  return (
    <SkeletonTheme
      baseColor={isDarkMode ? "rgba(0,0,0,.5)" : "rgba(0,0,0,.1)"}
      highlightColor={
        props.variant === "ask" ? "rgba(255, 51, 0, .2)" : "rgb(0, 204, 0, .2)" // green or red
      }
    >
      <p>
        <Skeleton count={props.rows} width="98%" />
      </p>
    </SkeletonTheme>
  );
};
