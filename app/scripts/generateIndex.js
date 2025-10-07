// app/scripts/generateIndex.js
const fs = require('fs');
const path = require('path');

const componentsDirectoryPath = path.join(__dirname, '../components/bonos/rangos');
const outputDirectoryPath = path.join(__dirname, '../lib');
const outputFilePath = path.join(outputDirectoryPath, 'indexBonosRangos.ts');
const detailsFilePath = path.join(__dirname, '../bonos/detalles/[Bono_Periodo]/page.tsx');

fs.readdir(componentsDirectoryPath, (err, files) => {
  if (err) {
    return console.log('Unable to scan directory: ' + err);
  }

  const exports = files
    .filter(file => file.endsWith('.tsx'))
    .map(file => {
      const moduleName = file.replace('.tsx', '');
      const validModuleName = `BonosRangos${moduleName}`;
      return `export { default as ${validModuleName} } from '@/app/components/bonos/rangos/${moduleName}';`;
    });

  const indexContent = exports.join('\n');

  if (!fs.existsSync(outputDirectoryPath)) {
    fs.mkdirSync(outputDirectoryPath, { recursive: true });
  }

  fs.writeFileSync(outputFilePath, indexContent);

  // Generate the bonosRangosMap content
  const mapEntries = files
    .filter(file => file.endsWith('.tsx'))
    .filter(file => !isNaN(Number(file.replace('.tsx', '')))) // Only include numeric keys
    .map(file => {
      const moduleName = file.replace('.tsx', '');
      const validModuleName = `BonosRangos${moduleName}`;
      return `  ${moduleName}: BonosRangos.${validModuleName}`;
    });

  const mapContent = `
const bonosRangosMap: { [key: number]: React.ElementType } = {
${mapEntries.join(',\n')},
};
`;

  // Read the Details.tsx file
  let detailsFileContent = fs.readFileSync(detailsFilePath, 'utf8');

  // Replace the existing bonosRangosMap with the new one
  detailsFileContent = detailsFileContent.replace(
    /const bonosRangosMap: \{ \[key: number\]: React\.ElementType \} = \{[\s\S]*?\};/,
    mapContent.trim()
  );

  // Write the updated content back to Details.tsx
  fs.writeFileSync(detailsFilePath, detailsFileContent);
});
