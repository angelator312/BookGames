import Markdown from "react-markdown";

export default function RenderText({ texts: arrayOfTexts }: { texts: string[] }) {
  //{...propertiesForColumnsWidth}
  return (
    <div className="chapter-text">
      {arrayOfTexts.map((e, i) => (
        <Markdown key={e + i}>{e}</Markdown>
      ))}
    </div>
  );
}
