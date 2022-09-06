import { useEffect, useState } from "preact/hooks";
import Web3 from "https://deno.land/x/web3@v0.11.1/mod.ts";

export type Web3Hook = {
  web3: Web3;
  mainAccountAddress: string;
};

export function useWeb3Provider(): Web3Hook | undefined {
  const [state, setState] = useState<Web3Hook | undefined>(undefined);

  useEffect(() => {
    (async function () {
      const eth = window.ethereum;

      if (!eth) {
        console.error("No web3 provider found");
      } else if (!eth.isMetaMask) {
        console.error("Currently support works only with MetaMask");
      } else {
        const web3 = new Web3(eth);
        const accounts = await web3.eth.requestAccounts();
        setState({ web3, mainAccountAddress: accounts[0] });
      }
    })();
  }, []);

  return state;
}
