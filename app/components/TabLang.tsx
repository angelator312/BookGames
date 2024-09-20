import {  Tab, Tabs } from "react-bootstrap";
import { Decoder } from "./decoder";

export function TabLang() {
  return (
    <Tabs
      defaultActiveKey="preview"
      id="uncontrolled-tab-example"
      className="mb-3"
    >
      <Tab eventKey={"Към глава x"} title={"Към глава x"}>
        <h1>{"Към глава x"}</h1>
        <p>
          Ще напишем "(Глава х)" и ако читателят
          <br /> натисне върху това ще отиде на глава x!
          <br />
          <Decoder text2={"(Глава 5)"} url="/helpLanguage" />
        </p>
      </Tab>
      <Tab
        eventKey={"числов въпрос за отиване към главата"}
        title={"числов въпрос за отиване към главата"}
      >
        <h1>{"Към глава x"}</h1>
        <p>
          Ще напишем "math(a|b|c)" и читателят
          <br />
          трябва да напише число и да натисне бутона
          <br />
          ако е вярно отива на глава
          <br />
          b иначе отива на глава c!
          <br />
          <Decoder text2={"(Глава 5) math(1|2|3)"} url="/helpLanguage" />
        </p>
      </Tab>
    </Tabs>
  );
}
