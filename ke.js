function check_run(id, callback) {
	chrome.storage.sync.get(id, function(res) {
		if (res[id] != 'false') {
			callback();
		}
	});
}
//所有页面：
//自动填写验证码
check_run('ke自动识别验证码', function() {
	function add_event() {
		$('img.imgCode').each(function() {
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
						var dom = $('input[placeholder="请输入验证码"]').first().get(0);
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
});
//单独页面：
var x = location.hash;
if (x.search('/problem/problemSub') != -1) { //题目详情页面
	//显示全屏题目按钮
	check_run('ke显示全屏题目按钮', function() {
		$('.el-icon-zoom-in').parent().parent().attr('style','position: absolute; right: 0px; top: 10px; display: 1;');
	});
	//增加一键复制样例按钮
	check_run('ke增加复制样例按钮', function() {
		$('h3:contains("样例输入 Sample Input")').after('<button id="copy_input_button" class="el-button">复制</button>');
		$('#copy_input_button').click(function() {
			text = $('h3:contains("样例输入 Sample Input")').next().next().text();
			input = document.createElement('textarea');
			input.style.opacity  = 0;
			input.style.position = 'absolute';
			input.style.left = '-9999px';
			document.body.appendChild(input);
			input.value = text;
			input.select();
			input.setSelectionRange(0, text.length);
			document.execCommand('copy');
			document.body.removeChild(input);
			$('#copy_input_button').text('复制完成');
			setTimeout(function() {
				$('#copy_input_button').text('复制');
			}, 500);
		});
	});
}