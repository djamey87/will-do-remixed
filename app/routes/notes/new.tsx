import {
  ActionFunction,
  Form,
  redirect,
  useActionData,
  useTransition,
} from "remix";
import { db } from "~/utils/db.server";
import { requireUserId } from "~/utils/session.server";

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
  const userId = await requireUserId(request);
  const formData = await request.formData();
  const title = formData.get("title");
  const content = formData.get("content");

  if (typeof title !== "string" || typeof content !== "string") {
    return { formError: `Form not submitted correctly.` };
  }

  const note = await db.note.create({
    data: { title, content, authorId: userId },
  });

  return redirect(`/notes`);
};

export default function Index() {
  const transition = useTransition();
  const actionData = useActionData<ActionData | undefined>();

  return (
    <section className="bg-white py-20 lg:py-[120px] relative z-10">
      <div className="container">
        <div className="flex flex-wrap lg:justify-between -mx-4">
          <div className="w-full lg:w-3/4 px-4">
            <div className="bg-white relative rounded-lg p-8 sm:p-12 md:shadow-xl">
              <Form className="w-full" method="post">
                <div className="mb-6">
                  <input
                    type="text"
                    name="title"
                    id="note-title"
                    defaultValue={actionData?.fields?.title}
                    placeholder="Title"
                    className="w-full
                    rounded
                    py-2
                    px-[14px]
                    text-body-color text-base
                    border border-grey
                    outline-none
                    focus-visible:shadow-none
                    focus:border-primary"
                    required
                    aria-invalid={
                      Boolean(actionData?.fieldErrors?.title) || undefined
                    }
                    aria-describedby={
                      actionData?.fieldErrors?.title ? "name-error" : undefined
                    }
                  />

                  {actionData?.fieldErrors?.title ? (
                    <p
                      className="form-validation-error"
                      role="alert"
                      id="title-error"
                    >
                      {actionData.fieldErrors.title}
                    </p>
                  ) : null}
                </div>

                <div className="mb-6">
                  <textarea
                    name="content"
                    id="note-content"
                    className="w-full
                    rounded
                    py-2
                    px-[14px]
                    text-body-color text-base
                    border border-grey
                    resize-none
                    outline-none
                    focus-visible:shadow-none
                    focus:border-primary"
                    rows={6}
                    placeholder="Content"
                    defaultValue={actionData?.fields?.content}
                    required
                    aria-invalid={
                      Boolean(actionData?.fieldErrors?.content) || undefined
                    }
                    aria-describedby={
                      actionData?.fieldErrors?.content
                        ? "content-error"
                        : undefined
                    }
                  />

                  {actionData?.fieldErrors?.title ? (
                    <p
                      className="form-validation-error"
                      role="alert"
                      id="content-error"
                    >
                      {actionData.fieldErrors.content}
                    </p>
                  ) : null}
                </div>

                <div>
                  <button
                    type="submit"
                    className=" w-full
                    text-white
                    bg-purple
                    rounded
                    p-3
                    transition
                    hover:bg-opacity-90"
                  >
                    Create
                  </button>
                </div>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function ErrorBoundary() {
  return <div>Something unexpected went wrong, while creating your note.</div>;
}
