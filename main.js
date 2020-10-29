const core = require('@actions/core');
const exec = require('@actions/exec');
const { Changelog } = require('lerna-changelog');

const tagFrom = core.getInput('from', { required: true });
const tagTo = core.getInput('to', { required: true });

const cl = new Changelog();
const changelog = cl.createMarkdown({ tagFrom: 't', tagTo: 'HEAD' });

core.setOutput('changelog', changelog);

// console.log(changelog);

// exec
//   .exec(`lerna-changelog --from ${tagFrom} --to ${tagTo}`)
//   .then((changelog) => {
//     core.setOutput('changelog', changelog);
//   })
//   .catch((err) => {
//     core.setFailed(`Action failed with error ${err}`);
//   });
