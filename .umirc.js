
// ref: https://umijs.org/config/
export default {
  plugins: [
    // ref: https://umijs.org/plugin/umi-plugin-react.html
    ['umi-plugin-react', {
      antd: true,
      dva: true,
      dynamicImport: false,
      title: 'bookstore-spa',
      dll: false,
      routes: {
        exclude: [],
      },
      hardSource: false,
    }],
  ],
  "theme": {
    "@card-padding-base": "0.5em",
    "primary-color": "#f44941",
  },
}
