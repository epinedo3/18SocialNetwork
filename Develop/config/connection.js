const { connect, connection } = require('mongoose');

connect("mongodb://localhost/developersApplications", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false, 
});


module.exports = connection;
