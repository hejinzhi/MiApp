import { Injectable } from '@angular/core';

@Injectable()
export class ValidateService {
   __RULES__ = {
    Required : function(){
      return this.value!='';
    },//必须填
    Regex : function(){
      if(!this.value) return true;
      return new RegExp(this.dataset['vRegex']).test(this.value);
    },//正则表达式
    Length : function(){
      if(!this.value) return true;
      return this.value.length === Number(this.dataset['vLength']);
    },//长度要求
    Maxlength : function(){
      if(!this.value) return true;
      return this.value.length <= Number(this.dataset['vMaxlength']);
    },//最大长度
    Minlength : function(){
      if(!this.value) return true;
      return this.value.length >= Number(this.dataset['vMinlength']);
    },//最小长度
    Betweenl : function(){
      if(!this.value) return true;
      var valueL = this.value.length;
      var betArray= this.dataset['vBetweenl'].split('-');
      return valueL>=Number(betArray[0])&&valueL<=Number(betArray[1]);
    },//两者长度之间  8-16
    Greaterthan : function(){
      if(!this.value) return true;
      return Number(this.value) > Number(this.dataset['vGreaterthan']);
    },//大于
    Lessthan : function(){
      if(!this.value) return true;
      return Number(this.value) < Number(this.data['vLessthan']);
    },//大于
    Between : function(){
      if(!this.value) return true;
      var value = this.value;
      var betArray= this.dataset['vBetween'].split('-');
      return Number(value)>=Number(betArray[0])&&Number(value)<=Number(betArray[1]);
    },//两个数值之间  18-30
    Integer : function(){
      if(!this.value) return true;
      return /^\-?\d+$/.test(this.value);
    },//必须是数字
    Number : function(){
      if(!this.value) return true;
      return !isNaN(Number(this.value));
    },//必须是数字
    Email : function(){
      if(!this.value) return true;
      return /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/.test(this.value);
    },//必须是邮箱地址
    Mobile : function(){
      if(!this.value) return true;
      return /^1\d{10}$/.test(this.value);
    },//必须是手机号码
    Phone : function(){
      if(!this.value) return true;
      return /^\d{4}\-\d{8}$/.test(this.value);
    },//必须是座机号码
    Url : function(){
      if(!this.value) return true;
      return /(((^https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)$/g.test(this.value);
    },//必须是有效的url
    Equalto : function(another:any){
      if(another.value == this.value){
        //添加样式表明验证结果
        another.Error="";
        another.pass = true;
        return true;
      }else{
        return false;
      }
    },//和XX相等
    Money : function(){
      if(!this.value)return true;
      return /^([\d]+)(\.[\d]{1,2})?$/.test(this.value);
    },//保留兩位數的金額
    TimeBigger : function(another:any){
      console.log(Date.parse('2017/01/01 ' +this.value))
      let pre1 = /\d{1,2}\:\d{2}/g.test(this.value) && this.value.length <6?'2017/01/01 ':'';
      let pre2 = /\d{1,2}\:\d{2}/g.test(another.value) && this.value.length <6?'2017/01/01 ':'';
      if(this.value && another.value){
        let interval = Date.parse(pre1+this.value) - Date.parse(pre2+another.value)
        if(interval>0) {
          another.error = '';
          another.pass = true;
        }
        return interval>0;
      }else {
        return true;
      }
    },
    TimeSmaller : function(another:any){
      if(this.value && another.value){
        let interval = Date.parse(this.value) - Date.parse(another.value)
        if(interval<0) {
          another.error = '';
          another.pass = true;
        }
        return interval<0;
      }else {
        return true;
      }
    }
  };
  resultMes:string;
  result:boolean;
  check(item:any,whole:any):Promise<any>{
    this.result = true;
    this.resultMes = "";
    for(let prop in this.__RULES__){
      if(this.result && item.dataset["v"+prop]){
        let other = whole[item.dataset["v"+prop]]?whole[item.dataset["v"+prop]]:{};
        this.result = this.__RULES__[prop].call(item,other);
        this.resultMes =this.result?"": item.dataset["v"+prop+"Message"]?item.dataset["v"+prop+"Message"]:"出現未定義的錯誤";
      }
    }
    return Promise.resolve({
      mes:this.resultMes,
      item:item,
    });
  }
}
