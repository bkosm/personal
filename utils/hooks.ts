import { ethers } from "https://cdn.skypack.dev/ethers";
import { useMemo } from "preact/hooks";

export function useWeb3(): { provider: ethers.Web3Provider } {
  const eth = window.ethereum;

  if (!eth) {
    throw new Error("No web3 provider found");
  }

  const provider = useMemo(() => new ethers.providers.Web3Provider(eth), []);
  return { provider };
}
