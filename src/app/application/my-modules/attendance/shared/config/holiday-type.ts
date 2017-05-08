
export class HolidayType {
  constructor() {


  }
  type: { type: string, name: string }[] = [
    { type: 'A', name: '年休假' },
    { type: 'B', name: '產假 - 產假【98天】' },
    { type: 'B1', name: '難產 - 難產【15天】' },
    { type: 'B3', name: '多胞胎 - 多胞胎【15天】' },
    { type: 'B4', name: '生育獎勵假 - 生育獎勵假【80天】' },
    { type: 'C', name: '工傷假 - 因工受傷【180天】' },
    { type: 'F', name: '丧假 - 員工的直系親屬(本人之父母、配偶、子女)去世【8天】' },
    { type: 'H', name: '流產假 - 流產【42天】' },
    { type: 'H1', name: '陪產假 - 配偶分娩【15天】' },
    { type: 'H2', name: '產檢假 - 產檢假【1天】' },
    { type: 'H3', name: '上環/結扎假 - 上環/結扎假【21天】' },
    { type: 'I', name: '授乳假 - 授乳假(一胞胎)【.13天】' },
    { type: 'L', name: '曠職' },
    { type: 'M', name: '停線' },
    { type: 'O', name: '公假 - 公假【7天】' },
    { type: 'P', name: '事假 - 一年累積不得超過30天（含)【30天】' },
    { type: 'R', name: '補假' },
    { type: 'R1', name: '補休' },
    { type: 'S', name: '病假 - 病假【90天】' },
    { type: 'T', name: '調休' },
    { type: 'W', name: '婚假 - 婚假【3天】' },
    { type: 'Y', name: '忘刷卡' },
  ];
  businessType = [
    { type: '10', name: '新員工招聘室簽署合同' },
    { type: '20', name: '前往招聘辦公室處理公務' },
    { type: '30', name: '前往醫務室婦檢' },
    { type: '40', name: '因公外出(出差、過磅、辦證、政府部門及銀行辦理業務等)' },
    { type: '50', name: '受訓、開會' },
    { type: '60', name: '出差期間加班時數計算' },
    { type: '70', name: '陪同客戶外出、用餐等' },
    { type: '80', name: '其它' }
  ];
  jobType = [
    { type: '01', name: '生產需要(for直接員工)' },
    { type: '02', name: '配合產線加班' },
    { type: '03', name: '日常事務處理' },
    { type: '04', name: 'OTHERS' }
  ];
  swipeType = [
    { type: '+', name: '上班' },
    { type: '$', name: '中午下班' },
    { type: '@', name: '中午上班' },
    { type: '-', name: '下班' }
  ];
  attendanceMonthType =[
    { name: '计薪天数', type: 'SA_DAYS' },
    { name: '应出勤天数', type: 'NEED_DAYS' },
    { name: '实出勤天数', type: 'PRESENT_DAYS' },
    { name: '有薪假天数', type: 'SA_OFFDUTY_DAYS' },
    { name: '法定有薪假天数', type: 'LEGAL_SA_DAYS' },
    { name: '事假天数', type: 'ABSENT_LEAVE' },
    { name: '病假天数', type: 'SICK_LEAVE' },
    { name: '旷职天数', type: 'WITHOUT_LEAVE' },
    { name: '全月请假天数', type: 'OFFDUTY_DAYS' },
    { name: '迟到早退次数', type: 'LATE' },
    { name: '迟到早退时间', type: 'LATE_TIME' },
    { name: '折现时数', type: 'OVER_PAY' },
    { name: '补休时数', type: 'REPAY' },
    { name: '未刷卡次数', type: 'NOCARD_COUNT' },
    { name: '停线天数', type: 'STOP_DAYS' },
    { name: '大夜班次数', type: 'NIGHT_SUBSIDY' },
    { name: '小夜班次数', type: 'NIGHT_SUBSIDY_LITTLE' },
    { name: '上个月大夜班次数', type: 'LAST1_NS' },
    { name: '前个月大夜班次数', type: 'LAST2_NS' },
    { name: '出勤天数(清凉津贴)', type: 'TOT_DUTY' },
    { name: '加班总时数', type: 'OVERTIME_HOURS1_133' },
    { name: '周六加班时数', type: 'SAT_DAYS' },
    { name: '休息日加班(不含法定假日)', type: 'OVERTIME_HOURS2_2' },
    { name: '加班时数(正常上班日)', type: 'OVERTIME_HOURS2_133' },
    { name: '法定假日加班时数', type: 'LEGAL_OVER_HOURS' },
    { name: '连续请假天数', type: 'CONTINUE_OFF_DAYS' },
    { name: '未处理天数', type: 'NO_SHEET' },
    { name: '产假天数', type: 'CHILDBIRTH_LEAVE' },
    { name: '缺席天数', type: 'OFFDUTY_DAYS' }
  ]
  leaveDayType = [
    { name: '年休假天数', type: 'A_DAYS' },
    { name: '补假时数', type: 'R_DAYS' },
    { name: '补休时数', type: 'R1_DAYS' },
    { name: '事假', type: 'SHIJIA_DAYS' },
    { name: '病假', type: 'BINGJIA_DAYS' },
    { name: '公假', type: 'GONGJIA_DAYS' },
    { name: '补假', type: 'BUJIA_DAYS' },
    { name: '补休', type: 'BUXIU_DAYS' },
    { name: '停线', type: 'TINGXIAN_DAYS' },
    { name: '婚假', type: 'HUNJIA_DAYS' },
    { name: '产假', type: 'CHANJIA_DAYS' },
    { name: '陪产假', type: 'PEICHANJIA_DAYS' },
    { name: '授乳假', type: 'SHOURUJIA_DAYS' },
    { name: '旷职', type: 'KUANGZHI_DAYS' },
    { name: '流产假', type: 'LIUCHAN_DAYS' },
    { name: '丧假', type: 'SANGJIA_DAYS' },
    { name: '工伤', type: 'GONGSHANG_DAYS' },
    { name: '特休假生效日期', type: 'STADATE' },
  ]
}
