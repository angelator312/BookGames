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
            Ще напишем "(Глава х)" и ако читателят
            <br /> натисне върху това ще отиде на глава x!
            <br />
          </p>
          <DecoderSimple text2={"(Глава 5)"} url="/helpLanguage#" />
        </Tab>
        <Tab
          eventKey={"въпрос за отиване към главата"}
          title={"Въпрос за отиване към глава"}
        >
          <h1>{"Към глава x"}</h1>
          <p>
            Ще напишем "if(a|b|c)" и читателят
            <br />
            трябва да напише d и да натисне бутона
            <br />
            ако е равно на a отива на глава b
            <br />
            иначе отива на глава c!
            <br />
            ( а - може да е всичко, освен 1 интервал )
            <br />
            
          </p>
          <DecoderSimple
            text2={"(Глава 5) if(1|2|3)"}
            url="/helpLanguage#"
            flag1={false}
          />
        </Tab>
      </Tabs>
    </div>
  );
}
