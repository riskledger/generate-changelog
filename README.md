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
    env:
      GITHUB_AUTH: ${{ secrets.GITHUB_TOKEN }}
```

## License

The code in this project is released under the [MIT](license).

## Credits

- Inspired by [Babel's](https://github.com/babel/actions/tree/v2/generate-lerna-changelog) changelog Github Action
