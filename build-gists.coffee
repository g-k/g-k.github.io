fs = require 'fs'

handlebars = require 'handlebars'
$ = require 'jquery'
_ = require 'underscore'

gistTemplate = handlebars.compile fs.readFileSync('./index.handlebars', 'utf8')

main = ->
  $.ajax(
    'https://api.github.com/users/g-k/gists',
    dataType: 'json'
  ).fail(->
    throw new Error 'Gists request failed:', arguments
  ).done (gists) ->
    console.log gistTemplate gists: gists

main()