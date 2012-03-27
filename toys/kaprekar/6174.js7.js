// 6174.js
// requires Javascript version >= 1.7

function Kaprekator(seed) {
    // returns an iterator converging to 6174
    // Usage:
    // var test = Kaprekator('2111');
    // for (k in test) {
    // 	  console.log(k);
    // }

    var valid, // is the seed value valid?
	k,     // the current value
	stol,  // array of digits from small to large
	ltos;  //                 from large to small

    // check for a four digit number
    // with at least two different digits
    valid = /\d{4}/.test(seed) && 
			seed.length === 4 &&
			more_than_one_digit(seed);
    if (!valid) {
	throw Error('Input is not a four digit number \
with at least two different digits like 1112.');
    }

    k = seed;
    while (true) {
    	// sort() and reverse() work in-place
    	// so slice to make a second deep copy in memory
    	// and not just a pointer to the original
    	stol = [parseInt(digit) for each (digit in k)].sort();
    	ltos = stol.slice().reverse();
	
	// console.log(stol, ltos);

    	k = aton(ltos) - aton(stol);
    	k = k.toString();

	// left pad with zeros
	while (k.length < 4) {
	    k = '0' + k;
	}
    	yield k;
	if (k === '6174') break;
    }

    function more_than_one_digit(num) {
	// checks that the number isn't all the same value like 1111
	var first_digit = num[0],
	    i = num.length;
	while (i--) {
	    if (num[i] !== first_digit) {
		return true;
	    }
	}
	return false;
    }

    function aton(a) {
	// converts an array of single digits to a number
	var n = 0;
	var place_value = 1;
	var place = a.length;
	
	while (place--) {
	    n += a[place] * place_value;
	    place_value *= 10;
	}
	return n;
    }
}

// make available as a web worker
onmessage = function(event) {    
    var seed = event.data;
    postMessage(Kaprekator(seed));
}
