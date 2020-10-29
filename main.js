const core = require('@actions/core');
const github = require('@actions/github');
const { Changelog } = require('lerna-changelog');
const { load } = require('lerna-changelog/lib/configuration');

console.log(github.context);
console.log(github.context.pull_request);
console.log(github.context.pull_request.base);

const tagFrom = github.context.pull_request.base.sha;
const tagTo = github.context.sha;

console.log(tagFrom, tagTo);

const config = load({ nextVersionFromMetadata: false });

const cl = new Changelog(config);

cl.createMarkdown({ tagFrom, tagTo })
  .then((changelog) => core.setOutput('changelog', changelog))
  .catch((err) => core.warning(`Failed generating changelog ${err}`));
