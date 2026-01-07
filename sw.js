'use strict';

self.addEventListener('install', function(event) {
  self.skipWaiting();
});

self.addEventListener('activate', function(event) {});

self.addEventListener('push', function(event) {
  event.waitUntil(
      self.registration.pushManager.getSubscription()
          .then(function(subscription) {
            var subscriptionId = '';
            try {
              if (!subscription) {
                throw new Error('Couldn\'t find subscription');
              }
              subscriptionId = subscription.endpoint;
              if (event.data) {
                var payloadJson = event.data.json();
                if (typeof payloadJson !== 'object') {
                  throw new Error('Json not valid');
                }
                return showSuccess(payloadJson);
              }
            } catch (error) {
              return prepareAndSendError(error.message, subscriptionId, event.data.text());
            }
          }).catch(function(error) {
        var data = '';
        if (event.data) {
          data = event.data.text();
        }
        return prepareAndSendError(error.message, '', data);
      })
  );
});

self.addEventListener('notificationclick', function(event) {
  // Close notification.
  event.notification.close();

  switch (event.action) {
    case 'action0':
      var promise = new Promise(
          function(resolve) {
            var redirectUrl = event.notification.data.url;
            if (event.notification.data.actionUrls.length > 0) {
              redirectUrl = event.notification.data.actionUrls[0];
            }
            clients.openWindow(redirectUrl);
            setTimeout(resolve, 1000);
          }).then(function() {});
      break;
    case 'action1':
      var promise = new Promise(
          function(resolve) {
            var redirectUrl = event.notification.data.url;
            if (event.notification.data.actionUrls.length > 1) {
              redirectUrl = event.notification.data.actionUrls[1];
            }
            clients.openWindow(redirectUrl);
            setTimeout(resolve, 1000);
          }).then(function() {});
      break;
    default:
      var promise = new Promise(
          function(resolve) {
            clients.openWindow(event.notification.data.url);
            setTimeout(resolve, 1000);
          }).then(function() {});
      break;
  }
});

self.addEventListener('notificationclose', function(event) {
  event.waitUntil(Promise.all([interaction(event.notification.data, 'close')]));
});

function status(response) {
  if (response.status >= 200 && response.status < 300) {
    return Promise.resolve(response);
  } else {
    return Promise.reject(new Error(response.statusText));
  }
}

function json(response) {
  return response.json();
}

function showSuccess(data) {
  var notification = {};
  if (data.data) {
    data = data.data;
  }
  notification.title = data.title || '';
  notification.message = data.message || '';
  notification.icon = data.icon || '';
  notification.image = data.image || '';
  notification.requireInteraction = true;
  notification.data = {};
  notification.data.url = data.redirectUrl;
  if (data.actions && getBrowserName() !== 'Firefox') {
    if (typeof data.actions === 'object') {
      notification.actions = data.actions;
    } else if (typeof data.actions === 'string') {
      notification.actions = JSON.parse(data.actions) || [];
    } else {
      notification.actions = [];
    }
    if (typeof data.actionUrls === 'object') {
      notification.data.actionUrls = data.actionUrls;
    } else if (typeof data.actionUrls === 'string') {
      notification.data.actionUrls = JSON.parse(data.actionUrls) || [];
    } else {
      notification.actionUrls = [];
    }
  }
  notification.data.dataCenterUrl = data.dataCenterUrl;
  if (data.instanceId) {
    notification.data.apiKey = data.apiKey;
    notification.data.instanceId = data.instanceId;
    notification.data.userId = data.userId || '';
    return fetch(data.dataCenterUrl + 'interaction/notification?apiKey=' + data.apiKey + '&instanceId=' + data.instanceId + '&type=show').then(function() {
      sendShowInfoViaSubscription(data.dataCenterUrl, data.apiKey, data.instanceId);
      return showNotification(notification);
    }).catch(function(err) {
      sendShowInfoViaSubscription(data.dataCenterUrl, data.apiKey, data.instanceId);
      return showNotification(notification);
    });
  } else {
    sendShowInfoViaSubscription(data.dataCenterUrl, data.apiKey, data.instanceId);
    return showNotification(notification);
  }
}

