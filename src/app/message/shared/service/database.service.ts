import { Injectable } from '@angular/core';
import { Platform } from 'ionic-angular';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { BehaviorSubject } from 'rxjs/Rx';

@Injectable()
export class DatabaseService {
    database: SQLiteObject;
    private databaseReady: BehaviorSubject<boolean>;

    constructor(private sqlite: SQLite, private platform: Platform) {
        this.databaseReady = new BehaviorSubject(false);
        this.platform.ready().then(() => {
            this.sqlite.create({
                name: 'message.db',
                location: 'default'
            }).then((db: SQLiteObject) => {
                this.database = db;
                if (localStorage.getItem('messageTableAlreadyCreated') === 'true') { }
                else {
                    this.createMessageTable().then((res) => {
                        console.log(res, 'create table success');
                        localStorage.setItem('messageTableAlreadyCreated', 'true');
                    });
                }
                this.databaseReady.next(true);
            });
        });
    }

    setUnreadToZeroByUserName(username: string) {
        let sql = `UPDATE MOA_LOCAL_MESSAGE SET UNREAD='N' WHERE FROM_USER_NAME='${username}';`;
        return this.database.executeSql(sql, {});
    }

    createMessageTable() {
        return this.database.executeSql(`CREATE TABLE IF NOT EXISTS MOA_LOCAL_MESSAGE
        (ID INTEGER PRIMARY KEY AUTOINCREMENT,TO_USER_NAME VARCHAR2(100),FROM_USER_NAME VARCHAR2(100),CONTENT VARCHAR2(100),CONTENT_TYPE VARCHAR2(100),
        TIME INTEGER, TYPE VARCHAR2(100),UNREAD VARCHAR2(100),EXTRA VARCHAR2(1000));`, {});
    }

    getMessagesByUsername(fromUsername: string, toUsername: string) {
        let sql = `SELECT * FROM MOA_LOCAL_MESSAGE WHERE 
        (FROM_USER_NAME ='${fromUsername}' AND TO_USER_NAME ='${toUsername}' ) OR (TO_USER_NAME='${fromUsername}' AND FROM_USER_NAME='${toUsername}' ) AND TYPE='dialogue' ORDER BY TIME;`;

        return this.database.executeSql(sql, {})
            .then((data) => {
                let msgs = [];
                if (data.rows.length > 0) {
                    for (var i = 0; i < data.rows.length; i++) {
                        msgs.push({
                            id: data.rows.item(i).ID,
                            toUserName: data.rows.item(i).TO_USER_NAME,
                            fromUserName: data.rows.item(i).FROM_USER_NAME,
                            content: data.rows.item(i).CONTENT,
                            contentType: data.rows.item(i).CONTENT_TYPE,
                            time: data.rows.item(i).TIME,
                            type: data.rows.item(i).TYPE,
                            unread: data.rows.item(i).UNREAD,
                            extra: data.rows.item(i).EXTRA
                        });
                    }
                }
                return msgs;
            }, err => {
                console.log('Error: ', err);
                return [];
            });

    }

