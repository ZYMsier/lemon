require(['./js/config.js'],function(){
	require(['mui','picker','poppicker'],function(mui){
		mui.init();
		var picker,dtPicker,type,
		    nowYear=new Date().getFullYear(),//年
			nowMonth=new Date().getMonth()+1,//月
			selectType=document.querySelector('#selectType'),
			selectDate=document.querySelector('#selectDate'),
			muiBill=document.querySelector('.mui-bill'),
			muiChart=document.querySelector('.mui-chart'),
			billYear=document.querySelector('.mui-bill-year'),
			billMonth=document.querySelector('.mui-bill-month');
		init();
		function init(){
			 picker = new mui.PopPicker();
			 picker.setData([{ value: 'year', text: '年' }, { value: 'month', text: '月' }]);
			 dtPicker = new mui.DtPicker({ type: "month" });
		}
		addEvent();
		function addEvent(){
			//年&月
			selectType.addEventListener('tap', function() {
				var titleY=document.querySelector('[data-id=title-y]'),
				    titleM=document.querySelector('[data-id=title-m]'),
					pickeY=document.querySelector('[data-id=picker-y]'),
					pickeM=document.querySelector('[data-id=picker-m]');
			    picker.show(function(selectItems) {
			        selectType.innerHTML = selectItems[0].text;
					type=selectItems[0].value;
					if(type=='year'){
						selectDate.innerHTML=nowYear;
						titleM.style.display="none";
						pickeM.style.display="none";
						titleY.style.width="100%";
						pickeY.style.width="100%";
						billYear.style.display="block";
						billMonth.style.display="none";
					}else if(type=='month'){
						nowMonth=nowMonth*1<10?'0'+nowMonth*1:nowMonth*1;
						selectDate.innerHTML=nowYear+'-'+nowMonth;
						titleM.style.display="inline-block";
						pickeM.style.display="block";
						titleY.style.width="50%";
						pickeY.style.width="50%";
						billYear.style.display="none";
						billMonth.style.display="block";
					}
			    })
			});
			//设置日期
			selectDate.addEventListener('tap', function() {
			    dtPicker.show(function(selectItems) {
			       if(type=='year'){
					   selectDate.innerHTML = selectItems.y.text;
				   }else if(type=='month'){
					   selectDate.innerHTML = selectItems.y.text + '-' + selectItems.m.text;
				   }
			    })
			});
			//点击切换图表和账单
			mui('#mui-tabs').on('tap','span',function(){
				var id=this.dataset.id;
				this.classList.add('active');
				if(id==0){ //账单
					muiChart.style.display="none";
					muiBill.style.display="block";
					this.nextElementSibling.classList.remove('active');
				}else if(id==1){  //图表
					muiChart.style.display="block";
					muiBill.style.display="none";
					this.previousElementSibling.classList.remove('active');
				}
			})
		}
		//侧边栏
		document.querySelector('#btn').addEventListener('tap', function() {
		    mui('.mui-off-canvas-wrap').offCanvas('show');
		});
		 //禁止侧滑手势
		var offCanvasInner = document.querySelector('.mui-off-canvas-wrap').querySelector('.mui-inner-wrap');
		offCanvasInner.addEventListener('drag', function(event) {
		event.stopPropagation();
		});
		//点击全部支出
		var paylist=Array.from(document.querySelectorAll('#mui-aside-list-pay li'));
		mui('#mui-aside-list').on('tap','li',function(){
			var type=this.dataset.type;
			this.classList.toggle('asideActive');
			if(this.classList.contains('asideActive')){
				paylist.forEach(function(v,i){
					v.classList.add('asideActive')
				})
			}else{
				paylist.forEach(function(v,i){
				    v.classList.remove('asideActive')
			})
			}
		})
	    //点击所有的支出分类
		mui('#mui-aside-list-pay').on('tap','li',function(){
			this.classList.toggle('asideActive');
			var len=paylist.length;
			var listen=Array.from(document.querySelector('#mui-aside-list-pay .asideActive'));
			if(len==listen){
				document.querySelector('[data-type="pay"]').classList.add('asideActive');
			}else{
				document.querySelector('[data-type="pay"]').classList.remove('asideActive');
			}
		});
		//点击跳转添加分类页面
		document.querySelector('#box').addEventListener('tap', function() {
		    location.href='./page/add.html';
		});
	});
});







