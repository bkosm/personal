/** @jsx h */
import { h } from "preact";
import { tw } from "@twind";
import { PostPreview } from "../components/PostPreview.tsx";
import { Header } from "../components/Header.tsx";
import { Footer } from "../components/Footer.tsx";

export default function Home() {
  return (
    <div class={tw`p-4 mx-auto max-w-screen-md`}>
      <Header />
      <img
        src="/logo.svg"
        height="100px"
        alt="the fresh logo: a sliced lemon dripping with juice"
      />
      <p class={tw`my-6`}>
        Personal blog page written with Fresh, should contain markdown posts
        below!
      </p>

      {[...Array(10)].map((_, i) => (
        <PostPreview key={`post-${i}`} />
      ))}

      <Footer />
    </div>
  );
}
