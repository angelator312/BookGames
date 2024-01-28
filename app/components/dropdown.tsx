import { useState } from "react";
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
  const [activeDropdown, setActiveDropdown] = useState(activeDrop-1 ?? 0);
  return (
    <Dropdown>
      <Dropdown.Toggle variant="success" id="dropdown-basic">
        Глава {activeDropdown+1}
      </Dropdown.Toggle>

      <Dropdown.Menu>
        {new Array(doN).fill(0).map((e, i) => (
          <Dropdown.Item
            href={`${url}/${i+1}`}
            key={i}
            active={i == activeDropdown}
            onClick={() => setActiveDropdown(i)}
          >
            Глава {i + 1}
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default DropDown1;
