import {lift} from '@form8ion/lift';
import {removeGreenkeeper} from '@form8ion/remove-greenkeeper';
import {
  lift as liftDependabot,
  predicate as dependabotPredicate,
  scaffold as scaffoldDependabot
} from '@form8ion/dependabot-scaffolder';
import {test as jsApplicabilityTest} from '@form8ion/lift-javascript';
import {replace as replaceTravisCiWithGithubActions} from '@form8ion/replace-travis-ci-with-github-actions';
import {lift as liftGithubActionsCI, test as githubActionsCiApplicabilityTest} from '@form8ion/github-actions-node-ci';
import {javascript as liftJavascript} from './enhanced-lifters';

export function handler() {
  return lift({
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
  });
}

export const command = 'lift';
export const describe = 'Lift an existing project with additional functionality';
