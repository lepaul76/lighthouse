/**
 * @license Copyright 2020 The Lighthouse Authors. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License. You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
 */
'use strict';

/**
 * Creates valid JavaScript code given functions, strings of valid code, and arguments.
 * @template {any[]} T, R
 * @param {(...args: T) => R} mainFn The main function to call. It's return value will be the return value
 * of `createEvalCode`, wrapped in a Promise.
 * @param {{args: T, mode?: 'iife'|'function', deps?: Array<Function|string>}} options Set mode to `iife` to
 * create a self-executing function expression, set to `function` to create just a function
 * declaration statement. Args should match the args of `mainFn`, and can be any serializable
 * value. `deps` are functions that must be defined for `mainFn` to work.
 */
function createEvalCode(mainFn, options) {
  const {mode, args, deps} = options;
  const argsSerialized = args.map(arg => JSON.stringify(arg)).join(',');
  const depsSerialized = deps ? deps.join('\n') : '';

  if (!mode || mode === 'iife') {
    return `(() => {
      ${depsSerialized}
      ${mainFn}
      return ${mainFn.name}(${argsSerialized});
    })()`;
  } else {
    return `function () {
      ${depsSerialized}
      ${mainFn}
      return ${mainFn.name}.call(this, ${argsSerialized});
    }`;
  }
}

module.exports = {
  createEvalCode,
};
