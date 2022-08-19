var json = [
	{
		"name": "酷町堂主站（ke.codingtang.com）",
		"id": "ke", 
		"options": [
			"自动识别验证码", 
			"显示全屏题目按钮", 
			"增加复制样例按钮"
		]
	}, 
	{
		"name": "酷町问答（wenda.codingtang.com）", 
		"id": "wenda", 
		"options": [
			"增加开启复制按钮", 
			"自动识别验证码", 
			"增强自带搜索", 
			"自动屏蔽水贴和远古贴", 
			"自动屏蔽水回答", 
			"显示不看无敌水贴按钮"
		]
	}, 
	{
		"name": "酷丁平台（kuding1024.com）", 
		"id": "dev", 
		"options": [
			"自动识别验证码"
		]
	}
];
/*
<div class="ui attached segment">
			<div class="ui toggle checkbox">
				<input id="显示不看无敌水贴按钮" type="checkbox">
				<label>显示不看无敌水贴按钮</label>
			</div>
			<p></p>
		</div>
*/
var options = $("#选项");
for (var i in json) {
	if (i == 0) options.append('<h4 class="ui top attached header">' + json[i].name + '</h4>');
	else options.append('<h4 class="ui attached header">' + json[i].name + '</h4>');
	options.append('<div id="' + json[i].id + '" class="ui attached segment"></div>');
	var opt = $('#' + json[i].id);
	for (var j in json[i].options) {
		var func = function() {
			var id = json[i].id + json[i].options[j];
			opt.append(
				'<div class="ui toggle checkbox">' +
				'	<input id="' + id + '" type="checkbox">' +
				'	<label>' + json[i].options[j] + '</label>' +
				'</div>' +
				'<p></p>'
			);
			chrome.storage.sync.get(id, function(res) {
				if (res[id] != 'false') {
					$('#' + id).prop('checked', 'checked');
				}
			});
			$('#' + id).each(function() {
				$(this).change(function() {
					if (this.checked == false) {
						var jsp = {};
						jsp[this.id] = 'false';
						chrome.storage.sync.set(jsp);
					} else {
						chrome.storage.sync.remove(this.id);
					}
				});
			});
		}();
	}
}