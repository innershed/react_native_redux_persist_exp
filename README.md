# Redux persist storage based on Expo's FileSystem
Storage adaptor that uses [Expo's FileSystem](https://docs.expo.io/sdk/latest/FileSystem.md) with [redux-persist](https://github.com/rt2zz/redux-persist), implementing `setItem`, `getItem`, and `removeItem`.
Data is serialized into JSON and stored in a file on the persistor's key name. This storage can be used on Android to prevent issues with the storage limitations in the RN AsyncStorage implementation. (See [redux-persist#199](https://github.com/rt2zz/redux-persist/issues/199), [redux-persist#284](https://github.com/rt2zz/redux-persist/issues/284)).

## Installation
Add the repository to your dependencies in your `package.json`. NPM package coming soon-ish, maybe?

## Usage
Simply use 'ExpoFileSystemStorage' as the storage option in the redux-persist config.
```javascript
import ExpoFileSystemStorage from 'redux-persist-expo-filesystem-storage'
...

const config = {
  key: 'root',
  storage: ExpoFileSystemStorage,
}

...
```

## Usage with custom options
`ExpoFileSystemStorage` supports a few custom options which can be set globally through the `config` method.
```javascript
import ExpoFileSystemStorage from 'redux-persist-expo-filesystem-storage'
...

ExpoFileSystemStorage.config({
     storagePath: `${FileSystem.documentDir}customStorageDirectory`
});

const config = {
  key: 'root',
  storage: ExpoFileSystemStorage
}

...
```

## Acknowledgement
I'd like to acknowledge Rob Walker for his [redux-persist-filesytem-storage](https://github.com/robwalkerco/redux-persist-filesystem-storage) package, as this is largely an adaptation of that.
