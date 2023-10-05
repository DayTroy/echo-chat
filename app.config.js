import 'dotenv/config';

export default {
  "expo": {
    "jsEngine": "jsc",
    "name": "EchoChat",
    "slug": "echo-chat",
    "version": "1.0.0",
    "orientation": "portrait",
    "icon": "./assets/images/project-logo.png",
    "userInterfaceStyle": "light",
    "splash": {
      "image": "./assets/images/project-logo.png",
      "resizeMode": "contain",
      "backgroundColor": "#ffffff"
    },
    "assetBundlePatterns": [
      "**/*"
    ],
    "ios": {
      "supportsTablet": true,
      "jsEngine": "jsc",
      "bundleIdentifier": "your.bundle.identifier",
    },
    "android": {
      "package": "com.daytroy.echochat",
      "adaptiveIcon": {
        "foregroundImage": "./assets/adaptive-icon.png",
        "backgroundColor": "#ffffff"
      }
    },
    "web": {
      "favicon": "./assets/favicon.png"
    },
    
    extra: {
      apiKey: process.env.API_KEY,
      authDomain: process.env.AUTH_DOMAIN,
      projectId: process.env.PROJECT_ID,
      storageBucket: process.env.STORAGE_BUCKET,
      messagingSenderId: process.env.MESSAGING_SENDER_ID,
      appId: process.env.APP_ID,
      "eas": {
        "projectId": "9d306e72-6576-47fb-b545-f5e5e6a93e10",
      },
    }
  }
}
