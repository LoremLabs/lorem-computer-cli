const log = console.log;

const exec = (context) => {
  context.flags.debug && log("run");
  const namespaces = context.config.get("namespaces");
  log(namespaces);
  // foreach namespace,
  // lookup app path in ipns
  // if found, go get app definition
  // execute app with our context (stdin, flags, argv, etc)
  // can return: requestId, response, signatureRequest, ...?
};

export { exec };
