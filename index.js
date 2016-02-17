const few  = require('few');
const path = require('path');

function isGeneratorFunction(v) {
    return v instanceof Function && v.constructor.name === 'GeneratorFunction';
}

/**
 * Monkey patch the mocha instance with generator support.
 */
function fewMocha (mocha) {
    if (!mocha || mocha._fewIsOn) {
        return;
    }

    const run = mocha.Runnable.prototype.run;

    mocha.Runnable.prototype.run = function (done) {
        const currentFunction = this.fn;

        if (isGeneratorFunction(currentFunction)) {
            this.fn = few(currentFunction.bind(undefined, done), done);
            return;
        } else {
            return run.call(this, done);
        }
    };

    mocha._fewIsOn = true;
}

/**
 * Find active node mocha instances.
 */
function patchMochaInstances () {
    const suffix = path.sep + path.join('mocha','index.js');
    const children = require.cache || {};

    return Object.keys(children)
        .filter(child => child.endsWith(suffix))
        .map(child => children[child].exports)
        .forEach(fewMocha);
}

patchMochaInstances();

exports.module = fewMocha;
