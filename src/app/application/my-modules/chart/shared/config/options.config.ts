export class OptionsConfig{

  // 存貨周轉天數(月報)
  static storageFlow = {
    option1 : '{"title":{"text":"MSL存貨周轉天數","textStyle":{},"x":"center"},"tooltip":{"trigger":"axis"},"legend":{"data":["库存成本","销售成本","存货周转天数(实际)","存货周转天数(目标)"],"top":"80%","textStyle":{"fontSize":"14"}},"grid":{"show":"true","containLabel":true,"top":"11%","left":"5%","bottom":"20%","right":"5%","backgroundColor":"#c0c0c0"},"xAxis":[{"type":"category","data":["201701","201702","201703","201704","201705"],"axisTick":{"alignWithLabel":true}}],"yAxis":[{"type":"value","scale":true,"name":"","min":0,"boundaryGap":[0.2,0.2],"nameTextStyle":{"fontSize":14},"axisLabel":{"formatter":"{value}"},"splitLine":{"lineStyle":{"color":"#000"}}},{"type":"value","scale":true,"name":"","nameTextStyle":{"fontSize":14},"min":0,"boundaryGap":[0.2,0.2],"splitLine":{"show":false},"axisLabel":{"formatter":"{value}"}}],"series":[{"name":"库存成本","type":"bar","yAxisIndex":0,"data":[{"value":"566026233"},{"value":"608237809"},{"value":"627361543"},{"value":"598960302"},{"value":"566319526"}],"barGap":0},{"name":"销售成本","type":"bar","yAxisIndex":"0","data":[{"value":"246089266"},{"value":"153204351"},{"value":"286760306"},{"value":"257969391"},{"value":"209821539"}]},{"name":"存货周转天数(实际)","type":"line","yAxisIndex":"1","data":[{"value":"69"},{"value":"119"},{"value":"66"},{"value":"70"},{"value":"81"}]},{"name":"存货周转天数(目标)","type":"line","yAxisIndex":"1","data":[{"value":"37"},{"value":"37"},{"value":"37"},{"value":"37"},{"value":"37"}]}],"textStyle":{"fontSize":18,"fontFamily":["Helvetica","Tahoma","Arial","STXihei","华文细黑","Microsoft YaHei","微软雅黑","sans-serif"]},"color":["#993366","#ffffcc","#00ffff","#903090"]}'
  }
  // 庫存賬齡分析(月報)
  static storageAge = {
    option1 : '{"title":{"text":"","textStyle":{},"x":"center"},"tooltip":{"trigger":"axis"},"legend":{"data":[""],"top":"7%","textStyle":{}},"grid":{"containLabel":true,"top":"5%","left":"5%","bottom":"18%","right":"5%"},"xAxis":[{"type":"value","axisLabel":{"formatter":"{value}","rotate":"45"}}],"yAxis":[{"type":"category","data":["0-30 days AMT","30-60 days AMT","61-90 days AMT","91-120 days AMT",">120 days AMT"],"axisTick":{"alignWithLabel":true}}],"series":[{"name":"","type":"bar","yAxisIndex":0,"data":[{"value":"51548380","itemStyle":{"normal":{"color":"#00ff00"}}},{"value":"12624783","itemStyle":{"normal":{"color":"#9dffb8"}}},{"value":"5862234","itemStyle":{"normal":{"color":"#ffff00"}}},{"value":"2928341","itemStyle":{"normal":{"color":"#ff80c0"}}},{"value":"15803802","itemStyle":{"normal":{"color":"#ff0000"}}}],"barGap":0}],"textStyle":{"fontSize":18,"fontFamily":["Helvetica","Tahoma","Arial","STXihei","华文细黑","Microsoft YaHei","微软雅黑","sans-serif"]},"color":["#c23531"]}',
    option2 : '{"title":{"text":"","textStyle":{"fontSize":18},"x":"center"},"tooltip":{"trigger":"item","formatter":"{a} <br/>{b} : <br/>{c} ({d}%)"},"grid":{"left":"3%","right":"4%","bottom":"3%","height":"60%","containLabel":true},"legend":{"orient":"horizontal","top":"80%","itemGap":4,"textStyle":{"fontSize":13},"data":["0~30RATE","31~60RATE","61~90RATE","91~120RATE",">120RATE"],"left":"%"},"series":[{"name":"MSL庫存帳齡","data":[{"value":51548380,"name":"0~30RATE"},{"value":12624783,"name":"31~60RATE"},{"value":5862234,"name":"61~90RATE"},{"value":2928341,"name":"91~120RATE"},{"value":15803802,"name":">120RATE"}],"type":"pie","itemStyle":{"emphasis":{"shadowBlur":10,"shadowOffsetX":0,"shadowColor":"rgba(0, 0, 0, 0.5)"}},"roseType":false,"center":["50%","42%"],"label":{"normal":{"formatter":"{d}%","textStyle":{"color":"#000"}}},"radius":["0%","70%"]}],"textStyle":{"fontFamily":["Helvetica","Tahoma","Arial","STXihei","华文细黑","Microsoft YaHei","微软雅黑","sans-serif"]},"color":["#00ff00","#9dffb8","#ffff00","#ff80c0","#ff0000"]}',
    option3 : '{"title":{"text":"MSL库存账龄>120days趋势图","textStyle":{"fontSize":"18"},"x":"center"},"tooltip":{"trigger":"axis"},"legend":{"data":[">120days AMT",">120RATE"],"top":"90%","textStyle":{"fontSize":"14"}},"grid":{"containLabel":true,"top":"17%","left":"5%","bottom":"10%","right":"5%"},"xAxis":[{"type":"category","data":["201701","201702","201703","201704","201705"],"axisTick":{"alignWithLabel":true}}],"yAxis":[{"type":"value","scale":true,"name":"","min":0,"boundaryGap":[0.2,0.2],"nameTextStyle":{"fontSize":14},"axisLabel":{"formatter":"{value}"}},{"type":"value","scale":true,"name":"","nameTextStyle":{"fontSize":14},"min":0,"boundaryGap":[0.2,0.2],"splitLine":{"show":false},"axisLabel":{"formatter":"{value} %"}}],"series":[{"name":">120days AMT","type":"bar","yAxisIndex":0,"data":[{"value":"112621906"},{"value":"112109870"},{"value":"118892134"},{"value":"128725030"},{"value":"137531714"}],"barGap":0},{"name":">120RATE","type":"line","yAxisIndex":"1","data":[{"value":"19.46"},{"value":"17.58"},{"value":"19.27"},{"value":"22.16"},{"value":"24.93"}]}],"textStyle":{"fontSize":18,"fontFamily":["Helvetica","Tahoma","Arial","STXihei","华文细黑","Microsoft YaHei","微软雅黑","sans-serif"]},"color":["#28ffff","#ff0000"]}'
  }
  // OBS庫存分析(週報)
  static ObsStorage = {
    option1 : '{"title":{"text":"","textStyle":{},"x":"center"},"tooltip":{"trigger":"axis"},"legend":{"data":[""],"top":"7%","textStyle":{}},"grid":{"containLabel":true,"top":"10%","left":"5%","bottom":"16%","right":"5%"},"xAxis":[{"type":"value","axisLabel":{"formatter":"{value}","rotate":"45"}}],"yAxis":[{"type":"category","data":["CBU","EBU","MBU","TBU","MSL"],"axisTick":{"alignWithLabel":true}}],"series":[{"name":"","type":"bar","yAxisIndex":0,"data":[{"value":"12781020"},{"value":"70486934"},{"value":"193257"},{"value":"15799580"},{"value":"99260791"}],"barGap":0}],"textStyle":{"fontSize":18,"fontFamily":["Helvetica","Tahoma","Arial","STXihei","华文细黑","Microsoft YaHei","微软雅黑","sans-serif"]},"color":["#0080ff"]}',
    option2 : '{"title":{"text":"","textStyle":{"fontSize":18},"x":"center"},"tooltip":{"trigger":"item","formatter":"{a} <br/>{b} : <br/>{c} ({d}%)"},"grid":{"left":"3%","right":"4%","bottom":"3%","height":"60%","containLabel":true},"legend":{"orient":"horizontal","top":"92%","itemGap":4,"textStyle":{"fontSize":13},"data":["CBU","EBU","MBU","TBU"]},"series":[{"name":"比例","data":[{"value":12781020,"name":"CBU"},{"value":70486934,"name":"EBU"},{"value":193257,"name":"MBU"},{"value":15799580,"name":"TBU"}],"type":"pie","itemStyle":{"emphasis":{"shadowBlur":10,"shadowOffsetX":0,"shadowColor":"rgba(0, 0, 0, 0.5)"}},"label":{"normal":{"formatter":"{d}%","textStyle":{"color":"#000"}}},"center":["50%","50%"],"roseType":false,"radius":["0%","70%"]}],"textStyle":{"fontFamily":["Helvetica","Tahoma","Arial","STXihei","华文细黑","Microsoft YaHei","微软雅黑","sans-serif"]},"color":["#0080ff","#2f4554","#ffff00","#80ffff","#00ff40"]}',
    option3 : '{"title":{"text":"2017年OBS库存趋势图","textStyle":{},"x":"center"},"tooltip":{"trigger":"axis"},"legend":{"data":["CBU","EBU","MBU","TBU","MSL"],"top":"82%","textStyle":{"fontSize":"14"}},"grid":{"containLabel":true,"top":"13%","left":"5%","bottom":"18%","right":"5%"},"xAxis":[{"type":"category","data":["18周","19周","20周","21周","22周","23周","24周"],"axisTick":{"alignWithLabel":true},"axisLabel":{"formatter":"{value}"}}],"yAxis":[{"type":"value"}],"series":[{"name":"CBU","type":"line","yAxisIndex":0,"data":[{"value":"12934827"},{"value":"13241493"},{"value":"12841336"},{"value":"12852982"},{"value":"13847569"},{"value":"13797455"},{"value":"12781020"}],"barGap":0},{"name":"EBU","type":"line","yAxisIndex":"0","data":[{"value":"77144033"},{"value":"75329351"},{"value":"72330805"},{"value":"71599923"},{"value":"70718372"},{"value":"70658402"},{"value":"70486934"}]},{"name":"MBU","type":"line","yAxisIndex":"0","data":[{"value":"201393"},{"value":"196370"},{"value":"185362"},{"value":"182183"},{"value":"197628"},{"value":"198168"},{"value":"193257"}]},{"name":"TBU","type":"line","yAxisIndex":"0","data":[{"value":"15270892"},{"value":"15622232"},{"value":"15712416"},{"value":"16096494"},{"value":"16220643"},{"value":"16178620"},{"value":"15799580"}]},{"name":"MSL","type":"line","yAxisIndex":"0","data":[{"value":"105551145"},{"value":"104389446"},{"value":"101069919"},{"value":"100731582"},{"value":"100984212"},{"value":"100832645"},{"value":"99260791"}]}],"textStyle":{"fontSize":18,"fontFamily":["Helvetica","Tahoma","Arial","STXihei","华文细黑","Microsoft YaHei","微软雅黑","sans-serif"]},"color":["#0080ff","#2f4554","#ffff00","#80ffff","#00ff40"]}'
  }
  // OBS PO分析(週報)
  static ObsPo = OptionsConfig.ObsStorage

  // 出貨達成率(日報/月報)
  static saleAchievement = {
    option1 : '{"title":{"text":"","textStyle":{},"x":"center"},"tooltip":{"trigger":"axis"},"legend":{"data":["目标(CNY)","实际(CNY)","达成率"],"top":"91%","textStyle":{"fontSize":"14"}},"grid":{"show":"true","backgroundColor":"#c0c0c0","containLabel":true,"top":"6%","left":"5%","bottom":"9%","right":"5%"},"xAxis":[{"type":"category","data":["TBU","CBU","EBU","MBU","CM","MSL"],"axisTick":{"alignWithLabel":true}}],"yAxis":[{"type":"value","scale":true,"name":"","min":0,"boundaryGap":[0.2,0.2],"nameTextStyle":{"fontSize":14},"splitLine":{"lineStyle":{"color":"#000"}},"axisLabel":{"formatter":"{value}"}},{"type":"value","scale":true,"name":"","nameTextStyle":{"fontSize":14},"min":0,"boundaryGap":[0.2,0.2],"splitLine":{"show":false},"axisLabel":{"formatter":"{value} %"}}],"series":[{"name":"目标(CNY)","type":"bar","yAxisIndex":0,"data":[{"value":"10164470"},{"value":"44689161"},{"value":"127402397"},{"value":"2312817"},{"value":"15412251"},{"value":"199981096"}],"barGap":0},{"name":"实际(CNY)","type":"bar","yAxisIndex":"0","data":[{"value":"4517368"},{"value":"13347839"},{"value":"44936206"},{"value":"511092"},{"value":"4635306"},{"value":"67974811"}]},{"name":"达成率","type":"line","yAxisIndex":"1","data":[{"value":"44.44"},{"value":"29.87"},{"value":"35.29"},{"value":"22.10"},{"value":"30.08"},{"value":"33.99"}]}],"textStyle":{"fontSize":18,"fontFamily":["Helvetica","Tahoma","Arial","STXihei","华文细黑","Microsoft YaHei","微软雅黑","sans-serif"]},"color":["#9999ff","#993366","#ffff00"]}',
    option2 : '{"title":{"text":"MSL出货達成率","textStyle":{},"x":"center"},"tooltip":{"trigger":"axis"},"legend":{"data":["目标(CNY)","实际(CNY)","达成率"],"top":"91%","textStyle":{"fontSize":"13"},"left":"1%"},"grid":{"show":true,"containLabel":true,"top":"13%","left":"5%","bottom":"9%","right":"5%","backgroundColor":"#c0c0c0"},"xAxis":[{"type":"category","data":["MDⅠ","MD Ⅱ","MD Ⅲ","MSL"],"axisTick":{"alignWithLabel":true}}],"yAxis":[{"type":"value","scale":true,"name":"","min":0,"boundaryGap":[0.2,0.2],"nameTextStyle":{"fontSize":14},"axisLabel":{"formatter":"{value}"},"splitLine":{"lineStyle":{"color":"#000"}}},{"type":"value","scale":true,"name":"","nameTextStyle":{"fontSize":14},"min":0,"boundaryGap":[0.2,0.2],"splitLine":{"show":false},"axisLabel":{"formatter":"{value} %"}}],"series":[{"name":"目标(CNY)","type":"bar","yAxisIndex":0,"data":[{"value":"86464385"},{"value":"54320887"},{"value":"141822464"},{"value":"282607736"}],"barGap":0},{"name":"实际(CNY)","type":"bar","yAxisIndex":"0","data":[{"value":"56030627"},{"value":"30337893"},{"value":"63125663"},{"value":"149494183"}]},{"name":"达成率","type":"line","yAxisIndex":"1","data":[{"value":"64.8"},{"value":"55.8"},{"value":"44.5"},{"value":"52.9"}]}],"textStyle":{"fontSize":18,"fontFamily":["Helvetica","Tahoma","Arial","STXihei","华文细黑","Microsoft YaHei","微软雅黑","sans-serif"]},"color":["#993366","#ffffcc","#00ffff"]}'
  }
  // MPS達成率(日報/月報)
  static MpsAchievement = {
    option1 : '{"title":{"text":"MSL MPS達成率","textStyle":{},"x":"center"},"tooltip":{"trigger":"axis"},"legend":{"data":["(MPS) Plan","Ach. Output","Ach. Rate"],"top":"91%","textStyle":{"fontSize":"13"},"left":"1%"},"grid":{"show":true,"containLabel":true,"top":"13%","left":"5%","bottom":"9%","right":"5%","backgroundColor":"#c0c0c0"},"xAxis":[{"type":"category","data":["MDⅠ","MD Ⅱ","MD Ⅲ","MSL"],"axisTick":{"alignWithLabel":true}}],"yAxis":[{"type":"value","scale":true,"name":"","min":0,"boundaryGap":[0.2,0.2],"nameTextStyle":{"fontSize":14},"axisLabel":{"formatter":"{value}"},"splitLine":{"lineStyle":{"color":"#000"}}},{"type":"value","scale":true,"name":"","nameTextStyle":{"fontSize":14},"min":0,"boundaryGap":[0.2,0.2],"splitLine":{"show":false},"axisLabel":{"formatter":"{value} %"}}],"series":[{"name":"(MPS) Plan","type":"bar","yAxisIndex":0,"data":[{"value":"86464385"},{"value":"54320887"},{"value":"141822464"},{"value":"282607736"}],"barGap":0},{"name":"Ach. Output","type":"bar","yAxisIndex":"0","data":[{"value":"56030627"},{"value":"30337893"},{"value":"63125663"},{"value":"149494183"}]},{"name":"Ach. Rate","type":"line","yAxisIndex":"1","data":[{"value":"64.8"},{"value":"55.8"},{"value":"44.5"},{"value":"52.9"}]}],"textStyle":{"fontSize":18,"fontFamily":["Helvetica","Tahoma","Arial","STXihei","华文细黑","Microsoft YaHei","微软雅黑","sans-serif"]},"color":["#9999ff","#993366","#ffff00"]}',
    option2 : '{"title":{"text":"MSL MPS達成率","textStyle":{},"x":"center"},"tooltip":{"trigger":"axis"},"legend":{"data":["(MPS) Plan","Ach. Output","Ach. Rate"],"top":"91%","textStyle":{"fontSize":"13"},"left":"1%"},"grid":{"show":true,"containLabel":true,"top":"13%","left":"5%","bottom":"9%","right":"5%","backgroundColor":"#c0c0c0"},"xAxis":[{"type":"category","data":["MDⅠ","MD Ⅱ","MD Ⅲ","MSL"],"axisTick":{"alignWithLabel":true}}],"yAxis":[{"type":"value","scale":true,"name":"","min":0,"boundaryGap":[0.2,0.2],"nameTextStyle":{"fontSize":14},"axisLabel":{"formatter":"{value}"},"splitLine":{"lineStyle":{"color":"#000"}}},{"type":"value","scale":true,"name":"","nameTextStyle":{"fontSize":14},"min":0,"boundaryGap":[0.2,0.2],"splitLine":{"show":false},"axisLabel":{"formatter":"{value} %"}}],"series":[{"name":"(MPS) Plan","type":"bar","yAxisIndex":0,"data":[{"value":"86464385"},{"value":"54320887"},{"value":"141822464"},{"value":"282607736"}],"barGap":0},{"name":"Ach. Output","type":"bar","yAxisIndex":"0","data":[{"value":"56030627"},{"value":"30337893"},{"value":"63125663"},{"value":"149494183"}]},{"name":"Ach. Rate","type":"line","yAxisIndex":"1","data":[{"value":"64.8"},{"value":"55.8"},{"value":"44.5"},{"value":"52.9"}]}],"textStyle":{"fontSize":18,"fontFamily":["Helvetica","Tahoma","Arial","STXihei","华文细黑","Microsoft YaHei","微软雅黑","sans-serif"]},"color":["#993366","#ffffcc","#00ffff"]}'
  }
  // PL庫周轉天數(日報)
  static PlFlow = {
    option1 : '{"title":{"text":"MSL MC MD I 製造二處","textStyle":{},"x":"center"},"tooltip":{"trigger":"axis"},"legend":{"data":["总库存","DD单金额","实际周转天数","目标周转天数"],"top":"83%","textStyle":{"fontSize":"13"}},"grid":{"show":true,"backgroundColor":"#c0c0c0","containLabel":true,"top":"13%","left":"5%","bottom":"17%","right":"5%"},"xAxis":[{"type":"category","data":["6月5日","6月6日","6月7日","6月8日","6月9日","6月10日","6月11日"],"axisTick":{"alignWithLabel":true}}],"yAxis":[{"type":"value","splitLine":{"lineStyle":{"color":"#000"}},"scale":true,"name":"","min":0,"boundaryGap":[0.2,0.2],"nameTextStyle":{"fontSize":14},"axisLabel":{"formatter":"{value}"}},{"type":"value","scale":true,"name":"","nameTextStyle":{"fontSize":14},"min":0,"boundaryGap":[0.2,0.2],"splitLine":{"show":false},"axisLabel":{"formatter":"{value}"}}],"series":[{"name":"总库存","type":"bar","yAxisIndex":0,"data":[{"value":"15659047"},{"value":"17195535"},{"value":"17891501"},{"value":"16902027"},{"value":"17775714"},{"value":"16480032"},{"value":"17919512"}],"barGap":0},{"name":"DD单金额","type":"bar","yAxisIndex":"0","data":[{"value":"11604762"},{"value":"14520669"},{"value":"16783260"},{"value":"19149438"},{"value":"21284192"},{"value":"24738889"},{"value":"26745803"}]},{"name":"实际周转天数","type":"line","yAxisIndex":"1","data":[{"value":"6.8"},{"value":"7.1"},{"value":"7.5"},{"value":"7.1"},{"value":"7.5"},{"value":"6.7"},{"value":"7.4"}]},{"name":"目标周转天数","type":"line","yAxisIndex":"1","data":[{"value":"4"},{"value":"4"},{"value":"4"},{"value":"4"},{"value":"4"},{"value":"4"},{"value":"4"}]}],"textStyle":{"fontSize":18,"fontFamily":["Helvetica","Tahoma","Arial","STXihei","华文细黑","Microsoft YaHei","微软雅黑","sans-serif"]},"color":["#9999ff","#993366","#ffff00","#00ffff"]}'
  }

  // 年資分析(月報)
  static salaryAnalysis = {
    option1 : '{"title":{"text":"IDL 年资分析","textStyle":{},"x":"center"},"tooltip":{"trigger":"axis"},"legend":{"data":["工程","管理","研发","专业"],"top":"91%","textStyle":{"fontSize":"14"}},"grid":{"containLabel":true,"top":"13%","left":"5%","bottom":"9%","right":"5%"},"xAxis":[{"type":"category","data":["0-1年","1-2年","2-3年","3-4年","4-5年","5-7年","7-9年","9年以上"],"axisTick":{"alignWithLabel":true}}],"yAxis":[{"type":"value","axisLabel":{"formatter":"{value}"}}],"series":[{"name":"工程","type":"bar","yAxisIndex":0,"data":[{"value":"79"},{"value":"39"},{"value":"41"},{"value":"39"},{"value":"6"},{"value":"29"},{"value":"28"},{"value":"237"}],"barGap":0},{"name":"管理","type":"bar","yAxisIndex":"0","data":[{"value":"0"},{"value":"0"},{"value":"0"},{"value":"0"},{"value":"0"},{"value":"0"},{"value":"0"},{"value":"36"}]},{"name":"研发","type":"bar","yAxisIndex":"0","data":[{"value":"6"},{"value":"4"},{"value":"0"},{"value":"4"},{"value":"0"},{"value":"1"},{"value":"6"},{"value":"13"}]},{"name":"专业","type":"bar","yAxisIndex":"0","data":[{"value":"43"},{"value":"32"},{"value":"29"},{"value":"26"},{"value":"17"},{"value":"21"},{"value":"27"},{"value":"191"}]}],"textStyle":{"fontSize":18,"fontFamily":["Helvetica","Tahoma","Arial","STXihei","华文细黑","Microsoft YaHei","微软雅黑","sans-serif"]},"color":["#0080ff","#80ffff","#008040","#b9c6bb"]}',
    option2 : '{"title":{"text":"DL 年资分析","textStyle":{},"x":"center"},"tooltip":{"trigger":"axis"},"legend":{"data":["DL"],"top":"91%","textStyle":{"fontSize":"14"}},"grid":{"containLabel":true,"top":"13%","left":"5%","bottom":"9%","right":"5%"},"xAxis":[{"type":"category","data":["0-1年","1-2年","2-3年","3-4年","4-5年","5-7年","7-9年","9年以上"],"axisTick":{"alignWithLabel":true}}],"yAxis":[{"type":"value","axisLabel":{"formatter":"{value}"}}],"series":[{"name":"DL","type":"bar","yAxisIndex":0,"data":[{"value":"736"},{"value":"200"},{"value":"164"},{"value":"92"},{"value":"34"},{"value":"44"},{"value":"35"},{"value":"55"}],"barGap":0}],"textStyle":{"fontSize":18,"fontFamily":["Helvetica","Tahoma","Arial","STXihei","华文细黑","Microsoft YaHei","微软雅黑","sans-serif"]},"color":["#0080ff"]}',
    option3 : '{"title":{"text":"IDL 年资比例","textStyle":{"fontSize":18},"x":"center"},"tooltip":{"trigger":"item","formatter":"{a} <br/>{b} : <br/>{c} ({d}%)"},"grid":{"left":"3%","right":"4%","bottom":"3%","height":"60%","containLabel":true},"legend":{"orient":"horizontal","top":"84%","itemGap":4,"textStyle":{"fontSize":"13"},"data":["0-1年","1-2年","2-3年","3-4年","4-5年","5-7年","7-9年","9年以上"]},"series":[{"name":"比例","data":[{"value":"823","name":"0-1年"},{"value":"240","name":"1-2年"},{"value":"122","name":"2-3年"},{"value":"77","name":"3-4年"},{"value":"41","name":"4-5年"},{"value":"47","name":"5-7年"},{"value":"21","name":"7-9年"},{"value":"51","name":"9年以上"}],"type":"pie","itemStyle":{"emphasis":{"shadowBlur":10,"shadowOffsetX":0,"shadowColor":"rgba(0, 0, 0, 0.5)"}},"label":{"normal":{"formatter":"{d}%","textStyle":{"color":"#000"}}},"radius":["0%","55%"],"center":["50%","48%"]}],"textStyle":{"fontFamily":["Helvetica","Tahoma","Arial","STXihei","华文细黑","Microsoft YaHei","微软雅黑","sans-serif"]},"color":["#0080ff","#2f4554","#df00df","#d48265","#00ff40","#749f83","#ca8622","#00ffff"]}'
  }

  // 離職率分析(月報)
  static DimissionAnalysis = {
    option1 : '{"title":{"text":"年度离职率","textStyle":{},"x":"center"},"tooltip":{"trigger":"axis"},"legend":{"data":["2015","2016","2017"],"top":"91%","textStyle":{"fontSize":"14"}},"grid":{"containLabel":true,"top":"13%","left":"5%","bottom":"11%","right":"5%"},"xAxis":[{"type":"category","data":["01","02","03","04","05","06","07","08","09","10","11","12"],"axisTick":{"alignWithLabel":true}}],"yAxis":[{"type":"value","axisLabel":{"formatter":"{value} %"}}],"series":[{"name":"2015","type":"line","yAxisIndex":0,"data":[{"value":"9.23"},{"value":"9.37"},{"value":"13.56"},{"value":"8.14"},{"value":"6.47"},{"value":"8.89"},{"value":"8.22"},{"value":"7.02"},{"value":"7.24"},{"value":"5.18"},{"value":"4.87"},{"value":"4.93"}],"barGap":0},{"name":"2016","type":"line","yAxisIndex":"0","data":[{"value":"8.10"},{"value":"8.99"},{"value":"6.79"},{"value":"7.32"},{"value":"7.51"},{"value":"7.30"},{"value":"5.80"},{"value":"5.94"},{"value":"4.71"},{"value":"3.97"},{"value":"2.87"},{"value":"0"}]},{"name":"2017","type":"line","yAxisIndex":"0","data":[{"value":"13.26"},{"value":"16.72"},{"value":"14.91"},{"value":"0"},{"value":"0"},{"value":"0"},{"value":"0"},{"value":"0"},{"value":"0"},{"value":"0"},{"value":"0"},{"value":"0"}]}],"textStyle":{"fontSize":18,"fontFamily":["Helvetica","Tahoma","Arial","STXihei","华文细黑","Microsoft YaHei","微软雅黑","sans-serif"]},"color":["#0080ff","#496b83","#00db37"]}'
  }
}
