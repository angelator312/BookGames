import { Tab, Tabs } from "react-bootstrap";
import { DecoderSimple } from "./decoderSimple";

export function TabLang() {
  return (
    <div className=" p-4" style={{ textIndent: 20 }}>
      <Tabs
        defaultActiveKey="preview"
        id="uncontrolled-tab-example"
        className="mb-3"
      >
        <Tab eventKey={"Към глава x"} title={"Към глава x"}>
          <h1>{"Към глава x"}</h1>
          <p>
            Ще напишем "=>(Глава х)[ b]" и ако читателят
            <br /> натисне върху това ще отиде на глава x!
            <br />
            а това b е какво пише на бутона
          </p>
          <DecoderSimple text2={"(Глава 5)"} url="/helpLanguage#" />
        </Tab>
        
      </Tabs>
    </div>
  );
}
