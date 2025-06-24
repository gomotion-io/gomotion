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

export enum WebContainerStatus {
  Idle = "idle",
  Booting = "booting",
  InstallingDeps = "installingDeps",
  StartingDevServer = "startingDevServer",
  UpdatingFiles = "updatingFiles",
}

type UseWebContainerOutput = {
  status: WebContainerStatus;
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
  const [status, setStatus] = useState<WebContainerStatus>(
    WebContainerStatus.Idle,
  );

  /* ----------------- install dependencies ----------------- */
  const installDependencies = useCallback(async () => {
    if (!wb.current) return;

    setStatus(WebContainerStatus.InstallingDeps);
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

    const exitCode = await installProcess.exit;
    setStatus(WebContainerStatus.Idle);
    return exitCode;
  }, [logToConsole]);

  /* ----------------- start dev server ----------------- */
  const startDevServer = useCallback(async () => {
    if (!wb.current) return;

    setStatus(WebContainerStatus.StartingDevServer);
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
      setStatus(WebContainerStatus.Idle);
      if (!iframe.current) return;
      iframe.current.src = url;
    });
  }, [logToConsole]);

  /* ----------------- mount / replace files ----------------- */
  const mountFiles = useCallback(async (tree: FileSystemTree) => {
    setStatus(WebContainerStatus.UpdatingFiles);
    if (!wb.current) return;
    await wb.current.fs.rm("/src", { recursive: true });
    await wb.current.mount(tree);
    setStatus(WebContainerStatus.Idle);
  }, []);

  /* ----------------- initialize and ensure single execution ----------------- */
  useEffect(() => {
    if (didBoot.current) return;
    setStatus(WebContainerStatus.Booting);
    didBoot.current = true;

    (async () => {
      try {
        wb.current = await getWebContainer();

        // Mount the file-system only the first time we create the container.
        if (!hasMountedFileSystem) {
          await wb.current.mount(rootFile);
          hasMountedFileSystem = true;
        }

        await installDependencies();
        await startDevServer();
      } catch (error) {
        console.error("Failed to initialize WebContainer:", error);
      }
    })();
  }, [installDependencies, startDevServer]);

  return useMemo(
    () => ({ wb, iframe, mountFiles, status }),
    [status, mountFiles],
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
