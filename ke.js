var x = location.hash;
if (x.search('/problem/problemSub') != -1) { //题目详情页面
	//显示全屏题目按钮
	$('.el-icon-zoom-in').parent().parent().attr('style','position: absolute; right: 0px; top: 10px; display: 1;');
	//增加一键复制样例按钮
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
}