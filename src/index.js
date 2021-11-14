import chalk from "chalk";
import getStdin from "get-stdin";

import * as actions from "./actions/index.js"; // add new top level actions here

const log = console.log;

// call the action with the given name
const lorem = async (commandInput) => {
  // read from STDIN. stdin = '' if no input
  const stdin = await getStdin();

  const { action, flags, input } = commandInput;
  flags.debug &&
    log(chalk.green(JSON.stringify({ action, flags, stdin, input })));

  if (Object.prototype.hasOwnProperty.call(actions, action)) {
    actions[action].exec({ ...commandInput, stdin });
  } else {
    log(chalk.red(`Action ${action} not found`));
    process.exit(1);
  }
};

export default lorem;
