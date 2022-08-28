/** @jsx h */
import { Fragment, h } from "preact";
import { useEffect, useState } from "preact/hooks";
import { useWeb3Provider } from "../utils/hooks.ts";

export default function Donation() {
  const [res, setRes] = useState<any | undefined>(undefined);
  // const provider = useWeb3Provider();

  // useEffect(() => {
  //   (async function () {
  //     if (provider) {
  //       const res = await provider.web3.eth.getBalance(
  //         provider.mainAccountAddress,
  //       );
  //       setRes(res);
  //     }
  //   })();
  // }, [provider]);

  return (
    <Fragment>
      {res === undefined ? "loading..." : JSON.stringify(res)}
    </Fragment>
  );
}
