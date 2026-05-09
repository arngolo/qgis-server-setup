export default {
  build: {
    sourcemap: true,
  },
  server: {
    proxy: {
      '/ows': {
        target: 'http://localhost:8080',
        changeOrigin: true,
      },
    },
  },
}