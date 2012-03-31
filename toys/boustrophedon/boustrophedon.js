// boustrophedon.js - for boustrophedon rendering
// uses and requires jQuery and Modernizr

// uses 2D CSS rotate transforms for reverse boustrophedon
// and the webkit box-reflect for mirror boustrophedon
// 
// 2D CSS transforms:  http://www.w3.org/TR/css3-2d-transforms/
// webkit-box-reflect: http://webkit.org/blog/182/css-reflections/

window.Boustrophedon = (function($, Modernizr) {
	var actions = { 
      mirror : {},
      reverse : {}
  };
	actions.reverse[Modernizr.prefixed("transform")] = "rotate(180deg)";
														
	actions.mirror[Modernizr.prefixed("boxReflect")] = "left 10px";
  actions.mirror[Modernizr.prefixed("transform")] = "translateX(TX)";

  var Boustrophedon = function (text, $container, action) {

      // check for action/type and get the action's CSS rules 
      var css;

      if (!action.match(/mirror|reverse/ig) ) {
          throw "Invalid Boustrophedon action/type";
      }
      action = action.toLowerCase();
      css = actions[action];

      // how many characters fit on each line
      var width = $container.width();
      
      var test_string = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
      // average character width only seems to work for fixed width fonts
      // no surprise there
      $container.append('<span>' + test_string + '<span>');
      var char_width = $container.children('span').width() / 52;
      $container.children('span').remove();
      
      var chars_per_line = Math.floor(width / char_width);

      // add divs for each line and apply css to every other line
      var line_num, line, newline, last_char, next_line_first_char;
      var start_index;
      var lines = Math.ceil(text.length / chars_per_line);

      for (line_num = 0; line_num < lines + 2; line_num += 1) {
          start_index = line_num * chars_per_line;

          if (start_index + chars_per_line > text.length - 1) {
              line = text.substring(start_index, text.length - 1);
          } else {
              line = text.substr(start_index, chars_per_line);
          }
          $newline = $('<div></div>').text(line);
      
          // have to insert into DOM to get an offset width
          $container.append($newline);
      
          if (line_num % 2) {
              // Shift the text 
              if (action === 'mirror') {
									var transform = Modernizr.prefixed("transform");
                  css[transform] = css[transform].replace('TX', $newline.css('width'));
              }
              $newline.addClass(action).css(css);
          }
      }
  };
     
  return Boustrophedon;

})(jQuery, Modernizr);

function run(event) {
    var text = $('#input').val();
    var $mirror = $('#mirror');
    var $reverse = $('#reverse');
    Boustrophedon(text, $reverse, 'reverse');
    Boustrophedon(text, $mirror, 'mirror');
}

$(document).ready(function () {
  $('#run').click(run);
});