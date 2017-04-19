class ValiItem {valiName:string;errMessage:string;valiValue:any}

export class MyValidatorModel{
  validators:any ={};
  constructor(target:{name:string,valiItems:ValiItem[]}[]) {
    for(let i =0;i<target.length;i++){
      this.validators[target[i].name] = {
        error: '',
        pass: false,
        dataset: {},
        value:''};
      this.addValidators(target[i].name,target[i].valiItems);
    }
  }
  addValidator(name:string,valiItem:ValiItem):void{
    this.validators[name].dataset['v'+valiItem.valiName] = valiItem.valiValue;
    this.validators[name].dataset['v'+valiItem.valiName+'Message'] = valiItem.errMessage?valiItem.errMessage:'';
  }
  addValidators(name:string,valiItem:ValiItem[]):void{
    for(let i =0;i<valiItem.length;i++) {
      this.validators[name].dataset['v'+valiItem[i].valiName] = valiItem[i].valiValue;
      this.validators[name].dataset['v'+valiItem[i].valiName+'Message'] = valiItem[i].errMessage?valiItem[i].errMessage:'';
    }
  }
  disableValidator(name:string,valiName:string) {
    this.validators[name].dataset['v'+valiName] = false;
  }
  enableValidator(name:string,valiName:string,valiValue:any = true) {
    this.validators[name].dataset['v'+valiName] = valiValue;
  }
}
