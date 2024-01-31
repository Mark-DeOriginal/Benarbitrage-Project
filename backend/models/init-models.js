import Assets from "./assets.js";
import CryptoCommunitySubscribers from "./crypto-community-subscribers.js";
import Payouts from "./payouts.js";
import Referrers from "./referrers.js";
import Users from "./users.js";

export default function initModels() {
  var assets = Assets;
  var users = Users;
  var referrers = Referrers;
  var payouts = Payouts;
  var cryptoCommunitySubscribers = CryptoCommunitySubscribers;

  return {
    assets,
    users,
    referrers,
    payouts,
    cryptoCommunitySubscribers,
  };
}
