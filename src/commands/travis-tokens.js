import {update} from 'travis-token-updater';

export function handler() {
  return update({githubAccount: 'dsmjs'});
}

export const command = 'travis-tokens';
export const describe = 'Roll token for Travis projects throughout the organization';
