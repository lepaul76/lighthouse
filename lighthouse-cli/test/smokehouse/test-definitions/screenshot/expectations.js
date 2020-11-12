/**
 * @license Copyright 2020 Google Inc. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License. You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
 */
'use strict';

/**
 * @type {Array<Smokehouse.ExpectedRunnerResult>}
 */
const expectations = [
  {
    artifacts: {
      FullPageScreenshot: {
        screenshot: {
          width: '>1000',
          height: '>1000',
          data: /data:image\/jpeg;base64,.{10000,}$/,
        },
        nodes: {
          'page-0-BODY': {
            top: 8,
            bottom: 1008,
            left: 8,
            right: 1008,
            width: 1000,
            height: 1000,
          },
          'page-1-P': {
            top: 8,
            bottom: 26,
            left: 8,
            right: 1008,
            width: 1000,
            height: 18,
          },
          '5-2-BODY': {
            top: 8,
            bottom: 1008,
            left: 8,
            right: 1008,
            width: 1000,
            height: 1000,
          },
          '5-3-HTML': {
            top: 0,
            bottom: 1016,
            left: 0,
            right: 1350,
            width: 1350,
            height: 1016,
          },
          '5-4-HTML': {
            top: 0,
            bottom: 1016,
            left: 0,
            right: 1350,
            width: 1350,
            height: 1016,
          },
        },
      },
    },
    lhr: {
      requestedUrl: 'http://localhost:10200/screenshot.html?width=1000px&height=1000px',
      finalUrl: 'http://localhost:10200/screenshot.html?width=1000px&height=1000px',
      audits: {},
    },
  },
];

module.exports = expectations;
