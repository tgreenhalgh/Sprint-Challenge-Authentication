const db = require('../dbConfig');

module.exports = {
  insert: function(user) {
    return db('users')
      .insert(user)
      .then(ids => ({ id: ids[0] }));
  },
};
