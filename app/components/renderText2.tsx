import RenderText from "./renderText";

export default function RenderTextWithDecoder({ texts }: { texts: string }) {
  return (
    <RenderText texts={[texts]}/>
  );
}
