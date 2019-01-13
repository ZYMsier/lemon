require(['../js/config.js'],function(){
	require(['mui','format','getuser','picker','poppicker'],function(mui,format,getuser){
		mui.init();
		var slidergroup=document.querySelector('.mui-slider-group'),
		    addClassify=document.querySelector('#addClassify'),
			btn=document.querySelector('#btn button'),
			input=document.querySelector('.input input'),
			gallery = mui('.mui-slider');
		init();
		function init(){
			mui.ajax({
				url:"/classify/iconlist",
				success:function(data){
					if(data.code=='0'){
						render(data.data);
					}
				}
			})
		}
		function render(data){
			var html='';
			var arr=format(data,15);
			arr.forEach(function(v){
				html +=`<div class="mui-slider-item">
						<div>`;
				v.forEach(function(item){
					html+=`<dl>
								<dt class="${item.iname}"></dt>
								
							</dl>`;
				})
				html+=`</div></div>`;
				slidergroup.innerHTML=html;
				//获得slider插件对象
				gallery.slider({
				    // interval:5000//自动轮播周期，若为0则不自动播放，默认为0；
				});
			})	
			
		}
	    addEvent();
		function addEvent(){
			mui('.mui-slider-group').on('tap','dt',function(){
				addClassify.className=this.className;
			})
			btn.addEventListener('tap',function(){
				var iname=addClassify.className;
				var cname=input.value;
				var type=1;
				user=getuser();
				//添加分类
				mui.ajax('/classify/addclassify',{
					type:"post",
					data:{
						iname:iname,
						cname:cname,
						type:type,
						user:user
					},
					success:function(data){
						if(data.code==0){
							console.log(data.code);
							location.href='./add.html';
						}
					}
				})
			})
		}
	})
})