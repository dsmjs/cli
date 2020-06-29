import {questionNames as projectQuestionNames} from '@travi/project-scaffolder';
import {scaffold as scaffoldJavaScript} from '@travi/javascript-scaffolder';
import {scaffold as scaffoldTravisForJavaScript} from '@travi/travis-scaffolder-javascript';
import {prompt} from '@travi/github-scaffolder';
import {scaffold as scaffoldMocha} from '@form8ion/mocha-scaffolder';

export function javascriptScaffolderFactory(decisions) {
  return options => scaffoldJavaScript({
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
    ciServices: {Travis: {scaffolder: scaffoldTravisForJavaScript, public: true}},
    unitTestFrameworks: {mocha: {scaffolder: scaffoldMocha}},
    decisions
  });
}

export function githubPrompt() {
  return prompt({account: 'dsmjs', decisions: {[projectQuestionNames.REPO_OWNER]: 'dsmjs'}});
}
