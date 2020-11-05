/**
 * @license Copyright 2020 The Lighthouse Authors. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License. You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
 */
'use strict';

const ProtocolSession = require('./session.js');
const RuntimeController = require('./runtime-controller.js');

class Driver {
  /**
   * @param {import('puppeteer').Page} page
   */
  constructor(page) {
    this._page = page;
    /** @type {LH.Gatherer.FRProtocolSession|undefined} */
    this._session = undefined;
    /** @type {RuntimeController|undefined} */
    this._runtimeController = undefined;

    // Proxy the protocol session methods for legacy compat.
    const getSession = () => {
      if (!this._session) throw new Error(`Driver not connected to page`);
      return this._session;
    };

    /** @type {LH.Gatherer.FRTransitionalDriver['hasNextProtocolTimeout']} */
    this.hasNextProtocolTimeout = (...args) => getSession().hasNextProtocolTimeout(...args);
    /** @type {LH.Gatherer.FRTransitionalDriver['getNextProtocolTimeout']} */
    this.getNextProtocolTimeout = (...args) => getSession().getNextProtocolTimeout(...args);
    /** @type {LH.Gatherer.FRTransitionalDriver['setNextProtocolTimeout']} */
    this.setNextProtocolTimeout = (...args) => getSession().setNextProtocolTimeout(...args);
    /** @type {LH.Gatherer.FRTransitionalDriver['on']} */
    this.on = (...args) => getSession().on(...args);
    /** @type {LH.Gatherer.FRTransitionalDriver['off']} */
    this.off = (...args) => getSession().off(...args);
    /** @type {LH.Gatherer.FRTransitionalDriver['sendCommand']} */
    this.sendCommand = (...args) => getSession().sendCommand(...args);

    /** @type {LH.Gatherer.FRTransitionalDriver} */
    const typecheck = this; // eslint-disable-line no-unused-vars
  }

  /** @return {Promise<void>} */
  async connect() {
    if (this._session) return;
    const session = await this._page.target().createCDPSession();
    this._session = new ProtocolSession(session);
    this._runtimeController = new RuntimeController(this._session);
  }

  /**
   * @param {string} expression
   * @param {{useIsolation?: boolean}} [options]
   * @return {Promise<*>}
   */
  async evaluateAsync(expression, options) {
    if (!this._runtimeController) throw new Error('Driver not connected to page');
    return this._runtimeController.evaluateAsync(expression, options);
  }
}

module.exports = Driver;
