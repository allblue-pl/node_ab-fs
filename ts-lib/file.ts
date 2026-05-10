import fs from "node:fs";

export class file_Class {
    exists_Async(fsPath: string) {
        return new Promise((resolve, reject) => {
            fs.lstat(fsPath, (err, stat) => {
                if (err !== null) {
                    resolve(false); return;
                }

                resolve(stat.isFile()); return;
            });
        });
    }
}
const file = new file_Class();
export default file;