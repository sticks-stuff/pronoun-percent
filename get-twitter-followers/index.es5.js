'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getTwitterFollowers;

var _twit = require('twit');

var _twit2 = _interopRequireDefault(_twit);

var _ramda = require('ramda');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function usersLookupPromise(client, ids) {
  var options = { user_id: (0, _ramda.join)(',', ids), include_entities: false };
  return client.post('users/lookup', options).then(function (_ref) {
    var data = _ref.data;
    return data;
  });
}

function ids2userObjects(client, ids) {
  var userLookupPromises = (0, _ramda.pipe)((0, _ramda.splitEvery)(100), (0, _ramda.map)(usersLookupPromise.bind(null, client)));
  var handler = function handler() {
    for (var _len = arguments.length, userObjects = Array(_len), _key = 0; _key < _len; _key++) {
      userObjects[_key] = arguments[_key];
    }

    return (0, _ramda.flatten)(userObjects);
  };
  return Promise.all(userLookupPromises(ids)).then(handler);
}

function accumulate(client, options, followersIds) {
  return client.get('friends/ids', options).then(function (_ref2) {
    var _ref2$data = _ref2.data;
    var ids = _ref2$data.ids;
    var cursor = _ref2$data.next_cursor_str;

    var accumulatedFollowersIds = (0, _ramda.concat)(followersIds, ids);
    if (cursor === '0') {
      return ids2userObjects(client, accumulatedFollowersIds);
    }
    return accumulate(client, (0, _ramda.merge)(options, { cursor: cursor }), accumulatedFollowersIds);
  });
}

function getTwitterFollowers(tokens, username) {
  var client = new _twit2.default(tokens);
  var options = { screen_name: username, stringify_ids: true, count: 5000 };
  return accumulate(client, options, []);
}
module.exports = exports['default'];
