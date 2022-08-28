/** @jsx h */
import { h } from "preact";
import { tw } from "twind";

export function Footer() {
  return (
    <footer
      class={tw`absolute bottom-0 w-full h-30 lg:px-05 md:px-20 sm:px-16 px-10 bg-gray-900 text-center text-white font-base sm:text-base text-sm`}
    >
      <div>
        Made with 💖 and 🍋,{" "}
        <img
          class={tw`inline`}
          src="https://github.com/bkosm/personal/actions/workflows/pipeline.yml/badge.svg"
        />
      </div>

      <a
        target="_blank"
        href="https://github.com/bkosm"
        class={tw`hover:underline font-semibold`}
      >
        © bkosm
      </a>
    </footer>
  );
}
