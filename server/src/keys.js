const webpush = require('web-push')

const getKeys = () => {
  const { publicKey, privateKey } = webpush.generateVAPIDKeys()
  console.log('publicKey', publicKey)
  console.log('privateKey', privateKey)
}

getKeys()
