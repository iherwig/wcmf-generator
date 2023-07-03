const { execSync } = require('child_process');

exports.generate = function(options) {
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
    generatorVersion: `wcmf-${options.version}.${options.build}`,
    basePath: `${options.base}`,
    propertyFile: `${options.workdir}/workflow.properties`,
    targetDir: `${options.target}`,
  };
  const argsStr = Object.entries(args).map(([key, value]) => `-${key}=${value}`).join(' ');

  const command = `java -Djava.library.path="${options.base}/lib" -jar ${options.base}/ChronosGenerator.jar ${options.base}/cartridge/Wcmf/workflow/wcmf.oaw ${argsStr}`;
  console.log(`\nRunning command:\n\n${command}\n`);

  return execSync(command, execOptions).toString();
}