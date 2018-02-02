'use strict';

const
    fs = require('fs')
;


class file_Class
{

    existsPromise(fsPath)
    {
        return new Promise((resolve, reject) => {
            fs.lstat(fsPath, (err, stat) => {
                if (err !== null) {
                    resolve(false); return;
                }

                resolve(stat.isFile()); return;
            });
        });
    }

};
module.exports = new file_Class();
