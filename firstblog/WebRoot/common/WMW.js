
/**
 * 加命名空间WMW
 */
(function () {
	if (!window.WMW) {
		window.WMW = {};
	}
})();
WMW.config = {event:{}};
$ = function (id) {
	return document.getElementById(id);
};
WMW.getXmlHttpPrefix = function () {
	if (WMW.getXmlHttpPrefix.prefix) {
		return WMW.getXmlHttpPrefix.prefix;
	}
	var prefixes = ["MSXML2", "Microsoft", "MSXML", "MSXML3"];
	var o;
	for (var i = 0; i < prefixes.length; i++) {
		try {
			// try to create the objects
			o = new ActiveXObject(prefixes[i] + ".XmlHttp");
			return this.prefix = prefixes[i];
		}
		catch (ex) {
		}
	}
	throw new Error("Could not find an installed XML parser");
};
WMW.createXmlHttp = function () {
	try {
		if (window.XMLHttpRequest) {
			var req = new XMLHttpRequest();
			
			// some versions of Moz do not support the readyState property
			// and the onreadystate event so we patch it!
			if (req.readyState == null) {
				req.readyState = 1;
				req.addEventListener("load", function () {
					req.readyState = 4;
					if (typeof req.onreadystatechange == "function") {
						req.onreadystatechange();
					}
				}, false);
			}
			return req;
		}
		if (window.ActiveXObject) {
			return new ActiveXObject(WMW.getXmlHttpPrefix() + ".XmlHttp");
		}
	}
	catch (ex) {
		throw new Error("Your browser does not support XmlHttp objects");
	}
};
/**
 * 调用返回xml、
 */
WMW.loadTEXT = function (url, fun) {
	if (!url) {
		return;
	}
	var xmlHttp = WMW.createXmlHttp();
	xmlHttp.open("GET", url, true);	// async
	xmlHttp.onreadystatechange = function () {
		if (xmlHttp.readyState == 4) {
			fun(xmlHttp.responseTEXT);
		}
	};
	xmlHttp.send(null);
	// call in new thread to allow ui to update
	//window.setTimeout(function () {
	//	xmlHttp.send(null);
	//}, 10);
};
/**
 * 调用返回xml、
 */
WMW.loadXML = function (url, fun) {
	if (!url) {
		return;
	}
	var xmlHttp = WMW.createXmlHttp();
	xmlHttp.open("GET", url, true);	// async
	xmlHttp.onreadystatechange = function () {
		if (xmlHttp.readyState == 4) {
			fun(xmlHttp.responseXML);
		}
	};
	xmlHttp.send(null);
	// call in new thread to allow ui to update
	//window.setTimeout(function () {
	//	xmlHttp.send(null);
	//}, 10);
};
/**
 *  添加事件监听
 * @param target 监听对象
 * @param eventType 事件类型
 * @param handler 处理函数
 */
WMW.addEventHandler = function (target, eventType, handler, param) {
	try{
		var Handler = handler;
		if(param){
			Handler = function(e){
				handler.call(this, param);//继承监听函数,并传入参数以初始化;
			}
		}
		if (target.addEventListener) {
			target.addEventListener(eventType, Handler, false);
		} else {
			if (target.attachEvent) {
				target.attachEvent("on" + eventType, Handler);
			} else {
				target["on" + eventType] = Handler;
			}
		}
	}catch(e){alert(e.message)}
};
/**
 * @deprecated 移动div的方法
 * @param{id} id 要移动的层ID
 */