    // 获取消息页面数据
    getMessageList(loginUsername: string, type?: string) {
        let sql: string;
        if (type) {
            sql = `SELECT   A.*,
         (SELECT   COUNT ( * ) FROM   MOA_LOCAL_MESSAGE WHERE   FROM_USER_NAME = A.FROM_USER_NAME AND UNREAD = 'Y') AS UNREAD_COUNT
         FROM   MOA_LOCAL_MESSAGE A, 
         (  SELECT   FROM_USER_NAME, MAX (ID) ID
                FROM   MOA_LOCAL_MESSAGE
                GROUP BY   FROM_USER_NAME,TO_USER_NAME) B
        WHERE   A.ID = B.ID AND A.TYPE='${type}' ORDER BY A.TIME DESC;`;
        } else {
            sql = `SELECT   A.*,
         (SELECT   COUNT ( * ) FROM   MOA_LOCAL_MESSAGE WHERE   FROM_USER_NAME = A.FROM_USER_NAME AND UNREAD = 'Y') AS UNREAD_COUNT
         FROM   MOA_LOCAL_MESSAGE A, 
         (  SELECT   FROM_USER_NAME, MAX (ID) ID
                FROM   MOA_LOCAL_MESSAGE
                GROUP BY   FROM_USER_NAME,TO_USER_NAME) B
        WHERE   A.ID = B.ID  ORDER BY A.TIME DESC;`
        }
        return this.database.executeSql(sql, {})
            .then((data) => {
                let msgs = [];
                if (data.rows.length > 0) {
                    for (var i = 0; i < data.rows.length; i++) {
                        msgs.push({
                            id: data.rows.item(i).ID,
                            toUserName: data.rows.item(i).TO_USER_NAME,
                            fromUserName: data.rows.item(i).FROM_USER_NAME,
                            content: data.rows.item(i).CONTENT,
                            contentType: data.rows.item(i).CONTENT_TYPE,
                            time: data.rows.item(i).TIME,
                            type: data.rows.item(i).TYPE,
                            unread: data.rows.item(i).UNREAD,
                            extra: data.rows.item(i).EXTRA,
                            unreadCount: data.rows.item(i).UNREAD_COUNT
                        });
                    }
                }
                return this.findLastContent(msgs, loginUsername);
            }, err => {
                console.log('Error: ', err);
                return [];
            });
    }

    findLastContent(msg: any[], loginUsername: string) {
        let otherPeopleSendToMe: any[] = [];
        let iSendToOtherPeople: any[] = [];

        msg.forEach((value, index) => {
            if (value.fromUserName == loginUsername) {
                iSendToOtherPeople.push(value);
            } else {
                otherPeopleSendToMe.push(value);
            }
        });
        for (let i = 0; i < otherPeopleSendToMe.length; i++) {
            for (let j = 0; j < iSendToOtherPeople.length; j++) {

                if (otherPeopleSendToMe[i].fromUserName === iSendToOtherPeople[j].toUserName) {
                    // 如果别人发给我的是最后一条信息
                    if (otherPeopleSendToMe[i].time > iSendToOtherPeople[j].time) {
                    } else {
                        otherPeopleSendToMe[i].content = iSendToOtherPeople[j].content;
                        otherPeopleSendToMe[i].contentType = iSendToOtherPeople[j].contentType;
                        otherPeopleSendToMe[i].time = iSendToOtherPeople[j].time;
                        break;
                    }
                }
            }
        }
        return otherPeopleSendToMe;
    }


    addMessage(toUsername: string, fromUserName: string, content: string, contentType: string, time: number, type: string, unread: string, extra: string) {
        let data = [toUsername, fromUserName, content, contentType, time, type, unread, extra];
        return this.database.executeSql(`INSERT INTO MOA_LOCAL_MESSAGE (TO_USER_NAME, FROM_USER_NAME, CONTENT,CONTENT_TYPE,TIME,TYPE,UNREAD,EXTRA) 
        VALUES (?,?,?,?,?,?,?,?)`, data).then(data => {
                return data;
            }, err => {
                console.log('Error: ', err);
                return err;
            });
    }

    getAllMessages() {
        return this.database.executeSql("SELECT * FROM MOA_LOCAL_MESSAGE", []).then((data) => {
            let msgs = [];
            if (data.rows.length > 0) {
                for (var i = 0; i < data.rows.length; i++) {
                    msgs.push({
                        id: data.rows.item(i).ID,
                        toUserName: data.rows.item(i).TO_USER_NAME,
                        fromUserName: data.rows.item(i).FROM_USER_NAME,
                        content: data.rows.item(i).CONTENT,
                        contentType: data.rows.item(i).CONTENT_TYPE,
                        time: data.rows.item(i).TIME,
                        type: data.rows.item(i).TYPE,
                        unread: data.rows.item(i).UNREAD,
                        extra: data.rows.item(i).EXTRA
                    });
                }
            }
            return msgs;
        }, err => {
            console.log('Error: ', err);
            return [];
        });
    }

    getDatabaseState() {
        return this.databaseReady.asObservable();
    }

    dropTable() {
        return this.database.executeSql('DROP TABLE MOA_LOCAL_MESSAGE', {}).then((res) => {
            return res;
        })
    }

    deleteAllMessages() {
        return this.database.executeSql('DELETE FROM MOA_LOCAL_MESSAGE', {});
    }

}