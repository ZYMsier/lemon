require(['../js/config.js'],function(){
	require(['mui','format','getuser','picker','poppicker'],function(mui,format,getuser){
		mui.init();
		var dtPicker,uid,time,dls,cid
		    billtime=document.querySelector('#billtime'),
		    month=new Date().getMonth()*1+1,
		    day=new Date().getDate();
			month=month<10?'0'+month:month,
			input=document.querySelector('input'),
			finish=document.querySelector('#finish'),
			gallery = mui('.mui-slider'),
			slidergroup=document.querySelector('.mui-slider-group'),
			type=1;
		init();
		function init(){
			//初始化日期
			dtPicker = new mui.DtPicker({ type: "date" });
			billtime.innerHTML=month+'月'+day+'日';
			render();
		}
		function render(){
			//查询uid
			var user=localStorage.getItem('user')||'';
			user=getuser();
			//查询分类的接口
			mui.ajax('/classify/getClassify',{
				data:{
					type:type,
					user:user
				},
				success:function(data){
					if(data.code==0){
						renderList(data.data);
					}
				}
			})
		}
		function renderList(data){
			var result=format(data,8);
			var html='';
			result.forEach(function(v){
				html +=`<div class="mui-slider-item">
						<div>`;
				v.forEach(function(item){
					html+=`<dl data-id="${item._id}">
								<dt class="${item.iname}"></dt>
								<dd>${item.cname}</dd>
							</dl>`;
				})
				html+=`</div></div>`;
				slidergroup.innerHTML=html;
				//获得slider插件对象
				gallery.slider({
				    // interval:5000//自动轮播周期，若为0则不自动播放，默认为0；
				});
				//添加自定义
				var last=slidergroup.lastChild;
				var len=Array.from(last.querySelectorAll('dl')).length;
				if(len>8){
					slidergroup.html+=`<div class="mui-slider-item">
						<div>
						    <dl>
								<dt class="mui-icon mui-icon-plusempty"></dt>
								<dd>自定义</dd>
							</dl>
						</div></div>;`
				}else{
					last.querySelector('div').innerHTML+=`
					<dl>
						<dt class="mui-icon mui-icon-plusempty" id="mybtn"></dt>
						<dd>自定义</dd>
					</dl>`;
				}
				document.querySelector('#mybtn').addEventListener('tap',function(){
					location.href='./classify.html';
				})
				dls=Array.from(slidergroup.querySelectorAll('dl'));
			});
			addEvent();
		}
		function addEvent(){
			billtime.addEventListener('tap',function(){
				dtPicker.show(function(selectItems) {
				  billtime.innerHTML=selectItems.m.text+'月'+selectItems.d.text+'日';
				})
			});
			//计算器
			mui('.keycord').on('tap','li',function(){
				var txt=this.innerHTML;
				if(txt=='X'){
					input.value=input.value.substr(0,input.value.length-1);
				}else if(txt=='.'||txt=='0'){
					input.value ='0.';
					
				}else{
					input.value +=txt;
				}
			});
			
			//点击切换
			var spans=document.querySelectorAll('.list span');
			mui('.list').on('tap','span',function(){
				type=this.dataset.type;
				spans.forEach(function(v){
					v.classList.remove('active');
				});
				this.classList.add('active');
				slidergroup.innerHTML='';
				render();
			});
			//点击时间
			billtime.addEventListener('tap',function(){
				dtPicker.show(function(selectItems){
					time=selectItems.value;
				})
			});
			//点击
			mui(slidergroup).on('tap','dl',function(){
				dls.forEach(function(v){
					v.classList.remove('active');
				});
				this.classList.add('active');
			})
			//点击完成
			finish.addEventListener('tap',function(){
				var money=input.value;
				var act=slidergroup.querySelector('.active');
				var cname=act.querySelector('dt').className;
				var iname=act.querySelector('dd').innerHTML;
				cid=slidergroup.querySelector('dl').dataset.id;
				user=getuser();
				mui.ajax('/bill/billlist',{
					type:'post',
					data:{
						iname:iname, //icon名称
                        cname:cname, //分类名称
                        type:type, //类型
                        money:money, //金额
                        time:time, //时间
                        user:user, //用户id
                        cid:cid
					},success:function(data){
						console.log(data);
						if(data.code==0){
							location.href='../index.html';
						}
					}
				})
			})
		}
	})
})