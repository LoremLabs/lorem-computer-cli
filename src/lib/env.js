import chalk from "chalk";
import open from "open";
import prompts from "prompts";

const setFlagDefaults = (context) => {
  // CONVENTION: flags that start with _ are considered private and not sent to an api
  // TODO: --_ is ugly. sorry ¯\_(ツ)_/¯

  // map between ENV and flags for defaults.
  context.flags._web3Storage =
    context.flags._web3Storage || process.env.WEB3_STORAGE_TOKEN;

  return context;
};

const setContextFunctions = (context) => {
  context.debugLog = (...args) => {
    context.flags.debug && console.log(chalk.blue("[DEBUG]"), ...args);
  };

  context.redirect = async (url) => {
    context.debugLog(`Url: ${url}`);
    const response = await prompts([
      {
        type: "toggle",
        name: "confirmtoggle",
        message: `Open ?`,
        active: "yes",
        inactive: "no",
      },
    ]);
    if (response.confirmtoggle) {
      await open(url);
    }
  };
};

export { setFlagDefaults, setContextFunctions };
