"use client";
import { signup } from "@/app/actions/auth";
import { useActionState } from "react";

export default function SignupForm() {
  /*
  useActionState is a submit-result loop for the form. We first give it an initial action function, in this
  case signup which lets it know which server-action to bind to. Then we get back state, which is the latest 
  result from the action of the type defined by the first param, in this case signup. Then we get back action,
  which is the function that gets attached to to our form. Lastly, pending which is true whenever we are in
  the process of submission. 
  On an actual submit, the form sends formData to the action (signup), then it runs with the prev state, and
  the new data. Then the action returns something like an error, message, success, etc. This new return value
  then becomes the new state in the ui.
  */
  const [state, action, pending] = useActionState(signup, undefined);
  return (
    /*
        Action={signup} binds the form to a server action, so when the user submits it automatically calls the signuyp function with the form data.
        the htmlFor tag defines a text descripition for speicfic form control, basically it connects the label to the input. It does this
        by matching the htmlFor with the id. The input is where the user actually types and we have id as an attribute to link it back to the label,
        then the name is curcial for the server, because this is the key that the server uses to collect data. 
    */
    <form action={action}>
      <div>
        <label htmlFor="username">Username</label>
        <input id="username" name="username" placeholder="username" />
      </div>
      {state?.errors?.username && <p>{state.errors.username}</p>}
      <div>
        <label htmlFor="email">Email</label>
        <input id="email" name="email" type="email" placeholder="Email" />
      </div>
      {state?.errors?.email && <p>{state.errors.email}</p>}
      <div>
        <label htmlFor="password">Password</label>
        <input id="password" name="password" type="password" />
      </div>
      {state?.errors?.password && (
        <div>
          <p>Password must:</p>
          <ul>
            {state.errors.password.map((error) => (
              <li key={error}>- {error}</li>
            ))}
          </ul>
        </div>
      )}
      <button type="submit" disabled={pending}>
        Sign Up
      </button>
    </form>
  );
}
