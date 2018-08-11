const fs = require('fs');
const path = require('path');
const archiver = require('archiver');
const rootPath = require('app-root-path') + '';

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
  console.log(`Final zip file: ${packageSize}B out of ${MAX_PACKAGE_SIZE}B (${freeSpacePercentage}%)`);
}
