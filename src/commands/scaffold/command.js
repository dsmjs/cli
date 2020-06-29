import {scaffold, questionNames as projectQuestionNames} from '@travi/project-scaffolder';
import {questionNames as jsQuestionNames} from '@travi/javascript-scaffolder';
import {scaffold as scaffoldGithub} from '@travi/github-scaffolder';
import {scaffold as scaffoldDependabot} from '@form8ion/dependabot-scaffolder';
import {githubPromptFactory, javascriptScaffolderFactory} from './enhanced-scaffolders';

export function handler(decisions) {
  const decisionsWithEnhancements = {
    ...decisions,
    [projectQuestionNames.REPO_HOST]: 'GitHub',
    [projectQuestionNames.REPO_OWNER]: 'dsmjs',
    [jsQuestionNames.UNIT_TEST_FRAMEWORK]: 'mocha'
  };

  return scaffold({
    languages: {JavaScript: javascriptScaffolderFactory(decisionsWithEnhancements)},
    vcsHosts: {
      GitHub: {scaffolder: scaffoldGithub, prompt: githubPromptFactory(decisionsWithEnhancements), public: true}
    },
    overrides: {copyrightHolder: 'dsmJS'},
    dependencyUpdaters: {Dependabot: {scaffolder: scaffoldDependabot}},
    decisions: decisionsWithEnhancements
  });
}

export const command = 'scaffold';
export const describe = 'Scaffold a new project';
