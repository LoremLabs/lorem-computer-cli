import fs from "fs";

import chalk from "chalk";

import { bestNamespace } from "../lib/directory.js";
import skeleton from "../lib/skeleton.js";

import { getFileIpfs, uploadIpfsWeb3Storage } from "../lib/ipfs.js";

const log = console.log;

// cmd: create
const exec = async (context) => {
  let command = context.input[2];

  switch (context.input[1]) {
    case "create":
      if (context.flags.createFile) {
        // Pass json via flag, read in.
        let payload = fs.readFileSync(context.flags.createFile);
        let input;
        try {
          input = JSON.parse(payload);
          if (context.flags.name !== input.name) {
            throw new Error("command name must match name in file");
          }
        } catch (e) {
          log(chalk.red(`Error: ${e}`));
          return;
        }

        context.debugLog(input);

        // upload to ipfs (web3.storage)
        let stored;
        try {
          if (context.flags._web3Storage) {
            stored = await uploadIpfsWeb3Storage({
              payload,
              token: context.flags._web3Storage,
            });
          } else {
            log(
              chalk.red(
                `No upload method chosen. Try passing a --_web3Storage token`
              )
            );
            process.exit(1);
          }
        } catch (e) {
          log(chalk.red(`Error: ${e}`));
          process.exit(1);
        }

        // instructions on how to add pr to map lorem cli command
        log(chalk.green("Command successfully uploaded to IPFS."));
        log(`
         CID: '${stored.cid}

 For this command to be picked up, you need to add it to a mapping service.

   ${input.name}: /ipfs/${stored.cid}
          
        `);
      } else {
        // else return skeleton to fill out with instructions
        let newCmd = context.input[2] || skeleton.name;
        let description =
          context.flags.description || skeleton.meta.description;
        let endpoint = context.flags.endpoint || skeleton.request.endpoint;
        let contact = context.flags.contact || skeleton.meta.contact;
        process.stderr.write(
          chalk.yellow(
            `lorem cmd create > ${newCmd}.json\n\nThen fill out and upload with\n\nlorem cmd create --createFile=./${newCmd}.json\n\n`
          )
        );
        skeleton.name = newCmd;
        skeleton.meta.description = description;
        skeleton.request.endpoint = endpoint;
        skeleton.meta.contact = contact;

        log(JSON.stringify(skeleton, null, 2));
        process.exit(0);
      }
      break;
    case "list":
      // Get the command.json from this command
      if (!command) {
        log(chalk.red("Error: No command specified."));
        process.exit(1);
      }

      await listCommand({ context, command });

      break;
    default:
      process.stderr.write(`Subcommand not found\nAvailable: [create]\n`); // TODO: show help?
      process.exit(0);
  }
};

const listCommand = async ({ context, command }) => {
  const namespaces = context.config.get("namespaces");

  const matched = await bestNamespace(namespaces, command);
  context.debugLog(matched);

  if (!matched.namespace) {
    log(
      chalk.red(`Couldn't find '${command}' in any namespace`),
      chalk.bgGrey(`[${namespaces.join(",")}]`)
    );
    process.exit(0);
  }
  const cid = matched.ipfs?.identifier;

  if (!cid) {
    log(chalk.red(`Couldn't cid for '${command}'`));
    process.exit(0);
  }

  !context.flags.quiet &&
    log(
      chalk.green(
        `Found '${command}' in namespace '${matched.namespace}' with cid '${cid}'\n\n`
      )
    );
  const data = await getFileIpfs({
    cid,
    token: context.flags._web3Storage,
  });
  log(data);
};

export { exec };
