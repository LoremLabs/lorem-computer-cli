import Conf from "conf";
import toml from "@iarna/toml";

// if we need to persist anything to config, we can configure it here
const schema = {
  // foo: {
  // 	type: 'number',
  // 	maximum: 100,
  // 	minimum: 1,
  // 	default: 50
  // },
  // bar: {
  // 	type: 'string',
  // 	format: 'url'
  // }
  //   execs: {
  //     type: "number",
  //     minimum: 0,
  //   },
};

const config = new Conf({
  schema,
  fileExtension: "toml",
  serialize: (store) => {
    return toml.stringify(store);
  },
  deserialize: (inputToml) => {
    return toml.parse(inputToml);
  },
});

// config.set({
// 	execs: (1 + config.get("execs") || 0),
//   });

export default config;
