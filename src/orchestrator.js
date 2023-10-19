const fs = require('fs');
const path = require('path');

/**
 * @async
 * @function orchestrate
 * @description Removes the postinstall script line from package.json.
 * This function reads the package.json file, removes the postinstall line from the scripts object,
 * and then writes the modified object back to the package.json file.
 * @throws Will throw an error if unable to read or write to the package.json file.
 * @returns {Promise<void>}
 */
async function orchestrate() {
  try {
    // Supprimer la ligne postinstall du package.json
    const packagePath = path.resolve(__dirname, '../package.json');
    // eslint-disable-next-line import/no-dynamic-require, global-require
    const packageJson = require(packagePath);
    delete packageJson.scripts.postinstall;
    fs.writeFileSync(packagePath, JSON.stringify(packageJson, null, 2));
  } catch (error) {
    throw new Error(error);
  }
}

orchestrate();
