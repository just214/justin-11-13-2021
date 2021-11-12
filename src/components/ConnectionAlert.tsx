import * as React from "react";
import { Button } from "components/Button";

type ConnectionAlertProps = {
  onRequestRestoreConnection: () => void;
};

export const ConnectionAlert = (props: ConnectionAlertProps) => {
  return (
    <div className="bg-red-200 text-red-700 p-2 rounded-md my-4 flex flex-wrap items-center justify-center gap-4">
      <p className="text-sm md:text-base">
        Your were disconnected to reduce data usage.
      </p>

      <Button onClick={props.onRequestRestoreConnection} variant="info">
        Restore your connection
      </Button>
    </div>
  );
};
