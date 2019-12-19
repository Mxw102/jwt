var header = '{"alg": "HS256"}';
var secret = localStorage.getItem('secret');
var url = 'http://10.5.107.218:8080/api/createPayOrder'

$(function(){
	$('.secret').val(secret);
	$('.header').val(header);
	$('.send').click(lanch);
})

function lanch(){
	var sPayload = $('.payload').val();
	var sHeader = $('.header').val();
	var sSecret =$('.secret').val();
	if(sSecret != ''){
		localStorage.setItem('secret', sSecret);
	}
	var token = window.signHS(JSON.parse(sPayload), sSecret);
	$('.token').val(token);
	token = token.split('.');
	var params = {
		header : token[0],
		payload : token[1],
		signature : token[2]
	}

	$.post(url, params,function(res){
		var rHeader = res.header;
		var rPayload = res.payload;
		var rSignature = res.signature;
		token = rHeader + '.' + rPayload + '.' + rSignature;
		$('.res').val(token)
		var result = window.decodeHS(token, secret);
		$('.result').val(JSON.stringify(result));
		$('.paylink').val(result.payLink);
	})


}
