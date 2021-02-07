// https://cli.vuejs.org/guide/css.html#passing-options-to-pre-processor-loaders
module.exports = {
  css: {
    loaderOptions: {
      sass: {
        prependData: `
          @import "@/scss/_variables.scss";
          @import "@/scss/_medias.scss";
          @import "@/scss/_mixins.scss";
          @import "@/scss/_fonts.scss";
        `,
      },
    },
  },

  devServer: {
    watchOptions: {
      clientLogLevel: 'warning',
    },
  },
};
