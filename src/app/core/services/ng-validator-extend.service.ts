/**
 * [Injectable 验证服务]
 * version: '0.01'
 * name: 'ngValidatorExtend.js'
 * author: 'gary.h'
 */
import { Injectable } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Injectable()
export class NgValidatorExtendService {

  constructor() { }

  /**
   * [required 必须填]
   * @return {Function} [验证器]
   */
  required(): Function {
    return (ctrl: AbstractControl) => {
      let value = ctrl.value;
      return value ? null : {
        'required': true
      }
    }
  }

  /**
   * [minLength 字符串最小长度]
   * @param  {number}   num [description]
   * @return {Function}     [验证器]
   */
  minLength(num: number): Function {
    return (ctrl: AbstractControl) => {
      let value = ctrl.value;
      let valueL = value.length;
      return (valueL >= num) ? null : {
        'minlength': {
          'requiredLength': num,
          'actualLength': valueL
        }
      }
    }
  }

  /**
   * [maxLength 字符串最大长度]
   * @param  {number}   num [description]
   * @return {Function}     [验证器]
   */
  maxLength(num: number): Function {
    return (ctrl: AbstractControl) => {
      let value = ctrl.value;
      let valueL = value.length;
      return (valueL <= num) ? null : {
        'maxlength': {
          'requiredLength': num,
          'actualLength': valueL
        }
      }
    }
  }

  /**
   * [max 限制最大数值]
   * @param  {number}   num [description]
   * @return {Function}     [验证器]
   */
  max(num: number): Function {
    return (ctrl: AbstractControl) => {
      let value = Number(ctrl.value);
      return (value <= num) ? null : {
        'max': {
          'requiredValue': num,
          'actualValue': value
        }
      }
    }
  }

  /**
   * [min 限制最小数值]
   * @param  {number}   num [description]
   * @return {Function}     [验证器]
   */
  min(num: number): Function {
    return (ctrl: AbstractControl) => {
      let value = Number(ctrl.value);
      return (value >= num) ? null : {
        'min': {
          'requiredValue': num,
          'actualValue': value
        }
      }
    }
  }

  /**
   * [betweenLength 限制字符串长度的范围]
   * @param  {number[]} bet [长度为2]
   * @return {Function}     [验证器]
   */
  betweenLength(bet: number[]): Function {
    if (bet instanceof Array && bet.length > 1) {
      return (ctrl: AbstractControl) => {
        let value = ctrl.value;
        let valueL = value.length;
        return (valueL >= bet[0] && valueL <= bet[1]) ? null : { 'betweenLength' :{
          'requiredLength': bet[0] + '-' + bet[1], 'actualLength': valueL
        }}
      }
    } else {
      throw new Error('参数必须是数组类型,并且长度不能小于1');
    }
  }

  /**
   * [regex 根据输入的正则验证]
   * @param  {any}    reg [正则表达式]
   * @return {Function}     [验证器]
   */
  regex(reg: any): Function {
    return (ctrl: AbstractControl) => {
      let value = ctrl.value;
      let regx = new RegExp(reg);
      return regx.test(value) ? null : {
        'RegExp': regx.toString()
      }
    }
  }

  /**
   * [email 检测是否为邮箱]
   * @return {Function} [验证器]
   */
  email(): Function{
    return (ctrl: AbstractControl) => {
      let value = ctrl.value;
      return /^([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-]*)*\@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])*/.test(value) ? null : {
        'email': true
      }
    }
  }

  /**
   * [length 长度限制]
   * @param  {number}   length [description]
   * @return {Function}        [验证器]
   */
  length(length:number): Function {
    return (ctrl: AbstractControl) => {
      let value = ctrl.value;
      let valueL = value.length;
      return valueL === Number(length) ? null : {
        'length': {
          'requiredLength': Number(length), 'actualLength': valueL
        }
      }
    }
  }

  /**
   * [between 限制数值最大最小值]
   * @param  {number[]} bet [description]
   * @return {Function}     [验证器]
   */
  between(bet:number[]): Function {
    if (bet instanceof Array && bet.length > 1) {
      return (ctrl: AbstractControl) => {
        let value = Number(ctrl.value);
        return (value >= bet[0] && value <= bet[1]) ? null : { 'between' :{
          'requiredValue': bet[0] + '-' + bet[1], 'actualValue': value
        }}
      }
    } else {
      throw new Error('参数必须是数组类型,并且长度不能小于1');
    }
  }

  /**
   * [integer 为整数]
   * @return {Function} [验证器]
   */
  integer(): Function {
    return (ctrl: AbstractControl) => {
      let value = ctrl.value;
      return /^\-?\d+$/.test(value) ? null : {
        'integer': true
      }
    }
  }

  /**
   * [number 为数字]
   * @return {Function} [验证器]
   */
  number(): Function {
    return (ctrl: AbstractControl) => {
      let value = ctrl.value;
      return !isNaN(Number(value)) ? null : {
        'number': true
      }
    }
  }

  /**
   * [mobile 为移动号码]
   * @return {Function} [验证器]
   */
  mobile(): Function {
    return (ctrl: AbstractControl) => {
      let value = ctrl.value;
      return /^1\d{10}$/.test(value) ? null : {
        'mobile': true
      }
    }
  }

  /**
   * [telephone 为固话号码]
   * @return {Function} [验证器]
   */
  telephone(): Function {
    return (ctrl: AbstractControl) => {
      let value = ctrl.value;
      return /^\d{4}\-\d{8}$/.test(value) ? null : {
        'telephone': true
      }
    }
  }

  /**
   * [url 为网址]
   * @return {Function} [验证器]
   */
  url(): Function {
    return (ctrl: AbstractControl) => {
      let value = ctrl.value;
      return /(((^https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)$/g.test(value) ? null : {
        'url': true
      }
    }
  }

  /**
   * [equalTo 与同级栏位进行内容对比，是否相等]
   * @param  {string}   name [同级栏位名称]
   * @return {Function}      [验证器]
   */
  equalTo(name:string): Function {
    return (ctrl: AbstractControl) => {
      let value = ctrl.value;
      if(!ctrl.parent) return null;
      if(!ctrl.parent.controls[name]) throw new Error('同级栏位中没有'+ name + '栏位')
      let anotherVal = ctrl.parent.controls[name].value || null
      return (anotherVal && value == anotherVal) ? null : {
        'equalTo': {
          'target': name
        }
      }
    }
  }

  /**
   * [toFix 检查小数位的个数]
   * @param  {number} num [小数位的个数]
   * @return {Function}     [description]
   */
  toFix(num:number): Function {
    return (ctrl: AbstractControl) => {
      let value = ctrl.value;
      let reg = '^([\\d]+)(\\.[\\d]{'+Number(num)+'})?$';
      return new RegExp(reg).test(value) ? null : {
        'toFix': true
      };
    }
  }

  /**
   * [selfDefine 自定位验证规则]
   * @param  {Function} fn  [自定义的规则函数，参数（ctrl,opt）]
   * @param  {any}      opt [自定义参数]
   * @return {Function}     [验证器]
   */
  selfDefine(fn:Function,opt:any): Function {
    return (ctrl: AbstractControl) => {
      fn.call(this,ctrl,opt);
    }
  }
}
