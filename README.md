<h1>Followers monitor</h1>

This Node/Python script allows you to monitor your followers/following in social media. The final version of this program should create detailed statistics about data available on your social media by using its REST API (if available).

---

<h2></h2>

- [Requirements](#requirements)
- [Usage](#usage)
  - [GitHub monitoring](#github-monitoring)
- [Changelog](#changelog)

---

## Requirements

- NPM
- NPX
- Node.js
- Python 3
- *Unix based OS | MacOS

*If you want to use this in another OS, update the "scripts" in `package.json`.

---

## Usage

Initialize the repository with:

```shell
$ npm install
```

### GitHub monitoring

Create a file `configs.json` with the content:

```json
{
  "githubUser": "YourGitHubUsername",
  "debug": false,
  "resultToFile": true
}
```

If is your first usage, save your current followers by running:

```shell
$ npm run first
```

To compare your followers/following, use:

```shell
$ npm test
```

If you want to print the result instead outputing it to a file, just set **"resultToFile"** to **false** in `configs.json`.

---

## Changelog

**[v1.0.0]** Only supports GitHub followers/following monitoring.

