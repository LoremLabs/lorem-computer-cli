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

  if (action === "unicorns") {
    const outputString = flags.rainbow ? "🌈 unicorns 🌈" : "unicorns";
    log(outputString);
  } else {
    throw new Error("command not implemented");
  }
};

export default lorem;
