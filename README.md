# jquery.sticky

Version 1.0.0

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

## Changelog

### Version 1.0.0

* initial release
