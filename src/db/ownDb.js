/**
 * 已点歌曲
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

export const initOwnTable = () => {
    return new Promise(() => {
        let db = conn()
        db.serialize(() => {
            db.run('CREATE TABLE IF NOT EXISTS ownSongs (' +
                ' id INTEGER PRIMARY KEY AUTOINCREMENT, ' +
                ' picUrl TEXT,' +
                ' title TEXT,' +
                ' filePath TEXT,' +
                ' fileSize TEXT,' +
                ' author TEXT,' +
                ' english TEXT,' +
                ' width TEXT,' +
                ' height TEXT,' +
                ' createDate DATE,' +
                ' isTop TEXT)')
        })
    })
}

/**
 * 插入数据
 * @param picUrl 封面图
 * @param title 标题
 * @param filePath 路径
 * @param fileSize 大小
 * @param author 作者
 * @param english 英文
 * @param width 宽度
 * @param height 长度
 * @param createDate 创建事件
 * @param isTop 是否正在播放 1: 最置顶的一条数据，0: 普通的数据
 * @param callback 回调
 */
export const insertOwnSongs = function (picUrl, title, filePath, fileSize, author, english, width, height, createDate, isTop) {
    return new Promise(() => {
        let db = conn()
        const query = "INSERT INTO ownSongs (picUrl, title, filePath, fileSize, author, english, width, height, createDate, isTop) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)"
        const values = [picUrl, title, filePath, fileSize, author, english, width, height, createDate, isTop]
        db.run(query, values, function (error) {
            console.log(error)
            // callback(error, this.lastID)
        })
    })
}

/**
 * 获取所有数据
 * 按照倒序
 * @returns {Promise<unknown>}
 */
export function getAllOwnSongs(params) {
    return new Promise((resolve, reject) => {
        let db1 = conn()
        db1.all("SELECT * FROM ownSongs order by id desc", params, (err, data) => {
            if (err) {
                reject(err)
            } else {
                resolve(data)
            }
        })
    })
}

/**
 * 获取正要播放的歌曲
 * isTop = 1 表示正在播放的一条
 * @returns {Promise<unknown>}
 */
export function getOneSong() {
    return new Promise((resolve, reject) => {
        let db1 = conn()
        db1.all("SELECT * FROM ownSongs where isTop=?", [1], (err, data) => {
            if (err) {
                reject(err)
            } else {
                resolve(data)
            }
        })
    })
}

/**
 * 获取最顶部一条
 */
export function queryTop() {
    return new Promise((resolve, reject) => {
        let db1 = conn()
        const query = "SELECT * FROM ownSongs ORDER BY ID DESC LIMIT ?"
        db1.run(query, [1], (err, data) => {
            if (err) {
                reject(err)
            } else {
                console.log("获取最顶部一条")
                console.log(data)
                resolve(data)
            }
        })
    })
}

/**
 * 删除某一条
 * @param isTop 置顶的一条
 */
export function deleteById(id) {
    return new Promise((resolve, reject) => {
        let db1 = conn()
        const query = "DELETE FROM ownSongs WHERE id = ?"
        const values = [id]
        db1.run(query, values, (err, data) => {
            if (err) {
                reject(err)
            } else {
                resolve(data)
            }
        })
    })
}

/**
 * 删除置顶的一条
 * @param isTop 置顶的一条
 */
export function deleteByTop(isTop) {
    return new Promise((resolve, reject) => {
        let db1 = conn()
        const query = "DELETE FROM ownSongs WHERE isTop = ?"
        const values = [isTop]
        db1.run(query, values, (err, data) => {
            if (err) {
                reject(err)
            } else {
                resolve(data)
            }
        })
    })
}

/**
 * 更新已点歌曲中正在播放的一条
 * @param id: 置顶id的这一条
 */
export function updateOwnSong(id) {
    return new Promise((resolve, reject) => {
        let db1 = conn()
        const query = `UPDATE ownSongs SET isTop = ? WHERE id = ?`
        const values = [1, id]
        db1.run(query, values, (err, data) => {
            if (err) {
                reject(err)
            } else {
                resolve(data)
            }
        })
    })
}


/**
 * 置顶某一条
 */
export function topOwnSong(song) {
    deleteById(song.id)
    insertOwnSongs(song.picUrl, song.title, song.filePath, song.fileSize, song.author, song.english, song.width, song.height, song.createDate)
}
