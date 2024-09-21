import { Dropdown } from "react-bootstrap";

function DropDown1({
  url,
  doN,
  activeDrop,
}: {
  url: string;
  doN: number;
  activeDrop: number;
}) {
  const activeDropdown= activeDrop-1 ;
  return (
    <Dropdown>
      <Dropdown.Toggle variant="success" id="dropdown-basic">
        Глава {activeDropdown + 1}
      </Dropdown.Toggle>
      <Dropdown.Menu>
        <Dropdown.Item
            href={`${url}/${doN+1}`}
        >
          Нова глава ({doN+1})
        </Dropdown.Item>
        <Dropdown.Divider />
        {new Array(doN).fill(0).map((e, i) => (
          <Dropdown.Item
            href={`${url}/${i + 1}`}
            key={i}
            active={i == activeDropdown}
          >
            Глава {i + 1}
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default DropDown1;
