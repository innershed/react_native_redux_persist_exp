import {FileSystem} from 'expo';

let options = {
  path: `${FileSystem.documentDirectory}/store`,
  encoding: FileSystem.EncodingTypes.UTF8,
  toFileName: (name) => name.split(':').join('-'),
  fromFileName: (name) => name.split('-').join(':')
};

const pathForKey = (key) => `${options.path}/${options.toFileName(key)}`;

const ExpoFileSystemStorage = {
  config: (custom) => { options = {...options, custom}; },

  setItem: async (key, value, callback) => {
    const info = await FileSystem.getInfoAsync(options.path);
    if (info.exists === false)
      await FileSystem.makeDirectoryAsync(options.path, {intermediates: true});
    return FileSystem.writeAsStringAsync(pathForKey(key), JSON.stringify(value))
    .then(() => {
      callback && callback();
    })
    .catch(error => {
      callback && callback(error);
    });
  },

  getItem: async (key, callback) => {
    const info = await FileSystem.getInfoAsync(options.path);
    if (info.exists === false)
      await FileSystem.makeDirectoryAsync(options.path, {intermediates: true});
    return FileSystem.readAsStringAsync(pathForKey(key))
    .then(data => {
      callback && callback(null, data);
      if (!callback)
        return JSON.parse(data);
    })
    .catch(error => {
      callback && callback(error);
      if (!callback)
        throw error;
    });
  },

  removeItem: async (key, callback) => {
    return FileSystem.deleteAsync(pathForKey(key), {idempotent: true})
    .then(() => {
      callback && callback();
    });
  },
};

export default ExpoFileSystemStorage;
