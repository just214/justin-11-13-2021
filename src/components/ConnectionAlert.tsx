import * as React from "react";
import { Alert } from "components/Alert";
import { Button } from "components/Button";

type ConnectionAlertProps = {
  onRequestRestoreConnection: () => void;
};

export const ConnectionAlert = (props: ConnectionAlertProps) => {
  return (
    <Alert>
      <p className="text-sm md:text-base">
        Your were disconnected to reduce data usage.
      </p>

      <Button onClick={props.onRequestRestoreConnection} variant="info">
        Restore your connection
      </Button>
    </Alert>
  );
};
