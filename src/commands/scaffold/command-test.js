import * as projectScaffolder from '@travi/project-scaffolder';
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
  });

  teardown(() => sandbox.restore());

  test('that the scaffold command is defined', async () => {
    const scaffoldingResults = any.simpleObject();
    const decisions = any.simpleObject();
    const javascript = () => undefined;
    const decisionsWithEnhancements = {
      ...decisions,
      [projectScaffolder.questionNames.REPO_HOST]: 'GitHub',
      unitTestFramework: 'mocha'
    };
    enhancedScaffolders.javascriptScaffolderFactory.withArgs(decisionsWithEnhancements).returns(javascript);
    projectScaffolder.scaffold
      .withArgs({
        languages: {JavaScript: javascript},
        vcsHosts: {GitHub: {scaffolder: scaffoldGithub, prompt: enhancedScaffolders.githubPrompt, public: true}},
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
