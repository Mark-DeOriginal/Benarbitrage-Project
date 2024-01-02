import Assets from "./assets.js";
import CryptoCommunitySubscribers from "./crypto-community-subscribers.js";
import Users from "./users.js";

export default function initModels() {
  var assets = Assets;
  var users = Users;
  var cryptoCommunitySubscribers = CryptoCommunitySubscribers;

  return {
    assets,
    users,
    cryptoCommunitySubscribers,
  };
}
