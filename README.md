# cli

CLI for our various tools

<!--status-badges start -->

[![Node CI Workflow Status][github-actions-ci-badge]][github-actions-ci-link]

<!--status-badges end -->

## Usage

<!--consumer-badges start -->

[![npm][npm-badge]][npm-link]
[![MIT license][license-badge]][license-link]

<!--consumer-badges end -->

### Installation

```sh
$ npm install --global @dsmjs/cli
```

### Commands

#### `scaffold`

Scaffolds a new project using [`@form8ion/project`](https://www.npmjs.com/package/@form8ion/project)

```sh
$ dsmjs scaffold
```

#### `travis-tokens`

Roll the `NPM_TOKEN` or `GH_TOKEN` across multiple repositories

```sh
$ dsmjs travis-tokens
```

## Contributing

<!--contribution-badges start -->

[![Conventional Commits][commit-convention-badge]][commit-convention-link]
[![Commitizen friendly][commitizen-badge]][commitizen-link]
[![semantic-release][semantic-release-badge]][semantic-release-link]
[![PRs Welcome][PRs-badge]][PRs-link]
[![Dependabot][dependabot-badge]][dependabot-link]

<!--contribution-badges end -->

### Dependencies

```sh
$ nvm install
$ npm install
```

### Verification

```sh
$ npm test
```

[npm-link]: https://www.npmjs.com/package/cli

[npm-badge]: https://img.shields.io/npm/v/cli.svg

[license-link]: LICENSE

[license-badge]: https://img.shields.io/github/license/dsmjs/cli.svg

[commit-convention-link]: https://conventionalcommits.org

[commit-convention-badge]: https://img.shields.io/badge/Conventional%20Commits-1.0.0-yellow.svg

[commitizen-link]: http://commitizen.github.io/cz-cli/

[commitizen-badge]: https://img.shields.io/badge/commitizen-friendly-brightgreen.svg

[semantic-release-link]: https://github.com/semantic-release/semantic-release

[semantic-release-badge]: https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg

[PRs-link]: http://makeapullrequest.com

[PRs-badge]: https://img.shields.io/badge/PRs-welcome-brightgreen.svg

[dependabot-link]: https://dependabot.com/

[dependabot-badge]: https://badgen.net/dependabot/dsmjs/cli/?icon=dependabot

[github-actions-ci-link]: https://github.com/dsmjs/cli/actions?query=workflow%3A%22Node.js+CI%22+branch%3Amaster

[github-actions-ci-badge]: https://github.com/dsmjs/cli/workflows/Node.js%20CI/badge.svg
