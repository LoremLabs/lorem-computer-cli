#!/usr/bin/env node
import meow from "meow";
import lorem from "./src/index.js";

const defaultHelp = `
  Usage
    $ lorem [input]

  Options
    --debug=[bool]  [Default: false]

  Examples
    $ lorem
  `;

const cli = meow(defaultHelp, {
  importMeta: import.meta,
  flags: {
    rainbow: {
      type: "boolean",
      alias: "r",
    },
    debug: {
      type: "boolean",
      default: true,
    },
  },
});

if (cli.input.length === 0) {
  process.stderr.write(`${defaultHelp}\n`);
  process.exit(0);
}

lorem(cli.input[0], cli.flags); // action, flags
