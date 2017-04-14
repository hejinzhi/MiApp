export class EnvConfig {
    // static baseUrl: string = 'http://10.86.118.81/webapi/';
    static baseUrl: string = 'http://10.86.16.166/webapi/';

    static companyID: string = 'MSL';





    // 通过公司别获取图书信息
    static getBooksUrl = EnvConfig.baseUrl + 'Lib/GetByCompany';

    // 保存图书信息，系统后台判断图书信息不存在会自动新增，存在会自动修改
    static addBookUrl = EnvConfig.baseUrl + 'api/LibBook';

    // 豆瓣URL
    static doubanUrl = 'https://api.douban.com/v2/book/isbn/';
}
