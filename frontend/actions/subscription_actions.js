import * as SubscriptionApiUtil from '../util/subscription_api_util';

// export const RECEIVE_CURRENT_USER = 'RECEIVE_CURRENT_USER';
export const RECEIVE_ALL_SUBSCRIPTIONS = 'RECEIVE_ALL_SUBSCRIPTIONS';
export const REMOVE_FEED = 'REMOVE_FEED';
export const EDIT_FEED = 'EDIT_FEED';

export const receiveAllSubscriptions = feedsPayload => ({
  type: RECEIVE_ALL_SUBSCRIPTIONS,
  feeds: feedsPayload.feeds,
  subscriptions: feedsPayload.subscriptions
});

export const removeFeed = feedId => ({
  type: REMOVE_FEED,
  feedId
});

export const editFeed = feedPayload => ({
  type: EDIT_FEED,
  subscription: feedPayload.subscription
});

export const fetchAllSubscriptions = () => dispatch => (
  SubscriptionApiUtil.fetchSubscriptions()
    .then(subscriptionsPayload =>
      dispatch(receiveAllSubscriptions(subscriptionsPayload))
      // ,
      // errors => dispatch(receiveErrors(errors))
    )
);

export const deleteFeed = feed => dispatch => (
  SubscriptionApiUtil.deleteSubscription(feed.subscription_id)
    .then(() => dispatch(removeFeed(feed.id)))
);

export const updateFeed = feed => dispatch => {
  const subscription = {
    title: feed.subscription_title,
    id: feed.subscription_id
  };
  return SubscriptionApiUtil.updateSubscription(subscription)
    .then((updatedFeed) => dispatch(editFeed(updatedFeed)));
};
