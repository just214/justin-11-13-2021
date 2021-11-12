import { Emoji } from "./Emoji";
import { Alert } from "./Alert";

export const ErrorAlert = () => {
  return (
    <Alert>
      Oh no, something went wrong. Please try reloading the page. If the problem
      persists, then I clearly failed this challenge{" "}
      <Emoji label="The face of failure" symbol="😔" />
    </Alert>
  );
};
