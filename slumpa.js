/*

Set the seed value
 - Slumpa.setSeed(seed)

Generate random number between a and b (min default=0)
 - Slumpa.int(a, [b=0])

Generate random decimal between a and b (min default=0)
 - Slumpa.float(a, [b=0])

Generate random boolean (probability default = 0.5)
 - Slumpa.bool([probability])

Return random item from array
 - Slumpa.item(arr)

Return random items from array, optional putback to allow multiple of same
 - Slumpa.items(arr, n, [putback=false])

Return the same array shuffled
 - Slumpa.shuffle(arr)

Return a shuffled copy of an array
 - Slumpa.shuffleCopy(arr)

*/


"use strict";
var Slumpa = (function() {
	var initSeed, seed;
	setRandomSeed();

	function randomInt(a, b) {
		if(a == undefined){
			throw new Error("Invalid parameters, enter max, or max and min values");
		}
		if(b == undefined) b = 0;
		if(a<b) var min=a, max=b;
		else var min=b, max=a;
		return min + (Math.floor(rnd() * (max+1-min)));
	}

	function randomInts(c, a, b) {
		var ints = [];
		for(var i=0; i<c; i++) {
			ints.push(randomInt(a,b));
		}
		return ints;
	}

	function randomFloat(a, b) {
		if(a == undefined){
			throw new Error("Invalid parameters, enter max, or max and min values");
		}
		if(b == undefined) b = 0;
		if(a<b) var min=a, max=b;
		else var min=b, max=a;
		return min + (rnd() * (max-min));
	}

	function randomFloats(c, a, b) {
		var floats = [];
		for(var i=0; i<c; i++) {
			floats.push(randomFloat(a,b));
		}
		return floats;
	}

	function randomBool(probability) {
		if(probability === undefined) probability = 0.5;
		return rnd() < probability ? true : false;
	}

	function randomItems(arr, values, putBack) {
		if(putBack) {
			var result = [];
			for(var i=0; i<values; i++) {
				result.push(arr[randomInt(0, arr.length-1)]);
			}
			return result;
		} else {
			arr = shuffleCopy(arr);
			return arr.slice(0, values);
		}
	}

	function randomOne(arr) {
		return arr[randomInt(0, arr.length-1)];
	}

	var rnd = (function() {
		var a = 1664525,
			c = 1013904223,
			m = Math.pow(2, 32);
		return function() {
			seed = (a * seed + c) % m;
			return seed / m;
		}
	}());

	function setSeed(newSeed) {
		initSeed = newSeed;
		if(!isNaN(parseFloat(newSeed)) && isFinite(newSeed)) {
			seed = newSeed;
		} else {
			seed = getHash(newSeed);
		}
	}

	function setRandomSeed() {
		setSeed(Math.floor(Math.random() * Number.MAX_SAFE_INTEGER));
	}

	function getSeed() {
		return initSeed;
	}

	function shuffle(arr) {
		var j, tmp, i;
		for (i = arr.length; i; i -= 1) {
			j = Math.floor(rnd() * i);
			tmp = arr[i - 1];
			arr[i - 1] = arr[j];
			arr[j] = tmp;
		}
		return arr;
	}

	function shuffleCopy(arr) {
		return shuffle(arr.slice(0));
	}

	function getHash(str) {
		var hash = 0, i, chr, len;
		if (str.length === 0) return hash;
		for (i = 0, len = str.length; i < len; i++) {
			chr   = str.charCodeAt(i);
			hash  = ((hash << 5) - hash) + chr;
			hash |= 0; // Convert to 32bit integer
		}
		return hash;
	};

	return {
		setSeed: setSeed,
		getSeed: getSeed,
		setRandomSeed: setRandomSeed,
		int: randomInt,
		ints: randomInts,
		bool: randomBool,
		float: randomFloat,
		item: randomOne,
		items: randomItems,
		shuffle: shuffle,
		shuffleCopy: shuffleCopy
	}
}());
