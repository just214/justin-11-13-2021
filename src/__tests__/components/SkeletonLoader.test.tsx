import { render } from "@testing-library/react";
import { SkeletonLoader } from "components/SkeletonLoader";

describe("SkeletonLoader", () => {
  // https://stackoverflow.com/questions/39830580/jest-test-fails-typeerror-window-matchmedia-is-not-a-function/39856723
  Object.defineProperty(window, "matchMedia", {
    writable: true,
    value: jest.fn().mockImplementation((query) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: jest.fn(), // Deprecated
      removeListener: jest.fn(), // Deprecated
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    })),
  });
  it("should match snapshot", () => {
    const { asFragment } = render(<SkeletonLoader variant="ask" rows={12} />);
    expect(asFragment()).toMatchInlineSnapshot(`
<DocumentFragment>
  <p>
    <span
      aria-busy="true"
      aria-live="polite"
    >
      <span
        class="react-loading-skeleton"
        style="width: 98%; --base-color: rgba(0,0,0,.1); --highlight-color: rgba(255, 51, 0, .2);"
      >
        ‌
      </span>
      <br />
      <span
        class="react-loading-skeleton"
        style="width: 98%; --base-color: rgba(0,0,0,.1); --highlight-color: rgba(255, 51, 0, .2);"
      >
        ‌
      </span>
      <br />
      <span
        class="react-loading-skeleton"
        style="width: 98%; --base-color: rgba(0,0,0,.1); --highlight-color: rgba(255, 51, 0, .2);"
      >
        ‌
      </span>
      <br />
      <span
        class="react-loading-skeleton"
        style="width: 98%; --base-color: rgba(0,0,0,.1); --highlight-color: rgba(255, 51, 0, .2);"
      >
        ‌
      </span>
      <br />
      <span
        class="react-loading-skeleton"
        style="width: 98%; --base-color: rgba(0,0,0,.1); --highlight-color: rgba(255, 51, 0, .2);"
      >
        ‌
      </span>
      <br />
      <span
        class="react-loading-skeleton"
        style="width: 98%; --base-color: rgba(0,0,0,.1); --highlight-color: rgba(255, 51, 0, .2);"
      >
        ‌
      </span>
      <br />
      <span
        class="react-loading-skeleton"
        style="width: 98%; --base-color: rgba(0,0,0,.1); --highlight-color: rgba(255, 51, 0, .2);"
      >
        ‌
      </span>
      <br />
      <span
        class="react-loading-skeleton"
        style="width: 98%; --base-color: rgba(0,0,0,.1); --highlight-color: rgba(255, 51, 0, .2);"
      >
        ‌
      </span>
      <br />
      <span
        class="react-loading-skeleton"
        style="width: 98%; --base-color: rgba(0,0,0,.1); --highlight-color: rgba(255, 51, 0, .2);"
      >
        ‌
      </span>
      <br />
      <span
        class="react-loading-skeleton"
        style="width: 98%; --base-color: rgba(0,0,0,.1); --highlight-color: rgba(255, 51, 0, .2);"
      >
        ‌
      </span>
      <br />
      <span
        class="react-loading-skeleton"
        style="width: 98%; --base-color: rgba(0,0,0,.1); --highlight-color: rgba(255, 51, 0, .2);"
      >
        ‌
      </span>
      <br />
      <span
        class="react-loading-skeleton"
        style="width: 98%; --base-color: rgba(0,0,0,.1); --highlight-color: rgba(255, 51, 0, .2);"
      >
        ‌
      </span>
      <br />
    </span>
  </p>
</DocumentFragment>
`);
  });
});
