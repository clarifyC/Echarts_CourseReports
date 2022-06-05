saleT('saleM_Site', '销售金额总利润', 0, 5617, 2808.5, 1404.25, '', '#1779d9', 'rgba(23,121,217,0.6)');

function saleT(id, title, min, max, val, tag, unit, color1, color2) {
// 销售总利润仪表盘
    var myChart = echarts.init(document.getElementById(id));
    option = {
        title: {},
        tooltip: {
            confine: true,
            trigger: 'item',
            formatter: function (data) {
                hbl = (data.value / tag).toFixed(2);
                return title + "：" + data.value + '<br/>' + name + "：" + hbl
            }
        },
        series: [{
            startAngle: 180,
            endAngle: 0,
            splitNumber: 1,
            name: title,
            type: 'gauge',
            radius: '90%',
            axisLine: {
                lineStyle: {
                    color: [
                        [0.25, '#1779da'],
                        [0.5, '#1779da'],
                        [1, '#ddd']
                    ],
                    width: 20
                }
            },
            axisTick: {show: false},
            axisLabel: {
                distance: 0,
                width: 30,
                height: 24,
                lineHeight: 24,
                padding: [25, -30, 0],
                color: 'rgba(255,255,255,0.5)',
                formatter: function (value) {
                    if (unit == '千') {
                        return (value / 1000).toFixed(1) + ' ' + unit;
                    } else if (unit == '万') {
                        return (value / 10000).toFixed(1) + ' ' + unit;
                    } else {
                        return value;
                    }
                }
            },
            splitLine: {show: true},
            pointer: {show: true, width: 3},
            title: {
                offsetCenter: [0, '92%'],
                color: 'rgba(255,255,255,0.7)'
            },
            detail: {
                offsetCenter: [0, '20%'],
                formatter: function (value) {
                    value1 = value / tag;
                    return '{a|' + value.toFixed(1) + '}';
                },
                rich: {
                    a: {
                        fontSize: '16',
                        fontWeight: 'bold'
                    }
                }
            },
            data: [{}]
        }]
    };
    option.series[0].min = min;
    option.series[0].max = max;
    option.series[0].data[0].value = val;
    option.series[0].axisLine.lineStyle.color[0][0] = (tag - min) / (max - min);
    option.series[0].axisLine.lineStyle.color[0][1] = color2;
    option.series[0].axisLine.lineStyle.color[1][0] = (val - min) / (max - min);
    option.series[0].axisLine.lineStyle.color[1][1] = color1;
    myChart.setOption(option);
    window.onresize = function () {
        myChart.resize();
    };
    setInterval(function () {
        option.series[0].data[0].value = (Math.random() * 1000).toFixed(2);
        myChart.setOption(option, true);
    }, 2000);
};


// 星期几与订单量折线图  id为orderQ_Site
var orderQ_Site = echarts.init(document.getElementById('orderQ_Site'));
$.get("./data/星期几与订单量数据.json").done(function (data) {
    orderQ_Site.setOption({
        title: {
            text: '各星期数与订单统计情况',
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
            data: data.D,
        },
        yAxis: {
            type: 'value',
        },
        series: [
            {
                name: '星期几与订单量数据',
                type: 'line',
                data: data.values,
            },

        ]
    });
});


// 绘制柱状图分析下单时间段与消费金额的关系   id为saleT_Site
var saleT_Site = echarts.init(document.getElementById('saleT_Site'));
$.get("./data/下单时间段与消费金额数据.json").done(function (data) {
    saleT_Site.setOption({

        title: {
            text: '下单时间段与消费金融统计',
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
                data: data.times,
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
                data: data.sale,
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


window.onresize = function () {
    saleM_Site.resize();
    orderQ_Site.resize();
    saleT_Site.resize();
}