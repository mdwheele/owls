module.exports = {
  pluginOptions: {
    electronBuilder: {
      builderOptions: {
        appId: 'com.electron.owls',
        productName: 'Owls',
        publish: ['github'],
        mac: {
          target: 'dmg'
        },
        linux: {
          target: [
            {
              target: 'snap',
              arch: 'x64'
            },
            {
              target: 'tar.gz',
              arch: 'x64'
            }
          ]
        }
      },
      mainProcessWatch: []
    }
  }
}