const { MongoClient } = require("mongodb");

const MongoClientAdapter = (function () {
  let instance;

  function createInstance() {
    const uri = `mongodb://mongodb:${process.env.MONGODB_PORT}`;
    return new MongoClient(uri, { connectTimeoutMS: 30000 }, { keepAlive: 1 });
  }

  return {
    getInstance: function () {
      if (!instance) {
        instance = createInstance();
      }

      return instance;
    },
  };
})();

module.exports = () => MongoClientAdapter;
