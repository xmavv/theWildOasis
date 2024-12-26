import { useState } from "react";

import Button from "../../ui/Button";
import Form from "../../ui/Form";
import Input from "../../ui/Input";
import FormRow from "../../ui/FormRow";
import SpinnerMini from "../../ui/SpinnerMini";

import { useLogin } from "./useLogin";

function LoginForm() {
  const [email, setEmail] = useState("mav@example.com");
  const [password, setPassword] = useState("siemajol");

  const { login, isLoading } = useLogin();

  function handleSubmit(e) {
    e.preventDefault();
    if (!email || !password) return;

    login({ email, password });
  }

  return (
    <Form onSubmit={handleSubmit}>
      <FormRow vertical={true} label="Email address">
        <Input
          type="email"
          id="email"
          disabled={isLoading}
          // This makes this form better for password managers
          autoComplete="username"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </FormRow>
      <FormRow vertical={true} label="Password">
        <Input
          type="password"
          id="password"
          disabled={isLoading}
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </FormRow>
      <FormRow vertical={true}>
        <Button disabled={isLoading} size="large">
          {!isLoading ? "Log in" : <SpinnerMini />}
        </Button>
      </FormRow>
    </Form>
  );
}

export default LoginForm;
