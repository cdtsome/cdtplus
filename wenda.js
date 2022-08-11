//允许复制
function t(e){e.stopPropagation(),e.stopImmediatePropagation&&e.stopImmediatePropagation()}document.querySelectorAll('*').forEach(e=>{'none'===window.getComputedStyle(e,null).getPropertyValue('user-select')&&e.style.setProperty('user-select','text','important')}),['copy','cut','contextmenu','selectstart','mousedown','mouseup','mousemove','keydown','keypress','keyup'].forEach(function(e){document.documentElement.addEventListener(e,t,{capture:!0})});
//增强搜索
if (location.href.search('wenda.codingtang.com/search') != -1) {
	function getQueryString(name) {
		var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
		var r = window.location.search.substr(1).match(reg);
		if (r != null) return decodeURIComponent(r[2]);
		return null;
	}
	var text = getQueryString('q');
	location.replace('https://cn.bing.com/search?q=' + encodeURIComponent(text) + '+site%3Awenda.codingtang.com');
}