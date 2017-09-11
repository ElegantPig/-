/**
 * 兼容多浏览器的事件监听方法
 */
var addEvent = (function() {
	if(document.addEventListener) {
		return function(el, type, fn) {
			if(el.length) {
				for(var i=0; i<el.length; i++) {
					addEvent(el[i], type, fn);
				}
			} else {
				el.addEventListener(type, fn, false);
			}
		}
	} else if(document.attachEvent) {
		return function(el, type, fn) {
			if(el.length) {
				for(var i=0; i<el.length; i++) {
					addEvent(el[i], type, fn);
				}
			} else {
				el.attachEvent('on' + type, function() {
					return fn.call(el, window.event);  // attachEvent的this对象始终指向window，这里通过call将其指向el
				});
			}
		}
	} else {
		return function(el, type, fn) {
			if(el.length) {
				for(var i=0; i<el.length; i++) {
					addEvent(el[i], type, fn);
				}
			} else {
				el['on'+type] = fn;
			}
		}
	}
})();
