import { Collection } from "mongodb";

export function replaceNulls(
  defaultThing: object,
  collection: Collection,
  requiredThings = {},
  avoidKeys: Array<string>
) {
  for (const [key, value] of Object.entries(defaultThing)) {
    replaceKeyValue(key, value, collection, requiredThings, avoidKeys);
  }
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
    for (const [key2, value2] of Object.entries(value)) {
      replaceKeyValue(
        key + "." + key2,
        value2,
        collection,
        requiredThings,
        avoidKeys
      );
    }
  } else {
    console.log("key:", { ...requiredThings, [`${key}`]: undefined });

    collection.updateMany(
      { ...requiredThings, [`${key}`]: undefined },
      { $set: { [`${key}`]: value } }
    );
  }
}
