/**
 * 发布与订阅 
 */
class OnFire {
  constructor() {
    this.events = {};
  }

  /**
   * 订阅
   * @param  eventName{String} 事件名
   * @param  cb{Function} 回调函数
   * @param  once{Boolean} 是否仅执行一次
   * 
   */
  on(eventName, cb, once = false) {
    if (!this.events[eventName]) {
      this.events[eventName] = [];
    }
    this.events[eventName].push({
      cb,
      once,
    });
  }

  /**
   * 发布
   * @param  eventName{String} 事件名
   * @param  params{Array} 回调参数
   * 
   */
  fire(eventName, ...params) {
    const listeners = this.events[eventName] || [];
    let len = listeners.length;

    for (let i = 0; i < len; i++) {
      const {
        cb,
        once
      } = listeners[i];

      cb.apply(this, params);

      if (once) {
        listeners.splice(i, 1);
        i--;
        len--;
      }
    }
  }

  /**
   * 取消订阅
   * @param  eventName{String} 事件名
   * @param  cb{Function} 回调函数
   * 
   */
  off(eventName, cb) {
    if (eventName === undefined) {
      this.events = {};
      return;
    }
    if (cb === undefined) {
      delete this.events[eventName];
      return;
    }
    const listeners = this.events[eventName] || [];
    let len = listeners.length;
    for (let i = 0; i < len; i++) {
      if (listeners[i].cb === cb) {
        listeners.splice(i, 1);
        i--;
        len--;
      }
    }
  }
}

export default new OnFire();