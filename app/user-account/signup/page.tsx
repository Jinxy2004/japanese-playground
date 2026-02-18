import { signup } from "@/app/actions/auth";

export function Signup() {
  return (
    /*
        Action={signup} binds the form to a server action, so when the user submits it automatically calls the signuyp function with the form data.
        the htmlFor tag defines a text descripition for speicfic form control, basically it connects the label to the input. It does this
        by matching the htmlFor with the id. The input is where the user actually types and we have id as an attribute to link it back to the label,
        then the name is curcial for the server, because this is the key that the server uses to collect data. 
    */
    <form action={signup}>
      <div>
        <label htmlFor="username">Username</label>
        <input id="username" name="username" placeholder="username" />
      </div>
      <div>
        <label htmlFor="email">Email</label>
        <input id="email" name="email" type="email" placeholder="Email" />
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input id="password" name="password" type="password" />
      </div>
      <button type="submit">Sign Up</button>
    </form>
  );
}
