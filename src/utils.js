
function getLogPrefix(type) {
  return `${type} ${new Date().toISOString()}`
}

function _log(type, ...params) {
  if (type !== 'debug' || (type === 'debug' && import.meta.env.DEV)) {
    console[type](getLogPrefix(type), ...params)
  }
}

export const log = {
  info(...params) {
    _log('info', ...params)
  },
  debug(...params) {
    _log('debug', ...params)
  },
}

export async function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

export const storage = new Proxy(localStorage, {
  get(target, prop) {
    return JSON.parse(target.getItem(prop))
  },

  set(target, prop, value) {
    target.setItem(prop, JSON.stringify(value)) 
    return true
  },

  deleteProperty(target, prop) {
    target.removeItem(prop)
    return true
  }
})
