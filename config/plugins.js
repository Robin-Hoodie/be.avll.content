module.exports = ({ env }) => ({
  email: {
    config: {
      provider: "sendgrid",
      providerOptions: {
        apiKey: env("SENDGRID_API_KEY"),
      },
      settings: {
        defaultFrom: "kris.dirix@avll.be",
        defaultReplyTo: "kris.dirix@avll.be",
      },
    },
  },
});
