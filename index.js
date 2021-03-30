const core = require('@actions/core');
const github = require('@actions/github');
const { exec } = require('node:child_process');
const { stderr } = require('node:process');

try {
  const platform = core.getInput('platform');
  const type = core.getInput('type');
  const keystoreName = core.getInput('keystore-name');

  console.log(
    `${
      type === 'assemble' ? 'Assembling' : 'Bundling'
    } release for ${platform} called by ${triggerOn} to ${branches} branch(es)`,
  );

  const time = new Date().toTimeString();
  core.setOutput('time', time);
  // Get the JSON webhook payload for the event that triggered the workflow
  const payload = JSON.stringify(github.context.payload, undefined, 2);
  console.log(`The event payload: ${payload}`);

  const execCallback = (error, stdout, stderr) => {
    if (error) console.log(error);
    if (stdout) console.log(stdout);
    if (stderr) console.log(stderr);
  };

  exec('npm install', execCallback);
  exec(
    'echo $SIGNING_KEY | base64 -d > ${{ github.workspace }}/android/app/' +
      keystoreName +
      '.keystore',
    execCallback,
  );
  exec(`cd android && ./gradlew ${type}Release`);
} catch (error) {
  core.setFailed(error.message);
}
