import chalk from "chalk";
import getStdin from "get-stdin";

const log = console.log;

const lorem = async (action, flags) => {
  // read from STDIN. stdin = '' if no input
  const stdin = await getStdin();

  flags.debug && log(chalk.green(JSON.stringify({ action, flags, stdin })));

  // log(`
  // CPU: ${chalk.red('90%')}
  // RAM: ${chalk.green('40%')}
  // DISK: ${chalk.yellow('70%')}
  // `);

  // actions: run = execute command
  //          list = list commands

  if (action === "run") {
    flags.debug && log(chalk.green("running `run`"));
  } else if (action === "list") {
    flags.debug && log(chalk.green("running `list`"));
  } else {
    throw new Error("command not implemented");
  }
};

export default lorem;
