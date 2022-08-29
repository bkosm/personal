/** @jsx h */
import { Fragment, h } from "preact";
import { tw } from "twind";
import { getInProd } from "../utils/common.ts";

export function Footer() {
  return (
    <footer
      class={tw`absolute bottom-0 w-full h-30 lg:px-05 md:px-20 sm:px-16 px-10 py-2 bg-gray-900 text-center text-white font-base sm:text-base text-sm`}
    >
      <div>
        Made with 💖 and 🍋
        {getInProd(
          <Fragment>
            {", "}
            <a
              target="_blank"
              href="https://github.com/bkosm/personal/actions/workflows/pipeline.yml"
            >
              <img
                class={tw`inline`}
                src="https://github.com/bkosm/personal/actions/workflows/pipeline.yml/badge.svg"
              />
            </a>
          </Fragment>
        )}
      </div>

      <a
        target="_blank"
        href="https://github.com/bkosm"
        class={tw`text-xl font-semibold transition-all hover:text-gray-400`}
      >
        © bkosm
      </a>
    </footer>
  );
}
