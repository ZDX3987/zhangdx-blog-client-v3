import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'


// https://vite.dev/config/
export default defineConfig({
    define: {
        // 启用生产环境构建下激活不匹配的详细警告
        __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: 'true'
    },
    plugins: [
        vue(),
    ],
})
