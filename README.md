# Generate Changelog

### Easily generate changelog notes for your project with this GitHub Action

## Usage

Following the [lerna-changelog](https://github.com/lerna/lerna-changelog#configuration) configuration steps, you'll either need to create a file called `lerna.json` or include in your `package.json` the following:

```json
{
  "changelog": {
    "labels": {
      "feature": "New Feature",
      "bug": "Bug Fix"
    }
  }
}
```

Inside your `.github/workflows/workflow.yml` file:

```yaml
steps:
  - uses: actions/checkout@v1
  - uses: RiskLedger/generate-changelog@v1.1
    with:
      from: ${ value }} # The old commit sha or tag you'd like to compare with
      to: ${GITHUB_SHA} # The commit SHA that triggered the workflow run
    env:
      GITHUB_AUTH: ${{ secrets.GITHUB_TOKEN }}
```

> **Note**: If you need to get the previous commit, (e.g. comparing the diff between your current branch dev & master), this can be achieved with the following:

```yaml
steps:
  - name: Get latest commit from master
    id: get-master-sha
    run: |
      echo ::set-output name=sha::$( curl -u "u:${{ secrets.GITHUB_TOKEN }}" https://api.github.com/repos/username/repository/git/ref/heads/master | jq .object.sha | tr -d '"' )
```

## Arguments

This action currently supports two inputs from the user: `from` and `to`. These inputs, along with their descriptions and usage contexts, are listed in the table below:

|  Input  |                                                 Description                                                 |   Usage    |
| :-----: | :---------------------------------------------------------------------------------------------------------: | :--------: |
| `from`  |                        This commit or tag you would like to compare against uploads                         | _Required_ |
|  `to`   |                                       Path to the coverage report(s)                                        | _Required_ |
| `token` | Your Github access token, which will already be avaliable within your workflow without any additional setup | _Required_ |

## License

The code in this project is released under the [MIT](license).

## Credits

- Inspired by [Babel's](https://github.com/babel/actions/tree/v2/generate-lerna-changelog) changelog Github Action
