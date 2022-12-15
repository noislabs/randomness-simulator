import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
} from "react";
import init from "nois";
import { InitOutput } from "nois";

// const rpcEndpoint = process.env.NEXT_PUBLIC_RPC_ENDPOINT;
// const noisOracleAddress = process.env.NEXT_PUBLIC_PROXYCONTRACT_ADDRESS;
// const noisOracleAddress = "nois1s9ly26evj8ehurptws5d6dm4a9g2z0htcqvlvn95kc30eucl4s5sd8hkgp";

export interface IDashboardContext {
  tab: string;
  switchTab: (val: string) => void;
  noisWasm: InitOutput | undefined;
}

const AppDashboardContext = createContext<IDashboardContext>({
  tab: "",
  switchTab: (val: string) => {},
  noisWasm: undefined,
});

export function DashboardContext({ children }: { children: any }) {
  const [currentTab, changeCurrentTab] = useState("");

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
