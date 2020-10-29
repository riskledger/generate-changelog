const core = require('@actions/core');
const { Changelog } = require('lerna-changelog');
const { load } = require('lerna-changelog/lib/configuration');

const tagFrom = core.getInput('from', { required: true });
const tagTo = core.getInput('to', { required: true });

const config = load({ nextVersionFromMetadata: false });

const cl = new Changelog(config);

cl.createMarkdown({ tagFrom, tagTo })
  .then((changelog) => core.setOutput('changelog', changelog))
  .catch((err) => core.setFailed(`Action failed with error ${err}`));
