# jquery.sticky

## Summary

A jQuery plugin for sticking an element at a fixed position when a given scroll point is reached.

This plugin is highly useful for creating navigation systems that "stick" to the top of the viewport at a given point 
after a user has scrolled down.

## Author

Wil Neeley ( [@wilneeley](http://twitter.com/wilneeley) / [github.com](https://github.com/Xaxis) )

## Usage

Include `jquery.sticky.min.js` after jQuery in your header or elsewhere on your page.

### Stick an Element 

The below example demonstrates a navigation div that sticks to the top of the screen after the element's bottom has been
reached while scrolling down the screen.

```javascript
// Stick element when bottom is reached
$('#sticky-nav').sticky({
    start: 'bottom'
});
```

The element will return to its original position after its original trigger point has been reached again upon scrolling
up the screen.

Available property values for `start` are `top`, `middle`, and `bottom`.

### Smooth Element Transitions

Often when an element moves from being positioned relatively to fixed the effect is a page jump. jQuery.sticky attempts
to solve for this.

```javascript
// Stick element when bottom is reached
$('#sticky-nav').sticky({
    start: 'bottom',
    smooth: true
});
```

### Stack Multiple Stickies

Sometimes you'll want multiple elements to stick to the top when they scroll out of view and stack in their relative 
order.

```javascript
// Stick element when bottom is reached
$('#sticky-nav-1, #sticky-nav-2, #sticky-nav-3').sticky({
    start: 'bottom',
    smooth: true,
    stack: true
});
```
