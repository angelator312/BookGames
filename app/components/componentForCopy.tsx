import { useLoaderData } from "@remix-run/react";
import { Col, Row } from "react-bootstrap";

export const loader = async () => {
  return ;
};
export const action = async () => {
  return;
};

export default function Sandwiches() {
  const data = useLoaderData<typeof loader>();
// console.log(data);

  return (
    <div>
      <Row>
        <Col>
        
        </Col>
      </Row>
    </div>
    
  );
}
