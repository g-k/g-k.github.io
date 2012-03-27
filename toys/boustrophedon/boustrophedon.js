// boustrophedon.js - for all your boustrophedon rendering needs!
// uses and requires jQuery

// uses 2D CSS rotate transforms for reverse boustrophedon
// and the webkit box-reflect for mirror boustrophedon
// 
// 2D CSS transforms:  http://www.w3.org/TR/css3-2d-transforms/
// webkit-box-reflect: http://webkit.org/blog/182/css-reflections/

// License: 
//   Please attribute to gregarinekapok@gmail.com
//   Let me know if you find a use for this
//   Leave the license intact

(function(window, undefined) {
    var actions = { 
	mirror : {
	    "-webkit-box-reflect": "left 10px",
	    "-webkit-transform"  : "translate(TX, 0)",
	    "background-color" : "lightblue",
	},
	reverse : {
	    "-webkit-transform": "rotate(180deg)",
	    "-moz-transform": "rotate(180deg)",
	    "transform": "rotate(180deg)",
	    "background-color": "lightblue",
	},
    };

    var Boustrophedon = function (text, container, action) {

	// check for action/type and get the action's CSS rules 
	var css;
        if ( !action.match(/mirror|reverse/ig) ) {
	    throw "Invalid Boustrophedon action/type"
	} else {
	    action = action.toLowerCase();
	    css = actions[action];
	}

	// how many characters fit on each line
	var container = $(container);
	var width = container.width();

	var test_string = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
	// average character width only seems to work for fixed width fonts
	// no surprise there
	$(container).append('<span>' + test_string + '<span>');
	var char_width = $(container).children('span').width() / 52;
	$(container).children('span').remove();

	var chars_per_line = Math.floor(width / char_width);

	// add divs for each line and apply css to every other line
	var line_num, 
	    line, 
	    newline, last_char, next_line_first_char;
	var start_index;
	var lines = Math.ceil(text.length / chars_per_line);

	for (line_num = 0; line_num < lines + 2; line_num += 1) {
	    start_index = line_num * chars_per_line;

	    if ( start_index + chars_per_line > text.length - 1) {
		line = text.substring(start_index, text.length - 1);
	    } else {
		line = text.substr(start_index, chars_per_line);

		/* // if we're in a word add a dash	    
		last_char = line[line.length - 1].match(/\S/);
		next_line_first_char = text[start_index + chars_per_line].match(/\S/);
		if (last_char !== null && next_line_first_char !== null) {
		    line += '-';
		}
		*/
	    }
	    newline = $('<div>' + line + '</div>');
	    
	    // have to insert into DOM to get an offset width
	    container.append(newline);

	    if (line_num % 2) {
		if (action === 'mirror') {
		    css["-webkit-transform"] = css["-webkit-transform"].replace('TX', newline.css('width'));
		}
		newline.css(css);
	    }
	}
    }

    // expose ourselves to the global namespace 
    // overwriting the popular Boustrophedon object name
    window.Boustrophedon = Boustrophedon;
})(window)

function run(event) {
    var text = $('#input').val();
    var mirror = $('#mirror');
    var reverse = $('#reverse');
    Boustrophedon(text, reverse, 'reverse');
    Boustrophedon(text, mirror, 'mirror');
}
$(document).ready(function () {
	$('#run').click(run);
    });