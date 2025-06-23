import { WebContainer } from "@webcontainer/api";
import { Terminal } from "@xterm/xterm";
import { RefObject, useCallback, useEffect, useMemo, useRef } from "react";
import { rootFile } from "@/hooks/root-file";

type UseWebContainerOutput = {
  wb: RefObject<WebContainer | null>;
  iframe: RefObject<HTMLIFrameElement | null>;
  writeIndexJS: (content: string) => Promise<void>;
  xterm: RefObject<Terminal | null>;
};

export const useWebContainer = (): UseWebContainerOutput => {
  const didBoot = useRef(false);
  const wb = useRef<WebContainer | null>(null);
  const iframe = useRef<HTMLIFrameElement>(null);
  const xterm = useRef<Terminal | null>(null);

  /* ----------------- install dependencies ----------------- */
  const installDependencies = useCallback(async (terminal: Terminal) => {
    if (!wb.current) return;
    const installProcess = await wb.current.spawn("npm", ["install"]);
    installProcess.output
      .pipeTo(
        new WritableStream({
          write(data) {
            terminal.write(data);
          },
        }),
      )
      .catch(console.error);
    return installProcess.exit;
  }, []);

  /* ----------------- start dev server ----------------- */
  const startDevServer = useCallback(async (terminal: Terminal) => {
    if (!wb.current) return;
    const startProcess = await wb.current.spawn("npm", ["run", "start"]);

    startProcess.output
      .pipeTo(
        new WritableStream({
          write(data) {
            terminal.write(data);
          },
        }),
      )
      .catch(console.error);

    wb.current.on("server-ready", (_, url) => {
      if (!iframe.current) return;
      iframe.current.src = url;
    });
  }, []);

  /* ----------------- write file ----------------- */
  const writeIndexJS = useCallback(async (content: string) => {
    if (!wb.current) return;
    await wb.current.fs.writeFile("/index.js", content);
  }, []);

  /* ----------------- initialize : ensure single execution ----------------- */
  useEffect(() => {
    if (didBoot.current) return; // Prevent double-boot in React StrictMode
    didBoot.current = true;

    (async () => {
      xterm.current = new Terminal({
        convertEol: true,
      });

      // In case another component already booted the WebContainer, reuse it
      if (!wb.current) {
        wb.current = await WebContainer.boot();
        await wb.current.mount(rootFile);
      }

      const exitCode = await installDependencies(xterm.current);
      if (exitCode !== 0) {
        throw new Error("Installation failed");
      }

      await startDevServer(xterm.current);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps -- run only once intentionally
  }, []);

  return useMemo(() => ({ wb, iframe, writeIndexJS, xterm }), [writeIndexJS]);
};
