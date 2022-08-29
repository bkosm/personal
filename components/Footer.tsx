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
        <a
          target="_blank"
          href="https://github.com/bkosm/personal/actions/workflows/pipeline.yml"
        >
          <img
            class={tw`inline`}
            src="https://github.com/bkosm/personal/actions/workflows/pipeline.yml/badge.svg"
          />
        </a>
      </div>

      <a
        target="_blank"
        href="https://github.com/bkosm"
        class={tw`font-semibold transition-all hover:text-gray-400`}
      >
        © bkosm
      </a>
    </footer>
  );
}
