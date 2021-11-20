import chalk from "chalk";
import fetch from "node-fetch";

import { bestNamespace } from "../lib/directory.js";
import { getFileIpfs } from "../lib/ipfs.js";
import { getLocalCommand } from "../lib/local.js";

const log = console.log;

const parseCommand = (data) => {
  let command;
  try {
    command = JSON.parse(data);
  } catch (e) {
    log(chalk.red(`Couldn't parse command.json`));
    process.exit(1);
  }
  return command;
};

const processResponse = async (context, data) => {
  // simple response
  if (data.stdout) {
    log(data.stdout);
  }
  if (data.stderr) {
    log(chalk.red(data.stderr));
  }
  
  // allow multiple actions
  if (data.actions) {
    let action;
    let i = 0;
    for (i in data.actions) {
      action = data.actions[i];
      context.debugLog(`Action ${JSON.stringify(action)}`);

      if (action.type === "redirect") {
        context.redirect(action.url);
      }
      if (action.type === "stdout") {
        if (action.color) {
          process.stdout.write(chalk[action.color](action.msg + "\n"));
        } else {
          process.stdout.write(action.msg + "\n");
        }
      }
      if (action.type === "stderr") {
        if (action.color) {
          process.stderr.write(chalk[action.color](action.msg + "\n"));
        } else {
          process.stderr.write(action.msg + "\n");
        }
      }
    }
  }
};

const doCommand = async (context, command) => {
  context.debugLog(`Running ${command.name}`);

  // hit endpoint, pass along {stdin, flags, argv, ...}
  // TODO: Add AbortController, timeout

  const params = new URLSearchParams();
  for (const [key, value] of Object.entries(context.flags)) {
    // sensitive data scrub
    if (key.startsWith("_")) {
      continue;
    }
    params.append(`flag.${key}`, value);
  }
  if (context.input) {
    params.append("input", JSON.stringify(context.input));
  }
  if (context.stdin) {
    params.append("stdin", context.stdin);
  }

  // TODO: add headers for signatures, etc
  const url = command.request.endpoint;
  if (url.startsWith("http")) {
    const fullUrl = `${url}?${params.toString()}`;
    context.debugLog(`Fetching ${fullUrl}`);

    const response = await fetch(fullUrl);

    if (response.status !== 200) {
      log(chalk.red(`Error: ${response.status}`));
      log(chalk.red(`${response.statusText}`));
      process.exit(1);
    }
    const data = await response.json();
    context.debugLog('response', data);
    await processResponse(context, data);
  } else {
    log(`${chalk.red("ERROR:")} ${url} protocol not supported`);
    process.exit(1);
  }
};

const runLocal = async (context, data) => {
  if (data.length > 0) {
    let command = parseCommand(data);
    context.debugLog(command);
    doCommand(context, command);
  }
};

const runIpfs = async (context) => {
  const cid = context.ipfs?.identifier;
  if (cid) {
    context.debugLog(`Looking up ${context.ipfs.identifier}`);
  } else {
    log(chalk.red("Missing IPFS path"));
  }

  // fetch command.json from IPFS
  context.debugLog("Looking up via IPFS");
  let data = await getFileIpfs({
    cid,
    token: context.flags._web3Storage,
  });

  let command = parseCommand(data);
  context.debugLog(command);

  // create API request and send to server
  // argv, flags, stdin, ...
  doCommand(context, command);
};

const exec = async (context) => {
  // START OF EXEC
  context.debugLog("run");
  const task = context.input[1];
  if (!task) {
    log(chalk.red("missing task"));
    process.exit(1);
  }

  let data = getLocalCommand(context, task);
  if (data && data.length > 0) {
    // short circuit for local commands
    return runLocal(context, data);
  }

  // run IPFS commands
  const namespaces = context.config.get("namespaces");
  // log(namespaces, JSON.stringify(context));

  const matched = await bestNamespace(namespaces, task);

  // log(matched);
  if (!matched.namespace) {
    log(
      chalk.red(`Couldn't find '${task}' in any namespace`),
      chalk.bgGrey(`[${namespaces.join(",")}]`)
    );
    process.exit(0);
  }

  context.debugLog(`matched namespace ${matched.namespace}`, matched);

  // execute app with our context (stdin, flags, argv, etc)
  // can return: requestId, response, signatureRequest, ...?
  const start = Date.now();
  await runIpfs({ ...context, ...matched });
  context.debugLog({ runtime: Date.now() - start });
};

export { exec };
