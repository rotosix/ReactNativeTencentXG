'use strict';

import {
  NativeModules,
  NativeAppEventEmitter
} from 'react-native';

var XG = NativeModules.TencentXG;

var disableIOS;

function allEvents() {
  return [
    XG.LocalNotificationEvent,
    XG.RemoteNotificationEvent,
    XG.RegisteredEvent,
    XG.FailureEvent
  ];
}

function addEventListener(event, listener) {
  if (disableIOS) return disableIOS;
  if (allEvents().indexOf(event) < 0) return;
  return NativeAppEventEmitter.addListener(
    event, listener
  );
}

function scheduleLocalNotification(obj) {
  if (disableIOS) return;
  if (obj.fireDate) {
    XG.scheduleLocalNotification(obj);
  } else {
    XG.presentLocalNotification(obj);
  }
}

module.exports = {
  addEventListener,
  allEvents,
  scheduleLocalNotification,
  disableIOS: () => disableIOS = true,
  enableDebug: enable => disableIOS || XG.enableDebug(enable || true),
  setCredential: (accessId, accessKey) => {
    return disableIOS || XG.setCredential(accessId, accessKey);
  },
  register: (account, permissions) => {
    return disableIOS || XG.register(account, permissions);
  },
  checkPermissions: () => disableIOS || XG.checkPermissions(),
  getApplicationIconBadgeNumber: () => {
    return disableIOS || XG.getApplicationIconBadgeNumber();
  },
  setApplicationIconBadgeNumber: number => {
    return XG.setApplicationIconBadgeNumber(number);
  },
  cancelLocalNotifications: () => disableIOS || XG.cancelLocalNotifications(),
  cancelAllLocalNotifications: () => {
    return disableIOS || XG.cancelAllLocalNotifications();
  },
  setTag: tag => disableIOS || XG.setTag(tag),
  delTag: tag => disableIOS || XG.delTag(tag),
  unregister: () => disableIOS || XG.unRegisterDevice(),
};