WMW.Move = function (target) {
	target.onselectstart = function () {
		return (false);
	};
	target.onmousedown = function (e) {
		e = e || window.event;
		var x = e.layerX || e.offsetX;
		var y = e.layerY || e.offsetY;
		document.onmousemove = function (e) {
			e = e || window.event;
			target.style.left = (e.clientX - x) + "px";
			target.style.top = (e.clientY - y) + "px";
		};
		document.onmouseup = function () {
			document.onmousemove = null;
		};
	};
};
/**
WMW.addEventHandler=function(target, eventType, handler){
	if(window.addEventListener){
		//其它浏览器的事件代码: Mozilla, Netscape, Firefox
		//添加的事件的顺序即执行顺序 //注意用 addEventListener 添加带on的事件，不用加on
		obj.addEventListener('focus', add, false);
	}else{
		//IE 的事件代码 在原先事件上添加 add 方法
		obj.attachEvent('onfocus',add);
	}
};*/
function getEvent() {//同时兼容ie和ff的写法
	if (document.all) {
		return window.event;
	}
	func = getEvent.caller;
	while (func != null) {
		var arg0 = func.arguments[0];
		if (arg0) {
			if ((arg0.constructor == Event || arg0.constructor == MouseEvent) || (typeof (arg0) == "object" && arg0.preventDefault && arg0.stopPropagation)) {
				return arg0;
			}
		}
		func = func.caller;
	}
	return null;
}
/**
 *  获取鼠标位置
 */
WMW.getMousePos = function (evt) {
//	evt = evt ? evt : window.event;
	evt = getEvent();
	if (!evt) {
		return WMW.config.event;
	}
	if (evt.pageX || evt.pageY) {
		return {x:evt.pageX, y:evt.pageY};
	} else {
		return {x:evt.clientX + document.documentElement.scrollLeft - document.body.clientLeft, y:evt.clientY + document.documentElement.scrollTop - document.body.clientTop};
	}
};
/**
 * 获取对象位置
 * @param element 对象
 */
WMW.getElementPos = function (element, evt) {
	if (!element) {
		return WMW.getMousePos(evt);
	}
	var offsetTop = element.offsetTop;
	var offsetLeft = element.offsetLeft;
	while (element = element.offsetParent) {
		offsetTop += element.offsetTop;
		offsetLeft += element.offsetLeft;
	}
	return {x:offsetLeft, y:offsetTop};
};
WMW.getElementPoss = function (el) {
	alert(el);
	var ua = navigator.userAgent.toLowerCase();
	var isOpera = (ua.indexOf("opera") != -1);
	var isIE = (ua.indexOf("msie") != -1 && !isOpera); // not opera spoof
	if (el.parentNode === null || el.style.display == "none") {
		return {x:0, y:0};
	}
	var parent = null;
	var pos = [];
	var box;
	if (el.getBoundingClientRect) {//IE
		box = el.getBoundingClientRect();
		var scrollTop = Math.max(document.documentElement.scrollTop, document.body.scrollTop);
		var scrollLeft = Math.max(document.documentElement.scrollLeft, document.body.scrollLeft);
		return {x:box.left + scrollLeft, y:box.top + scrollTop};
	} else {
		if (document.getBoxObjectFor) {// gecko
			box = document.getBoxObjectFor(el);
			var borderLeft = (el.style.borderLeftWidth) ? parseInt(el.style.borderLeftWidth) : 0;
			var borderTop = (el.style.borderTopWidth) ? parseInt(el.style.borderTopWidth) : 0;
			pos = [box.x - borderLeft, box.y - borderTop];
		} else {// safari & opera
			pos = [el.offsetLeft, el.offsetTop];
			parent = el.offsetParent;
			if (parent != el) {
				while (parent) {
					pos[0] += parent.offsetLeft;
					pos[1] += parent.offsetTop;
					parent = parent.offsetParent;
				}
			}
			if (ua.indexOf("opera") != -1 || (ua.indexOf("safari") != -1 && el.style.position == "absolute")) {
				pos[0] -= document.body.offsetLeft;
				pos[1] -= document.body.offsetTop;
			}
		}
	}
	if (el.parentNode) {
		parent = el.parentNode;
	} else {
		parent = null;
	}
	while (parent && parent.tagName != "BODY" && parent.tagName != "HTML") { // account for any scrolled ancestors
		pos[0] -= parent.scrollLeft;
		pos[1] -= parent.scrollTop;
		if (parent.parentNode) {
			parent = parent.parentNode;
		} else {
			parent = null;
		}
	}
	return {x:pos[0], y:pos[1]};
};
/**
 * 获取浏览器窗口大小
 */
