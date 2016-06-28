"use strict";

var Promise = require("bluebird");

function fakeGetData(query) {
	console.log("Fetching data for " + query);
	return new Promise(function(resolve, reject) {
		if (query === "apple") {
			console.log("Found 'apple' data!")
			resolve({data: "apple data"});
		}
		else if (query === "apple computer") {
			console.log("Found empty data!")
			resolve({});
		}
		else if (query === "chiptole mexican") {
			console.log("Found 'chiptole mexican' data!")
			resolve({data: "cmg data"});
		}
		else {
			reject("no data");
		}
	});
}

function chainPromisesOfQueryArrayUntilFullfilment(queries, promiseReturningDataFn, fullfillmentCondition) {
	return queries.reduce(function(promise, query) {
		return promise.then(function(response) {
			console.log("Promise response = " + JSON.stringify(response));
			console.log("Next query = " + query);
			if (!fullfillmentCondition(response)) {
				return promiseReturningDataFn(query);
			}
			else {
				console.log("Have data, so chaining it on as " + JSON.stringify(response));
				return response;
			}
		},
		function(err) {
			console.log("Rejected, now trying " + query);
			return promiseReturningDataFn(query);
		});
	}, Promise.resolve());
}

module.exports = {
    getDataByQuery: function(query) {
    	var queries = this.getAllQueryCombosFromQuery(query);
    	console.log("Starting with " + queries.length + " queries: " + queries.join(", "));
    	return chainPromisesOfQueryArrayUntilFullfilment(queries, fakeGetData, function(response) {
    		return response && response.data;
    	});
    },
    getAllQueryCombosFromQuery: function(query) {
    	var queryArray = query ? query.trim().split(" ") : [];
    	var numberQueryWords = queryArray.length;
    	var queries = [];
    	for (var i = 0; i < numberQueryWords; i++) {
    		console.log("Adding " + query);
    		queries.push(query);
    		queryArray.pop()
    		query = queryArray.join(" ");
    	}
    	return queries;
    }
};