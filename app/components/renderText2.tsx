import { regexForImage } from "~/utils/regex";
import RenderText from "./renderText";

export default function RenderTextWithDecoder({ texts }: { texts: string }) {
  let textsPlImage: string[] = [];
  texts.split(regexForImage).forEach((line) => {
    textsPlImage.push(line);
  });
  
  return (
    <RenderText texts={textsPlImage}/>
  );
}
