// How to install? cache?
// const cp = require("child_process");
// cp.execSync(`cd ${__dirname}; npm ci`);

const core = require('@actions/core');
const exec = require('@actions/exec');

const tagFrom = core.getInput('from', { required: true });
const tagTo = core.getInput('to', { required: true });

const changelog = await exec.exec(`lerna-changelog --from ${tagFrom} --to ${tagTo}`);

core.setOutput('changelog', changelog);
