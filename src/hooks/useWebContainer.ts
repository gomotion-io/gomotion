import { rootFile } from "@/hooks/root-file";
import { type FileSystemTree, WebContainer } from "@webcontainer/api";
import { Terminal } from "@xterm/xterm";
import { RefObject, useCallback, useEffect, useMemo, useRef } from "react";

let webContainerInstance: WebContainer | null = null;
let hasMountedFileSystem = false;

type UseWebContainerOutput = {
  wb: RefObject<WebContainer | null>;
  iframe: RefObject<HTMLIFrameElement | null>;
  mountFiles: (tree: FileSystemTree) => Promise<void>;
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

  /* ----------------- mount / replace files ----------------- */
  const mountFiles = useCallback(async (tree: FileSystemTree) => {
    const container = wb.current ?? webContainerInstance;
    if (!container) return;

    try {
      // Remove the existing `/src` directory to avoid stale files.
      await container.fs.rm("/src", { recursive: true }).catch(() => {});
    } catch {
      // directory might not exist – ignore
    }

    // Any files declared in `tree` will be created/overwritten.
    await container.mount(tree);
  }, []);

  /* ----------------- initialize and ensure single execution ----------------- */
  useEffect(() => {
    if (didBoot.current) return; // Prevent double-boot in React StrictMode
    didBoot.current = true;

    (async () => {
      xterm.current = new Terminal({
        convertEol: true,
      });

      // Boot the global WebContainer instance only once and reuse it.
      if (!webContainerInstance) {
        webContainerInstance = await WebContainer.boot();
      }

      // Store the instance in the ref so that the rest of the hook API
      // continues to work with the same signature.
      wb.current = webContainerInstance;

      // Mount the file-system only the first time we create the container.
      if (!hasMountedFileSystem) {
        await webContainerInstance.mount(rootFile);
        hasMountedFileSystem = true;
      }

      const exitCode = await installDependencies(xterm.current);
      if (exitCode !== 0) {
        throw new Error("Installation failed");
      }

      await startDevServer(xterm.current);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps -- run only once intentionally
  }, []);

  return useMemo(() => ({ wb, iframe, mountFiles, xterm }), [mountFiles]);
};
