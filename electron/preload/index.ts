import { ipcRenderer } from "electron";

export const f1mvli = {
  config: {
    set: (key: string, value) => ipcRenderer.invoke("config:set", key, value),
    get: (key: string) => ipcRenderer.invoke("config:get", key),
    getAll: () => ipcRenderer.invoke("config:get:all"),
    delete: (key: string) => ipcRenderer.invoke("config:delete", key),
    openInEditor: () => ipcRenderer.invoke("config:open:inEditor"),
  },
  updater: {
    checkForUpdate: () => ipcRenderer.invoke("updater:checkForUpdate"),
  },
  log: {
    openLogFile: () => ipcRenderer.invoke("log:openLogFile"),
    getLogs: () => ipcRenderer.invoke("log:getLogs"),
  },
  utils: {
    getStates: () => ipcRenderer.invoke("utils:getStates"),
    getWindowSizes: () => ipcRenderer.invoke("utils:getWindowSizes"),
    openNewWindow: (url) => ipcRenderer.invoke("utils:open-win", url),
    changeWindowTitle : (title: string) => ipcRenderer.invoke("utils:changeWindowTitle", title),
    exitApp: () => ipcRenderer.invoke("utils:exitApp"),
  },
  integrations: {
    homeAssistant: {
      getDevices: () => ipcRenderer.invoke("integrations:homeAssistant:getDevices"),
    }
  }
};

// @ts-ignore
window.f1mvli = f1mvli;