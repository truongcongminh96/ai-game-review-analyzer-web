import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    chunkSizeWarningLimit: 525,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes('node_modules')) {
            return
          }

          if (id.includes('recharts')) {
            return 'charts-vendor'
          }

          if (id.includes('@ant-design/icons')) {
            return 'ui-icons-vendor'
          }

          if (id.includes('/rc-') || id.includes('\\rc-')) {
            return 'ui-rc-vendor'
          }

          if (
            id.includes('@ant-design/cssinjs') ||
            id.includes('@ant-design/colors') ||
            id.includes('@ant-design/fast-color')
          ) {
            return 'ui-style-vendor'
          }

          if (id.includes('dayjs')) {
            return 'date-vendor'
          }

          if (id.includes('antd') || id.includes('@ant-design')) {
            return 'ui-core-vendor'
          }

          if (id.includes('react') || id.includes('scheduler')) {
            return 'react-vendor'
          }
        },
      },
    },
  },
})
