import { defineConfig, loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path'; //这个path用到了上面安装的@types/node

// https://vitejs.dev/config/
export default ({ mode }) => {
  console.log('mode', loadEnv(mode, process.cwd()).VITE_BASE_URL);
  const pathType = loadEnv(mode, process.cwd()).VITE_BASE_URL.indexOf('10');
  return defineConfig({
    base: pathType == -1 ? '/hzzbPic/programManage_t' : '/programManage',
    // base: '/',
    plugins: [vue()],
    //这里进行配置别名
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'), // @代替src
        '#': path.resolve('./types'), // #代替types
      },
    },
    css: {
      preprocessorOptions: {
        less: {
          additionalData: `
          @import "@/assets/styles/variables.less";
          @import "@/assets/styles/mixins.less";`,
        },
      },
    },
    build: {
      rollupOptions: {
        output: {
          chunkFileNames: 'static/js/[name]-[hash].js',
          entryFileNames: 'static/js/[name]-[hash].js',
          assetFileNames: 'static/[ext]/[name]-[hash].[ext]',
        },
      },
    },
  });
};
