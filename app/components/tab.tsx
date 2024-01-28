import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import EditText from "./editText";

function UncontrolledExample({
  text,
  text2,
  glava,
  url,
  setText,
  setText2,
  furst2Lines,
  textLines,
  text2Lines,
  flag1 = true,
  url,
}: {
  text: string;
  text2: string;
  glava: string | number;
  url: string;
  setText: Function;
  setText2: Function;
}) {
  return (
    <Tabs
      defaultActiveKey="edit"
      id="uncontrolled-tab-example"
      className="mb-3"
    >
      <Tab eventKey="edit" title="Edit text">
        <EditText
          param={{ text, text2, glava, bUrl: url, setText, setText2 }}
        />
      </Tab>
      <Tab eventKey="preview" title="Preview">
        Tab content for Profile
      </Tab>
      <Tab eventKey="editAndPreview" title="Edit and preview"></Tab>
      <EditText param={{ text, text2, glava, bUrl: url, setText, setText2 }} />
    </Tabs>
  );
}

export default UncontrolledExample;
