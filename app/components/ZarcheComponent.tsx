import { useState } from "react";

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
  function rollDice(result: number, dice: any) {
    dice.dataset.side = result;
    dice.classList.toggle("reRoll");

    // console.log(result);
  }
  return (
    <div
      className="dice"
      data-side="1"
      onClick={(e) => {
        if (value == 0) {
          const a = rand();

          rollDice(a, e.currentTarget);
          setValue(a);
          onResult(a);
        }
      }}
    >
      <div className="sides side-1">
        <span className="dot dot-1"></span>
      </div>
      <div className="sides side-2">
        <span className="dot dot-1"></span>
        <span className="dot dot-2"></span>
      </div>
      <div className="sides side-3">
        <span className="dot dot-1"></span>
        <span className="dot dot-2"></span>
        <span className="dot dot-3"></span>
      </div>
      <div className="sides side-4">
        <span className="dot dot-1"></span>
        <span className="dot dot-2"></span>
        <span className="dot dot-3"></span>
        <span className="dot dot-4"></span>
      </div>
      <div className="sides side-5">
        <span className="dot dot-1"></span>
        <span className="dot dot-2"></span>
        <span className="dot dot-3"></span>
        <span className="dot dot-4"></span>
        <span className="dot dot-5"></span>
      </div>
      <div className="sides side-6">
        <span className="dot dot-1"></span>
        <span className="dot dot-2"></span>
        <span className="dot dot-3"></span>
        <span className="dot dot-4"></span>
        <span className="dot dot-5"></span>
        <span className="dot dot-6"></span>
      </div>
    </div>
  );
}
