const app = require('./app');

const { PORT = 3000 } = process.env;

app.listen(PORT, () => {
  /* eslint no-console: "off" */
  console.log(`App listening on port ${PORT}`);
});
