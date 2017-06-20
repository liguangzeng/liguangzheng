function calcRem(){
	var http =document.getElementsByTagName("html")[0];
	var w= document.documentElement.clientWidth;
	if (w<320) {
		http.style.fontSize = '10px';
	}else if (w<640) {
		http.style.fontSize=w/32 + 'px'
	}else{
		http.style.fontSize ='20px'
	}
}
calcRem()
window.onresize =function(){
	calcRem()
}
var account1 = localStorage.getItem("account");
account1 = JSON.parse(account1)
	$.cookie("cityId",account1.id)
	$.cookie("cityName",account1.name)
	
	