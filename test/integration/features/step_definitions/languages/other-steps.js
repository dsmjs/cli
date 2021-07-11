import {Before, Given, Then} from 'cucumber';
import {assert} from 'chai';
import {exists} from 'mz/fs';

let questionNames;

Before(() => {
  questionNames = require('@form8ion/project').questionNames;
});

Given(/^the project language should be Other$/, async function () {
  this.setAnswerFor(questionNames.PROJECT_LANGUAGE, 'Other');
});

Then(/^core ignores are defined$/, async function () {
  assert.isTrue(await exists(`${process.cwd()}/.editorconfig`));
  assert.isTrue(await exists(`${process.cwd()}/README.md`));
});
