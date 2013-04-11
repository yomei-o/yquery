//
// isX2
//
var isX2=(typeof(widget)!="undefined"?true:false);


//
// print function
//
function print(str){
	if(isX2){
		alert(str,function(){});
		return;
	}
	alert(str);
}





//
//constructor
//
function yQuery(){
}


//
//methods
//
yQuery.prototype={
	getJsonObject: function(obj){
		var ret=null;
		try {
			ret=(new Function( "return " + obj ) )();
		} catch (e) {}
		return ret;
	},
	createXHR: function(){
		var xhr;
		if (XMLHttpRequest) {
			xhr = new XMLHttpRequest();
		} else {
			try {
			xhr = new ActiveXObject('MSXML2.XMLHTTP.6.0');
			} catch (e) {
			try {
			xhr = new ActiveXObject('MSXML2.XMLHTTP.3.0');
			} catch (e) {
			try {
			xhr = new ActiveXObject('MSXML2.XMLHTTP');
			} catch (e) {}}}
		}
		return xhr;
	},
	ajax: function(obj){
		var cbSuccess=false;
		var cbError=false;
		var xhr=null;
		var _this=this;
		if(obj==null){
			return;
		}
		if(obj.dataType!="json" && obj.dataType!="text"){
			return;
		}
		if(obj.url==null){
			return;
		}
		if(typeof(obj.success)=="function"){
			cbSuccess=true;
		}
		if(typeof(obj.error)=="function"){
			cbError=true;
		}
		xhr=yQuery.prototype.createXHR();
		xhr.onreadystatechange = function() {
			if (xhr.readyState == 4) { // DONE
				if (xhr.status == 200) { // OK
					if(cbSuccess==true){
						if(obj.dataType=="json"){
							obj.success.call(_this,yQuery.prototype.getJsonObject(xhr.responseText),xhr.status);
						}else{
							obj.success.call(_this,xhr.responseText,xhr.status);
						}
					}
				} else {
					if(cbError==true){
						obj.error(null);
					}
				} 
			}
		}
		xhr.open("GET", obj.url);
		xhr.send();
	},
};



//
//instance
//
$$=new yQuery();








//
// main
//

function onSuccess(res){
	print("success");
	//print(res);
}

function onError(res){
	print("error");
}


function main() {
	$$.ajax({
		dataType: "json",
		url: "http://127.0.0.1/test.js",
		success: onSuccess,
		error: onError,
	});
}


//
// onload
//
if(isX2){
	widget.onload = main;
}else{
	window.onload= main;
}



print("ok");

