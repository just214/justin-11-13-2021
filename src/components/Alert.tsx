type AlertProps = {
  children?: React.ReactNode;
};

export const Alert = (props: AlertProps) => {
  return (
    <div className="bg-red-200 text-red-700 p-2 rounded-md my-4 flex flex-wrap items-center justify-center gap-4">
      {props.children}
    </div>
  );
};
