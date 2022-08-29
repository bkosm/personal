/** @jsx h */
import { h } from "preact";
import { tw } from "twind";

// deno-lint-ignore no-empty-interface
interface Props extends h.JSX.HTMLAttributes<HTMLDivElement> {}

export function Navbar(props: Props) {
  return (
    <div
      class={tw`flex space-x-10 justify-center w-full lg:px-05 md:px-20 sm:px-16 p-3 bg-gray-900 mb-5 text-center text-white font-base sm:text-base text-sm`}
      {...props}
    >
      <a href="/">
        <img
          src="/logo.svg"
          alt="the fresh logo: a sliced lemon dripping with juice"
          width="50vw"
          class={tw`mx-auto`}
        />
      </a>

      <a href="/support" class={tw`m-auto font-semibold transition-all hover:text-gray-400`}>
        SUPPORT
      </a>
    </div>
  );
}
