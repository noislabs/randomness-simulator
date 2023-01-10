import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
} from "react";
import init from "nois";
import { InitOutput } from "nois";

export interface IDashboardContext {
  tab: string;
  switchTab: (val: string) => void;
  firstLoad: boolean;
  switchFirstLoad: (val: boolean) => void;
  noisWasm: InitOutput | undefined;
}

const AppDashboardContext = createContext<IDashboardContext>({
  tab: "",
  switchTab: (val: string) => {},
  firstLoad: false,
  switchFirstLoad: (val: boolean) => {},
  noisWasm: undefined,
});

export function DashboardContext({ children }: { children: any }) {
  const [currentTab, changeCurrentTab] = useState("");
  const [isFirstLoad, setIsFirstLoad] = useState(true);

  const [noisWasmProvider, setNoisWasmProvider] = useState<
    InitOutput | undefined
  >(undefined);

  const initNoisWasm = useCallback(async () => {
    const init_output = await init();
    setNoisWasmProvider(init_output);
  }, []);

  useEffect(() => {
    initNoisWasm();
  }, []);

  let global = {
    tab: currentTab,
    switchTab: (val: string) => changeCurrentTab(val),
    firstLoad: isFirstLoad,
    switchFirstLoad: (val: boolean) => setIsFirstLoad(val),
    noisWasm: noisWasmProvider,
  };

  return (
    <AppDashboardContext.Provider value={global}>
      {children}
    </AppDashboardContext.Provider>
  );
}

export function useDashboardContext() {
  return useContext(AppDashboardContext);
}
