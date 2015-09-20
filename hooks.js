/**
 * registerHooks
 * @param object locals explorer locals (see https://github.com/soyuka/explorer/blob/master/Plugins.md)
 * @param object config explorer configuration
 * @return string
 */
function registerHooks(config) {
  return {
    //hooking on directory
    directory: function(tree, user) {
      var l = tree.length
      var found = false

      //searches for a .rar|.r{00.999} in the tree
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
      return '<dd><a href="/p/m3u?path='+e.dirname+'&key='+user.key+'">M3u</a></dd>'
    }
  }
}

module.exports = registerHooks
