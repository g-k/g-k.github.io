// 6174.js
// requires Javascript version >= 1.7

function kaprekate(seed) {
    // returns an iterator converging to 6174
    // Usage:
    // var test = Kaprekator('2111');
    // for (k in test) {
    // 	  console.log(k);
    // }

    var seed_places, // number of places in seed
	last_values, // last few_values of the routine (to look for cycles)
	last_length, // number of last few values to save
	i,
	last,  // last value to check against
	have_last, 
	k,     // the current value
	stol,  // array of digits from small to large
	ltos;  //                 from large to small

    seed_places = seed.length;
    have_last = false;
    last_values = [seed];
    last_length = 50;

    // check input is digits
    // with at least two different digits
    if (!is_digit(seed)) {
	throw Error('Input is not digits.');
    }
    if (!more_than_one_digit(seed)) {
	throw Error('Input is must contain at least two different digits like 1112.');
    }

    k = seed;
    while (true) {
    	// sort() and reverse() work in-place
    	// so slice to make a second deep copy in memory
    	// and not just a pointer to the original
	i = k.length;
	stol = [];
	while (i--) {
	    stol.unshift(k[i]);
	}
    	stol = stol.sort();
    	ltos = stol.slice().reverse();
	
	// console.log(stol, ltos);

    	k = aton(ltos) - aton(stol);
    	k = k.toString();
	// left pad with zeros
	while (k.length < seed_places) {
	    k = '0' + k;
	}

	if (last_values.length > last_length) {
	    last_values.shift();
	}

	i = last_values.length;
	while (i--) {
	    last = last_values[i];
	    if (k === last) {
		last_values.push(last);
		have_last = true;
		break;
	    }
	}
	if (have_last === true) break;
	last_values.push(k);
    }
    return last_values;

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

    function is_digit(num) {
	var i = num.length;
	while (i--) {
	    if (!/\d/.test(i)) { // not good for hex
		return false; 
	    }
	}
	return true;
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
    postMessage(kaprekate(seed));
}
