import _path from "path";
import fs from "fs";

export function fileDisplay(filePath) {
    return statsPromise(filePath).then(data => {
        if (data.isFile) {
            return [data]
        } else {
            return readdirPromise(filePath).then(paths => {
                return Promise.all(paths.map(mapPath => {
                    return fileDisplay(_path.resolve(filePath, mapPath))
                }))
            }).then((res) => {
                return [].concat(...res)
            })
        }
    })
}

/**
 * 获取文件属性
 * @param filePath
 * @returns {Promise<unknown>}
 * 字段信息如下链接：
 * https://juejin.cn/post/6955011872298893319
 */
function statsPromise(filePath) {
    return new Promise((resolve, reject) => {
        fs.stat(filePath, (error, stats) => {
            if (error) reject(error)
            const  data = {filePath: filePath, size: stats.size, isFile: stats.isFile()}
            console.log(JSON.stringify(data), "statsPromise")
            resolve(data)
        })
    })
}

function readdirPromise(filePath) {
    return new Promise((resolve, reject) => {
        fs.readdir(filePath, (error, datas) => {
            if (error) reject(error)
            console.log(JSON.stringify(datas), "readdirPromise")
            resolve(datas)
        })
    })
}