function prepareAndSendError(error, subscriptionId, payload) {
  var dc = 'https://gimli-dev.segmentify.com/error/notification';
  if (self.indexedDB) {
    var request = self.indexedDB.open("segmentify");

    request.onsuccess = function() {
      var db = request.result;
      var transaction = db.transaction("sgf", "readonly");
      var sgfStore = transaction.objectStore("sgf");
      sgfStore.get("sgf_prm").onsuccess = function(e) {
        var value = e.target.result;
        if (value) {
          dc = value.dc;
        }
        return sendError(dc, error, subscriptionId, payload);
      };
    };

    request.onerror = function() {
      return sendError(dc, error, subscriptionId, payload);
    }
  }
}

function sendError(dc, error, subscriptionId, payload) {
  return fetch(dc + 'error/notification', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'SegmentifyPushQuery': 'SegmentifyPushQuery'
    },
    body: JSON.stringify({
      subscriptionId: subscriptionId || 'empty_subscription',
      message: error || '',
      payload: payload || ''
    })
  }).then(function() {
    // do nothing
  }).catch(function(err) {
    console.warn(err);
  });
}

function showNotification(notification) {
  if (getBrowserName() === 'Opera') {
    Promise.all([self.registration.showNotification(notification.title, {
      body: notification.message,
      icon: notification.icon,
      image: notification.image,
      data: notification.data
    })]);
  } else {
    return self.registration.showNotification(notification.title, {
      body: notification.message,
      icon: notification.icon,
      image: notification.image,
      requireInteraction: notification.requireInteraction,
      data: notification.data,
      actions: notification.actions
    });
  }
}

function interaction(notificationData, type) {
  if (notificationData.apiKey && notificationData.instanceId) {
    if (!notificationData.dataCenterUrl.endsWith('/')) {
      notificationData.dataCenterUrl = notificationData.dataCenterUrl + '/';
    }
    var url = notificationData.dataCenterUrl + 'interaction/notification?apiKey=' + notificationData.apiKey +
        '&instanceId=' + notificationData.instanceId + '&userId=' + notificationData.userId + '&type=' + type;
    return fetch(url).catch(function(err) {});
  } else {
    return Promise.resolve(100);
  }
}

function getBrowserName() {
  var agent = '';
  if (/OPR/i.test(navigator.userAgent)) agent = 'Opera';
  else if (/Chrome/i.test(navigator.userAgent)) agent = 'Chrome';
  else if (/Firefox/i.test(navigator.userAgent)) agent = 'Firefox';
  return agent;
}

function sendSubscriptionDetails(apiKey, dataCenter, tryCount) {
  ++tryCount;
  self.registration.pushManager.getSubscription().then(function(subscription) {
    if (subscription) {
      var dataArray = {
        subscriptionId: subscription.endpoint.split('/').slice(-1)[0]
      };
      fetch(dataCenter + 'subscription/update?apiKey=' + apiKey, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(dataArray)
      }).then(function(res) {
        if (!res.ok) {
          if (tryCount < 10) {
            return sendSubscriptionDetails(apiKey, dataCenter, tryCount);
          }
          return;
        }
      }).catch(function() {
        if (tryCount < 10) {
          return sendSubscriptionDetails(apiKey, dataCenter, tryCount);
        }
        return;
      });
    }
  });
}

function sendShowInfoViaSubscription(dataCenter, apiKey, instanceId) {
  self.registration.pushManager.getSubscription().then(function(subscription) {
    if (subscription) {
      var dataArray = {
        subscriptionId: subscription.endpoint.split('/').slice(-1)[0],
        instanceId: instanceId
      };
      fetch(dataCenter + 'interaction/show?apiKey=' + apiKey, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(dataArray)
      }).then(function(res) {}).catch(function() {});
    }
  });
}