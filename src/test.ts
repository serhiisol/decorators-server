{
  let jasmineReporters = require('jasmine-reporters');
  let TerminalReporter = require('jasmine-terminal-reporter');
  let Jasmine = require('jasmine');
  let jsm = new Jasmine();

  jsm.loadConfigFile('tests/unit/jasmine.json');

  const junitXmlReporter = new jasmineReporters.JUnitXmlReporter({
    savePath: '/tmp/testresults',
    consolidateAll: true,
    filePrefix: 'unit-tests'
  });

  const terminalReporter = new TerminalReporter({
    isVerbose: true,
    showColors: true
  });

  jsm.env.clearReporters();

  jsm.addReporter(junitXmlReporter);
  jsm.addReporter(terminalReporter);

  jsm.execute();
}
