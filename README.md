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
    },
    "repo": "username/repo"
  }
}
```

Inside your `.github/workflows/workflow.yml` file:

```yaml
steps:
  - uses: actions/checkout@v1
  - uses: RiskLedger/generate-changelog@v2
    with:
      from: ${ value }} # The old commit sha or tag you'd like to compare with
      to: ${GITHUB_SHA} # The commit SHA that triggered the workflow run
    env:
      GITHUB_AUTH: ${{ secrets.GITHUB_TOKEN }}
```

> **Note**: If you need to get the previous commit, (e.g. comparing the diff between your current branch dev & master), this can be achieved with the following:
> 
```yaml
jobs:
  check_master:
    runs-on: ubuntu-latest
    outputs:
      last_commit: ${{ steps.get-master-sha.outputs.sha }}
    steps:
      - name: Get latest commit from master
        id: get-master-sha
        run: |
          echo ::set-output name=sha::$( curl -u "u:${{ secrets.GITHUB_TOKEN }}" https://api.github.com/repos/USERNAME/REPO/git/ref/heads/master | jq .object.sha | tr -d '"' )

  create_notes:
    needs: check_master
    runs-on: 'ubuntu-latest'
    outputs:
      changelog: ${{ steps.changelog.outputs.changelog }}
    steps:
    - uses: actions/checkout@v1

    - name: Generate the changelog
      id: changelog
      uses: riskledger/generate-changelog@exec
      with:
        from: ${{ needs.check_master.outputs.last_commit }}
        to: ${{ github.sha }}
      env:
        GITHUB_AUTH: ${{ secrets.GITHUB_TOKEN }}
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
