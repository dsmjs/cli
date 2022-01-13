import * as lifter from '@form8ion/lift';
import {removeGreenkeeper} from '@form8ion/remove-greenkeeper';
import {
  lift as liftDependabot,
  predicate as dependabotPredicate,
  scaffold as scaffoldDependabot
} from '@form8ion/dependabot-scaffolder';
import {replace as replaceTravisCiWithGithubActions} from '@form8ion/replace-travis-ci-with-github-actions';
import {test as jsApplicabilityTest} from '@form8ion/javascript';
import {lift as liftGithubActionsCI, test as githubActionsCiApplicabilityTest} from '@form8ion/github-actions-node-ci';
import {assert} from 'chai';
import sinon from 'sinon';
import any from '@travi/any';
import {javascript as liftJavascript} from './enhanced-lifters';
import {command, describe, handler} from '.';

suite('lift command', () => {
  let sandbox;

  setup(() => {
    sandbox = sinon.createSandbox();

    sandbox.stub(lifter, 'lift');
  });

  teardown(() => sandbox.restore());

  test('that the lift command is defined', async () => {
    const liftingResults = any.simpleObject();
    lifter.lift
      .withArgs({
        scaffolders: {
          Dependabot: scaffoldDependabot,
          'Remove Greenkeeper': removeGreenkeeper,
          'Replace Travis CI with GitHub Actions': replaceTravisCiWithGithubActions
        },
        enhancers: {
          JavaScript: {test: jsApplicabilityTest, lift: liftJavascript},
          Dependabot: {test: dependabotPredicate, lift: liftDependabot},
          'GitHub Actions CI': {test: githubActionsCiApplicabilityTest, lift: liftGithubActionsCI}
        }
      })
      .resolves(liftingResults);

    assert.equal(await handler(), liftingResults);
    assert.equal(command, 'lift');
    assert.equal(describe, 'Lift an existing project with additional functionality');
  });
});
