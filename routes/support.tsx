/** @jsx h */
import { Fragment, h } from "preact";
import { tw } from "@twind";
import { Header } from "../components/Header.tsx";
import { Footer } from "../components/Footer.tsx";
import { Navbar } from "../components/Navbar.tsx";
import Donation from "../islands/Donation.tsx";

export default function SupportPage() {
  return (
    <Fragment>
      <Header title={`Support me!`} />
      <Navbar />
      <div class={tw`p-4 mx-auto max-w-screen-md`}>
        <article class={tw`text-2xl text-center font-bold font-mono`}>
          Under construction!
        </article>
        <Donation />
      </div>
      <Footer />
    </Fragment>
  );
}
