define(function(){
	var getParams=function(){
		// getClassify?type=1&user=5c38921a19872d0b6cf3857a
		var arr=window.location.search.slice(1).split('&');
		var obj={};
		arr.forEach(function(item){
			obj[item.split('=')[0]]=item.split('=')[1];
		})
		return obj;
	}
	return getParams;
})