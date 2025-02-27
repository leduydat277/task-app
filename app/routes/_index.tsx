// app/routes/index.tsx
import { json } from "@remix-run/node";
import { Form, Link, useLoaderData } from "@remix-run/react";
import { Page, Button, TextField, BlockStack, InlineStack } from "@shopify/polaris";
import TaskList from "~/components/TaskList";
import Task from "~/models/Task.server";


export const loader = async ({ request }: { request: Request }) => {
  const url = new URL(request.url);
  const q = url.searchParams.get("q") || "";

  let tasks;
  if (q) {
    tasks = await Task.find({
      title: { $regex: q, $options: "i" }
    }).lean();
  } else {
    tasks = await Task.find().lean();
  }

  return json({ tasks });
};

export default function Index() {
  const data = useLoaderData<typeof loader>();

  return (
    <Page title="Quản lý công việc">
      <BlockStack vertical spacing="loose">
        <InlineStack gap="4">
          <Form method="get">
            <TextField
              label="Tìm kiếm"
              name="q"
              placeholder="Nhập tiêu đề công việc..."
              defaultValue=""
            />
            <Button submit primary>
              Tìm kiếm
            </Button>
          </Form>
          <Link url="/createTask">Add Task</Link>;
        </InlineStack>
        <TaskList tasks={data.tasks} />
      </BlockStack>
    </Page>
  );
}
