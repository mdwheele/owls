import fs from 'fs'
import os from 'os'
import hostile from 'hostile'

export function checkPermissions() {
  try {
    fs.appendFileSync(getHostsPath(), '')
    return true
  } catch (error) {
    return false
  }
}

export function getHostsPath() {
  return hostile.HOSTS
}

export function getHostsEntries() {
  return hostile.get(false)
    .filter(host => {
      const ignoredHost = ['::1', '255.255.255.255'].includes(host[0])
      const localhost = host[1].includes('localhost')

      return !ignoredHost && !localhost
    })
    .reduce((accum, host) => {
      accum.push({
        hostname: host[1],
        environments: [
          {
            name: null,
            ip: host[0],
            active: true
          }
        ]
      })
      return accum
    }, [])
}

export function saveHostEntries(projects) {
  getHostsEntries().forEach(project => {
    project.environments.forEach(env => {
      hostile.remove(env.ip, project.hostname)
    })
  })

  projects.forEach(project => {
    project.environments.forEach(env => {
      if (env.active) {
        hostile.set(env.ip, project.hostname)
      }
    })
  })
}

export function getPlatform() {
  return process.platform
}

export function getPlatformHuman() {
  switch(process.platform) {
    case 'darwin':
      return 'MacOS'
    case 'win32':
      return 'Windows'
    case 'linux':
      return 'Linux'
  }
}

export function getPermissionTip() {
  switch(process.platform) {
    case 'darwin':
      return `sudo chmod +a "${getCurrentUser()} allow write" ${getHostsPath()}`
    case 'win32':
      return `powershell Start-Process icacls -ArgumentList @('${getHostsPath()}', '/grant', '${getCurrentUser()}:M') -Verb runAs`
    case 'linux':
      return `sudo setfacl -m u:${getCurrentUser()}:rw ${getHostsPath()}`
  }
}

export function getCurrentUser() {
  return os.userInfo().username
}

export default {
  checkPermissions,
  getHostsPath,
  getHostsEntries,
  saveHostEntries,
  getPlatform,
  getPlatformHuman,
  getPermissionTip,
  getCurrentUser
}