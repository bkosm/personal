/** @jsx h */
import { Fragment, h } from "preact";
import { tw } from "@twind";
import { PageProps } from "$fresh/server.ts";
import { Header } from "../components/Header.tsx";
import { Footer } from "../components/Footer.tsx";
import Donation from "../islands/Donation.tsx";
import { Navbar } from "../components/Navbar.tsx";

export default function SupportPage(props: PageProps) {
  const title = `Support me! - bkosm`;

  return (
    <Fragment>
      <Navbar />
      <div class={tw`relative`}>
        <Header title={title} />

        <article
          class={tw`md:px-20 sm:px-16 px-10 pb-28 2xl:px-60 xl:px-50 lg:px-36`}
        >
          Hellow! Gib me moneys!
        </article>
        <Donation />
        <Footer />
      </div>
    </Fragment>
  );
}
