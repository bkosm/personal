import { MetaMaskInpageProvider } from "https://cdn.skypack.dev/@metamask/providers";

declare global {
  interface Window {
    ethereum?: MetaMaskInpageProvider;
  }
}
