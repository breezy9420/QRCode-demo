import { defineConfig } from 'umi';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  routes: [{ path: '/', component: '@/pages/index' }],
  fastRefresh: {},
  mfsu: {},
  devServer: {
    https: {
      key: './key.pem',
      cert: './cert.pem',
    },
  },
});
