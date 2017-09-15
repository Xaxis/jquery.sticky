# jquery.sticky

## Table of Contents

  * [Summary](#summary)
      * [Author](#author)
  * [Usage](#usage)
      * [Stick an Element](#stick-an-element)
      * [Smooth Element Transitions](#smooth-element-transitions)
      * [Stack Multiple Stickies](#stack-multiple-stickies)
      * [Callbacks on Sticky Events](#callbacks-on-sticky-events)
      * [Adding an Offset](#adding-an-offset)
      * [Scrolling Callback](#scrolling-callback)
      * [Demo](#demo)

## Summary

A jQuery plugin for sticking an element at a fixed position when a given scroll point is reached. 

This plugin is highly useful for creating navigation systems that "stick" to the top of the viewport at a given point 
after a user has scrolled down. This feature is sometimes known as [scroll-linked positioning](https://developer.mozilla.org/en-US/docs/Mozilla/Performance/Scroll-linked_effects).

### Author

Wil Neeley ( [@wilneeley](http://twitter.com/wilneeley) / [github.com](https://github.com/Xaxis) )

## Usage

Include `jquery.sticky.min.js` after jQuery in your header or elsewhere on your page.

### Stick an Element 

The below example demonstrates a navigation div that sticks to the top of the screen after the element's bottom has been
reached while scrolling down and un-sticks when the top of the element has been reached while scrolling up.

```javascript
$('#sticky-nav').sticky({
    start: 'bottom',
    end: 'top'
});
```

Available property values for `start` and `end` are `top`, and `bottom`.

### Smooth Element Transitions

Often when an element moves from being positioned relatively to fixed the effect is a page jump. jQuery.sticky attempts
to solve for this.

```javascript
$('#sticky-nav').sticky({
    start: 'bottom',
    end: 'bottom',
    smooth: true
});
```

### Stack Multiple Stickies

Sometimes you'll want multiple elements to stick to the top when they scroll out of view and stack in their relative 
order.

```javascript
$('#sticky-nav-1, #sticky-nav-2, #sticky-nav-3').sticky({
    start: 'bottom',
    end: 'top',
    smooth: true,
    stack: true
});
```

### Callbacks On Sticky Events

It is often useful to have the ability to run some of your own code after an element has become a "sticky" or after it
has gone back to its original positioning.

```javascript
$('#sticky-nav-1, #sticky-nav-2, #sticky-nav-3').sticky({
    start: 'bottom',
    end: 'bottom',
    smooth: true,
    stack: true,
    onStick: function( elm ) {
        elm.addClass('transition');
    },
    onUnstick: function( elm ) {
        elm.removeClass('transition');
    }
});
```

### Adding an Offset

Sometimes you'll want to trigger your sticky element at an arbitrary point. To do this add an offset. This allows you to
stick/unstick your element at a defined distance before the element reaches the top of the screen.

```javascript
$('#sticky-nav-4').sticky({
    start: 'top',
    end: 'top',
    smooth: true,
    stack: true,
    offset: 50,
    onStick: function( elm ) {
        elm.addClass('transition');
    },
    onUnstick: function( elm ) {
        elm.removeClass('transition');
    }
});
```

The above code triggers the stick event 50 pixels before the element reaches the top of the screen (or element stack if other
elements are being stuck).

### Scrolling Callback

As a convenience you can attach a callback to the scroll event. This way you don't need to create an additional scroll handler.

```javascript
$('#sticky-nav-4').sticky({
    start: 'top',
    end: 'top',
    smooth: true,
    stack: true,
    onScroll: function( elm ) {
        console.log('Yay, I am scrolling!');
    }
});
```

### Ordering execution

On a site with many dependencies or multiple JavaScript files being loaded out of order it can sometimes be crucial to set the
initialization order of jquery.sticky. When the `order` property is set all instances of jquery.sticky must use the property. The
order starts at 1 and sequentially ends at an increment of your last initialization (if your initializing jquery.sticky 4 times your 
order properties will be 1 through 4. If you skip any numbers in between some of your jquery.sticky initializations will not work.

```javascript
$('#sticky-nav-3').sticky({
    start: 'top',
    end: 'top',
    smooth: true,
    stack: true,
    offset: 0,
    order: 3,
    onStick: function( elm ) {
        elm.addClass('transition');
    },
    onUnstick: function( elm ) {
        elm.removeClass('transition');
    }
});
$('#sticky-nav-1').sticky({
    start: 'bottom',
    end: 'top',
    smooth: true,
    stack: true,
    order: 2,
    onStick: function( elm ) {
        console.log('stick');
        elm.addClass('transition');
    },
    onUnstick: function( elm ) {
        console.log('unstick');
        elm.removeClass('transition');
    }
});
$('#sticky-nav-4').sticky({
    start: 'top',
    end: 'top',
    smooth: true,
    stack: true,
    offset: 0,
    order: 1,
    onStick: function( elm ) {
        elm.addClass('transition');
    },
    onUnstick: function( elm ) {
        elm.removeClass('transition');
    }
});
```

### Demo

![Demo](https://raw.githubusercontent.com/Xaxis/jquery.sticky/master/test/assets/sticky-nav-demo.gif "Demo")
