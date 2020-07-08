import * as projectScaffolder from '@travi/project-scaffolder';
import {questionNames as jsQuestionNames} from '@travi/javascript-scaffolder';
import {scaffold as scaffoldGithub} from '@travi/github-scaffolder';
import {scaffold as scaffoldDependabot} from '@form8ion/dependabot-scaffolder';
import {assert} from 'chai';
import sinon from 'sinon';
import any from '@travi/any';
import * as enhancedScaffolders from './enhanced-scaffolders';
import {command, describe, handler} from '.';

suite('scaffold command', () => {
  let sandbox;

  setup(() => {
    sandbox = sinon.createSandbox();

    sandbox.stub(projectScaffolder, 'scaffold');
    sandbox.stub(enhancedScaffolders, 'javascriptScaffolderFactory');
    sandbox.stub(enhancedScaffolders, 'githubPromptFactory');
  });

  teardown(() => sandbox.restore());

  test('that the scaffold command is defined', async () => {
    const scaffoldingResults = any.simpleObject();
    const decisions = any.simpleObject();
    const javascript = () => undefined;
    const githubPrompt = () => undefined;
    const decisionsWithEnhancements = {
      ...decisions,
      [projectScaffolder.questionNames.COPYRIGHT_HOLDER]: 'dsmJS',
      [projectScaffolder.questionNames.REPO_HOST]: 'GitHub',
      [projectScaffolder.questionNames.REPO_OWNER]: 'dsmjs',
      [jsQuestionNames.AUTHOR_NAME]: 'dsmJS',
      [jsQuestionNames.AUTHOR_EMAIL]: 'maintainers@dsmjs.com',
      [jsQuestionNames.AUTHOR_URL]: 'https://dsmjs.com',
      [jsQuestionNames.SCOPE]: 'dsmjs',
      [jsQuestionNames.UNIT_TEST_FRAMEWORK]: 'mocha'
    };
    enhancedScaffolders.javascriptScaffolderFactory.withArgs(decisionsWithEnhancements).returns(javascript);
    enhancedScaffolders.githubPromptFactory.withArgs(decisionsWithEnhancements).returns(githubPrompt);
    projectScaffolder.scaffold
      .withArgs({
        languages: {JavaScript: javascript},
        vcsHosts: {GitHub: {scaffolder: scaffoldGithub, prompt: githubPrompt, public: true}},
        overrides: {copyrightHolder: 'dsmJS'},
        dependencyUpdaters: {Dependabot: {scaffolder: scaffoldDependabot}},
        decisions: decisionsWithEnhancements
      })
      .resolves(scaffoldingResults);

    assert.equal(await handler(decisions), scaffoldingResults);
    assert.equal(command, 'scaffold');
    assert.equal(describe, 'Scaffold a new project');
  });
});
