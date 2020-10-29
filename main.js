const core = require('@actions/core');
const { Changelog } = require('lerna-changelog');

const tagFrom = core.getInput('from', { required: true });
const tagTo = core.getInput('to', { required: true });

const cl = new Changelog();
const changelog = cl.createMarkdown({ tagFrom, tagTo });

core.setOutput('changelog', changelog);
