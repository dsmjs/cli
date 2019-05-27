import * as projectScaffolder from '@travi/project-scaffolder';
import {scaffold as scaffoldGithub} from '@travi/github-scaffolder';
import {assert} from 'chai';
import sinon from 'sinon';
import any from '@travi/any';
import {githubPrompt, javascript} from './enhanced-scaffolders';
import {command, describe, handler} from './scaffold';

suite('scaffold command', () => {
  let sandbox;

  setup(() => {
    sandbox = sinon.createSandbox();

    sandbox.stub(projectScaffolder, 'scaffold');
  });

  teardown(() => sandbox.restore());

  test('that the scaffold command is defined', async () => {
    const scaffoldingResults = any.simpleObject();
    projectScaffolder.scaffold
      .withArgs({
        languages: {JavaScript: javascript},
        vcsHosts: {GitHub: {scaffolder: scaffoldGithub, prompt: githubPrompt, public: true}},
        overrides: {copyrightHolder: 'Matt Travi'}
      })
      .resolves(scaffoldingResults);

    assert.equal(await handler(), scaffoldingResults);
    assert.equal(command, 'scaffold');
    assert.equal(describe, 'Scaffold a new project');
  });
});
