define(['jquery'],
	function (jquery) {
	
	debugger;
	//初始调用方法
    var initFunc = function(){
    	alert("hello world !");
    };
	
	$(function(){
		new initFunc();
	});
});