/// <reference types="https://cdn.skypack.dev/-/@types/node@v18.7.15-la7C7xX02Im5ie76c2WO/dist=es2019,mode=imports/optimized/@types/node.js"/>
// Missing node types cause a log on page entry😭 The above does not fix due to being Deno, but it should elsewise.
import { MetaMaskInpageProvider } from "https://cdn.skypack.dev/@metamask/providers";

declare global {
  interface Window {
    ethereum?: typeof MetaMaskInpageProvider;
  }
}
