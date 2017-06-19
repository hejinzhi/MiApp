export class LanguageConfig {
    static bookLibraryComponent = {
        traditional_Chinese: {
            booked_books: '已預約圖書',
            borrowed_books: '已借圖書',
            paybacked_books: '已还圖書',
            add_books: '新增圖書(管理員)',
            borrow_book_requests: '借書申請(管理員)',
            payback_requested: '還書(管理員)',
            setting: '設置(管理員)',
            exit: '退出',
            title: '圖書館',
            menu: '菜單',
            errorMsg1: '豆瓣上找不到該書籍的信息，請人工輸入',
            errorMsg2: '你所掃描的并不是有效的ISBN碼',
            error: '錯誤',
            borrowPromptTitle: '借書申請',
            borrowPromptContent: '請輸入要借書人的AD',
            paybackPromptTitle: '還書申請',
            paybackPromptContent: '請輸入要還書人的AD',
            cancel: '取消',
            confirm: '確定'
        },

        simple_Chinese: {
            booked_books: '已预约图书',
            borrowed_books: '已借图书',
            paybacked_books: '已还图书',
            add_books: '新增图书(管理员)',
            borrow_book_requests: '借书申请(管理员)',
            payback_requested: '还书(管理员)',
            setting: '设置(管理员)',
            exit: '退出',
            title: '图书馆',
            menu: '菜单',
            errorMsg1: '豆瓣上找不到该书籍的信息，请人工输入.',
            errorMsg2: '你所扫描的并不是有效的ISBN码',
            error: '错误',
            borrowPromptTitle: '借书申请',
            borrowPromptContent: '请输入要借书人的AD',
            paybackPromptTitle: '还书申请',
            paybackPromptContent: '请输入要还书人的AD',
            cancel: '取消',
            confirm: '确定'
        }
    };

    static bookDetailComponent = {
        traditional_Chinese: {
            content: '內容推薦',
            author: '作者簡介',
            catalog: '目錄',
            title: '圖書詳情',
            book: '預約',
            addBooks: '錄入'
        },
        simple_Chinese: {
            content: '内容推荐',
            author: '作者简介',
            catalog: '目录',
            title: '图书详情',
            book: '预约',
            addBooks: '录入'
        }
    };

    static bookListComponent = {
        traditional_Chinese: {
            title: '書名',
            author: '作者',
            price: '價格',
            publisher: '出版信息',
            qty: '可借數量',
            addQty: '錄入數量',
            shouldPayBackDate: '借書期限至',
            actualPaybackDate: '歸還時間'

        },
        simple_Chinese: {
            title: '书名',
            author: '作者',
            price: '价格',
            publisher: '出版信息',
            qty: '可借数量',
            addQty: '录入数量',
            shouldPayBackDate: '借书期限至',
            actualPaybackDate: '归还时间'
        }
    };

    static borrowRequestComponent = {
        traditional_Chinese: {
            borrow: '確認借閱',
            cancelBook: '取消預約',
            payback: '確認還書',
            borrowRequest: '借書申請',
            paybackRequest: '還書'
        },
        simple_Chinese: {
            borrow: '确认借阅',
            cancelBook: '取消预约',
            payback: '确认还书',
            borrowRequest: '借书申请',
            paybackRequest: '还书'
        }
    };

    static borrowListComponent = {
        traditional_Chinese: {
            booked: '已預約圖書',
            borrowed: '已借圖書',
            payback: '已歸還圖書'
        },
        simple_Chinese: {
            booked: '已预约图书',
            borrowed: '已借图书',
            payback: '已归还图书'
        }
    }

    static settingComponent = {
        traditional_Chinese: {
            title: '設置',
            scan: '掃描錄入',
            batchAddBooks: '連續錄入',
            goBack: '返回'
        },
        simple_Chinese: {
            title: '设置',
            scan: '扫码录入',
            batchAddBooks: '连续录入',
            goBack: '返回'
        }
    }

    static bookLibraryService = {
        traditional_Chinese: {
            error: '錯誤'
        },
        simple_Chinese: {
            error: '错误'
        }
    }
}