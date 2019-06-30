const Module = require('module');
const originalRequire = Module.prototype.require;

Module.prototype.require = function (name) {
    switch (name) {
        case 'electron':
            const mock = {
                on: () => {
                },
            };
            return {
                ipcMain: mock,
                ipcRenderer: mock,
                app: Object.assign({
                    makeSingleInstance: () => {
                    },
                    requestSingleInstanceLock: () => {
                    },
                }, mock)
            };

            break;
    }
    //do your thing here
    return originalRequire.apply(this, arguments);
};

const {JSDOM} = require("jsdom");
const dom = new JSDOM(`<!DOCTYPE html><p>Hello world</p>`);

global.document = dom.window.document;
global.window = dom.window
global.navigator = window.navigator

require('angular/angular');
require('angular-mocks');

global.angular = window.angular;
global.inject = global.angular.mock.inject;
global.ngModule = global.angular.mock.module;
