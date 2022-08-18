//自动填写验证码
function add_event() {
	$('img.release_img').each(function() {
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