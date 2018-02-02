'use strict';


const abFS = new class abFS
{

    get dir() {
        return require('./dir');
    }

    get file() {
        return require('./file');
    }

    get matcher() {
        return require('ab-fs-matcher');
    }

    get watcher() {
        return require('ab-fs-watcher');
    }


    existsDirSync(fsDirPath)
    {
        return this.dir.existsSync(fsDirPath);
    }

    existsFilePromise(fsFilePath)
    {
        return this.file.existsPromise(fsFilePath);
    }

    mkdirRecursiveSync(dir_path)
    {
        this.dir.createRecursiveSync(dir_path);
    }

    rmdirResursiveSync(dirPath)
    {
        this.dir.removeRecursiveSync(dirPath);
    }

}();
module.exports = abFS;
