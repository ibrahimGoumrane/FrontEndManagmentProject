import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { UnauthorizedError } from "../../../errors/http_errors";
import * as User from "../../../models/Users";
import { Login } from "../../../network/UserApi";
import { validationSchemaLogin } from "../Form/VlidationSchema";
import { loginFields } from "../Form/formFields";
import FormAction from "../../utils/Button";
import Input from "../../utils/Input";
import Policies from "../../utils/policies";

interface LoginModalProps {
  onLoginSuccessfull: (user: User.User) => void;
}

//gather input data
const fields = loginFields;

export default function LoginModal({ onLoginSuccessfull }: LoginModalProps) {
  const [errorText, setErrorText] = useState<string | null>(null);
  const formOptions = {
    resolver: yupResolver(validationSchemaLogin),
  };

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<User.LogInCredentials>(formOptions);

  async function onSubmit(credentials: User.LogInCredentials) {
    try {
      const newUser = await Login(credentials);
      if (newUser) {
        onLoginSuccessfull(newUser);
      }
    } catch (error) {
      if (error instanceof UnauthorizedError) {
        setErrorText(error.message);
      } else {
        setErrorText("An error occurred");
      }
      console.error(error);
    }
  }

  return (
    <form
      className="my-10 space-y-6 xl:w-5/6 sm:max-w-[75vw] sm:w-[75vw] sm:px-32 w-screen "
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="space-y-6">
        {errorText && (
          <div className="text-red-500 font-mono font-bold text-center uppercase">
            {errorText}
          </div>
        )}
        {fields.map((field, index) => (
          <Input
            key={index}
            labelText={field.labelText}
            labelFor={field.labelFor}
            name={field.name}
            register={register}
            placeholder={field.placeholder}
            autoComplete={field.autoComplete}
            error={errors[field.name]?.message}
            type={field.type}
          />
        ))}

        <FormAction
          text="Login"
          type="Button"
          action="submit"
          isSubmitting={isSubmitting}
        />
        <Policies
          paragraph="Dont have an account Yet ? Sign Up "
          linkName="here"
          linkUrl="/signup"
        />
      </div>
    </form>
  );
}
