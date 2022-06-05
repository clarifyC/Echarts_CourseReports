//绘制饼图分析菜品口味的分布   id为tastM
var tastM = echarts.init(document.getElementById('tastM'));
$.get("data/不同菜品口味的统计情况.json").done(function (data) {
    tastM.setOption({
        tooltip : {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
            data: data.菜品口味,
            orient:'vertical',
            left:0,
            top:"25%"
        },
        grid: {
            left: '0%',
            right: '0%',
            bottom: '0%',
            containLabel: true
        },
        series : [
            {
                name: '不同菜品口味的统计情况',
                type: 'pie',
                radius : '62%',
                center: ['65%', '50%'],
                label:{
                    formatter:"{b}\n{a|{d}%}",
                    rich: {
                        a: {
                            padding:6,
                            align:'left',
                            color:'#999',
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


// 绘制柱状图分析不同菜品价格区间的订单量   id为orderP
var orderP = echarts.init(document.getElementById('orderP'));
$.get("./data/不同菜品价格区间的订单量分布数据.json").done(function (data) {
    orderP.setOption({

        title: {
            text: '不同菜品价格区间的订单量分布',
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
                data: data.PriceRange,
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
                data: data.Orderquantity,
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


window.onresize = function() {
    tastM.resize();
    orderP.resize();
}