const fs = require('fs');
const path = require('path');
const archiver = require('archiver');
const rootPath = require('app-root-path') + '';
const chalk = require('chalk');

const MAX_PACKAGE_SIZE = 13312;

const distPath = path.join(rootPath, '/dist');
const packageName = 'game.zip';
const zipPath = path.join(rootPath, packageName);
const output = fs.createWriteStream(zipPath);
const archive = archiver('zip', {
  zlib: { level: 9 },
});

archive.pipe(output);
archive.directory(distPath, false);

output.on('close', () => {
  const packageSize = archive.pointer();
  printAvailableSizeLimit(packageSize);
});

archive.finalize();

function printAvailableSizeLimit(packageSize) {
  const freeSpacePercentage = Math.round(packageSize / MAX_PACKAGE_SIZE * 100 * 100) / 100;
  const chalkColor = freeSpacePercentage <= 80 ? 'green' : (freeSpacePercentage <= 100) ? 'yellow' : 'red';
  console.log(
    `Final zip file: ` +
    `${chalk.bold[chalkColor](`${packageSize} bytes`)} ` +
    `out of ${chalk.bold(`${MAX_PACKAGE_SIZE} bytes`)} ` +
    `(${chalk.bold[chalkColor](`${freeSpacePercentage}%`)})`
  );
}
