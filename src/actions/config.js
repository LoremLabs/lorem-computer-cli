const log = console.log;

// config: get, set, del
const exec = (input) => {
  if (input.input[1] === "get") {
    log(`${JSON.stringify(input.config.get())}`);
  } else if (input.input[1] === "set") {
    if (input.input.length === 4) {
      input.config.set(input.input[2], input.input[3]);
    } else {
      log("Usage: lorem config set key val");
      process.exit(2);
    }
  } else if (input.input[1] === "del") {
    input.config.delete(input.input[2]);
  } else {
    log("Usage: lorem config [get|set]");
    process.exit(2);
  }
};

export { exec };
