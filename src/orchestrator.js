const fs = require('fs');
const path = require('path');

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
