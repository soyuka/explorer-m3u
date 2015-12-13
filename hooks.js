/**
 * registerHooks
 * @param object locals explorer locals (see https://github.com/soyuka/explorer/blob/master/Plugins.md)
 * @param object config explorer configuration
 * @return string
 */
function registerHooks(config, user) {
  return {
    //hooking on directory
    directory: function(tree, path) {
      var l = tree.length
      var found = false

      //searches for an audio file
      while(l-- && !found) {
        var e = tree[l]

        if(!e) {
          continue; 
        }

        if(e.type == 'audio') {
          found = true
        }
      }

      if(found === false)
        return '' //don't polute view
      
      //Directory hook wants a <dd> element, adding our route
      return '<li><a href="/p/m3u?path='+path+'&key='+user.key+'">M3u</a></li>'
    }
  }
}

module.exports = registerHooks
