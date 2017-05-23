export class LanguageTypeConfig {

  static formType = {
    traditional_Chinese:{
      attendance_wrong:'門禁異常待處理單',
      attendance_lack:'未刷卡待處理單',
      leave:'請假單',
      over_time:'加班單',
      business:'公出單',
      callback_leave:'銷假單',
      swipe_note:'刷卡記錄',
      attendance_month:'出勤月檔',
      attendance_detail:'出勤狀況明細',
      sign_list:'簽核名單'
    },
    simple_Chinese:{
      attendance_wrong:'门禁异常待处理单',
      attendance_lack:'未刷卡待处理单',
      leave:'请假单',
      over_time:'加班单',
      business:'公出单',
      callback_leave:'销假单',
      swipe_note:'刷卡记录',
      attendance_month:'出勤月档',
      attendance_detail:'出勤状况明细',
      sign_list:'签核名单'
    }
  };

  static attendanceService = {
    traditional_Chinese:{
      tab1:'我的異常',
      tab2:'加班申請',
      tab3:'假單管理',
      tab4:'考勤查詢',
      tab5:'統計圖表'
    },
    simple_Chinese:{
      errorDeal_404:'未找到结果',
      errorDeal_400:'连接服务器失败',
      errorDeal_500:'服务器没响应',
      errorDeal_0:'连接服务器失败',
      errorDeal_d:'出现未定义连接错误',
    }
  };


  static attendanceComponent = {
    traditional_Chinese:{
      tab1:'我的異常',
      tab2:'加班申請',
      tab3:'假單管理',
      tab4:'考勤查詢',
      tab5:'統計圖表'
    },
    simple_Chinese:{
      tab1:'我的异常',
      tab2:'加班申请',
      tab3:'假单管理',
      tab4:'考勤查询',
      tab5:'统计图表'
    }
  };
  static statisticsComponent = {
    traditional_Chinese:{
      title:'統計圖表',
      totalOT_year:'本年加班',
      totalOT_month:'本月加班',
      totalLeave_year:'本年請假',
      totalLeave_month:'本月請假',
      total:'總統計',
      my:'我的',
      OT: '加班',
      leave: '請假',
      month: '月',
      day:'天',
      days:'天數',
      hour:'小時',
      this_year:'本年',
      this_month:'本月',
      back:'返回'
    },
    simple_Chinese:{
      title:'统计图表',
      totalOT_year:'本年加班',
      totalOT_month:'本月加班',
      totalLeave_year:'本年请假',
      totalLeave_month:'本月请假',
      total:'总统计',
      my:'我的',
      OT: '加班',
      leave: '请假',
      month: '月',
      day:'天',
      days:'天数',
      hour:'小时',
      this_year:'本年',
      this_month:'本月',
      back:'返回'
    }
  };
  static undoneFormComponent = {
    traditional_Chinese:{
      title:'異常維護',
      form_status:'單據狀態',
      form_No:'單據號',
      confirm:'確認',
      cancle:'取消',
      absentType:'缺席類別',
      dutyType:'班別',
      reasonType:'假別',
      startTime: '開始時間',
      endTime: '結束時間',
      dayCount:'天數',
      hourCount:'時數',
      reason: '原因',
      submit: '送簽',
      absentType_required_err: '請選擇缺席類型',
      reason_required_err: '原因不能為空',
      reason_minlength_err: '原因長度不能少於2位',
      startTime_required_err: '開始時間不能為空',
      endTime_required_err: '結束時間不能為空',
      submit_succ: '送簽成功'
    },
    simple_Chinese:{
      title:'异常维护',
      form_status:'单据状态',
      form_No:'單據號',
      confirm:'確認',
      cancle:'取消',
      absentType:'缺席类别',
      dutyType:'班别',
      reasonType:'假别',
      startTime: '开始时间',
      endTime: '结束时间',
      dayCount:'天数',
      hourCount:'时数',
      reason: '原因',
      submit: '送签',
      absentType_required_err: '请选择缺席类型',
      reason_required_err: '原因不能为空',
      reason_minlength_err: '原因长度不能少于2位',
      startTime_required_err: '开始时间不能为空',
      endTime_required_err: '结束时间不能为空',
      submit_succ: '送签成功'
    }
  };
  static signListComponent = {
    traditional_Chinese:{
      title:'簽核歷史記錄',
      REVISION:'版本',
      SEQ:'序列',
      ARENT_FROM:'代理人',
      waiting:'已等待',
      COMMENTS:'備註',
      no_list:'暫無簽核名單產生,請稍等後重試'
    },
    simple_Chinese:{
      title:'签核历史记录',
      REVISION:'版本',
      SEQ:'序列',
      ARENT_FROM:'代理人',
      waiting:'已等待',
      COMMENTS:'备注',
      no_list:'暂无签核名单产生,请稍等后重试'
    }
  };
  static formMenuComponent = {
    traditional_Chinese:{
      search:'查詢',
      sign_list:'簽核名單',
      getCallbackForm:'銷假單查詢',
      deleteForm:'刪除',
      callbackSign:'取消送簽',
      callBack: '取消假單',
      no_callback: '沒有銷假單記錄',
      delete_succ: '刪除表單成功',
      callbackSign_succ: '取消送簽成功',
      callbackSign_err: '操作過於繁忙,請稍等'
    },
    simple_Chinese:{
      search:'查询',
      sign_list:'签核名单',
      getCallbackForm:'销假单查询',
      deleteForm:'删除',
      callbackSign:'取消送签',
      callBack: '取消假單',
      no_callback: '没有销假单记录',
      delete_succ: '删除表单成功',
      callbackSign_succ: '取消送签成功',
      callbackSign_err: '操作过于繁忙,请稍等'
    }
  };
  static attendanceDetailComponent = {
    traditional_Chinese:{
      week:'星期',
      work_hour:'工時',
      off_hour:'假时'
    },
    simple_Chinese:{
      week:'星期',
      work_hour:'工時',
      off_hour:'假时'
    }
  };
  static detailBetweenFormComponent = {
    traditional_Chinese:{
      startTime:'日期起',
      endTime: '日期止',
      confirm:'確認',
      cancle:'取消',
      submit:'查詢',
      startTime_dateNotBigger_err:'結束時間不得小於開始時間',
      endTime_DateNotSmaller_err:'結束時間不得小於開始時間',
      no_swipe:'沒有此段時間的刷卡記錄',
      no_att_detail:'沒有此段時間的考勤明細記錄'
    },
    simple_Chinese:{
      startTime:'日期起',
      endTime: '日期止',
      confirm:'确认',
      cancle:'取消',
      submit:'查询',
      startTime_dateNotBigger_err:'结束时间不得小于开始时间',
      endTime_DateNotSmaller_err:'结束时间不得小于开始时间',
      no_swipe:'没有此段时间的刷卡记录',
      no_att_detail:'没有此段时间的考勤明细记录'
    }
  };
  static detailOnFormComponent = {
    traditional_Chinese:{
      date:'年月',
      confirm:'確認',
      cancle:'取消',
      submit:'查詢',
      date_required_err:'必須選擇時間',
      date_BeforeMonth_err:'不能選擇本月以後的日期',
      no_result:'沒有此月記錄'
    },
    simple_Chinese:{
      date:'年月',
      confirm:'确认',
      cancle:'取消',
      submit:'查询',
      date_required_err:'必须选择时间',
      date_BeforeMonth_err:'不能选择本月以后的日期',
      no_result:'没有此月记录'
    }
  };
  static searchFormComponent = {
    traditional_Chinese:{
      title:'查詢',
      form_type:'單據類型',
      startTime:'開始時間',
      endTime:'結束時間',
      form_No:'單據號',
      submit:'提交',
      confirm:'確認',
      cancle:'取消',
      form_No_reg_mes:'必須是HT開頭',
      form_No_reg_mes2:'必須是HTL開頭',
      form_No_reg_mes3:'必須是HTO開頭',
      type_required_err:'單號類型不能為空',
      form_No_length_err:'單據長度不足15位',
      startTime_dateNotBigger_err:'結束時間必須遲於開始時間',
      endTime_DateNotSmaller_err:'結束時間必須遲於開始時間',
      no_result: '沒有此段時間的單據記錄'
    },
    simple_Chinese:{
      title:'查询',
      form_type:'单据类型',
      startTime:'开始时间',
      endTime:'结束时间',
      form_No:'单据号',
      submit:'提交',
      confirm:'确认',
      cancle:'取消',
      form_No_reg_mes:'必须是HT开头',
      form_No_reg_mes2:'必须是HTL开头',
      form_No_reg_mes3:'必须是HTO开头',
      type_required_err:'单号类型不能为空',
      form_No_length_err:'单据长度不足15位',
      startTime_dateNotBigger_err:'结束时间必须迟于开始时间',
      endTime_DateNotSmaller_err:'结束时间必须迟于开始时间',
      no_result: '没有此段时间的单据记录'
    }
  };
  static holidayDetailComponent = {
    traditional_Chinese:{
      title:'個人維護詳情',
      STADATE:'年休假生效日',
      canUse:'可用假天數',
      used:'已用假天數'
    },
    simple_Chinese:{
      title:'个人维护详情',
      STADATE:'年休假生效日',
      canUse:'可用假天数',
      used:'已用假天数'
    }
  };
  static leaveMessageMenuComponent = {
    traditional_Chinese:{
      title:'考勤查詢',
      swipe_note:'刷卡記錄',
      attendance_month:'出勤月檔',
      attendance_detail:'出勤狀況明細',
      to_detail: '可休/已休假'
    },
    simple_Chinese:{
      title:'考勤查詢',
      swipe_note:'刷卡记录',
      attendance_month:'出勤月档',
      attendance_detail:'出勤状况明细',
      to_detail: '可休/已休假'
    }
  };
  static listFilterComponent = {
    traditional_Chinese:{
      form_No:'單號',
      startTime:'開始時間',
      endTime:'結束時間',
      businessTime:'出差時間',
      OTtime:'申請加班時間',
      trueCount:'實際加班',
      type:'類別',
      leave_No:'請假單據號',
      callback_reason:'銷假原因',
      search_placeholder:'單據號篩選',
      ask_for_overTime:'申請加班',
      business:'公出',
      day:'天'
    },
    simple_Chinese:{
      form_No:'单号',
      startTime:'开始时间',
      endTime:'结束时间',
      businessTime:'出差时间',
      OTtime:'申请加班时间',
      trueCount:'实际加班',
      type:'类别',
      leave_No:'请假单据号',
      callback_reason:'销假原因',
      search_placeholder:'单据号筛选',
      ask_for_overTime:'申请加班',
      business:'公出',
      day:'天'
    }
  };
  static formListComponent = {
    traditional_Chinese:{
      exit:'退出',
      new: '新建'
    },
    simple_Chinese:{
      exit:'退出',
      new: '新建'
    }
  };
  static leaveSubComponent = {
    traditional_Chinese:{
      title:'假單管理',
      for_leave:'請假',
      for_callback:'銷假',
      for_business:'公出',
      for_callback_tip:'無可銷假的假單'
    },
    simple_Chinese:{
      title:'假單管理',
      for_leave:'请假',
      for_callback:'销假',
      for_business:'公出',
      for_callback_tip:'无可销假的假单'
    }
  };
  static callbackLeaveFormComponent = {
    traditional_Chinese:{
      unSave_title:'新建銷假單',
      saved_title:'銷假單詳情',
      form_status:'單據狀態',
      form_No:'單據編號',
      sign:'送簽',
      save:'保存',
      confirm:'確認',
      cancle:'取消',
      sign_list:'簽核名單',
      leave_No:'取消假單 ',
      reason:'取消原因',
      sign_success:'送簽成功',
      save_success:'表單保存成功',
      leave_No_required_err:'請假單號不能為空',
      reason_required_err:'原因不能為空',
      reason_minlength_err:'原因長度不能少於2位',
    },
    simple_Chinese:{
      unSave_title:'新建销假单',
      saved_title:'销假单详情',
      form_status:'单据状态',
      form_No:'单据编号',
      sign:'送签',
      save:'保存',
      confirm:'确认',
      cancle:'取消',
      sign_list:'签核名单',
      leave_No:'取消假单 ',
      reason:'取消原因',
      sign_success:'送签成功',
      save_success:'表单保存成功',
      leave_No_required_err:'请假单号不能为空',
      reason_required_err:'原因不能為空',
      reason_minlength_err:'原因長度不能少於2位',
    }
  };
  static businessFormComponent = {
    traditional_Chinese:{
      unSave_title:'新建公出單',
      saved_title:'公出單詳情',
      form_status:'單據狀態',
      form_No:'單據編號',
      sign:'送簽',
      save:'保存',
      confirm:'確認',
      cancle:'取消',
      sign_list:'簽核名單',
      colleague:'代理人',
      autoSet:'啟用代理',
      businessTime:'公出日期',
      startTime:'開始時間',
      endTime:'結束時間',
      hourCount:'時數',
      dayCount:'公出天數',
      reasonType:'公出類型',
      reason:'公出原因',
      sign_success:'送簽成功',
      save_success:'表單保存成功',
      colleague_placeholder:'請輸入關鍵字查詢',
      reasonType_required_err:'請選擇公出類型',
      businessTime_required_err:'公出日期不能為空',
      reason_required_err:'原因不能為空',
      reason_minlength_err:'原因長度不能少於2位',
      startTime_required_err:'開始時間不能為空',
      startTime_timeSmaller_err:'結束時間必須遲於開始時間',
      endTime_required_err:'結束時間不能為空',
      endTime_timeBigger_err:'結束時間必須遲於開始時間',
      colleague_required_err:'請選擇代理人'
    },
    simple_Chinese:{
      unSave_title:'新建公出单',
      saved_title:'公出单详情',
      form_status:'单据状态',
      form_No:'单据编号',
      sign:'送签',
      save:'保存',
      confirm:'确认',
      cancle:'取消',
      sign_list:'签核名单',
      colleague:'代理人',
      autoSet:'启用代理',
      businessTime:'公出日期',
      startTime:'开始时间',
      endTime:'结束时间',
      hourCount:'时数',
      dayCount:'公出天数',
      reasonType:'公出类型',
      reason:'公出原因',
      sign_success:'送签成功',
      save_success:'表单保存成功',
      colleague_placeholder:'请输入关键字查询',
      reasonType_required_err:'请选择公出类型',
      businessTime_required_err:'公出日期不能为空',
      reason_required_err:'原因不能为空',
      reason_minlength_err:'原因长度不能少于2位',
      startTime_required_err:'开始时间不能为空',
      startTime_timeSmaller_err:'结束时间必须迟于开始时间',
      endTime_required_err:'结束时间不能为空',
      endTime_timeBigger_err:'结束时间必须迟于开始时间',
      colleague_required_err:'请选择代理人',
    }
  };
  static overTimeFormComponent = {
    traditional_Chinese:{
      unSave_title:'新建加班單',
      saved_title:'加班單詳情',
      form_status:'單據狀態',
      form_No:'單據編號',
      sign:'送簽',
      save:'保存',
      confirm:'確認',
      cancle:'取消',
      sign_list:'簽核名單',
      duty_type: '班別',
      OTtime:'加班日期',
      startTime:'起始時間',
      endTime:'結束時間',
      OTCount:'加班時數',
      reasonType:'工作紀要',
      reason:'加班原因',
      sign_success:'送簽成功',
      save_success:'表單保存成功',
      reasonType_required_err:'請選擇加班類型',
      OTtime_required_err:'加班日期不能為空',
      reason_required_err:'原因不能為空',
      reason_minlength_err:'原因長度不能少於2位',
      startTime_required_err:'開始時間不能為空',
      startTime_timeSmaller_err:'結束時間必須遲於開始時間',
      endTime_required_err:'結束時間不能為空',
      endTime_timeBigger_err:'結束時間必須遲於開始時間',
      reset:'重置'
    },
    simple_Chinese:{
      unSave_title:'新建加班单',
      saved_title:'加班单详情',
      form_status:'单据状态',
      form_No:'单据编号',
      sign:'送签',
      save:'保存',
      confirm:'确认',
      cancle:'取消',
      sign_list:'签核名单',
      duty_type: '班别',
      OTtime:'加班日期',
      startTime:'起始时间',
      endTime:'结束时间',
      OTCount:'加班时数',
      reasonType:'工作纪要',
      reason:'加班原因',
      sign_success:'送签成功',
      save_success:'表单保存成功',
      reasonType_required_err:'请选择加班类型',
      OTtime_required_err:'加班日期不能为空',
      reason_required_err:'原因不能为空',
      reason_minlength_err:'原因长度不能少于2位',
      startTime_required_err:'开始时间不能为空',
      startTime_timeSmaller_err:'结束时间必须迟于开始时间',
      endTime_required_err:'结束时间不能为空',
      endTime_timeBigger_err:'结束时间必须迟于开始时间',
      reset:'重置'
    }
  };

  static LeaveFormComponent = {
    traditional_Chinese:{
      unSave_title:'新建請假單',
      saved_title:'請假單詳情',
      form_status:'單據狀態',
      form_No:'單據編號',
      reasonType:'假別',
      autoSet:'啟用代理',
      startDate:'開始日期',
      endDate:'結束日期',
      startTime:'開始時間',
      endTime:'結束時間',
      colleague:'代理人',
      leave_hour:'時數',
      leave_day:'請假天數',
      reason:'請假原因',
      sign:'送簽',
      save:'保存',
      sign_list:'簽核名單',
      reasonType_required_err:'請選擇請假類型',
      colleague_required_err:'請選擇代理人',
      reason_required_err: '原因不能為空',
      reason_minlength_err: '原因長度不能少於2位',
      sign_success:'送簽成功',
      save_success:'表單保存成功',
      time_err:'開始時間必須早於結束時間',
      colleague_placeholder:'請輸入關鍵字查詢',
      confirm:'確認',
      cancle:'取消'
    },
    simple_Chinese:{
      unSave_title:'新建请假单',
      saved_title:'请假单详情',
      form_status:'单据状态',
      form_No:'单据编号',
      reasonType:'假别',
      autoSet:'启用代理',
      startDate:'开始日期',
      endDate:'结束日期',
      startTime:'开始时间',
      endTime:'结束时间',
      colleague:'代理人',
      leave_hour:'时数',
      leave_day:'请假天数',
      reason:'请假原因',
      sign:'送签',
      save:'保存',
      sign_list:'签核名单',
      reasonType_required_err:'请选择请假类型',
      colleague_required_err:'请选择代理人',
      reason_required_err: '原因不能为空',
      reason_minlength_err: '原因长度不能少于2位',
      sign_success:'送签成功',
      save_success:'表单保存成功',
      time_err:'开始时间必须早于结束时间',
      colleague_placeholder:'请输入关键字查询',
      confirm:'确认',
      cancle:'取消'
    }
  };

}
