import { ActionFunction, json, LinksFunction, useActionData } from "remix";
import { useSearchParams } from "remix";

import { createUserSession, login, register } from "~/utils/session.server";
import { db } from "~/utils/db.server";

import stylesUrl from "../styles/login.css";

export const links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: stylesUrl }];
};

function validateUsername(username: unknown) {
  if (typeof username !== "string" || username.length < 3) {
    return `Usernames must be at least 3 characters long`;
  }
}

function validatePassword(password: unknown) {
  if (typeof password !== "string" || password.length < 6) {
    return `Passwords must be at least 6 characters long`;
  }
}

type ActionData = {
  formError?: string;
  fieldErrors?: {
    username: string | undefined;
    password: string | undefined;
  };
  fields?: {
    loginType: string;
    username: string;
    password: string;
  };
};

const badRequest = (data: ActionData) => json(data, { status: 400 });

export const action: ActionFunction = async ({ request }) => {
  const form = await request.formData();
  const loginType = form.get("loginType");
  const username = form.get("username");
  const password = form.get("password");
  const redirectTo = form.get("redirectTo") || "/notes";
  if (
    typeof loginType !== "string" ||
    typeof username !== "string" ||
    typeof password !== "string" ||
    typeof redirectTo !== "string"
  ) {
    return badRequest({
      formError: `Form not submitted correctly.`,
    });
  }

  const fields = { loginType, username, password };
  const fieldErrors = {
    username: validateUsername(username),
    password: validatePassword(password),
  };
  if (Object.values(fieldErrors).some(Boolean))
    return badRequest({ fieldErrors, fields });

  switch (loginType) {
    case "login": {
      const user = await login({ username, password });
      if (!user) {
        return badRequest({
          fields,
          formError: `Username/Password combination is incorrect`,
        });
      }

      return createUserSession(user.id, redirectTo);
    }
    case "register": {
      const userExists = await db.user.findFirst({
        where: { username },
      });

      console.log("register user", userExists);
      if (userExists) {
        return badRequest({
          fields,
          formError: `User with username ${username} already exists`,
        });
      }
      const user = await register({ username, password });
      if (!user) {
        return badRequest({
          fields,
          formError: `Something went wrong trying to create a new user.`,
        });
      }
      return createUserSession(user.id, redirectTo);
    }
    default: {
      return badRequest({
        fields,
        formError: `Login type invalid`,
      });
    }
  }
};

export default function Login() {
  const actionData = useActionData<ActionData>();
  const [searchParams] = useSearchParams();
  return (
    <section className="bg-white py-20 lg:py-[120px] relative z-10">
      <div className="container">
        <div className="flex lg:justify-between -mx-4 flex-auto">
          <div className="w-full rounded-lg shadow-xl overflow-hidden">
            <form method="post">
              <input
                type="hidden"
                name="redirectTo"
                value={searchParams.get("redirectTo") ?? undefined}
              />
              <fieldset>
                <legend className="sr-only">Login or Register?</legend>
                <div className="radio">
                  <input
                    id="login"
                    type="radio"
                    name="loginType"
                    value="login"
                    defaultChecked
                  />
                  <label htmlFor="login" className="transition">
                    Login
                  </label>
                </div>
                <div className="radio">
                  <input
                    id="register"
                    type="radio"
                    name="loginType"
                    value="register"
                  />
                  <label htmlFor="register" className="transition">
                    Register
                  </label>
                </div>
              </fieldset>
              <div className="bg-white relative p-8 sm:p-12">
                <div className="mt-4">
                  <label htmlFor="username-input" className="font-extralight">
                    Username
                  </label>
                  <input
                    type="text"
                    id="username-input"
                    name="username"
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
                  />
                </div>
                <div className="mt-2">
                  <label htmlFor="password-input" className="font-extralight">
                    Password
                  </label>
                  <input
                    id="password-input"
                    name="password"
                    type="password"
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
                  />
                </div>

                <div id="form-error-message">
                  {actionData?.formError ? (
                    <p className="form-validation-error" role="alert">
                      {actionData.formError}
                    </p>
                  ) : null}
                </div>

                <button
                  type="submit"
                  className="w-full
                    text-white
                    bg-purple
                    rounded
                    p-3
                    transition
                    hover:bg-opacity-90 mt-6"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
