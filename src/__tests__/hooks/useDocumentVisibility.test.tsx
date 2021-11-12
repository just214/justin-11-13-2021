import { renderHook, act } from "@testing-library/react-hooks";
import { useDocumentVisibility } from "hooks/useDocumentVisibility";

test("Document should be visible", () => {
  const { result } = renderHook(() => useDocumentVisibility());

  act(() => {
    result.current;
  });

  expect(result.current).toBe(true);
});
