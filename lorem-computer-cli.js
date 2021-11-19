#!/usr/bin/env node
import meow from "meow";
import updateNotifier from "update-notifier";

import dotenv from "dotenv";
dotenv.config();

import fs from "fs";

import config from "./src/config.js";
import lorem from "./src/index.js";

const pkgJson = JSON.parse(fs.readFileSync("./package.json"));

const defaultHelp = `
  lorem: command line access to lorem.computer

  $ lorem --help

  Usage
    $ lorem [input]

  Options
    --debug=[bool]  [Default: false]
    --help          [Default: false]
    --__web3StorageToken=[string]  [Default: null]

    Examples
    $ lorem

    Command
    $ lorem cmd create --createFile="./path/to/file.js" --name="commandname" [--__web3Storage=true]

    Config
    $ lorem config get
    $ lorem config set key.subkey val
    $ lorem config set arrayKey val1 val2 --array
    $ lorem config del key

    Run Commands
    $ lorem run [command name] [...command params]
`;

const cli = meow(defaultHelp, {
  importMeta: import.meta,
  flags: {
    // debug: {
    //   type: "boolean",
    //   default: false,
    // }
  },
});

if (cli.input.length === 0 || cli.input[0] === "help") {
  process.stderr.write(`${defaultHelp}\n`);
  process.exit(0);
}

lorem({ action: cli.input[0], flags: cli.flags, input: cli.input, config });

updateNotifier({
  pkg: pkgJson,
  defer: true,
}).notify();
