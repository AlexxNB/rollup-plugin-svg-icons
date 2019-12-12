import fs from 'fs-extra';
import path from 'path';
import svgstore from 'svgstore';

export default function svgicons(options = {}) {
    const inputFolder = options.inputFolder || 'src/icons';
    const output = options.output || 'dist/bundle.svg';

    return {
        name: 'rollup-plugin-svg-icons',
        generateBundle: async () => {
            const sprites = svgstore(options);
            const icons_dir = path.resolve(inputFolder);
            for (const file of fs.readdirSync(icons_dir)) {
                const filepath = path.join(icons_dir, file);
                const svgid = path.parse(file).name
                let code = fs.readFileSync(filepath, {encoding: 'utf-8'});
                sprites.add(svgid, code)
            }
            fs.ensureFileSync(path.resolve(output));
            fs.writeFileSync(path.resolve(output), sprites.toString({inline:!!options.inline}));
        }
    }
}
