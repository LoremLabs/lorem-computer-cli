const setFlagDefaults = (context) => {
  // CONVENTION: flags that start with _ are considered private and not sent to an api
  // TODO: --_ is ugly. sorry ¯\_(ツ)_/¯
    
  // map between ENV and flags for defaults.
  context.flags._web3Storage =
    context.flags._web3Storage || process.env.WEB3_STORAGE_TOKEN;

  return context;
};

export { setFlagDefaults };
