define(function(){
	var getuser=function(){
		var user=localStorage.getItem('user')||'';
		if(!user){//没有user
			mui.ajax('/users/addUser',{
				data:{name:'四儿'},
				type:'post',
				success:function(data){
					if(data.code==0){
					    user=data.id;
						localStorage.setItem('user',user);
					}
				}
			})
		}else{
			user=user;
		}
		return user;
	}
	return getuser;
})