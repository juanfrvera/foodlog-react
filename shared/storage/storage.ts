import AsyncStorage from "@react-native-async-storage/async-storage";

export namespace storage {
  export const storeData = async (key: string, value) => {
    try {
      // Check if value is string or object
      if (isString(value)) {
        await AsyncStorage.setItem(key, value);
      } else {
        const jsonValue = JSON.stringify(value);
        await AsyncStorage.setItem(key, jsonValue);
      }
    } catch (e) {
      // saving error
      throw new Error("Error saving data");
    }
  };

  export const getData = async <T>(key: string) => {
    try {
      const value = await AsyncStorage.getItem(key);

      if (value === null) {
        return null;
      }

      return JSON.parse(value) as T;
    } catch (e) {
      // error reading value
      throw new Error("Error reading data");
    }
  };

  function isString(value) {
    return typeof value === "string";
  }
}
