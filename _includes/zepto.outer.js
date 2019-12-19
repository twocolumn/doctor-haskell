(function($) {
  $.expr = {':': {}};

  $.support = {};

  $.fn.clone = function(){
      var ret = $();
      this.each(function(){
          ret.push(this.cloneNode(true))
      });
      return ret;
  };

  ["Left", "Top"].forEach(function(name, i) {
    var method = "scroll" + name;

    function isWindow( obj ) {
        return obj && typeof obj === "object" && "setInterval" in obj;
    }

    function getWindow( elem ) {
      return isWindow( elem ) ? elem : elem.nodeType === 9 ? elem.defaultView || elem.parentWindow : false;
    }

    $.fn[ method ] = function( val ) {
      var elem, win;

      if ( val === undefined ) {

        elem = this[ 0 ];

        if ( !elem ) {
          return null;
        }

        win = getWindow( elem );

        return win ? ("pageXOffset" in win) ? win[ i ? "pageYOffset" : "pageXOffset" ] :
            win.document.documentElement[ method ] ||
            win.document.body[ method ] :
            elem[ method ];
      }

      this.each(function() {
        win = getWindow( this );

        if ( win ) {
          var xCoord = !i ? val : $( win ).scrollLeft();
          var yCoord = i ? val : $( win ).scrollTop();
          win.scrollTo(xCoord, yCoord);
        } else {
          this[ method ] = val;
        }
      });
    }
  });

  ['width', 'height'].forEach(function(dimension) {
    var offset, Dimension = dimension.replace(/./, function(m) { return m[0].toUpperCase() });
    $.fn['outer' + Dimension] = function(margin) {
      var elem = this;
      if (elem) {
        var size = elem[dimension]();
        var sides = {'width': ['left', 'right'], 'height': ['top', 'bottom']};
        sides[dimension].forEach(function(side) {
          if (margin) size += parseInt(elem.css('margin-' + side), 10);
        });
        return size;
      } else {
        return null;
      }
    };
  });

  $.proxy = function( fn, context ) {
    if ( typeof context === "string" ) {
      var tmp = fn[ context ];
      context = fn;
      fn = tmp;
    }

    if ( !$.isFunction( fn ) ) {
      return undefined;
    }

    var args = Array.prototype.slice.call( arguments, 2 ),
      proxy = function() {
        return fn.apply( context, args.concat( Array.prototype.slice.call( arguments ) ) );
      };

    proxy.guid = fn.guid = fn.guid || proxy.guid || $.guid++;

    return proxy;
  };

  var nativeTrim = String.prototype.trim;
  $.trim = function(str, characters){
    if (!characters && nativeTrim) {
      return nativeTrim.call(str);
    }
    characters = defaultToWhiteSpace(characters);
    return str.replace(new RegExp('\^[' + characters + ']+|[' + characters + ']+$', 'g'), '');
  };

  var rtable = /^t(?:able|d|h)$/i,
  rroot = /^(?:body|html)$/i;
  $.fn.position = function() {
    if ( !this[0] ) {
      return null;
    }

    var elem = this[0],

    offsetParent = this.offsetParent(),
    offset       = this.offset(),
    parentOffset = rroot.test(offsetParent[0].nodeName) ? { top: 0, left: 0 } : offsetParent.offset();

    offset.top  -= parseFloat( $(elem).css("margin-top") ) || 0;
    offset.left -= parseFloat( $(elem).css("margin-left") ) || 0;

    parentOffset.top  += parseFloat( $(offsetParent[0]).css("border-top-width") ) || 0;
    parentOffset.left += parseFloat( $(offsetParent[0]).css("border-left-width") ) || 0;

    return {
      top:  offset.top  - parentOffset.top,
      left: offset.left - parentOffset.left
    };
  };

  $.fn.offsetParent = function() {
    var ret = $();
    this.each(function(){
      var offsetParent = this.offsetParent || document.body;
      while ( offsetParent && (!rroot.test(offsetParent.nodeName) && $(offsetParent).css("position") === "static") ) {
        offsetParent = offsetParent.offsetParent;
      }
      ret.push(offsetParent);
    });
    return ret;
  };

  Event.prototype.isDefaultPrevented = function() {
    return this.defaultPrevented;
  };
})(Zepto);
