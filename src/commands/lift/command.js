import {lift} from '@form8ion/lift';
import {removeGreenkeeper} from '@form8ion/remove-greenkeeper';

export function handler() {
  return lift({
    scaffolders: {
      'Remove Greenkeeper': removeGreenkeeper
    }
  });
}

export const command = 'lift';
export const describe = 'Lift an existing project with additional functionality';
