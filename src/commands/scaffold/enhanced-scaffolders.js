import {scaffold as scaffoldJavaScript} from '@travi/javascript-scaffolder';
import {scaffold as scaffoldTravisForJavaScript} from '@travi/travis-scaffolder-javascript';
import {prompt} from '@travi/github-scaffolder';

export function javascript(options) {
  return scaffoldJavaScript({
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
    ciServices: {Travis: {scaffolder: scaffoldTravisForJavaScript, public: true}}
  });
}

export function githubPrompt() {
  return prompt({account: 'dsmjs'});
}
