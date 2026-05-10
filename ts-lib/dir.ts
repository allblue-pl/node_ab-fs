import fs from "node:fs";
import path from "node:path";

export class dir_Class {
    createRecursiveSync(dirPath: string) {
        var abs_dir_path = path.resolve(dirPath);
        var dir_path_array = abs_dir_path.split(path.sep);

        if (dir_path_array.length === 0)
            return;

        var i = 0;
        var t_dir_path = dir_path_array[i];
        while (true) {
            i++;
            if (i >= dir_path_array.length)
                break;

            t_dir_path = path.join(t_dir_path, dir_path_array[i]);

            if (!this.existsSync(t_dir_path))
                fs.mkdirSync(t_dir_path);
        }
    }

    existsSync(dirPath: string) {
        try {
            let stat = fs.lstatSync(dirPath);
            return stat.isDirectory();
        } catch (err) {
            return false;
        }
    }

    removeRecursiveSync(dirPath: string) {
        let lstat = fs.lstatSync(dirPath);
        if (lstat.isSymbolicLink()) {
            fs.unlinkSync(dirPath);
            return;
        }

        if (fs.existsSync(dirPath)) {
            fs.readdirSync(dirPath).forEach((filePath, index) => {
                var currentPath = path.join(dirPath, filePath);
                    if (fs.lstatSync(currentPath).isDirectory())
                        this.removeRecursiveSync(currentPath);
                    else
                        fs.unlinkSync(currentPath);
            });

            fs.rmdirSync(dirPath);
        }
    }
}
const dir = new dir_Class();
export default dir;