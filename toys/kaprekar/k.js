$(function () {
	if (!Modernizr.webworkers) {
	    alert("Your browser doesn't support the HTML 5 Web Workers this page uses. Try Chrome or Firefox.");
	}

	var $out = $('#result table tbody');
	var $base = $('#base');
	var $seed = $('#seed');

	worker = new Worker('kaprekator.js');	
	worker.onmessage = function (event) {
	    var result = event.data;
	    var iteration = result.length;
	    var k;

	    k = result[iteration];
			// Drop the doubled last entry
			result = _.uniq(result);

	    $out.prepend('<tr><td>' + result[0] + 
			'</td><td>' + (result.length-1) + '</td><td>' + 
			result.join(' -> ') + 
			'</td></tr>');
	};
	worker.onerror = function (error) {
	    console.log("Worker error:", error.message, error, "\n");
	    throw error;
	};

	$base.change(function (event) {
		// check for valid number in new base

		// convert everything to hex
		// drop digits down to highest value
	});

	$seed.on('keydown', function (event) {
							 var num;
							 if (event.keyCode !== 13) return;
							 num = $seed.val();
							 console.log('seed', num);
							 worker.postMessage(num);
					 });

	$seed.change(function (event) {
		// check for valid input
		var radix = $base.attr('value');
		var digits = $seed.html().length;
		// left pad zeros if needed
	});
});
