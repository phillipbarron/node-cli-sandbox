const prompt = require("prompt");
const colours = require("colors");

prompt.message = "Please enter required value".green;

const requiredValues = [
  {
    name: "E2E_TEST_USERNAME"
  },
  {
    name: "E2E_TEST_USERNAME_PASSWORD",
    hidden: true,
    replace: "*"
  }
];

const filterOutExistingPropeties = () => {
  return requiredValues.reduce((init, current) => {
    if (!process.env[current.name]) {
      init.push(current);
      return init;
    }
    return init;
  }, []);
};

const getRequiredValuesFromEnvironment = () => {
  return requiredValues.reduce((init, current) => {
    init.push(process.env[current.name]);
    return init;
  }, []);
};

new Promise((resolve, reject) => {
  const missingValues = filterOutExistingPropeties();
  if (!missingValues) {
    console.log("there are no missing properties");
    resolve();
  }
  prompt.start();

  prompt.get(missingValues, (err, result) => {
    if (err) {
      console.log("failed to get required input", err);
      reject(1);
    }
    for (var key in result) {
      process.env[key] = result[key];
    }
    resolve(getRequiredValuesFromEnvironment());
  });
}).then(result => {
  console.log("all the details are", result);
  console.log(
    "at this stage, we have everything that we need so we can carry on"
  );
});
