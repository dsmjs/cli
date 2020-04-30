import {scaffold} from '@travi/project-scaffolder';
import {scaffold as scaffoldGithub} from '@travi/github-scaffolder';
import {scaffold as scaffoldDependabot} from '@form8ion/dependabot-scaffolder';
import {githubPrompt, javascript} from './enhanced-scaffolders';

export function handler() {
  return scaffold({
    languages: {JavaScript: javascript},
    vcsHosts: {GitHub: {scaffolder: scaffoldGithub, prompt: githubPrompt, public: true}},
    overrides: {copyrightHolder: 'dsmJS'},
    dependencyUpdaters: {Dependabot: {scaffolder: scaffoldDependabot}}
  });
}

export const command = 'scaffold';
export const describe = 'Scaffold a new project';
