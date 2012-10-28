fs = require 'fs'

handlebars = require 'handlebars'
$ = require 'jquery'
_ = require 'underscore'

gistTemplate = handlebars.compile fs.readFileSync('./index.handlebars', 'utf8')

main = ->
  $.when(
    $.ajax 'https://api.github.com/users/g-k/gists', dataType: 'json'
    $.ajax 'https://api.github.com/users/g-k/repos', dataType: 'json'
  ).fail(->
    throw new Error 'Request failed:', arguments
  ).done (gists, repos) ->
    console.log gistTemplate {
      gists: gists[0]
      repos: repos[0]
    }

main()