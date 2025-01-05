import { DecoderAdvanced } from "./decoderAdvanced";
import { DecoderSimple } from "./decoderSimple";
const reg =
  /=>\s*(\(Глава .*?\))\s*(\(резултат .*?\))?\s*(\(на зар .*?\))?\s*\[([^\]]+)]/gm;
export function Decoder({
  text2: text,
  flag1 = true,
  url,
}: {
  text2: string;
  flag1?: boolean;
  url: string;
}) {
  console.log(text);
  
  if (text.split(reg).length > 1)
    return <DecoderAdvanced text2={text} flag1={flag1} url={url} />;
  else return <DecoderSimple text2={text} flag1={flag1} url={url} />;
}
