import {scaffold, questionNames as projectQuestionNames} from '@travi/project-scaffolder';
import {scaffold as scaffoldGithub} from '@travi/github-scaffolder';
import {scaffold as scaffoldDependabot} from '@form8ion/dependabot-scaffolder';
import {githubPrompt, javascriptScaffolderFactory} from './enhanced-scaffolders';

export function handler(decisions) {
  return scaffold({
    languages: {JavaScript: javascriptScaffolderFactory(decisions)},
    vcsHosts: {GitHub: {scaffolder: scaffoldGithub, prompt: githubPrompt, public: true}},
    overrides: {copyrightHolder: 'dsmJS'},
    dependencyUpdaters: {Dependabot: {scaffolder: scaffoldDependabot}},
    decisions: {...decisions, [projectQuestionNames.REPO_HOST]: 'GitHub'}
  });
}

export const command = 'scaffold';
export const describe = 'Scaffold a new project';
