export default function Text({
  glava,
  furst2Lines,
  textLines,
  text2Lines,
  flag1 = true,
  url,
}: {
  glava: string |number;
  furst2Lines: string[];
  textLines: string[];
  text2Lines: string[];
  flag1?: boolean;
  url: string;
}) {
  return (
    <div className="bg-i" style={{ textIndent: 20 }}>
      {/*
          <button
            // className=" btn-menu-my"
            // onClick={() => {
            //   console.log(vis);
            //   if (!vis || vis == "none") {
            //     setVis("block");
            //   } else setVis("none");
            // }}
          >
            <img width={30} height={30} src={menu} alt="menu button" />
          </button> */}
      <h2 className="text-bold ">Глава {glava} </h2>
      <h2 className="text-bold  p-3">{furst2Lines[0]} </h2>
      <p className="text-bold p-3 text-j in-2 ">{furst2Lines[1]}</p>
      {textLines.map((e, i) => (
        <p className="text-bold p-3 text-j in-2 " key={i}>
          {" "}
          {e}
        </p>
      ))}
      {text2Lines.map((e, i) => (
        <div key={i}>
          {i % 2 == 0 ? (
            <p className="p-3 text-bold text-j in-1 " key={i}>
              {" "}
              {e}
            </p>
          ) : (
            <form
              action={flag1 ? `${url}` : `${url}/${e}`}
              style={{ display: "inline" }}
              method="POST"
            >
              <input type="hidden" name="to" value={e} />
              <button type="submit" className="logo text-">
                Глава {e}
              </button>
            </form>
          )}
        </div>
      ))}
    </div>
  );
}
