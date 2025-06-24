import { rootFile } from "@/hooks/webcontainer/root-file";
import { type FileSystemTree, WebContainer } from "@webcontainer/api";
import {
  RefObject,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

let hasMountedFileSystem = false;
let globalWebContainer: WebContainer | null = null;
let isBooting = false;
let bootPromise: Promise<WebContainer> | null = null;

type UseWebContainerOutput = {
  initProgress: number | null;
  wb: RefObject<WebContainer | null>;
  iframe: RefObject<HTMLIFrameElement | null>;
  mountFiles: (tree: FileSystemTree) => Promise<void>;
};

export const useWebContainer = (
  logToConsole = false,
): UseWebContainerOutput => {
  const didBoot = useRef(false);
  const wb = useRef<WebContainer | null>(null);
  const iframe = useRef<HTMLIFrameElement>(null);
  const [progress, setProgress] = useState<number | null>(null);

  /* ----------------- install dependencies ----------------- */
  const installDependencies = useCallback(async () => {
    if (!wb.current) return;

    const installProcess = await wb.current.spawn("npm", ["install"]);

    installProcess.output
      .pipeTo(
        new WritableStream({
          write(data) {
            if (logToConsole) {
              console.log(String(data));
            }
          },
        }),
      )
      .catch(console.error);

    return await installProcess.exit;
  }, [logToConsole]);

  /* ----------------- start dev server ----------------- */
  const startDevServer = useCallback(async () => {
    if (!wb.current) return;

    const startProcess = await wb.current.spawn("npm", ["run", "start"]);

    startProcess.output
      .pipeTo(
        new WritableStream({
          write(data) {
            if (logToConsole) {
              console.log(String(data));
            }
          },
        }),
      )
      .catch(console.error);

    wb.current.on("server-ready", (_, url) => {
      if (!iframe.current) return;
      iframe.current.src = url;
    });
  }, [logToConsole]);

  /* ----------------- mount / replace files ----------------- */
  const mountFiles = useCallback(async (tree: FileSystemTree) => {
    if (!wb.current) return;
    await wb.current.fs.rm("/src", { recursive: true });
    await wb.current.mount(tree);
  }, []);

  /* ----------------- initialize and ensure single execution ----------------- */
  useEffect(() => {
    if (didBoot.current) return;
    setProgress(0);
    didBoot.current = true;

    (async () => {
      try {
        setProgress(0.25);
        wb.current = await getWebContainer();
        // Mount the file-system only the first time we create the container.
        if (!hasMountedFileSystem) {
          await wb.current.mount(rootFile);
          hasMountedFileSystem = true;
        }
        setProgress(0.5);
        await installDependencies();
        setProgress(0.75);
        await startDevServer();
        setProgress(1);
        setTimeout(() => setProgress(null), 1000);
      } catch (error) {
        console.error("Failed to initialize WebContainer:", error);
      }
    })();
  }, []);

  return useMemo(
    () => ({ wb, iframe, mountFiles, initProgress: progress }),
    [progress, mountFiles],
  );
};

// Global function to get or create WebContainer instance
const getWebContainer = async (): Promise<WebContainer> => {
  if (globalWebContainer) {
    return globalWebContainer;
  }

  if (isBooting && bootPromise) {
    return bootPromise;
  }

  isBooting = true;
  bootPromise = WebContainer.boot().then((container) => {
    globalWebContainer = container;
    isBooting = false;
    return container;
  });

  return bootPromise;
};
