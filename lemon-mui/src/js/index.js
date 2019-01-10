//年&月
document.querySelector('#selectType').addEventListener('tap', function() {
    var picker = new mui.PopPicker();
    picker.setData([{ value: 'year', text: '年' }, { value: 'month', text: '月' }]);
    picker.show(function(selectItems) {
        document.querySelector('#selectType').innerHTML = selectItems[0].text;
    })
});
//年月
document.querySelector('#selectDate').addEventListener('tap', function() {
    var dtPicker = new mui.DtPicker({ type: "month" });
    dtPicker.show(function(selectItems) {
        document.querySelector('#selectDate').innerHTML = selectItems.y.text + '-' + selectItems.m.text;
    })
});
//侧边栏
document.querySelector('#btn').addEventListener('tap', function() {
    mui('.mui-off-canvas-wrap').offCanvas('show');
});