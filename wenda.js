//允许复制
if (location.href.search(/wenda.codingtang.com\/questions\/.+\//) != -1) {
	$('.header_container ').find('.l-page-width').append('<button id="fuzhi" class="cws_button">开启复制</button>');
	$('#fuzhi').click(function() {
		function t(e){e.stopPropagation(),e.stopImmediatePropagation&&e.stopImmediatePropagation()}document.querySelectorAll('*').forEach(e=>{'none'===window.getComputedStyle(e,null).getPropertyValue('user-select')&&e.style.setProperty('user-select','text','important')}),['copy','cut','contextmenu','selectstart','mousedown','mouseup','mousemove','keydown','keypress','keyup'].forEach(function(e){document.documentElement.addEventListener(e,t,{capture:!0})});
		alert('开启完成！');
	});
}
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
//屏蔽水贴
if (location.pathname == '/' || location.href.search('wenda.codingtang.com/board/') != -1) {
	var water_types = [
		'水', '无', 'shui', '水一下', '1', '111', '123', ''
	];
	$('.blog').children('article').last().after('<details id="pinbi"><summary>被屏蔽的问题（点击查看）</summary></details>');
	$('.blog').children('article').each(function() {
		if (water_types.indexOf($(this).find('a#blue').text().trim()) != -1
			|| $(this).find('.post-footer').find('div.question-summary').html().replace(/<[^>]*>/g, '').search('年') != -1) {
			$('#pinbi').append($(this).clone());
			$(this).remove();
		}
	});
}
//屏蔽水回答
if (location.href.search(/wenda.codingtang.com\/questions\/.+\//) != -1) {
	var water_types = [
		'水', 'shui', '水一下', '1', '111', '123', '豆', '哦', 'NB', 'ding', '顶', '', '好', '太好了', '对', 'd', 'D', 'a', '哈', '哈哈哈', '哈哈', '求采纳', '求豆', '求', '采纳我', '采纳', '给我豆', '???', '？？？', '？', '?', '？？', '??', '原来如此'
	];
	$('#answers').last().after('<details id="pinbi"><summary>被屏蔽的回答（点击查看）</summary></details>');
	$('#answers').find('.question').each(function() {
		console.log($(this).find('.entry.alignleft').html().replace(/<[^>]*>/g, '').trim());
		if (water_types.indexOf($(this).find('.entry.alignleft').html().replace(/<[^>]*>/g, '').trim()) != -1) {
			$('#pinbi').append($(this).prev().clone());
			$('#pinbi').append($(this).clone());
			$(this).prev().remove();
			$(this).remove();
		}
	});
}