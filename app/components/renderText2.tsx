import { regexForImage } from "~/utils/regex";
import RenderText from "./renderText";

export default function RenderTextWithDecoder({ texts }: { texts: string }) {
  let textsPlImage: string[] = [];
  let a: string[] = [];
  texts.split(regexForImage).forEach((line) => {
    a.push(line);
  });
  a.forEach((line) => {
    line
      .replace("\r", "\n")
      .split("\n\n")
      .forEach((e) => {
        textsPlImage.push(e);
      });
  });
  return (
    <RenderText texts={textsPlImage}/>
  );
}
