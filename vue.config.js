// const { defineConfig } = require('@vue/cli-service')

// module.exports = defineConfig({
//     devServer: {
//         port: 7777
//     },
//     css: {
//         loaderOptions: {
//             sass: {
//                 prependData: `
//               @import "@/assets/styles/style.scss";
//             `
//             }
//         },
//         extract: false
//     }
// })


// module.exports = {
//     devServer: {
//         port: 7777
//     },
//     css: {
//         loaderOptions: {
//             sass: {
//                 prependData: `
//               @import "@/assets/styles/style.scss";
//             `
//             }

//         },
//         extract: false
//     }
// }

const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
    devServer: {
        port: 7777
    },
    // css: {
    //     loaderOptions: {
    //         scss: {
    //             additionalData: `
    //           @import "@/assets/styles/style.scss";
    //         `
    //         }
    //     },
    //     extract: false
    // }

})