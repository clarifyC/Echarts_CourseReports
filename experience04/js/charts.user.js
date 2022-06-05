
// 绘制折线图分析每月新增会员数
var orderQ_Site = echarts.init(document.getElementById('orderQ_Site'));
$.get("./data/每月新增会员人数数据.json").done(function (data) {
    orderQ_Site.setOption({
        title: {
            text: '每月新增会员人数情况',
        },
        tooltip: {
            trigger: 'axis'
        },
        legend: {
            right:'0%',
            type: 'scroll'
        },
        grid: {
            left: '10',
            right: '30',
            bottom: '10',
            containLabel: true
        },
        xAxis: {
            type: 'category',
            boundaryGap: false,
            data: data.Month,
        },
        yAxis: {
            type: 'value',
        },
        series: [
            {
                name: '星期几与订单量数据',
                type: 'line',
                data: data.NumberP,
            },

        ]
    });
});


// 绘制柱状图分析会员的性别分布
var saleT_Site = echarts.init(document.getElementById('saleT_Site'));
$.get("./data/会员性别分布数据.json").done(function (data) {
    saleT_Site.setOption({

        title: {
            text: '会员性别分布',
        },
        tooltip: {
            trigger: 'axis',
        },
        grid: {
            left: '20',
            right: '20',
            bottom: '20',
            top: '60',
            containLabel: true
        },
        barCategoryGap: '60%',
        xAxis: [
            {
                type: 'category',
                data: data.Sex,
                axisPointer: {
                    type: 'shadow'
                },
                splitLine: {lineStyle: {width: 0}}
            }
        ],
        yAxis: [
            {
                type: 'value',
                name: '',
                min: 0,
            }
        ],
        series: [
            {
                type: 'bar',
                data: data.SNumber,
                itemStyle: {
                    normal:{
                        color:function (params) {
                            var color_list = ['red', 'yellow', 'blue', 'DarkGreen', 'DarkOrchid'];
                            return color_list[params.dataIndex]
                        }
                    }
                }
            }
        ]
    })
});


//绘制环形图分析会员的星级分布
var cSorNum = echarts.init(document.getElementById('cSorNum'));
$.get("data/会员星级人数分布.json").done(function (data) {
    cSorNum.setOption({
        tooltip : {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
            show:false
        },
        grid: {
            left: '0%',
            right: '0%',
            bottom: '0%',
            containLabel: true
        },
        series : [
            {
                name: '用户类型人数',
                type: 'pie',
                radius: ['40%', '70%'],
                center: ['50%', '50%'],
                label:{
                    formatter:"{b}\n{a|{d}%}",
                    rich: {
                        a: {
                            padding:6,
                            align:'left',
                            color:'#fff'
                        }
                    }
                },
                data:data.data,
                itemStyle: {
                    emphasis: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
            }
        ]
    })
});


window.onresize = function() {
    orderQ_Site.resize();
    saleT_Site.resize();
	cSorNum.resize();
}