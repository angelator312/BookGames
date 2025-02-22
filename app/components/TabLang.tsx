import { Tab, Tabs } from "react-bootstrap";
import { DecoderSimple } from "./decoderSimple";
import { DecoderAdvanced } from "./decoderAdvanced";
import { useSearchParams } from "@remix-run/react";

export function TabLang() {
  const [searchPar, setSearchParams] = useSearchParams();
  return (
    <Tabs
      defaultActiveKey={searchPar.get("default") ?? "Най-важно"}
      id="uncontrolled-tab-example"
      className="mb-3"
      onSelect={(e) => {
        searchPar.set("default", e ?? ""), setSearchParams(searchPar);
      }}
    >
      <Tab title={"Най-важно"} eventKey={"Най-важно"}>
        <p>
          изборите са след --- <br />
          Всичко е описано в Помощ и нещата за вмъкване се вмъкват чрез бутона
          <br />
          Ако искате да ви е по-лесно редактирайте в уголемен прозорец
          <br />
          Поддържаме{" "}
          <a
            href=""
            onClick={() =>
              window.open("https://www.markdownguide.org/basic-syntax/")
            }
          >
            Markdown
          </a>
          <br />
          Почти всичко,което е поддържано от тях е функционално,
          <br />
          но всички допълнителни неща са във "Вмъкни "
        </p>
      </Tab>
      <Tab eventKey={"Към глава x"} title={"Към глава x"}>
        <h1>{"Към глава x"}</h1>
        <p>
          Ще натиснем бутона Вмъкване след това ще изберем вмъкване на глава(ще
          попълним в изскачащото прозорче всичко)
          <br />
          и ако читателят натисне върху бутончето ще отиде на глава x!
          <br />а това b е текста в бутона(Сам си решаваш какво да пише)
        </p>
        <DecoderAdvanced text2={"Бутон=>(Глава 2)[ b]"} url="/helpLanguage#" />
      </Tab>

      <Tab
        eventKey={"Към глава x,2"}
        title={"Към глава x, с промяна на резултат"}
      >
        <h1>{"Към глава x, с промяна на резултат"}</h1>
        <p>
          Ще натиснем бутона Вмъкване след това ще изберем вмъкване на глава, с
          резултат(ще попълним в изскачащото прозорче всичко)
          <br />
          и ако читателят натисне върху бутончето ще отиде на глава x, но и ще
          получи + толкова към резултат,
          <br />
          колкото сте му задали(може и отрицателни числа)
          <br />
          Подсказка:Резултат може да бъде използвано като живот(В следваща
          версия ще разбереш)!
        </p>
        <DecoderAdvanced
          text2={"Бутон=>(Глава 2)(резултат 5)[ b]"}
          url="/helpLanguage#"
        />
      </Tab>
      <Tab
        eventKey={"Неработещи неща от маркдауна"}
        title={"Неработещи неща от маркдауна"}
      >
        <h1>{"Неработещи неща от маркдауна"}</h1>
        <ul>
          <li>
            Таблиците
          </li>
        </ul>
        Ако намерите нещо не работещо напишете в Github(линка е в menu бутона)
      </Tab>
    </Tabs>
  );
}
