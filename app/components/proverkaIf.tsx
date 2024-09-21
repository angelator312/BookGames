import { useNavigate } from "@remix-run/react";
import { useState } from "react";
import { Button } from "react-bootstrap";
const reg = /if\((\d+\|\d+\|\d+)/g;
const reg2 = /(\d+)/g;
export function ProverkaIf({ e2, url }: { e2: string; url: string }) {
  const [valueOfI, setValueOfI] = useState("");
//   const [hrefOfA, setHrefOfA] = useState(url);
  const navigation = useNavigate();
  const a = e2.replace(/\\r/gm, "").split(reg);
  if (a.length < 3) {
    return <>a</>;
  }
  const e = a[1].replace(/\\r/gm, "").split(reg2);
  console.log(url, e[3]);
  return (
    <div>
      <input
        placeholder="Отговор"
        onChange={(e3) => setValueOfI(e3.target.value)}
        value={valueOfI}
      />
      {/* <a href={valueOfI == e[1] ?url+e[3]:url+e[5]}> */}
        <Button
          onClick={() =>
            valueOfI == e[1] ? navigation(url + e[3]) : navigation(url + e[5])
          }
        >
          Проверка на отговора!
        </Button>
      {/* </a> */}
    </div>
  );
}
