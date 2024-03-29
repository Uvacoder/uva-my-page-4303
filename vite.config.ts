import { defineConfig } from 'vite'
import { resolve } from 'path'
import vue from '@vitejs/plugin-vue'
import ViteComponents, { NaiveUiResolver } from 'vite-plugin-components'
import WindiCSS from 'vite-plugin-windicss'
import placeholderColor from 'windicss/colors'
import vueI18n from '@intlify/vite-plugin-vue-i18n'

export default ({ mode }) => {
    const __DEV__ = mode === 'production'

    const alias: Record<string, string> = {
        '@/': `${resolve(__dirname, 'src')}/`,
    }

    if (__DEV__) {
        // 解决警告You are running the esm-bundler build of vue-i18n.
        alias['vue-i18n'] = 'vue-i18n/dist/vue-i18n.cjs.js'
    }

    return defineConfig({
        base: __DEV__ ? '/' : './',
        resolve: {
            alias,
        },
        plugins: [
            vue(),
            ViteComponents({
                globalComponentsDeclaration: true,
                customComponentResolvers: [NaiveUiResolver()],
            }),
            WindiCSS(),
            vueI18n({
                include: resolve(__dirname, 'src/locales/**'),
            }),
            // yaml(),
        ],
        server: {
            open: true,
        },
        build: {
            outDir: 'public',
            /* 启用时，在异步 chunk 中导入的 CSS 将内联到异步 chunk 本身，并在其被加载时插入。 */
            cssCodeSplit: true,
            emptyOutDir: true,
            chunkSizeWarningLimit: 1024,
            sourcemap: false,
        },
    })
}
