import { useNavigate } from "@remix-run/react";
import { useState } from "react";
import { Button, Form, InputGroup } from "react-bootstrap";
const reg = /if\((.+\|\d+\|\d+)/g;
const reg2 = /(.+)/g;
export function ProverkaIf({
  e2,
  url,
  flag1 = true,
}: {
  e2: string;
  url: string;
  flag1?: boolean;
}) {
  const [valueOfI, setValueOfI] = useState("");
  //   const [hrefOfA, setHrefOfA] = useState(url);
  const navigation = useNavigate();
  const a = e2.replace(/\r/gm, "").split(reg);
  if (a.length < 3) {
    return <>a</>;
  }
  let e4 = a[1].replace(/\r/gm, "").split(reg2);
  //   e=e.slice(1)
  let e = e4.map((ei) => ei.replace(/\r/gm, "").split(/\|/))[1];
  // console.log("e:", e);
  // console.log("e:", valueOfI);
  //   console.log("e2",e2);
  if (flag1)
    return (
      <Form className="ms-3" method="post" action={url}>
        <InputGroup className="mb-3">
          <input
            placeholder="Отговор"
            onChange={(e3) => setValueOfI(e3.target.value)}
            value={valueOfI}
          />
        </InputGroup>
        <InputGroup className="mb-3">
          {/* <a href={valueOfI == e[1] ?url+e[3]:url+e[5]}> */}
          <Button type="submit">Проверка на отговора!</Button>
          {/* </a> */}
        </InputGroup>
        <Form.Control
          type="hidden"
          name="to"
          value={valueOfI.trim() == e[0].trim() ? e[1].trim() : e[2].trim()}
        />
      </Form>
    );
  else
  {
    // console.log(url+e[1]);
    
    return (
      <div className="ms-3">
        <InputGroup className="mb-3">
          <input
            placeholder="Отговор"
            onChange={(e3) => setValueOfI(e3.target.value)}
            value={valueOfI}
          />
        </InputGroup>
        <InputGroup className="mb-3">
          {/* <a href={valueOfI == e[1] ?url+e[3]:url+e[5]}> */}
          <Button
            onClick={() =>
              valueOfI == e[0] ? navigation(url + e[1]) : navigation(url + e[2])
            }
          >
            Проверка на отговора!
          </Button>
          {/* </a> */}
        </InputGroup>
      </div>
    );
  }
}
