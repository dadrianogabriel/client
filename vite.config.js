import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import vitePluginImp from 'vite-plugin-imp';

export default defineConfig({
  css: {
    preprocessorOptions: {
      less: {
        modifyVars: {
          'primary-color': '#597ef7',
          'layout-header-background': '#fff',
          'layout-body-background': '#fff',
          'layout-trigger-background': '#597ef7'
        },
        javascriptEnabled: true
      }
    }
  },
  resolve: {
    alias: [{ find: /^~/, replacement: '' }]
  },
  plugins: [
    react(),
    vitePluginImp({
      libList: [
        {
          libName: 'antd',
          style: (name) => `antd/es/${name}/style`
        }
      ]
    })
  ]
});
