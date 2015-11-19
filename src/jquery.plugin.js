/**
 * jQuery.plugin
 *
 * (a) Wil Neeley
 * (c) Code may be freely distributed under the MIT license.
 */
;(function ( $, window, document, undefined ) {

  "use strict";

  var
    plugin_name   = 'plugin',
    defaults      = {
    };

  // Plugin constructor
  function Plugin( element, options ) {
    this._name = plugin_name;
    this._defaults = defaults;
    this.element = element;
    this.options = $.extend({}, defaults, options);
    this.init();
  }

  // Extend plugin prototype
  $.extend(Plugin.prototype, {

    // Initialization method - plugin bootstrap
    init: function() {
      this.privatePluginMethod();
    },
    privatePluginMethod: function() {
      // Do stuff here ...
    }
  });

  // Public methods
  var public_methods = {
    publicPluginMethod: function( arg ) {
      console.log('Hooray! we called a public plugin method!');
    }
  };

  // Plugin wrapper
  $.fn[plugin_name] = function ( options ) {

    // Call a public plugin method
    if (typeof options == 'string') {
      var
        method_name       = options,
        args              = $(arguments).toArray();
      args.shift();
      args.unshift(this);
      if (method_name in public_methods) {
        return public_methods[method_name].apply(this, args);
      } else {
       throw new Error('jQuery.' + plugin_name + ' method does not exist!');
      }
    }

    // Initialize plugin
    else {
      return this.each(function () {
        if (!$.data(this, 'plugin_' + plugin_name)) {
          $.data(this, 'plugin_' + plugin_name, new Plugin( this, options ));
        }
      });
    }
  };

})( jQuery, window, document );
