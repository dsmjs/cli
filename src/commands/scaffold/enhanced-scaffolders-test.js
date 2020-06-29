import {questionNames as projectQuestionNames} from '@travi/project-scaffolder';
import * as javascriptScaffolder from '@travi/javascript-scaffolder';
import * as githubScaffolder from '@travi/github-scaffolder';
import {scaffold as scaffoldTravisForJavaScript} from '@travi/travis-scaffolder-javascript';
import {scaffold as scaffoldMocha} from '@form8ion/mocha-scaffolder';
import {assert} from 'chai';
import sinon from 'sinon';
import any from '@travi/any';
import {javascriptScaffolderFactory, githubPrompt} from './enhanced-scaffolders';

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
        ciServices: {Travis: {scaffolder: scaffoldTravisForJavaScript, public: true}},
        unitTestFrameworks: {mocha: {scaffolder: scaffoldMocha}},
        decisions
      })
      .resolves(output);

    assert.equal(await javascriptScaffolderFactory(decisions)(options), output);
  });

  test('that the owner account is passed to the github prompts', async () => {
    githubScaffolder.prompt
      .withArgs({account: 'dsmjs', decisions: {[projectQuestionNames.REPO_OWNER]: 'dsmjs'}})
      .resolves(output);

    assert.equal(await githubPrompt(), output);
  });
});
