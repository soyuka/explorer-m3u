var fs = require('fs')
var util = require('util')
var p = require('path')
var eol = require('os').EOL

/**
 * m3uRouter
 * @param Express app our app instances
 * @param object utils explorer utils (see https://github.com/soyuka/explorer/blob/master/Plugins.md 
 */
function m3uRouter(app, utils) {
  var HTTPError = utils.HTTPError

  function m3u(req, res, next) {
    req.options = util._extend(req.options, {maxDepth: 1, limit: Infinity})
    utils.tree(req.query.path, req.options) 
    .then(function(paths) {
      res.set('Content-type', 'audio/x-mpegurl') 
      res.set('Content-Disposition', 'inline; filename='+p.basename(req.query.path) + '.m3u')
      var text = '#EXTM3U'+eol
      for(var i in paths.tree) {
        if(paths.tree[i].type == 'audio')
          text += req.protocol + '://'+req.get('host')+'/download?path='+encodeURIComponent(paths.tree[i].path)+'&key='+req.user.key+eol
      }

      return res.send(text)
    })
    .catch(function(err) {
      return next(new utils.HTTPError(err, 500))
    })
  }

  app.get('/', utils.prepareTree, m3u)

  return app
}

module.exports = m3uRouter
