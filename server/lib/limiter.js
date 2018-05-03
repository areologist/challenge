import isFunction from 'lodash/isFunction';

// Simple attempt at an async rate limiter
export default (events, ms) => {
  const queue = [];
  let count = events;

  const next = () => new Promise((resolve) => {
    if (count > 0) {
      count -= 1;
      resolve();
      const timeout = setTimeout(() => {
        count += 1;
        if (queue.length) {
          next().then(queue.pop());
        }
      }, ms);
      if (!queue.length && isFunction(timeout.unref)) {
        timeout.unref();
      }
    } else {
      queue.push(resolve);
    }
  });
  return next;
};

