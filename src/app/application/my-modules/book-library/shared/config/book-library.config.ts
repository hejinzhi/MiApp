import { EnvConfig } from '../../../../../shared/config/env.config';

export class BookLibraryConfig {

    // 根据模块获取function清单
    static getFunctionListUrl = EnvConfig.baseUrl + 'Function/GetByModule';

    // 更新模块的display栏位
    static updateModuleDisplayUrl = EnvConfig.baseUrl + 'Module/UpdateDisplay';

    // 通过公司别获取图书信息
    static getBooksUrl = EnvConfig.baseUrl + 'Lib/GetByCompany';

    // 保存图书信息，系统后台判断图书信息不存在会自动新增，存在会自动修改
    static addBookUrl = EnvConfig.baseUrl + 'api/LibBook';

    // 豆瓣URL
    static doubanUrl = 'https://api.douban.com/v2/book/isbn/';
}