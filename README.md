[![CICD](https://github.com/bkosm/personal/actions/workflows/pipeline.yml/badge.svg)](https://github.com/bkosm/personal/actions/workflows/pipeline.yml)

# Personal blog website implemented with Fresh

## Features

- fully serverless and free of charges
  - hosted for free on [deno deploy](https://deno.com/deploy)
  - comments powered by [gitalk](https://github.com/gitalk/gitalk)
- posts written in pure markdown
- testing automated with simple self-made
  [visual regression tests](https://medium.com/loftbr/visual-regression-testing-eb74050f3366)
  - following the
    [approval test](https://www.methodsandtools.com/archive/approvaltest.php)
    approach
- super fast, lighthouse loves it
- pipeline'd all the way to production

---

## "I want to try it locally"

Install puppeteer distro:

```bash
deno task install-puppeteer
```

Start local server:

```bash
deno task start
```

Run all tests:

```bash
deno test --allow-all
```

Regenerate text-snapshots:

```bash
deno task update-snapshots
```

---

## Generated snapshots preview

Can be found [here](/test/__snapshots__/README.md)!
