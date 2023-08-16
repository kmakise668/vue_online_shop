const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
    devServer: {
        port: 3000
    },
    css: {
        loaderOptions: {
            sass: {
                prependData: `
              @import "@/assets/styles/style.scss";
            `
            }
        },
        extract: false
    }
})