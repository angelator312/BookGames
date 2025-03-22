import { Collection } from "mongodb";

export function replaceNulls(defaultThing:object,collection:Collection) {
  const defaultValues = Object.values(defaultThing);

  Object.keys(defaultThing).forEach((key, i) => {
    collection.updateMany(
      { [`${key}`]: undefined },
      { $set: { [`${key}`]: defaultValues[i] } }
    );
    if (typeof defaultValues[i] == "object") {
      const defaultSettings = defaultValues[i];
      const sValues = Object.values(defaultSettings);
      Object.keys(defaultSettings).forEach((key2, i) => {
        collection.updateMany(
          { [`${key}.${key2}`]: undefined },
          { $set: { [`${key}.${key2}`]: sValues[i] } }
        );
      });
    }
  });
}
