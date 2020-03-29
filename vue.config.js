module.exports = {
  pluginOptions: {
    electronBuilder: {
      builderOptions: {
        appId: 'com.electron.owls',
        productName: 'Owls',
        publish: ['github'],
        mac: {
          target: 'dmg',
          artifactName: '${productName}-${os}.${ext}'
        },
        linux: {
          artifactName: '${productName}-${os}.${ext}',
          target: [
            {
              target: 'snap',
              arch: 'x64',
            },
            {
              target: 'tar.gz',
              arch: 'x64'
            }
          ]
        },
        win: {
          artifactName: '${productName}-${os}.${ext}'
        },
        snap: {
          publish: ['github']
        }
      },
      mainProcessWatch: []
    }
  }
}