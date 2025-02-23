export const regexForImage = /=>\[(image:.*?)\]/gm;

export const isEmptyLine = /\n\s*\n/g;
export const regexForAdvancedDecoder =
  // /(.*?)\s*=>\s*\(Глава (\d+)\)\s*(?:\(резултат (.*?)\))?\s*(?:\(на зар ([\d,]+)\))?\s*\[([^\]]+)\]/gm;
  /^=>\s*\(Глава (\d+)\)\s*(?:\(резултат (.*?)\))?\s*(?:\(на зар ([\d,]+)\))?\s*\[([^\]]+)\]/gm;

export const regexForSimpleDecoder = /\(Глава\s+(\d+)\)/g;
export const regexForSimpleDecoder2 = /(if\(.+\|\d+\|\d+)\)/g;
