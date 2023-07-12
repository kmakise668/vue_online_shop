const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
    devServer: {
        port: 2050
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