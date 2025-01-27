import { useState } from "react";
import { Button } from "react-bootstrap";

export default function ZarcheComponent({
  broiZarcheta,
  onResult,
}: {
  broiZarcheta: number;
  onResult: (val: number) => void;
}) {
  const [value, setValue] = useState(0);
  // console.log(data);
  function rand() {
    let val = 0;
    for (let i = 0; i < broiZarcheta; i++) {
      val += Math.floor(Math.random() * 6 + 1);
    }
    return val;
  }
  if (value == 0) {
    return (
      <div>
        <Button
          onClick={() => {
            const a=rand();
            setValue(a);
            onResult(a);
          }}
        >
          Хвърли Зар
        </Button>
      </div>
    );
  } else
    return (
      <div>
        <p>Зарът е {value} </p>
      </div>
    );
}
