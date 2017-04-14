import { EnvConfig } from '../../../shared/config/env.config';

export class ApplicationConfig {

    // 根据模块获取function清单
    static getFunctionListUrl = EnvConfig.baseUrl + 'Function/GetByModule';

    // 更新模块的display栏位
    static updateModuleDisplayUrl = EnvConfig.baseUrl + 'Module/UpdateDisplay';
}
