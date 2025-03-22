import { Collection } from "mongodb";

export function replaceNulls(
  defaultThing: object,
  collection: Collection,
  requiredThings = {},
  avoidKeys: Array<string>
) {
  Object.entries(defaultThing).forEach((key, i) => {
    replaceKeyValue(
      key[0],
      key[1],
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
    Object.entries(value).forEach((key2, i) => {
      replaceKeyValue(
        key + "." + key2[0],
        key2[1],
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