WMW.getWindowWH = function () {
	var winWidth = 0;
	var winHeight = 0;
	//获取窗口宽度
	if (window.innerWidth) {
		winWidth = window.innerWidth;
	} else {
		if ((document.body) && (document.body.clientWidth)) {
			winWidth = document.body.clientWidth;
		}
	}
	
	//获取窗口高度
	if (window.innerHeight) {
		winHeight = window.innerHeight;
	} else {
		if ((document.body) && (document.body.clientHeight)) {
			winHeight = document.body.clientHeight;
		}
	}
	//通过深入Document内部对body进行检测，获取窗口大小
	if (document.documentElement && document.documentElement.clientHeight && document.documentElement.clientWidth) {
		winHeight = document.documentElement.clientHeight;
		winWidth = document.documentElement.clientWidth;
	}
	return {w:winWidth, h:winHeight};
};
/**
 * 获取对象
 * @param selector 选择参数
 * @param parentNode 父节点
 */
WMW.getElement = function (selector, parentNode) {
	/*
	selector参数解释(均支持以,隔开的多重选择)
	#)前缀根据id返回对象
	=)根据属性返回对象
	 )无符号则根据tagName返回对象
	 */
	/*#)前缀根据id返回对象 */
	var execId = function (selector) {
		var selector = selector.replace(/#| /g, "");
		var arr = selector.split(","), rets = [], temp;
		for (var i = 0; i < arr.length; i++) {
			temp = document.getElementById(arr[i]);
			if (temp) {
				rets.push(temp);
			}
		}
		return (rets.length > 1) ? rets : rets[0];
	};
	/*=)根据属性返回对象 */
	var execAttribute = function (selector, parentNode) {
		var parentNode = parentNode ? parentNode : document;
		var objects = parentNode.getElementsByTagName("*");
		var arr = selector.split("="), rets = [], temp;
		for (var i = 0; i < objects.length; i++) {
			if (objects[i].getAttribute(arr[0]) == arr[1]) {
				rets.push(objects[i]);
			}
		}
		return (rets.length > 1) ? rets : rets[0];
	};
	/*无符号则根据tagName返回对象 */
	var execTagName = function (selector, parentNode) {
		var parentNode = parentNode ? parentNode : document;
		return parentNode.getElementsByTagName(selector);
	};
	/*分流处理 */
	if (selector.indexOf("#") != -1) {
		return execId(selector, parentNode);
	} else {
		if (selector.indexOf("=") != -1) {
			return execAttribute(selector, parentNode);
		} else {
			return execTagName(selector, parentNode);
		}
	}
};

/**
 * json转换为字符串
 */
WMW.obj2str = function (o) {
	var r = [];
	if (typeof o == "string" || o == null) {
		return o;
	}
	if (typeof o == "object") {
		if (!o.sort) {
			r[0] = "{";
			for (var i in o) {
				r[r.length] = i;
				r[r.length] = ":";
				r[r.length] = WMW.obj2str(o[i]);
				r[r.length] = ",";
			}
			r[r.length - 1] = "}";
		} else {
			r[0] = "[";
			for (var i = 0; i < o.length; i++) {
				r[r.length] = WMW.obj2str(o[i]);
				r[r.length] = ",";
			}
			r[r.length - 1] = "]";
		}
		return r.join("");
	}
	return o.toString();
};

/**
 * 数组json对象([{key:value,...}])转换为数组json字符串[{"key":"value",....}]
 */
WMW.obj2JsonStr = function (o) {
	var r = [];
	if(typeof o=="string" && o.substring(0,1)=="{" && o.substring(o.length-1)=="}"){
		o=this.str2obj1(o);
	}else if ((typeof o == "string" && o.substring(0,1)!="{" && o.substring(o.length-1)!="}") || o == null) {
		return o;
	}
	if (typeof o == "object") {
		if (!o.sort) {
			r[0] = "{";
			for (var i in o) {
				r[r.length] = "\""+i+"\"";
				r[r.length] = ":"; 
				if(typeof o[i]=="object"){
					r[r.length] = WMW.obj2JsonStr(o[i]);	
				}else if(typeof o[i]=="string" && o[i].substring(0,1)=="{" && o[i].substring(o[i].length-1)=="}"){
					r[r.length] = WMW.obj2JsonStr(o[i]);
				}else{
					r[r.length] = "\""+WMW.obj2JsonStr(o[i])+"\"";
				}
				r[r.length] = ",";
			}
			r[r.length - 1] = "}";
		} else {
			r[0] = "[";
			for (var i = 0; i < o.length; i++) {
				r[r.length] = WMW.obj2JsonStr(o[i]);
				r[r.length] = ",";
			}
			r[r.length - 1] = "]";
		}
		return r.join("");
	}
	return o.toString();
};


/**
 * json转换为字符串(以';'分隔)
 */
WMW.obj1str = function (o) {
	var r = [];
	if (typeof o == "string" || o == null) {
		return o;
	}
	if (typeof o == "object") {
		if (!o.sort) {
			r[0] = "{";
			for (var i in o) {
				r[r.length] = i;
				r[r.length] = "=";
				r[r.length] = WMW.obj2str(o[i]);
				r[r.length] = ";";
			}
			r[r.length - 1] = "}";
		} else {
			r[0] = "[";
			for (var i = 0; i < o.length; i++) {
				r[r.length] = WMW.obj2str(o[i]);
				r[r.length] = ";";
			}
			r[r.length - 1] = "]";
		}
		return r.join("");
	}
	return o.toString();
};

/**
 * json对象转换为json字符串，键不带双引号、值带双引号
 */
WMW.json2jsonStr = function (o) {
	var r = [];
	if (typeof o == "string" || o == null) {
		return o;
	}
	if (typeof o == "object") {
		if (!o.sort) {
			r[0] = "{";
			for (var i in o) {
				r[r.length] = i;
				r[r.length] = ":";
				r[r.length] = "\""+WMW.obj2str(o[i])+"\"";
				r[r.length] = ",";
			}
			r[r.length - 1] = "}";
		} else {
			r[0] = "[";
			for (var i = 0; i < o.length; i++) {
				r[r.length] = "\""+WMW.obj2str(o[i])+"\"";
				r[r.length] = ",";
			}
			r[r.length - 1] = "]";
		}
		return r.join("");
	}
	return o.toString();
};


/**
 * json对象转换为json字符串,键和值都带双引号
 */
WMW.json1jsonStr = function (o) {
	var r = [];
	if (typeof o == "string" || o == null) {
		return o;
	}
	if (typeof o == "object") {
		if (!o.sort) {
			r[0] = "{";
			for (var i in o) {
				r[r.length] = "\""+i+"\"";
				r[r.length] = ":";
				r[r.length] = "\""+WMW.obj2str(o[i])+"\"";
				r[r.length] = ",";
			}
			r[r.length - 1] = "}";
		} else {
			r[0] = "[";
			for (var i = 0; i < o.length; i++) {
				r[r.length] = "\""+WMW.obj2str(o[i])+"\"";
				r[r.length] = ",";
			}
			r[r.length - 1] = "]";
		}
		return r.join("");
	}
	return o.toString();
};

/**
 * 字符串转换为json字符串
 */
WMW.str2jsonStr = function (pars,firstSeparator,secondSeparator) {
	var returnVal="";
	
	if(pars!=null&&pars!="null"&&pars!=""&&pars!="{}"){
		pars=pars.replace("{","");
		pars=pars.replace("}","");
		
		var objs=pars.split(firstSeparator);
		returnVal="{";
		for(var o=0;o<objs.length;o++){
			var keyv=objs[o].split(secondSeparator);
			
			var key=(keyv[0]);
			var value=(keyv[1]);
			
			returnVal+=key;
			returnVal+=":";
			returnVal+="\""+value+"\"";
			
			if(o<(objs.length-1))
				returnVal+=",";
		}
		returnVal+="}";
	}
	return returnVal;
};


/**
 *获取json对象的长度
 */
WMW.length=function (o){
	var length=0;
	if (typeof o == "object"){
		if (!o.sort) {
			for(var key in o){
				length++;
			}
			return length;
		}
	}
};
/**
 *将html字符串转换为json对象
 */
WMW.par2json=function(pars){
	var kv=pars[0].split("&");
	var keyv;
	var returnVal={};
	for(var i=0;i<kv.length;i++){
		try{keyv=kv[i].split("=");
		returnVal[keyv[0]]=keyv[1];
		}catch(e){}
	}
	return returnVal;
};

WMW.str2Json=function(pars,firstSeparator,secondSeparator){
	if(pars!=null&&pars!="null"&&pars!=""&&pars!="{}"){
		//pars=pars.replace("{","");
		//pars=pars.replace("}","");
		
		var objs=pars.split(firstSeparator);
		var returnVal={};
		for(var o=0;o<objs.length;o++){
			var keyv=objs[o].split(secondSeparator);
			
			var key=(keyv[0]);
			var value=(keyv[1]);
			returnVal[key]=value;
		}
	}
	return returnVal;
};

/**
 *将JSON字符串转换为json对象
 */
WMW.str2obj=function(pars){
	if(pars!=null&&pars!="null"&&pars!=""&&pars!="{}"){
		pars=pars.replace("{","");
		pars=pars.replace("}","");
		var objs=pars.split(",");
		
		var returnVal={};
		for(var o=0;o<objs.length;o++){
			var keyv=objs[o].split("=");
			
			var key=(keyv[0]).replace(/(^\s*)|(\s*$)/g, "");
			var value=(keyv[1]).replace(/(^\s*)|(\s*$)/g, "");
			returnVal[key]=value;
		}
	}
	return returnVal;
};

WMW.str2obj1=function(pars){
	var returnVal={};
	if(pars!=null&&pars!="null"&&pars!=""&&pars!="{}"){
		pars=pars.replace("{","");
		pars=pars.replace("}","");
		var objs=pars.split("\",");
		
		for(var o=0;o<objs.length;o++){
			var keyv=objs[o].split(":");
			
			var key=(keyv[0]).replace(/(^\s*)|(\s*$)/g, "");
			key = key.replaceAll("\"", "");
			//var value=(keyv[1]).replace(/(^\s*)|(\s*$)/g, "");
			//value = value.replaceAll("\"", "");
			var value="";
			for(var i=1;i<keyv.length;i++){
				var str=(keyv[i]).replace(/(^\s*)|(\s*$)/g, "");
				str = str.replaceAll("\"", "");
				value+=value==""?str:":"+str;
			}
			returnVal[key]=value;
		}
	}
	return returnVal;
};

WMW.str2objs=function(pars, split1, split2){
	var returnVal={};
	if(pars!=null&&pars!="null"&&pars!=""&&pars!="{}"){
		pars=pars.replace("{","");
		pars=pars.replace("}","");
		var objs=pars.split(split1);
		
		for(var o=0;o<objs.length;o++){
			var keyv=objs[o].split(split2);
			
			var key=(keyv[0]).replace(/(^\s*)|(\s*$)/g, "");
			key = key.replaceAll("\"", "");
			var value=(keyv[1]).replace(/(^\s*)|(\s*$)/g, "");
			value = value.replaceAll("\"", "");
			
			returnVal[key]=value;
		}
	}
	return returnVal;
};


/**
 *将html字符串转换为json对象
 */
WMW.list2ListJson=function(pars){
	var array=new Array();
	
	if(pars!=null&&pars!="null"&&pars!=""&&pars!="[]"&&pars.length>0){
		var str="";
		str=pars.replace("[","");
		str=str.replace("]","");
		
		str=str.substring(1);
		str=str.substring(0,str.length-1);
		
		var strA=str.split("}, {");
		
		for(var i=0;i<strA.length;i++){
			var jsonA={};
			
			var keyvalA=strA[i].split(",");
			for(var j=0;j<keyvalA.length;j++){;
				var keyvalue=keyvalA[j].split("=");
				
				var key=(keyvalue[0]).replace(/(^\s*)|(\s*$)/g, "");
				var value=(keyvalue[1]).replace(/(^\s*)|(\s*$)/g, "");
				jsonA[key]=value;
			}
			//alert(WMW.obj2str(jsonA));
			array.push(jsonA);
		}
	}
	return array;
};


/**
 *将html字符串转换为json对象
 */
WMW.listStr2List=function(pars){
	var array=new Array();
	
	if(pars!=null&&pars!="null"&&pars!=""&&pars!="[]"&&pars.length>0){
		var str ="";
		str=pars.replace("[","");
		str=str.replace("]","");
		var strA=str.split(",");
		
		for(var i=0;i<strA.length;i++){
			array.push(strA[i]);
		}
	}
	return array;
};

WMW.list1Str=function(pars,separator){
	var str="";
	for(var i=0; i<pars.length; i++){
		str+=str==""? pars[i] : separator+pars[i];
	}
	
	return str;
}

WMW.list2Str=function(pars){
	var str="";
	str=pars.replace("[","");
	str=str.replace("]","");
	return str;
}


WMW.str2List=function(pars,separator){
	var list=new Array();
	if(pars!=null&&pars!=null&&pars!=""){
		var strArr=pars.split(separator);
		for(var i=0;i<strArr.length;i++){
			list.push(strArr[i]);
		}
	}
	return list;
}


WMW.jsonStr2Json=function(pars,firstSeparator,secondSeparator){
	if(pars!=null&&pars!="null"&&pars!=""){
		pars=pars.replace("{","");
		pars=pars.replace("}","");
		
		var objs=pars.split(firstSeparator);
		var returnVal={};
		for(var o=0;o<objs.length;o++){
			var keyv=objs[o].split(secondSeparator);
			
			var key=(keyv[0]);
			var value=(keyv[1]);
			returnVal[key]=value;
		}
	}
	return returnVal;
};


/**
Document.prototype.insertAfter = function (newEl) {
	var parentEl = this.parentNode;
	if(parentEl!=null)
		alert(parentEl.childNodes);

	if (parentEl.lastChild == this) {
		parentEl.appendChild(newEl);
	} else {
		parentEl.insertBefore(newEl, this.nextSibling);
	}
};
*/
/**
 *在某元素之后添加元素
 */
WMW.insertAfter=function(target,newEl){
	var parentEl = target.parentNode;
	if(parentEl!=null)
		alert(parentEl.childNodes);

	if (parentEl.lastChild == target) {
		parentEl.appendChild(newEl);
	} else {
		parentEl.insertBefore(newEl, target.nextSibling);
	}
};
/**
 *	移除指定节点下所有子元素
 */
WMW.removeChild=function(target){
	while (target.firstChild) {
		var oldNode = target.removeChild(target.firstChild);
		oldNode = null;
	}
};
/**
 * 给字符串添加 endWith startWith splitWith方法
 */
String.prototype.endWith=function(str){
	if(str==null||str==""||this.length==0||str.length>this.length)
	  return false;
	if(this.substring(this.length-str.length)==str)
	  return true;
	else
	  return false;
	return true;
};
String.prototype.startWith=function(str){
	if(str==null||str==""||this.length==0||str.length>this.length)
	  return false;
	if(this.substr(0,str.length)==str)
	  return true;
	else
	  return false;
	return true;
};
String.prototype.splitWith=function(str){
	if(str==null||str==""||this.length==0||str.length>this.length)
	  return null;
	return this.substr(str.length);
};
String.prototype.replaceAll= function(s1,s2){    
	return this.replace(new RegExp(s1,"gm"),s2);    
}
// 说明：为 Javascript 数组添加 insertAt 和 removeAt 方法
// 整理：http://www.CodeBit.cn
Array.prototype.insertAt = function (index, value) {
	var part1 = this.slice(0, index);
	var part2 = this.slice(index);
	part1.push(value);
	return (part1.concat(part2));
};
Array.prototype.removeAt = function (index) {
	var part1 = this.slice(0, index);
	var part2 = this.slice(index);
	part1.pop();
	return (part1.concat(part2));
};
/**
 *  添加事件监听
 * @param target 监听对象
 * @param hoverTime 悬停时间
 * @param handler 处理函数
 */
WMW.addHoverEvent = function (target, hoverTime, handler){
	var date=new Date();
	var dd=date.getDay();
	var hh=date.getHours();
	var mm=date.getMinutes();
	var ss=date.getSeconds();
	var sss=date.getMilliseconds();
	var funName=""+dd+hh+mm+ss+sss;
	//alert(target)
	//alert(handler)
	WMW.addEventHandler(target,"mouseover",alert(1));
	WMW.addEventHandler(target,"mouseout",alert(2));
//	WMW.addEventHandler(target,"mouseover",eval("function(){"+ funName+"= window.setTimeout(handler, "+hoverTime+");}"));
//	WMW.addEventHandler(target,"mouseout",eval("function(){clearTimeout("+funName+")}"));
};


