import { Collection } from "mongodb";

export function replaceNulls(
  defaultThing: object,
  collection: Collection,
  requiredThings = {},
  avoidKeys: Array<string>
) {
  const defaultValues = Object.values(defaultThing);
  Object.keys(defaultThing).forEach((key, i) => {
    replaceKeyValue(
      key,
      defaultValues[i],
      collection,
      requiredThings,
      avoidKeys
    );
  });
}
function replaceKeyValue(
  key: string,
  value: any,
  collection: Collection,
  requiredThings: object,
  avoidKeys: Array<string>
) {
  if (avoidKeys.includes(key)) return;
  if (typeof value == "object") {
    const sValues = Object.values(value);
    Object.keys(value).forEach((key2, i) => {
      replaceKeyValue(
        key + "." + key2,
        sValues[i],
        collection,
        requiredThings,
        avoidKeys
      );
    });
  } else {
    console.log("key:", { ...requiredThings, [`${key}`]: undefined });

    collection.updateMany(
      { ...requiredThings, [`${key}`]: undefined },
      { $set: { [`${key}`]: value } }
    );
  }
}
