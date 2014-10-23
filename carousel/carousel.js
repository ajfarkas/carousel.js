;
function preferences(){
	//use default styling (center slideshow, default nav arrows)
	var defaultStyle = true;
	//navigation buttons show background (or arrows only)
	var navBackground = true;
	//nav buttons inside or outside image
	var navInside = true;

	return {
		defaultStyle: defaultStyle,
		navBackground: navBackground,
		navInside: navInside
	};
}


window.onload = function(){
	var carousel = document.getElementById('carousel'),
			prefs = preferences(),
			defaultStyle = prefs.defaultStyle, 
			navBackground = prefs.navBackground, 
			navInside = prefs.navInside, 
			newActive, link;

	//default prefs script
	if(defaultStyle === true){
		link = document.createElement('link');
		link.setAttribute('rel', 'stylesheet');
		link.setAttribute('type', 'text/css');
		link.setAttribute('href', 'carousel/carouselStyle.css');
		document.head.appendChild(link);
	}

	//Navigation
	//Position the nav buttons
	function navPos(mediaTarg){
		var navTop = (propertyValue(mediaTarg, 'null', 'height') - propertyValue(document.getElementsByClassName('slide-nav')[0], 'null', 'height'))/2,
				navRight = halfOuterWidth(carousel, 'null', 'right') - Math.round(propertyValue(mediaTarg, 'null', 'width')/2),
				navLeft = halfOuterWidth(carousel, 'null', 'left') - Math.round(propertyValue(mediaTarg, 'null', 'width')/2);
		//nav position prefs
		if(navInside === true){
			navRight += 5;
			navLeft +=5;
		} else{ //pref set to nav outside image window
			navRight -= propertyValue(document.getElementsByClassName('forward')[0], 'null', 'width')+5;
			navLeft -= propertyValue(document.getElementsByClassName('back')[0], 'null', 'width')+5;
		}
		eachClass('slide-nav', function(a){a.style.top = navTop+'px';});
		eachClass('forward', function(a){a.style.right = navRight+'px';});
		eachClass('back', function(a){a.style.left = navLeft+'px';});
	}
//-- supporting functions --
	function propertyValue(elem, pseudo, prop){
		return Number(window.getComputedStyle(elem, pseudo).getPropertyValue(prop).replace(/px/, '')) || 0;
	}
	//measure half image window + border + padding on one side
	function halfOuterWidth(elem, pseudo, side){
		var size = (propertyValue(elem, pseudo, 'width')),
				padding = (propertyValue(elem, pseudo, 'padding-'+side)),
				border = (propertyValue(elem, pseudo, 'border-'+side));		
		return Math.round((size/2)+padding+border);
	}
	function eachClass(className, func){
		[].forEach.call(document.getElementsByClassName(className), func);
	}
	//the meat
	function slideShow(){
		//get class of each media element
		var images = carousel.getElementsByTagName('img'),
				videos = carousel.getElementsByTagName('video'),
				carMedia = carousel.children,
				media = [],
				active, i;

		if(images || videos){
			for(i = 0; i < carMedia.length; i++){
			  if(carMedia[i].tagName === 'VIDEO' || carMedia[i].tagName === 'IMG'){
			    media.push(carMedia[i]);
			  }
			}
			for(i = 0; i < media.length; i++){
				media[i].className = media[i].className+' slides slide-'+i;
			}
		}

	//set display of media to one at a time
		for(i = 0; i < media.length; i++){
			if(i === 0){ media[i].style.display = 'block';}
			else{ media[i].style.display = 'none';}
		}

		function buildImgNav(direction){
			var newElem = document.createElement('div');
					newElem.className = 'slide-nav '+direction;
			var createdElem = carousel.insertBefore(newElem, carousel.lastElementChild.nextSibling),
					slides = document.getElementsByClassName('slides'),
					i;
			newActive = document.getElementsByClassName('slides')[0];		

			createdElem.addEventListener('click', function(){
				for(i = 0; i < slides.length; i++){
					if( slides[i].style.display === 'block'){ 
						active = slides[i]; 
						break;
					}
				}
				if(direction === 'forward'){
					if(active === slides[slides.length-1]){
						newActive = slides[0];
					} else { 
						newActive = slides[[].indexOf.call(slides, active)+1];
					}
				}
				if(direction === 'back'){
					if(active === slides[0]){
						newActive = slides[slides.length-1];
					}	else{
						newActive = slides[[].indexOf.call(slides, active)-1];
					}
				}
				newActive.style.display = 'block';
				active.style.display = 'none';
				navPos(newActive);
				return newActive;
			});
		}
		
		//create carousel navigation
		buildImgNav('forward');
		buildImgNav('back');
		navPos(media[0]);
		//carousel prefs
		if(navBackground === false){
			eachClass('slide-nav', function(a){
				a.style.backgroundColor = 'transparent';
			});
		}
	}

	if(carousel.getElementsByTagName('img').length > 0 || carousel.getElementsByTagName('video').length > 0){
		slideShow();
		//adjust on browser resize
		window.onresize = function(){
			navPos(newActive);
		};
	}
};