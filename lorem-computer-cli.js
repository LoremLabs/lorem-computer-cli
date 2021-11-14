#!/usr/bin/env node
import meow from "meow";
import updateNotifier from "update-notifier";

import config from "./src/config.js";
import lorem from "./src/index.js";

import fs from "fs";
const pkgJson = JSON.parse(fs.readFileSync("./package.json"));

const defaultHelp = `
  lorem: command line access to lorem.computer

  $ lorem --help

  Usage
    $ lorem [input]

  Options
    --debug=[bool]  [Default: false]

  Examples
    $ lorem

    Config
    $ lorem config get
    $ lorem config set key.subkey val
    $ lorem config del key

`;

const cli = meow(defaultHelp, {
  importMeta: import.meta,
  flags: {
    debug: {
      type: "boolean",
      default: false,
    },
  },
});

if ((cli.input.length === 0) || (cli.input[0] === "help")) {
  process.stderr.write(`${defaultHelp}\n`);
  process.exit(0);
}

lorem({ action: cli.input[0], flags: cli.flags, input: cli.input, config });

updateNotifier({
  pkg: pkgJson,
  defer: true,
}).notify();
