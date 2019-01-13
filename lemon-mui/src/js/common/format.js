define(function(){
	var getFormat=function(data,len){
		var count=Math.ceil(data.length/len);
		var Arr=[];
		for(var i=0;i<count;i++){
			Arr.push(data.splice(0,len));
		}
		return Arr;
	}
	return getFormat;
})