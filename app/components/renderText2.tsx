import RenderText from "./renderText";

export default function RenderTextFrom1String({ texts }: { texts: string }) {
  return (
    <RenderText texts={[texts]}/>
  );
}
