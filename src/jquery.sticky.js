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
      end: 'top',
      smooth: false,
      stack: false,
      onStick: null,
      onUnstick: null
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
        plugin              = this,
        stack_height        = 0;

      // Update stack height with any previous stacked elements
      if (plugin.options.stack) {
        $('[data-sticky-stack-elm]').each(function(idx, value) {
          var
            s_elm       = $(value),
            s_elm_h     = s_elm.outerHeight();
          stack_height += s_elm_h;
        });
      }

      // Start scroll handler
      $(window).on('scroll', function(e) {
        plugin.trackElementScrollPosition.call(plugin, stack_height, e);
      });

      // Run on load
      plugin.trackElementScrollPosition(stack_height);
    },

    /**
     * Update "stickyness" based on element's position relative to scrolling.
     */
    trackElementScrollPosition: function( stack_height, e ) {
      var
        plugin            = this;

      // Iterate over sticky elements
      $(this.element).each(function(idx, value) {
        var
          elm                 = $(value),
          pos                 = elm.offset(),
          elm_top             = pos.top,
          elm_h               = elm.outerHeight(),
          scroll_pos          = $(window).scrollTop(),
          position            = elm.css('position'),
          stick_point         = elm.data('stick_point'),
          sticky_elm_len      = $('[data-sticky-stack-elm]').length;

        // Set global element attribute on all elements that are to be stacked
        if (!elm.attr('data-sticky-stack-elm') && plugin.options.stack) {
          elm.attr('data-sticky-stack-elm', sticky_elm_len + 1);
        }

        // Set position height to stack height
        elm.data('stack_height', stack_height);

        // Stick based on start point
        switch (plugin.options.start) {

          // Top
          case 'top' :
            if (position != 'fixed' && (scroll_pos + stack_height > elm_top)) {
              plugin.stickElement.call(plugin, elm, (elm_top - stack_height));
            }
            else if (
              (position == 'fixed' && plugin.options.end == 'top' && (scroll_pos <= stick_point))
              ||
              (position == 'fixed' && plugin.options.end == 'bottom' && (scroll_pos < (stick_point - elm_h)))
              ||
              (position == 'fixed' && plugin.options.end == 'bottom' && (scroll_pos <= 0))
            ) {
              plugin.unstickElement.call(plugin, elm);
            }
            break;

          // Bottom
          case 'bottom' :
            if (position != 'fixed' && (scroll_pos > (elm_top + elm_h - stack_height))) {
              plugin.stickElement.call(plugin, elm, (elm_top + elm_h - stack_height));
            }
            else if (
              (position == 'fixed' && plugin.options.end == 'top' && (scroll_pos <= (stick_point - elm_h)))
              ||
              (position == 'fixed' && plugin.options.end == 'bottom' && (scroll_pos < (stick_point)))
              ||
              (position == 'fixed' && plugin.options.end == 'bottom' && (scroll_pos <= 0))
            ) {
              plugin.unstickElement.call(plugin, elm);
            }
            break;
        }

        // Increment stacked elements total height
        if (plugin.options.stack) {
          stack_height += elm_h;
        }
      });
    },

    /**
     * Stick an element at a fixed position. Element should NOT be stuck to the "scroll position" because this does not
     * consider cases where the browser loads in a scrolled position. We want to set the 'stick_point' to the element's
     * "transition position" (the position at which an element should toggle between stuck/unstuck.
     */
    stickElement: function( elm, stick_point ) {
      var
        stuck           = elm.data('stuck');
      if (!stuck) {
        elm.data('stuck', true);
        elm.data('stick_point', stick_point);

        // Create smooth position transition by inserting same dimension element in place of fixed dimension element.
        // - This must be done before sticking the element to prevent an edge case that prevents the user from scrolling
        //   down when there is not enough scroll height.
        if (this.options.smooth) {
          var dim_elm = $('<div>');
          dim_elm.css('height', elm.outerHeight()).insertBefore(elm);
          elm.data('dim_elm', dim_elm);
        }

        // Stick the element
        elm.css({
          position: 'fixed',
          top: elm.data('stack_height')
        });

        // Execute callback
        if (this.options.onStick) {
          this.options.onStick(elm);
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

        // Execute callback
        if (this.options.onUnstick) {
          this.options.onUnstick(elm);
        }
      }
    }
  });

  // Plugin wrapper
  $.fn[plugin_name] = function ( options ) {
    return $.data(this, 'plugin_' + plugin_name, new Plugin( this, options ));
  };

})( jQuery, window, document );
