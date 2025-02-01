export const regexForImage = /=>\[(image:.*?)\]/gm;

export const regexForAdvancedDecoder =
  /=>\s*(\(Глава .*?\))\s*(\(резултат .*?\))?\s*(\(на зар .*?\))?\s*(\[[^\]]+)]/gm;

export const regexForSimpleDecoder = /\(Глава\s+(\d+)\)/g;
export const regexForSimpleDecoder2 = /(if\(.+\|\d+\|\d+)\)/g;
