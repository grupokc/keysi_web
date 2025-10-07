const fs = require('fs');
const path = require('path');

// Ruta del directorio de componentes de bonos
const directoryPath = path.join(__dirname, '../components/bonos/rangos');

const searchPattern = /const\s+dollarUSLocale\s+=\s+Intl\.NumberFormat\([^)]+\);/g;
const replacement = `const dollarUSLocale = Intl.NumberFormat('en-US', {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2
});`;

const updateFileContent = (filePath) => {
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error(`Error reading file ${filePath}:`, err);
      return;
    }

    const updatedContent = data.replace(searchPattern, replacement);

    fs.writeFile(filePath, updatedContent, 'utf8', (err) => {
      if (err) {
        console.error(`Error writing file ${filePath}:`, err);
        return;
      }

      console.log(`File updated successfully: ${filePath}`);
    });
  });
};

const processDirectory = (dir) => {
  fs.readdir(dir, (err, files) => {
    if (err) {
      console.error(`Error reading directory ${dir}:`, err);
      return;
    }

    files.forEach((file) => {
      const filePath = path.join(dir, file);

      fs.stat(filePath, (err, stat) => {
        if (err) {
          console.error(`Error stating file ${filePath}:`, err);
          return;
        }

        if (stat.isFile() && filePath.endsWith('.tsx')) {
          updateFileContent(filePath);
        } else if (stat.isDirectory()) {
          processDirectory(filePath);
        }
      });
    });
  });
};

processDirectory(directoryPath);
