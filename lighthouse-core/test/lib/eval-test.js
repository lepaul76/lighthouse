/**
 * @license Copyright 2020 The Lighthouse Authors. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License. You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
 */
'use strict';

/* eslint-env jest */

const {createEvalCode} = require('../../lib/eval.js');

describe('createEvalCode', () => {
  it('iife basic', () => {
    function mainFn() {
      return true;
    }
    const code = createEvalCode(mainFn, {
      mode: 'iife',
      args: [],
    });
    expect(code).toEqual(`(() => {
      
      function mainFn() {
      return true;
    }
      return mainFn();
    })()`);
    expect(eval(code)).toEqual(true);
  });

  it('iife complex', () => {
    function mainFn({a, b}, passThru) {
      return {a: abs(a), b: square(b), passThru};
    }
    function abs(val) {
      return Math.abs(val);
    }
    function square(val) {
      return val * val;
    }
    const code = createEvalCode(mainFn, {
      args: [{a: -5, b: 10}, 'hello'],
      deps: [abs, square],
      mode: 'iife',
    });
    expect(code).toEqual(`(() => {
      function abs(val) {
      return Math.abs(val);
    }
function square(val) {
      return val * val;
    }
      function mainFn({
      a,
      b
    }, passThru) {
      return {
        a: abs(a),
        b: square(b),
        passThru
      };
    }
      return mainFn({"a":-5,"b":10},"hello");
    })()`);
    expect(eval(code)).toEqual({a: 5, b: 100, passThru: 'hello'});
  });

  it('function', () => {
    function mainFn(a, b) {
      return adder(a, b);
    }
    function adder(a, b) {
      return a + b;
    }
    const code = createEvalCode(mainFn, {
      args: [1, 2],
      mode: 'function',
      deps: [adder],
    });
    expect(code).toEqual(`function () {
      function adder(a, b) {
      return a + b;
    }
      function mainFn(a, b) {
      return adder(a, b);
    }
      return mainFn.call(this, 1,2);
    }`);
    expect(eval(`(${code})()`)).toEqual(3);
  });
});
