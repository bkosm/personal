/** @jsx h */
import { Fragment, h } from "preact";
import { useEffect, useState } from "preact/hooks";
import { useWeb3 } from "../utils/hooks.ts";

export default function Donation() {
  const { provider } = useWeb3();
  const [balance, setBalance] = useState<any | undefined>(undefined);

  useEffect(() => {
    (async function () {
      const res = await provider.send("eth_requestAccounts", []);

      setBalance(res);
    })();
  }, [provider]);

  return (
    <Fragment>
      {balance === undefined ? "loading..." : JSON.stringify(balance)}
    </Fragment>
  );
}
