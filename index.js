import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function getGeneratorVersion() {
  // read generator version from dist/build.info
  const infoPath = path.join(__dirname, 'dist', 'build.info');
  if (fs.existsSync(infoPath)) {
    const text = fs.readFileSync(infoPath, 'utf8');
    const props = {};
    for (const line of text.split(/\r?\n/)) {
      const m = line.match(/^\s*([^#=\s]+)\s*=\s*(.*)$/);
      if (m) {
        props[m[1].trim()] = m[2].trim();
      }
    }
    const ver = props.version || 'unknown';
    const build = props.build || '0';
    return `wcmf-${ver}.${build}`;
  }
}

export function generate(options) {
  console.log(`\nSetting up generator with options:\n\n`, options);

  const execOptions = {
    encoding: 'utf8',
    maxBuffer: 50 * 1024 * 1024,
    cwd: `${options.workdir}`,
    stdio: [
      process.stdin,
      process.stdout,
      process.stderr
    ]
  };

  const args = {
    generatorVersion: getGeneratorVersion(),
    basePath: `${options.base}`,
    propertyFile: `${options.workdir}/workflow.properties`,
    targetDir: `${options.target}`,
  };
  const argsStr = Object.entries(args).map(([key, value]) => `-${key}=${value}`).join(' ');

  const command = `java -Djava.library.path="${options.base}/lib" -jar ${options.base}/ChronosGenerator.jar ${options.base}/cartridge/Wcmf/workflow/wcmf.oaw ${argsStr}`;
  console.log(`\nRunning command:\n\n${command}\n`);

  const result = execSync(command, execOptions);
  return result?.toString();
}