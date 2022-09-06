import { MetaMaskInpageProvider } from "https://cdn.skypack.dev/@metamask/providers?dts";

declare global {
  interface Window {
    ethereum?: MetaMaskInpageProvider;
  }
}
