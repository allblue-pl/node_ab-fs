import fs from "fs";
import path from "path";

import abFSMatcher, { abFSMatcher_Class } from "ab-fs-matcher";
import abFSWatcher, { abFSWatcher_Class } from "ab-fs-watcher";

import dir, { dir_Class } from "./dir.ts";
import file, { file_Class } from "./file.ts";

export class abFS_Class {
    get dir(): dir_Class {
        return dir;
    }

    get file(): file_Class {
        return file;
    }


    constructor() {

    }

    copySync(fsSrcPath: string, fsDestPath: string) {
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

    existsDirSync(fsDirPath: string) {
        return dir.existsSync(fsDirPath);
    }

    existsFile_Async(fsFilePath: string) {
        return file.exists_Async(fsFilePath);
    }

    mkdirRecursiveSync(dirPath: string) {
        dir.createRecursiveSync(dirPath);
    }

    removeSync(fsPath: string) {
        let lstat = fs.lstatSync(fsPath);
        if (lstat.isSymbolicLink())
            return;

        if (lstat.isFile())
            fs.unlinkSync(fsPath);

        if (lstat.isDirectory())
            this.rmdirRecursiveSync(fsPath);
    }

    rmdirRecursiveSync(dirPath: string) {
        dir.removeRecursiveSync(dirPath);
    }

}
const abFS = new abFS_Class();
export default abFS;
