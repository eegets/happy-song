/**
 * 所有歌曲
 * @type {sqlite3}
 */
const sqlite3 = require('sqlite3').verbose()

let db

//连接数据库
function conn() {
    if (!db || !db.open) {
        db = new sqlite3.Database('songs.db')
    }
    return db
}

export const initTable = () => {
    return new Promise(() => {
        let db = conn()
        db.serialize(() => {
            db.run('CREATE TABLE IF NOT EXISTS songs (' +
                ' id INTEGER PRIMARY KEY AUTOINCREMENT, ' +
                ' picUrl TEXT,' +
                ' title TEXT,' +
                ' filePath TEXT,' +
                ' fileSize TEXT,' +
                ' author TEXT,' +
                ' english TEXT,' +
                ' width TEXT,' +
                ' height TEXT,' +
                ' createDate DATE)')
        })
    })
}

/**
 * 插入数据
 * @param title 标题
 * @param filePath 路径
 * @param fileSize 大小
 * @param thumbNail 封面图
 * @param author 作者
 * @param english 英文
 * @param width 宽度
 * @param height 长度
 * @param createDate 创建事件
 * @param callback 回调
 */
export const insertSongs = function (picUrl, title, filePath, fileSize, author, english, width, height, createDate) {
    return new Promise(() => {
        let db = conn()
        const query = "INSERT INTO songs (picUrl, title, filePath, fileSize, author, english, width, height, createDate) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)"
        const values = [picUrl, title, filePath, fileSize, author, english, width, height, createDate]
        db.run(query, values, function (error) {
            console.log(error)
            // callback(error, this.lastID)
        })
    })
}

//获取所有数据
export function getAllSongs(params) {

    return new Promise((resolve, reject) => {
        let db1 = conn()
        db1.all("SELECT * FROM songs", params, (err, data) => {
            if (err) {
                reject(err)
            } else {
                resolve(data)
            }
        })
    })
}


/**
 * 获取数据，按每页查询
 * 每页查询出来8条数据
 * @param page 当前是第几页
 * @param limit 每页页数
 * @param keys 搜索关键字
 * @returns {Promise<unknown>}
 */
export function getSongs(page, limit, keys) {

    return new Promise((resolve, reject) => {
        let db1 = conn()
        let sql = "";
        let params = "";
        if (keys === null || keys === undefined || keys === '') {
            sql = "SELECT * FROM songs order by id desc Limit ? Offset ?"
            params = [limit, limit * (page - 1)]
        } else {
            sql = "SELECT * FROM songs where english like ? Limit ? Offset ?"
            params = ['%'+keys+'%', limit, limit * (page - 1)]
        }
        db1.all(sql, params, (err, data) => {
            if (err) {
                reject(err)
            } else {
                resolve(data)
            }
        })
    })
}

