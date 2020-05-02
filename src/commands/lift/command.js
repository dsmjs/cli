import {lift} from '@form8ion/lift';
import {removeGreenkeeper} from '@form8ion/remove-greenkeeper';
import {scaffold as scaffoldDependabot} from '@form8ion/dependabot-scaffolder';

export function handler() {
  return lift({
    scaffolders: {
      Dependabot: scaffoldDependabot,
      'Remove Greenkeeper': removeGreenkeeper
    }
  });
}

export const command = 'lift';
export const describe = 'Lift an existing project with additional functionality';
