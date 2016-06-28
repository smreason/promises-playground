"use strict";

var assert = require('chai').assert;
var dataServices = require("./data-services.js");


describe('dataServices getAllQueryCombosFromQuery', function() {
	var words, queries;
  it('should return zero combos with no query word', function() {
  	words = "";
  	queries = dataServices.getAllQueryCombosFromQuery(words);
    assert.lengthOf(queries, 0);
  });
  it('should return one combo with one query word', function() {
  	words = "aaple";
  	queries = dataServices.getAllQueryCombosFromQuery(words);
    assert.lengthOf(queries, 1);
  });
  it('should return two combos with two query word each being a subset of previous', function() {
  	words = "aaple computer";
  	queries = dataServices.getAllQueryCombosFromQuery(words);
    assert.lengthOf(queries, 2);
    assert(queries[0].indexOf(queries[1] === 0));
    assert(queries[0].length > queries[1].length);
  });
  it('should return three combos with three query word each being a subset of previous', function() {
  	words = "aaple computer inc";
  	queries = dataServices.getAllQueryCombosFromQuery(words);
    assert.lengthOf(queries, 3);
    assert(queries[0].indexOf(queries[1] === 0));
    assert(queries[0].length > queries[1].length);
    assert(queries[0].indexOf(queries[2] === 0));
    assert(queries[0].length > queries[2].length);
    assert(queries[1].indexOf(queries[2] === 0));
    assert(queries[1].length > queries[2].length);
  });
});


describe.only('dataServices getInstrumentByQuery', function() {
  it('method should be a function', function() {
    assert.typeOf(dataServices.getInstrumentByQuery, 'function');
  });
  it('given single word resolves query should resolve promise to valid data', function(done) {
  	var query = "apple";
  	dataServices.getInstrumentByQuery(query).then(function(response) {
		console.log("final data = " + response.data);
  		assert(response.data === "apple data");
    	done();
	}, function(error) {
	    assert.fail(error);
	    done();
	});
  });
  it('given first word resolves query should resolve promise to valid data', function(done) {
  	var query = "apple computer inc";
  	dataServices.getInstrumentByQuery(query).then(function(response) {
		console.log("final data = " + response.data);
  		assert(response.data === "apple data");
    	done();
	}, function(error) {
	    assert.fail(error);
	    done();
	});
  });
  it('given mid word resolves query should resolve promise to valid data', function(done) {
  	var query = "chiptole mexican grill";
  	dataServices.getInstrumentByQuery(query).then(function(response) {
		console.log("final data = " + response.data);
  		assert(response.data === "cmg data");
    	done();
	}, function(error) {
	    assert.fail(error);
	    done();
	});
  });
});




