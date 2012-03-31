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

			console.log(result);

			var memo, num;
			// Build an object with nested name and children fields
			// for each number
			var data = _.reduceRight(result,
					function (memo, num) {
							if (!memo.name) {
									memo = {'name': num };
							} else {
									memo = {'name': num, 'children': [memo]};
							}
							return memo;
			}, {});

			console.log(JSON.stringify(data, null, 4));

	    $out.prepend('<tr><td>' + result[0] + 
			'</td><td>' + (result.length-1) + '</td><td>' + 
			result.join(' -> ') + 
			'</td></tr>');

			// Draw a dendogram
			var width = 900;
			var height = 20;

			var cluster = d3.layout.cluster()
					.size([height, width - 160]);

			var diagonal = d3.svg.diagonal()
			    .projection(function(d) { return [d.y, d.x]; });

			var gram = d3.select('#graph')
					.append('svg')
					  .attr("width", width)
					  .attr("height", height)
					.append('g')
			      .attr("transform", "translate(40, 0)");

			console.log(gram[0][0]);

			var nodes = cluster.nodes(data);
			
			var link = gram.selectAll("path.link")
					.data(cluster.links(nodes))
			  .enter().append("path")
					.attr("class", "link")
					.attr("d", diagonal);

			var node = gram.selectAll('g.node')
					.data(nodes)
					.enter().append('g')
					  .attr('class', 'node')
					  .attr('transform', function (d) { return "translate("+d.y+','+d.x+')'; });

			// Draw a circle for each node
			node.append('circle').attr('r', 4.5);
			
			node.append("text")
       .attr("dx", function(d) { return d.children ? -8 : 8; })
       .attr("dy", 3)
       .attr("text-anchor", function(d) { return d.children ? "end" : "start"; })
       .text(function(d) { return d.name; });

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

	$seed.focus();

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
