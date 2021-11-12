export type LayoutProps = {
  spread: string;
  pair: string;
  children?: React.ReactNode;
};

export const Layout = (props: LayoutProps) => {
  const headerFooterClassNames = "text1 surface1 p-4 border-b borderColor";
  return (
    <div className="flex flex-col min-h-screen">
      <header
        className={`flex justify-center items-center relative ${headerFooterClassNames}`}
      >
        <h1 id="orderbook" className="absolute left-4">
          Order Book ({props.pair})
        </h1>

        <p className="text2 hidden md:block">Spread {props.spread}</p>
      </header>
      <main className="flex-1">
        <div className="p-4">{props.children}</div>
      </main>
    </div>
  );
};
