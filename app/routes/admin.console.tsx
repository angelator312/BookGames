import type { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { Col, Container, Form, Row } from "react-bootstrap";
import { requireUserId } from "~/utils/session.server";
import getUserStore from "~/utils/userStore";
export const action = async ({ request }: ActionFunctionArgs) => {
  const userId = await requireUserId(request);
    if (typeof userId === "string") {
      const uStore=(await getUserStore());
      const user = await uStore.isAdmin(userId);
      if (user) {

        await uStore.FixDatabase();
        return null;
      }
    }
}
export const loader = async ({ request }: LoaderFunctionArgs) => {
  const a = await requireUserId(request, false);
  // console.log(a);
  // console.log(await knigi(a));

  if (typeof a === "string") {
    const user = await (await getUserStore()).isAdmin(a);
    if (user) return null;
  }
  return redirect("/");
};
export default function AdminRoute() {
  return (
    <Container>
      <Row>
        <Col>
          <h1>Admin Console</h1>
        </Col>
      </Row>
      <Row>
        <Col>
          <Form method="POST" action="/admin/console">
            <Form.Control type="submit"
            value={"Update Users"}
            />
            
          </Form>
        </Col>
      </Row>
    </Container>
  );
}
