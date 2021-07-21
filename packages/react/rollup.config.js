import babel from 'rollup-plugin-babel';
import scss from 'rollup-plugin-scss';
import postcss from 'postcss';
import autoprefixer from 'autoprefixer';
import path from 'path';

export default {
  input: './src/index.js',
  output: {
    file: './dist/index.js',
    format: 'umd',
    name: 'rtc-device-detector',
  },
  plugins: [
    scss({
      processor: () => postcss([autoprefixer()]),
      includePaths: [
        path.join(__dirname, '../../node_modules/'),
        'node_modules/',
      ],
    }),
    babel()],
  external: ['react', 'trtc-js-sdk', 'rtc-detect', 'a18n'],
};
