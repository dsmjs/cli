import * as javascriptScaffolder from '@form8ion/javascript';
import * as githubScaffolder from '@travi/github-scaffolder';
import {scaffold as scaffoldGithubActions} from '@form8ion/github-actions-node-ci';
import {scaffold as scaffoldMocha} from '@form8ion/mocha-scaffolder';
import {assert} from 'chai';
import sinon from 'sinon';
import any from '@travi/any';
import {githubPromptFactory, javascriptScaffolderFactory} from './enhanced-scaffolders';

suite('enhanced scaffolders', () => {
  let sandbox;
  const output = any.simpleObject();

  setup(() => {
    sandbox = sinon.createSandbox();

    sandbox.stub(javascriptScaffolder, 'scaffold');
    sandbox.stub(githubScaffolder, 'prompt');
  });

  teardown(() => sandbox.restore());

  test('that the custom properties are passed along with the provided options to the js scaffolder', async () => {
    const decisions = any.simpleObject();
    const options = any.simpleObject();
    javascriptScaffolder.scaffold
      .withArgs({
        ...options,
        configs: {
          eslint: {scope: '@dsmjs'},
          remark: '@dsmjs/remark-preset-lint',
          babelPreset: {name: '@dsmjs', packageName: '@dsmjs/babel-preset'},
          commitlint: {name: '@form8ion', packageName: '@form8ion/commitlint-config'}
        },
        overrides: {
          npmAccount: 'dsmjs',
          author: {name: 'dsmJS', email: 'maintainers@dsmjs.com', url: 'https://dsmjs.com'}
        },
        ciServices: {
          'GitHub Actions': {scaffolder: scaffoldGithubActions, public: true}
        },
        unitTestFrameworks: {mocha: {scaffolder: scaffoldMocha}},
        decisions
      })
      .resolves(output);

    assert.equal(await javascriptScaffolderFactory(decisions)(options), output);
  });

  test('that the owner account is passed to the github prompts', async () => {
    const decisions = any.simpleObject();
    githubScaffolder.prompt.withArgs({account: 'dsmjs', decisions}).resolves(output);

    assert.equal(await githubPromptFactory(decisions)(), output);
  });
});
