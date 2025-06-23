import { FC, RefObject, useEffect, useRef } from "react";
import { Terminal } from "@xterm/xterm";
import "@xterm/xterm/css/xterm.css";

type TermProps = {
  xterm: RefObject<Terminal | null>;
};

export const Term: FC<TermProps> = ({ xterm }) => {
  const term = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!xterm.current || !term.current) return;
    xterm.current.open(term.current);
  }, [xterm, term]);

  return (
    <div
      className="left-5 w-[22rem] border border-emerald-500 absolute -z-1 h-[26rem]"
      ref={term}
    ></div>
  );
};
