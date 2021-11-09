import * as React from "react";

function isTruthy(value: any) {
  if (Array.isArray(value) && !value.length) {
    return false;
  } else if (typeof value === "object") {
    return true;
  } else return !!value;
}

export function Show<T>(props: {
  when: T | undefined | null | false;
  fallback?: React.ReactNode;
  children: React.ReactNode | ((item: NonNullable<T>) => React.ReactNode);
}) {
  if (isTruthy(props.when)) {
    const { children } = props;
    return typeof children === "function" && children.length > 0
      ? children(props.when as NonNullable<T>)
      : children;
  }
  return props.fallback || null;
}
