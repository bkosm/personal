# State of testing in Fresh framework

Here I'm going to write some of my thoughts on testing capabilities when it
comes to _Fresh_ and how I went about using them in my website. All of the
following is based on my experience recorded within this
[page's repository](https://github.com/bkosm/personal).

## Unit testing

Unit testing is a very important part of any software development. It's a way to
make sure that your code is working as expected. It's also a way to make sure
that your code is not broken when you make some changes to it.

Ngl I played with Copilot on the previous paragraph.

Deno's built in testing framework works great and is super fast. As long as you
apply proper architecture to your frontend code, you can easily test the logic
behind it. It's a bit different on the visual side though.

My site is pretty straighforward so I'm not focused on full coverage of every
logic bit (like post sorting) but with some more modularity I would be able to
gain pretty significant confidence on those. My goal was to use visual approval
testing as a sanity check for my actions and to make sure that I'm not breaking
anything vital.

## Visual testing

The only examples of visual testing I found were directly in the framework's
repo.
[Unfortunately, they are integration tests](https://github.com/denoland/fresh/blob/main/tests/islands_test.ts),
not component level tests. I was not able to find any examples of component
level visual testing in _Fresh_. As much as it does not concern me (I'm just
writing a portfolio website), it's an important drawback for any enterprise
level application.

Following up to that, lack of any code scaling solution resembling module
federation is what I believe the `#1` reason this framework is not ready for
big-scale applications **yet**. We can always hack things around with e.g.
separate linked apps, but this is a blocker in adoption by any larger company.

## Integration testing

I was able to run pupeteer tests by
[manually running a Deno server in a
background process](https://github.com/bkosm/personal/blob/master/test/deps.ts).
It's not ideal, but it works - even in the pipeline.

> Ubuntu Github runners block all `localhost` ports which makes this approach
> impossible with that setup. I tried working around it with docker, but
> resigned after a couple of issues. Fortunately my use case benefits from macOS
> runners which do not cause issues in the matter.

With Deno even such a heavy solution is not that bad. Bringing up a server and
the _puppeteer_ takes less than 2 seconds locally. There is no reason to explain
how to test stuff with browser emulators, but I'd like to describe how I was
able to run visual regression tests with _Fresh_.

## Visual regression tests

Continuation soon...

---

Feel free to drop any questions and observations in the comments below or reach
out at twitter ([@bartkosmala](https://twitter.com/bartkosmala)) 🥳!
