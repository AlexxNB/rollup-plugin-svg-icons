import fs from 'fs'
import path from 'path'
import svgstore from 'svgstore';
import SVGO from 'svgo';

export default function svgicons(options = {}) {
    const inputFolder = options.inputFolder || 'src/icons';
    const output = options.output || 'dist/bundle.svg';
    const svgo = options.svgo && new SVGO(options.svgo);

    return {
        name: 'rollup-plugin-svg-icons',
        generateBundle: async () => {
            const sprites = svgstore();

            const icons_dir = path.resolve(inputFolder);
            for (const file of fs.readdirSync(icons_dir)) {
                const filepath = path.join(icons_dir, file);
                const svgid = path.parse(file).name

                let code = fs.readFileSync(filepath, {encoding: 'utf-8'});
                if (svgo) {
                    const { data } = await svgo.optimize(code, { path: filepath })
                    code = data;
                }

                sprites.add(svgid, code)
            }

            console.dir(sprites);
            fs.writeFileSync(path.resolve(output), sprites);
        }
    }
}
