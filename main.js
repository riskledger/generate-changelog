// How to install? cache?
// const cp = require("child_process");
// cp.execSync(`cd ${__dirname}; npm ci`);

const core = require('@actions/core');
const exec = require('@actions/exec');

// const { Changelog } = require('lerna-changelog');

const tagFrom = core.getInput('from', { required: true });
const tagTo = core.getInput('to', { required: true });

// const changelog = new Changelog({ tagFrom: 't', tagTo: 'HEAD' });

// console.log(changelog);

exec
  .exec(`lerna-changelog --from ${tagFrom} --to ${tagTo}`)
  .then((changelog) => {
    core.setOutput('changelog', changelog);
  })
  .catch((err) => {
    core.setFailed(`Action failed with error ${err}`);
  });
