import { Dropdown } from "react-bootstrap";

function DropDown1({
  url,
  doN: doGlavaN,
  activeDrop: activeDropdownInd,
}: {
  url: string;
  doN: number;
  activeDrop: number;
}) {
  const activeDropdown= activeDropdownInd-1 ;
  return (
    <Dropdown>
      <Dropdown.Toggle variant="success" id="dropdown-basic">
        Глава {activeDropdown + 1}
      </Dropdown.Toggle>
      <Dropdown.Menu>
        <Dropdown.Item
            href={`${url}/${doGlavaN+1}`}
        >
          Нова глава ({doGlavaN+1})
        </Dropdown.Item>
        <Dropdown.Divider />
        {new Array(doGlavaN).fill(0).map((e, i) => (
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
