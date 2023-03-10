const nextModeBabelPlugin = require('next-babel-conditional-ssg-ssr');

const presets = ['next/babel'];
const plugins = [nextModeBabelPlugin("ssg")]; // ssr or ssg (lowercase), maybe use process.env ??

module.exports = { presets, plugins };
