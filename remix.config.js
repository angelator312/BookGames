/** @type {import('@remix-run/dev').AppConfig} */
export default {
  ignoredRouteFiles: ["**/.*"],
  browserNodeBuiltinsPolyfill: {
    modules: {
      os: true,
      path: true,
      buffer: true,
      crypto: true,
      stream: true,
      util: true,
      zlib: true,
      net: true,
      tls: true,
      http: true,
      https: true,
      url: true,
      fs: "empty",
      constants: true,
      assert: true,
      events: true,
      timers: true,
      string_decoder: true,
      async_hooks: true,
      child_process: "empty",
      dns: "empty",
    },
  },
};
