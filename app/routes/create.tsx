import {
  ActionFunction,
  Form,
  redirect,
  useActionData,
  useTransition,
} from "remix";
import { db } from "~/utils/db.server";

type ActionData = {
  formError?: string;
  fieldErrors?: {
    title: string | undefined;
    content: string | undefined;
  };
  fields?: {
    title: string;
    content: string;
  };
};

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const title = formData.get("title");
  const content = formData.get("content");

  if (typeof title !== "string" || typeof content !== "string") {
    return { formError: `Form not submitted correctly.` };
  }

  const note = await db.note.create({
    data: { title, content },
  });

  return redirect(`/`);
};

export default function Index() {
  const transition = useTransition();
  const actionData = useActionData<ActionData | undefined>();

  return (
    <Form className="w-full max-w-lg" method="post">
      <div className="w-full">
        <label className="block tracking-wide text-purple text-xs font-bold">
          title:
          <br />
          <input
            type="text"
            name="title"
            id="note-title"
            className="border border-purple rounded py-1 pr-1 pl-3 mb-3 mt-1 leading-tight focus:outline-none text-sm text-black"
            required
          />
        </label>
      </div>

      <div className="w-full">
        <label className="block tracking-wide text-purple text-xs font-bold mb-2">
          content:
          <br />
          <textarea
            name="content"
            id="note-content"
            className="border border-purple rounded py-1 pr-1 pl-3 mb-3 mt-1 focus:outline-none text-sm text-black"
            required
          />
        </label>
      </div>

      <button
        type="submit"
        className="flex-shrink-0 border-transparent text-sm py-1 px-2 rounded bg-purple text-white"
      >
        Create
      </button>
    </Form>
  );
}
