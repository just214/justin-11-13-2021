import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

type SkeletonLoaderProps = {
  rows: number;
  variant: "ask" | "bid";
};

export const SkeletonLoader = (props: SkeletonLoaderProps) => {
  return (
    <SkeletonTheme
      baseColor="rgba(0,0,0,.5)"
      highlightColor={
        props.variant === "ask" ? "rgba(255, 51, 0, .2)" : "rgb(0, 204, 0, .2)"
      }>
      <p>
        <Skeleton count={props.rows} width="98%" />
      </p>
    </SkeletonTheme>
  );
};
