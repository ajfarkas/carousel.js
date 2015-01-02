carousel.js
===========

Simple plug-n-play image carousel for websites, with support for `video`.
<br/>Written in vanilla JavaScript. 
<br/>Demo at [ajfarkas.com](http://www.ajfarkas.com/image-carousel/)

Instructions
------------
1. Wrap your images and video in a `div` with `id="carousel"`.
2. Add `<script src="carousel/carousel.js"></script>` inside the `head` tag in your HTML.
3. Drop the `carousel` folder onto your server.
<br/>That's all.

Preferences
-----------
There are currently three preferences, at the top of the `carousel.js` file:

|Preference |Default   |Description|
|:----------|:--------:|:----------|
|defaultStyle|`true`|Imports `carouselStyle.css` to style the carousel navigation. You can change the styles in the css file or set this to `false` to style with your own CSS.|
|navBackground|`true`|If set to `false`, carousel nav buttons `background-color` will be `transparent`.| 
|navInside|`true`|Determines position of carousel nav buttons. `true` sets them to overlap the images, `false` sets them just outside the images.|

<<<<<<< HEAD
I'd like this to be super-easy for people to use. It's not best-coding practice, but is fine for small sites where the extra load time is negligible. Send me feature requests and I'll add them. 
=======
I'd like this to be super-easy for people to use. Not recommended for large sites, but it's good for small sites where the extra load time is negligible. Send me feature requests and I'll add them.  
>>>>>>> master
