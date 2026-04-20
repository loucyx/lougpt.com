# lougpt.com

Simple LLM parody site that uses [`compromise`](https://npm.im/compromise) for
the language processing part, and a bunch of sassy replies are generated out of
it. To keep it simple it uses a plain HTML form and then it attaches state to
it. The dynamic part is handled by [`preact`](https://preactjs.com/).

## Dependencies

- [Deno](https://deno.com/): The base JS/TS runtime used for this project.
- [`@coven/parsers`](https://coven.to/parsers): We only use
  [`parseJSON`](https://coven.to/parsers/doc/~/parseJSON) from this library.
- [`@coven/predicates`](https://coven.to/predicates): For checking for type and
  values.
- [`@coven/rules`](https://coven.to/rules): To setup basic linting rules.
- [`@coven/types`](https://coven.to/types): For some common types.
- [`@simulcast/core`](https://simulcast.coven.to/core): To broadcast the submit
  event from the form to the preact side of things.
- [`@simulcast/preact`](https://simulcast.coven.to/preact): To listen to the
  broadcast from the vanilla side of things.
- [`@std/http`](https://jsr.io/@std/http): To handle the requests and serving
  (part of the standard libraries offered by the Deno team).
- [`compromise`](https://npm.im/compromise): As a natural language processor.
- [`preact`](https://npm.im/preact): As the VDOM handler.
- [`prettier`](https://npm.im/prettier): As the formatting tool.
