'use strict';


class ABFS
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

}

module.exports = new ABFS();
