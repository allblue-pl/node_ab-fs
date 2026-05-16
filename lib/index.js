import fs from "fs";
import path from "path";
import dir, { dir_Class } from "./dir.js";
import file, { file_Class } from "./file.js";
export class abFS_Class {
    get dir() {
        return dir;
    }
    get file() {
        return file;
    }
    constructor() {
    }
    copySync(fsSrcPath, fsDestPath) {
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
    existsDirSync(fsDirPath) {
        return dir.existsSync(fsDirPath);
    }
    existsFile_Async(fsFilePath) {
        return file.exists_Async(fsFilePath);
    }
    mkdirRecursiveSync(dirPath) {
        dir.createRecursiveSync(dirPath);
    }
    removeSync(fsPath) {
        let lstat = fs.lstatSync(fsPath);
        if (lstat.isSymbolicLink())
            return;
        if (lstat.isFile())
            fs.unlinkSync(fsPath);
        if (lstat.isDirectory())
            this.rmdirRecursiveSync(fsPath);
    }
    rmdirRecursiveSync(dirPath) {
        dir.removeRecursiveSync(dirPath);
    }
}
const abFS = new abFS_Class();
export default abFS;
