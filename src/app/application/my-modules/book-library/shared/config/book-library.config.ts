import { EnvConfig } from '../../../../../shared/config/env.config';

export class BookLibraryConfig {
    // 设置每页显示多少笔数据
    static pageCount = 5;

    // 根据模块获取function清单
    static getFunctionListUrl = EnvConfig.baseUrl + 'Function/GetByModule';

    // 更新模块的display栏位
    static updateModuleDisplayUrl = EnvConfig.baseUrl + 'Module/UpdateDisplay';

    // 通过公司别获取图书信息
    static getBooksUrl = EnvConfig.baseUrl + 'Lib/GetBookByCompany';

    // 保存图书信息，系统后台判断图书信息不存在会自动新增，存在会自动修改
    static addBookUrl = EnvConfig.baseUrl + 'Lib/AddBooks';

    // 豆瓣URL
    static doubanUrl = 'https://api.douban.com/v2/book/isbn/';

    // 借书
    static borrowBookUrl = EnvConfig.baseUrl + 'Lib/OrderBook';

    // 根据图书信息模糊查询
    static getBooksByTitleUrl = EnvConfig.baseUrl + 'Lib/GetBookByTitle'

    // 分页查询图书信息
    static getBooksByPage = EnvConfig.baseUrl + 'Lib/GetBookByPage';

    // 获取已预订图书信息
    static getOrderBooksByUser = EnvConfig.baseUrl + 'Lib/GetOrderBookList';

    // 获取指定图书的详细信息
    static getBookDetailInfo = EnvConfig.baseUrl + 'Lib/GetBookDetailInfo';

    // 获取已借阅的图书
    static getBorrowedBooks = EnvConfig.baseUrl + 'Lib/GetBorrowBookList';

    // 获取已归还图书信息
    static getPaybackBooks = EnvConfig.baseUrl + 'Lib/GetReturnBookList';

    // 管理员同意借书
    static approveBorrowBooks = EnvConfig.baseUrl + 'Lib/ApproveBorrow';

    // 管理员还书
    static paybackUrl = EnvConfig.baseUrl + 'Lib/ReturnBook';
}