import { dir_Class } from "./dir.ts";
import { file_Class } from "./file.ts";
export declare class abFS_Class {
    get dir(): dir_Class;
    get file(): file_Class;
    constructor();
    copySync(fsSrcPath: string, fsDestPath: string): void;
    existsDirSync(fsDirPath: string): boolean;
    existsFile_Async(fsFilePath: string): Promise<unknown>;
    mkdirRecursiveSync(dirPath: string): void;
    removeSync(fsPath: string): void;
    rmdirRecursiveSync(dirPath: string): void;
}
declare const abFS: abFS_Class;
export default abFS;
//# sourceMappingURL=index.d.ts.map