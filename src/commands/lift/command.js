import {lift} from '@form8ion/lift';
import {removeGreenkeeper} from '@form8ion/remove-greenkeeper';
import {scaffold as scaffoldDependabot} from '@form8ion/dependabot-scaffolder';
import {replace as replaceTravisCiWithGithubActions} from '@form8ion/replace-travis-ci-with-github-actions';

export function handler() {
  return lift({
    scaffolders: {
      Dependabot: scaffoldDependabot,
      'Remove Greenkeeper': removeGreenkeeper,
      'Replace Travis CI with GitHub Actions': replaceTravisCiWithGithubActions
    }
  });
}

export const command = 'lift';
export const describe = 'Lift an existing project with additional functionality';
