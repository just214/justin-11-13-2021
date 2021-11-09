export type LayoutProps = {
  spread: string;
  children?: React.ReactNode;
};

export const Layout = (props: LayoutProps) => {
  const { children } = props;
  const headerFooterClassNames = "text1 surface1 p-4 border-b borderColor";
  return (
    <div className="flex flex-col min-h-screen">
      <header
        className={`flex justify-center items-center relative ${headerFooterClassNames}`}>
        <p className="absolute left-4">Order Book</p>
        <p className="text2 hidden md:block">Spread {props.spread}</p>
      </header>
      <main className="flex-1">
        <div className="container mx-auto p-4">{children || "My New Page"}</div>
      </main>
    </div>
  );
};
