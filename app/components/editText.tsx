import FormComponent from "./formComp";

export default function EditText({
  param,
}: {
  param: {
    text: string;
    text2: string;
    glava: string | number;
    bUrl: string;
    setText: Function;
    setText2: Function;
    priIzvikvane: Function;
  };
}) {
  const { text, text2, glava, bUrl, setText, setText2, priIzvikvane } = param;
  return (
    <div>
      <textarea
        defaultValue={text ?? ""}
        placeholder="Здравей,Човече"
        onChange={(e) => {
          setText(e.target.value ?? "");
          if (priIzvikvane) {
            priIzvikvane();
          }
        }}
        name="text"
      ></textarea>
      <p>
        За нов абзац два празни реда<strong>↑↑↑</strong>
        <br />
        Текста в който пише изборите на читателя <strong>↓↓↓</strong>
      </p>
      <textarea
        placeholder="Към Тъмната гора (Глава 2)"
        // @ts-ignore
        defaultValue={text2 ?? ""}
        onChange={(e) => {
          // console.log(e.target.innerHTML);
          // @ts-ignore
          setText2(e.target.value ?? "");
          if (priIzvikvane) {
            priIzvikvane();
          }
        }}
      ></textarea>
      <p>
        За линк към друга глава :(Глава число) <strong>↑↑↑</strong>
      </p>
      <br />
      <FormComponent
        textsHidden={[text, text2]}
        to={`/myBook/${bUrl}/${glava}/save`}
        textForSubmit="Запази промените"
      />
    </div>
  );
}
