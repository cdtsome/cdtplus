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
		'水', '无', 'shui', '水一下', '1', '111', '123', '', 'SD', 'sd', '送豆'
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
		'水', 'shui', '水一下', '1', '111', '123', '豆', '哦', 'NB', 'ding', '顶', '好', '太好了', '对', 'd', 'D', 'a', '哈', '哈哈哈', '哈哈', '求采纳', '求豆', '求', '采纳我', '采纳', '给我豆', '???', '？？？', '？', '?', '？？', '??', '原来如此', '！！！', '!!!', '！', '!', '水一个', '赞', '赞了', '+1', '加1', '＋1', '豆豆给我把', '豆豆给我', '豆豆给我吧', '豆给我', '豆给我把', '豆给我吧', '额', '呃', 'e', 'E', 'NICE', 'nice', 'ding~', '学会了', '建议申精', '学会了。', '11', '厉害', 'emmm', 'em', 'emm', 'emmmm', 'emmmmm', 'emmmmmm', 'emmmmmmm', 'emmmmmmmm', 'emmmmmmmmm', '啥玩意', '1111', 'nb', 'DING', 'SHUI', 's', 'S', 'qd'
	];
	$('#answers').last().after('<details id="pinbi"><summary>被屏蔽的回答（点击查看）</summary></details>');
	$('#answers').find('.question').each(function() {
		if (water_types.indexOf($(this).find('.entry.alignleft').html().replace(/<[^>]*>/g, '').trim()) != -1) {
			$('#pinbi').append($(this).prev().clone());
			$('#pinbi').append($(this).clone());
			$(this).prev().remove();
			$(this).remove();
		}
	});
}
//屏蔽人
if (location.href.search(/wenda.codingtang.com\/questions\/.+\//) != -1) {
	var water_types = [ 
		'人名1', '人名2' //一个数组：改成自己要屏蔽的人
	];
	$('#answers').find('.question').each(function() {
		if (water_types.indexOf($(this).find('img.user_avatar').attr('alt').trim()) != -1) {
			$('#pinbi').append($(this).prev().clone());
			$('#pinbi').append($(this).clone());
			$(this).prev().remove();
			$(this).remove();
		}
	});
}
//不看无敌水贴
if (location.pathname == '/') {
	$('div.index_item_box').append('<div id="bukanwater" class="item_box"><div><div id="watertitle" class="content_title">隐藏无敌水贴</div></div></div>');
	$('#bukanwater').click(function() {
		if (sessionStorage.getItem("无敌水贴") == '隐藏') {
			sessionStorage.setItem('无敌水贴', '显示');
			$('#watertitle').text('隐藏无敌水贴');
			$('.blog').find('article').each(function() {
				if ($(this).find('.post-footer').find('div.question-summary').html().replace(/<[^>]*>/g, '').search('无敌水贴') != -1) {
					$(this).attr('style', 'display: 1');
				}
			});
		} else {
			sessionStorage.setItem('无敌水贴', '隐藏');
			$('#watertitle').text('显示无敌水贴');
			$('.blog').find('article').each(function() {
				if ($(this).find('.post-footer').find('div.question-summary').html().replace(/<[^>]*>/g, '').search('无敌水贴') != -1) {
					$(this).attr('style', 'display: none');
				}
			});
		}
	});
}
//自动填写验证码
function add_event() {
	$('img.captcha').each(function() {
		var img = this;
		this.onload = function() {
			function httpPost(url, text, callback) {
				var xmlHttp = new XMLHttpRequest();
				xmlHttp.onreadystatechange = function() { 
					if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
						callback(xmlHttp.responseText);
					}
				}
				xmlHttp.open("POST", url, true);
				xmlHttp.setRequestHeader("Content-type","text/plain");
				xmlHttp.send(text);
			}
			img.crossOrigin= '';
			var canvas = document.createElement("canvas");
			canvas.width = img.width;
			canvas.height = img.height;
			var ctx = canvas.getContext("2d");
			ctx.drawImage(img, 0, 0, img.width, img.height);
			var dataUrl = canvas.toDataURL("image/png");
			var base64 = dataUrl.replace("data:image/png;base64,", "");
			httpPost(
				'http://127.0.0.1:11451/captcha', 
				base64, 
				function(res) {
					var dom = $('input#id_captcha_1').first().get(0);
					var evt = new InputEvent('input', {
						inputType: 'insertText',
						data: res,
						dataTransfer: null,
						isComposing: false
					});
					dom.value = res;
					dom.dispatchEvent(evt);
				}
			);
		}
	});
}
add_event();
var observer = new MutationObserver(function() {
	add_event();
});
observer.observe(document.body, {
	attributes: true, 
	childList: true, 
	subtree: true 
});