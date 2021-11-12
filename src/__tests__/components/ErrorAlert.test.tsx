import { render } from "@testing-library/react";
import { ErrorAlert } from "components/ErrorAlert";

describe("ErrorAlert", () => {
  it("should match snapshot", () => {
    const { asFragment } = render(<ErrorAlert />);
    expect(asFragment()).toMatchInlineSnapshot(`
<DocumentFragment>
  <div
    class="bg-red-200 text-red-700 p-2 rounded-md my-4 flex flex-wrap items-center justify-center gap-4"
  >
    Oh no, something went wrong. Please try reloading the page. If the problem persists, then I clearly failed this challenge 
    <span
      aria-label="The face of failure"
      role="img"
      title="The face of failure"
    >
      😔
    </span>
  </div>
</DocumentFragment>
`);
  });
});
