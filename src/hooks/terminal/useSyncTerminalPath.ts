import { usePathname } from "next/navigation";
import { useEffect } from "react";
import {
  TERMINAL_CONFIG,
  TERMINAL_HOME_PATH,
} from "@/constants/terminal/terminalConfig";

interface UseSyncTerminalPathProps {
  setCurrentPath: (path: string) => void;
}

export const useSyncTerminalPath = ({
  setCurrentPath,
}: UseSyncTerminalPathProps) => {
  const pathname = usePathname();

  useEffect(() => {
    const pathSegment = pathname.slice(1);

    if (pathname === "/") {
      setCurrentPath(TERMINAL_HOME_PATH);
    } else if (TERMINAL_CONFIG.endpoints.includes(pathSegment)) {
      setCurrentPath(TERMINAL_HOME_PATH + "/" + pathSegment);
    } else {
      setCurrentPath(TERMINAL_HOME_PATH + "/" + "not-found");
    }
  }, [pathname, setCurrentPath]);

  return pathname;
};
