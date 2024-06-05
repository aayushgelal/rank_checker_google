import { resolve as _resolve } from 'path';

export const entry = './src/index.js';
export const output = {
    filename: 'bundle.js',
    path: _resolve(__dirname, 'dist')
};
export const module = {
    rules: [
        {
            test: /\.js$/,
            exclude: /node_modules/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: ['@babel/preset-env']
                }
            }
        },
        {
            test: /\.map$/,
            use: 'ignore-loader'
        }
    ]
};
export const resolve = {
    extensions: ['.js', '.jsx', '.json']
};
export const devtool = 'source-map' // Ensure source maps are properly generated
    ;
