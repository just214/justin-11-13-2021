import { render } from "@testing-library/react";
import { ConnectionAlert } from "components/ConnectionAlert";

describe("ConnectionAlert", () => {
  it("should match snapshot", () => {
    const { asFragment } = render(
      <ConnectionAlert onRequestRestoreConnection={console.log} />
    );
    expect(asFragment()).toMatchInlineSnapshot(`
<DocumentFragment>
  <div
    class="bg-red-200 text-red-700 p-2 rounded-md my-4 flex flex-wrap items-center justify-center gap-4"
  >
    <p
      class="text-sm md:text-base"
    >
      Your were disconnected to reduce data usage.
    </p>
    <button
      class="px-8 py-2 text-white rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed bg-gray-700 hover:bg-gray-800 undefined"
    >
      Restore your connection
    </button>
  </div>
</DocumentFragment>
`);
  });
});
