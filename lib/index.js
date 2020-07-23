'use strict';

const
    fs = require('fs'),
    path = require('path')
;

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


    copySync(fsSrcPath, fsDestPath)
    {
        if (!fs.existsSync(fsSrcPath))
            throw new Error(`Cannot copy '${fsSrcPath}'. Path does not exist.`);

        let fsDestPath_Dir = path.dirname(fsDestPath);
        if (!fs.existsSync(fsDestPath_Dir))
            this.mkdirRecursiveSync(fsDestPath_Dir);

        let lstat = fs.lstatSync(fsSrcPath);
        if (lstat.isSymbolicLink())
            return;

        if (lstat.isFile()) {
            fs.copyFileSync(fsSrcPath, fsDestPath);
            return;
        }

        if (lstat.isDirectory()) {
            if (!fs.existsSync(fsDestPath))
                this.mkdirRecursiveSync(fsDestPath);
            fs.readdirSync(fsSrcPath).forEach((fsPath, index) => {
                let fsSrcPath_Curr = path.join(fsSrcPath, fsPath);
                this.copySync(fsSrcPath_Curr, path.join(fsDestPath, fsPath));
            });
        }
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

    removeSync(fsPath)
    {
        let lstat = fs.lstatSync(fsPath);
        if (lstat.isSymbolicLink())
            return;

        if (lstat.isFile())
            fs.unlink(fsPath);

        if (lstat.isDirectory())
            this.rmdirRecursiveSync(fsPath);
    }

    rmdirRecursiveSync(dirPath)
    {
        this.dir.removeRecursiveSync(dirPath);
    }

}();
module.exports = abFS;
