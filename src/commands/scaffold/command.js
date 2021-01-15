import {scaffold, questionNames as projectQuestionNames} from '@travi/project-scaffolder';
import {packageManagers} from '@form8ion/javascript-core';
import {questionNames as jsQuestionNames} from '@travi/javascript-scaffolder';
import {scaffold as scaffoldGithub} from '@travi/github-scaffolder';
import {scaffold as scaffoldDependabot} from '@form8ion/dependabot-scaffolder';
import {githubPromptFactory, javascriptScaffolderFactory} from './enhanced-scaffolders';

export function handler(decisions) {
  const orgName = 'dsmjs';
  const userGroupName = 'dsmJS';
  const decisionsWithEnhancements = {
    ...decisions,
    [projectQuestionNames.COPYRIGHT_HOLDER]: userGroupName,
    [projectQuestionNames.REPO_HOST]: 'GitHub',
    [projectQuestionNames.REPO_OWNER]: orgName,
    [jsQuestionNames.AUTHOR_NAME]: userGroupName,
    [jsQuestionNames.AUTHOR_EMAIL]: 'maintainers@dsmjs.com',
    [jsQuestionNames.AUTHOR_URL]: 'https://dsmjs.com',
    [jsQuestionNames.SCOPE]: orgName,
    [jsQuestionNames.UNIT_TEST_FRAMEWORK]: 'mocha',
    [jsQuestionNames.PACKAGE_MANAGER]: packageManagers.NPM
  };

  return scaffold({
    languages: {JavaScript: javascriptScaffolderFactory(decisionsWithEnhancements)},
    vcsHosts: {
      GitHub: {scaffolder: scaffoldGithub, prompt: githubPromptFactory(decisionsWithEnhancements), public: true}
    },
    overrides: {copyrightHolder: userGroupName},
    dependencyUpdaters: {Dependabot: {scaffolder: scaffoldDependabot}},
    decisions: decisionsWithEnhancements
  });
}

export const command = 'scaffold';
export const describe = 'Scaffold a new project';
