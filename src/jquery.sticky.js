/**
 * jQuery.sticky
 *
 * (a) Wil Neeley
 * (c) Code may be freely distributed under the MIT license.
 */
;(function ( $, window, document, undefined ) {

  "use strict";

  var
    plugin_name   = 'sticky',
    defaults      = {
      start: 'top',
      smooth: false
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

    /**
     * Plugin initialization.
     */
    init: function() {
      var
        plugin        = this;
      this.last_scroll_pos = $(window).scrollTop();
      this.trackElementScrollPosition();
      $(window).on('scroll', function() {
        plugin.trackElementScrollPosition.call(plugin);
      });
    },

    /**
     * Update "stickyness" based on element's position relative to scrolling.
     */
    trackElementScrollPosition: function() {
      var
        plugin        = this;
      $(this.element).each(function(idx, value) {
        var
          elm               = $(value),
          pos               = elm.offset(),
          elm_top           = pos.top,
          elm_h             = elm.outerHeight(),
          scroll_pos        = $(window).scrollTop(),
          position          = elm.css('position'),
          stick_point       = elm.data('stick_point'),
          scroll_dir        = '';

        // Determine scroll direction
        if (scroll_pos > this.last_scroll_pos) {
          scroll_dir = 'down';
        } else if (scroll_pos < this.last_scroll_pos) {
          scroll_dir = 'up';
        }

        // Update scroll position property
        this.last_scroll_pos = scroll_pos;

        // Stick based on start point
        switch (plugin.options.start) {

          // Top
          case 'top' :
            if ((scroll_pos > elm_top) && position != 'fixed') {
              plugin.stickElement.call(plugin, elm, pos, scroll_pos);
            }
            else if (position == 'fixed' && (scroll_pos < stick_point)) {
              plugin.unstickElement.call(plugin, elm);
            }
            break;

          // Bottom
          case 'bottom' :
            if ((scroll_pos > elm_top + elm_h) && position != 'fixed') {
              plugin.stickElement.call(plugin, elm, pos, scroll_pos);
            }
            else if (position == 'fixed' && (scroll_pos < stick_point)) {
              plugin.unstickElement.call(plugin, elm);
            }
            break;

          // Bottom
          case 'middle' :
            if ((scroll_pos > elm_top + (elm_h / 2)) && position != 'fixed') {
              plugin.stickElement.call(plugin, elm, pos, scroll_pos);
            }
            else if (position == 'fixed' && (scroll_pos < stick_point)) {
              plugin.unstickElement.call(plugin, elm);
            }
            break;
        }
      });
    },

    /**
     * Stick an element at a fixed position.
     */
    stickElement: function( elm, pos, scroll_pos ) {
      var
        stuck           = elm.data('stuck');
      if (!stuck) {
        elm.data('stuck', true);
        elm.data('stick_point', scroll_pos);
        elm.css({
          position: 'fixed',
          top: 0
        });

        // Create smooth position transition by inserting same dimension element in place of fixed dimension element
        if (this.options.smooth) {
          var dim_elm = $('<div>');
          dim_elm.css('height', elm.outerHeight()).insertBefore(elm);
          elm.data('dim_elm', dim_elm);
        }
      }
    },

    /**
     * Unstick an element from a fixed position.
     */
    unstickElement: function( elm ) {
      var
        stuck           = elm.data('stuck');
      if (stuck) {
        elm.data('stuck', false);
        elm.css('position', '');

        // Remove dimensional placeholder element
        if (this.options.smooth) {
          var dim_elm = elm.data('dim_elm');
          dim_elm.remove();
        }
      }
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
