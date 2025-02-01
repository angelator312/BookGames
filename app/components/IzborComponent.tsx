import type { Izbor } from "./decoderAdvanced";
import FormComponent from "./formComp";

export default function IzborComponent({izbor,url,flag}: {izbor:Izbor,url:string,flag:boolean}) {
  // [number,number,number,string]} ) {
  // console.log(izbor);
  return (
      <FormComponent
        disabled={izbor.disabled}
        textForSubmit={izbor.text}
        to={flag ? `${url}` : `${url}/${izbor.glava}`}
        textsHidden={[izbor.glava.toString(),izbor.scoreChange.toString()]}
        namesHidden={["to","rezultat"]}
        submitVariant="outline-secondary"
      />
  );
}
