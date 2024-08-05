module.exports = {
  apps: [
    {
      name: 'Gift-Right',
      script: 'node_modules/next/dist/bin/next',
      args: 'start',
      env: {
        NODE_ENV: 'production',
        MONGO_URI: 'mongodb://admin24:39bgkx6TPTuHUOC@giftplus.cluster-c9ywqq020ifo.us-east-1.docdb.amazonaws.com:27017/?tls=true&tlsCAFile=global-bundle.pem&replicaSet=rs0&readPreference=secondaryPreferred&retryWrites=false',
        EBAY_CLIENT_ID: 'GiftPlus-GiftPlus-PRD-0e5696659-bd30667e',
        EBAY_CLIENT_SECRET: 'PRD-e5696659502d-c33e-41f6-a438-eab3'
      }
    }
  ]
};
