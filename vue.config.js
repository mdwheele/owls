module.exports = {
  pluginOptions: {
    electronBuilder: {
      builderOptions: {
        appId: 'com.electron.owls',
        productName: 'Owls',
        publish: ['github']
      },
      mainProcessWatch: []
    }
  }
}