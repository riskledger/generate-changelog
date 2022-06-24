const core = require('@actions/core');
const github = require('@actions/github');
const { Changelog } = require('lerna-changelog');
const { load } = require('lerna-changelog/lib/configuration');

async function run() {
  try {
    const token = core.getInput('token', { required: true });
    const title = core.getInput('title', { required: true });
    const owner = core.getInput('owner', { required: true });
    const repo = core.getInput('repo', { required: true });
    
    const octokit = github.getOctokit(token);

    const { data: pullRequest } = await octokit.rest.pulls.list({
      owner: owner,
      repo: repo,
    })

    var result = pullRequest.filter(obj => {
      return obj.title === title
    })

    // current
    const tagTo = result[0].head.sha;
    const tagFrom = result[0].base.sha;

    const config = load({ nextVersionFromMetadata: false });

    const cl = new Changelog(config);

    cl.createMarkdown({ tagFrom, tagTo })
      .then((changelog) => core.setOutput('changelog', changelog))
      .catch((err) => core.warning(`Failed generating changelog ${err}`));
  }
  catch (error) {
    console.log(error)
  }
}

run();
