import { watch as vWatch } from "vue";

/*
 * Wrapper for vue.watch so that all watchers are immediate when
 * in dev mode. Hot reloading causes data to reset and not be reloaded
 * when watchers are not immediate.
 * 
 * The options object will override immediate in prod mode if immediate
 * is needed in some cases.
 */
export function watch(sources, fn, options = {}) {
  return vWatch(sources, fn, {
    immediate: import.meta.env.DEV ? true : false,
    ...options 
  })
}

function getLogPrefix(type) {
  return `${type} ${new Date().toISOString()}`
}

function _log(type, ...params) {
  if (type !== 'debug' || type === 'debug' && import.meta.env.DEV) {
    console[type](getLogPrefix(type), ...params)
  }
}

export const log = {
  info(...params) {
    _log('info', ...params)
  },
  debug(...params) {
    _log('debug', ...params)
  }
}
