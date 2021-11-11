import { render } from "@testing-library/react";
import { SkeletonLoader } from "components/SkeletonLoader";

describe("SkeletonLoader", () => {
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
        style="width: 98%; --base-color: rgba(0,0,0,.5); --highlight-color: rgba(255, 51, 0, .2);"
      >
        ‌
      </span>
      <br />
      <span
        class="react-loading-skeleton"
        style="width: 98%; --base-color: rgba(0,0,0,.5); --highlight-color: rgba(255, 51, 0, .2);"
      >
        ‌
      </span>
      <br />
      <span
        class="react-loading-skeleton"
        style="width: 98%; --base-color: rgba(0,0,0,.5); --highlight-color: rgba(255, 51, 0, .2);"
      >
        ‌
      </span>
      <br />
      <span
        class="react-loading-skeleton"
        style="width: 98%; --base-color: rgba(0,0,0,.5); --highlight-color: rgba(255, 51, 0, .2);"
      >
        ‌
      </span>
      <br />
      <span
        class="react-loading-skeleton"
        style="width: 98%; --base-color: rgba(0,0,0,.5); --highlight-color: rgba(255, 51, 0, .2);"
      >
        ‌
      </span>
      <br />
      <span
        class="react-loading-skeleton"
        style="width: 98%; --base-color: rgba(0,0,0,.5); --highlight-color: rgba(255, 51, 0, .2);"
      >
        ‌
      </span>
      <br />
      <span
        class="react-loading-skeleton"
        style="width: 98%; --base-color: rgba(0,0,0,.5); --highlight-color: rgba(255, 51, 0, .2);"
      >
        ‌
      </span>
      <br />
      <span
        class="react-loading-skeleton"
        style="width: 98%; --base-color: rgba(0,0,0,.5); --highlight-color: rgba(255, 51, 0, .2);"
      >
        ‌
      </span>
      <br />
      <span
        class="react-loading-skeleton"
        style="width: 98%; --base-color: rgba(0,0,0,.5); --highlight-color: rgba(255, 51, 0, .2);"
      >
        ‌
      </span>
      <br />
      <span
        class="react-loading-skeleton"
        style="width: 98%; --base-color: rgba(0,0,0,.5); --highlight-color: rgba(255, 51, 0, .2);"
      >
        ‌
      </span>
      <br />
      <span
        class="react-loading-skeleton"
        style="width: 98%; --base-color: rgba(0,0,0,.5); --highlight-color: rgba(255, 51, 0, .2);"
      >
        ‌
      </span>
      <br />
      <span
        class="react-loading-skeleton"
        style="width: 98%; --base-color: rgba(0,0,0,.5); --highlight-color: rgba(255, 51, 0, .2);"
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
