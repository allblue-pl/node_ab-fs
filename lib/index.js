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


    existsDirSync(dir_path)
    {
        return this.dir.existsSync(dir_path);
    }

    mkdirRecursiveSync(dir_path)
    {
        this.dir.createRecursiveSync(dir_path);
    }

}();
module.exports = abFS;
