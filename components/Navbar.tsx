/** @jsx h */
import { h } from "preact";
import { tw } from "twind";

// deno-lint-ignore no-empty-interface
interface Props extends h.JSX.HTMLAttributes<HTMLDivElement> {}

export function Navbar(props: Props) {
  return (
    <div
      {...props}
      class={tw`w-full lg:px-05 md:px-20 sm:px-16 p-3 bg-gray-900 mb-5 text-center text-white font-base sm:text-base text-sm`}
    >
      <a href="/">
        <img
          src="/logo.svg"
          alt="the fresh logo: a sliced lemon dripping with juice"
          class={tw`mx-auto`}
        />
      </a>
    </div>
  );
}
