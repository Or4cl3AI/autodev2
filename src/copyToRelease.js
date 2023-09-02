const fs = require('fs');
const path = require('path');

function copyFiles(filePaths) {
  filePaths.forEach(filePath => {
    const content = fs.readFileSync(filePath, 'utf-8');
    const releasePath = path.join('release', path.basename(filePath));
    fs.writeFileSync(releasePath, content);
  });
}

function getDependencies(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');
  const importRegex = /import .* from '(.*)';/g;
  let match;
  const dependencies = [];
  while ((match = importRegex.exec(content)) !== null) {
    dependencies.push(match[1]);
  }
  return dependencies;
}

function copyDependencies(filePaths) {
  filePaths.forEach(filePath => {
    const dependencies = getDependencies(filePath);
    copyFiles(dependencies);
  });
}

function copyToRelease(filePaths) {
  copyFiles(filePaths);
  copyDependencies(filePaths);
}

module.exports = copyToRelease;
