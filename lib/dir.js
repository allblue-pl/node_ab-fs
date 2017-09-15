'use strict';

const fs = require('fs');
const path = require('path');


const dir = new class dir
{

    createRecursiveSync(dir_path)
    { let self = this;
        var abs_dir_path = path.resolve(dir_path);
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

            if (!self.existsSync(t_dir_path))
                fs.mkdirSync(t_dir_path);
        }
    }

    existsSync(dir_path)
    { let self = this;
        try {
            let stat = fs.lstatSync(dir_path);
            return stat.isDirectory();
        } catch (err) {
            return false;
        }
    }

}();
module.exports = dir;
