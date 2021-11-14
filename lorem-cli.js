#!/usr/bin/env node
import meow from "meow";
import lorem from "./src/index.js";
import updateNotifier from "update-notifier";

import fs from "fs";
const pkgJson = JSON.parse(fs.readFileSync("./package.json"));

const defaultHelp = `
  lorem: command line access to lorem.computer

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

lorem(cli.input[0], cli.flags, cli.argv); // action, flags

updateNotifier({
  pkg: pkgJson,
  defer: true,
}).notify();
