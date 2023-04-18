import { defineConfig } from 'vite'
import reactRefresh from '@vitejs/plugin-react-refresh'

export default defineConfig({
  plugins: [reactRefresh()],
  define: {
    'process.env': {}
  },
  // server: {
  //   port: 80,
  //   host: '93.180.133.185',
  // },

  //! Akatron Server
  // server: {
  //   port: 80,
  //   host: '93.180.132.227',
  // }
})