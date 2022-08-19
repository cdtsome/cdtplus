function check_ocr() {
	$("#state_button").attr("class", "mini ui loading button");
	$.ajax({
		type: "GET", 
		cache: false, 
		url: "http:///127.0.0.1:11451/check", 
		data: "", 
		success: function() {
			$("#state_text").text("OCR Server状态：可用");
			$("#state_button").attr("class", "mini ui button");
		}, 
		error: function() {
			$("#state_text").text("OCR Server状态：不可用");
			$("#state_button").attr("class", "mini ui button");
		}
	});
}
check_ocr();
$("#state_button").click(check_ocr);