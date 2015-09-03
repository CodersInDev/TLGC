var Code = require('code');
var Lab = require('lab');

var lab = exports.lab = Lab.script();
var expect = Code.expect;
var it = lab.test;


it('checks the validate value function', function (done) {

    var validateValue = require('../views/helpers/validateValue.js');
    var result = validateValue('same', 'same', 'returnValue');
    expect(result).to.equal('returnValue');

    var resultEmpty = validateValue('same', 'other', 'returnValue');
    expect(resultEmpty).to.equal('');
    done();
});
