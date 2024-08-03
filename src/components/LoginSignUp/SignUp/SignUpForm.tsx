import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { ConflictError } from "../../../errors/http_errors";
import * as User from "../../../models/Users";
import { SignUp } from "../../../network/UserApi";
import { validationSchemaSignUp } from "../Form/VlidationSchema";
import { getSignupFields, SignupField } from "../Form/formFields";
import FormAction from "../utils/Button";
import FormExtra from "../utils/FormExtra";
import Input from "../utils/Input";
import SelectModel from "../utils/Select";
import Policies from "../utils/policies";

interface SignUpModalProps {
  onSignUpSuccessfull: (user: User.User) => void;
}

export default function SignupModal({ onSignUpSuccessfull }: SignUpModalProps) {
  const [errorText, setErrorText] = useState<string | null>(null);
  const [fields, setFields] = useState<SignupField[]>([]);
  const [createdSuccessfully, setCreatedSuccessfully] = useState(false);
  const [policiesCheked, setPoliciesCheked] = useState({
    isChecked: false,
    errorMsg: "",
  });

  const togglePolicies = () => {
    setPoliciesCheked({
      ...policiesCheked,
      isChecked: !policiesCheked.isChecked,
    });
  };
  
  const formOptions = {
    resolver: yupResolver(validationSchemaSignUp),
  };
  useEffect(() => {
    async function fetchFields() {
      const fields = await getSignupFields();
      setFields(fields);
    }

    fetchFields();
  }, []);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<User.SignUpCredentials>(formOptions);

  async function onSubmit(credentials: User.SignUpCredentials) {
    try {
      if (!policiesCheked.isChecked) {
        setPoliciesCheked({
          ...policiesCheked,
          errorMsg: "Please accept our policies",
        });
        return;
      }
      setPoliciesCheked({
        ...policiesCheked,
        errorMsg: "",
      });
      const newUser = await SignUp(credentials);
      onSignUpSuccessfull(newUser);
      setCreatedSuccessfully(true);
      setErrorText("");
    } catch (error) {
      if (error instanceof ConflictError) {
        setErrorText(error.message);
      } else {
        setErrorText("An error occurred");
      }
      console.error(error);
    }
  }

  return (
    <form
      className="mt-3 space-y-6 xl:w-5/6 sm:max-w-[75vw] sm:w-[75vw] sm:px-32 w-screen"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="">
        {errorText && <div className="text-red-500">{errorText}</div>}
        {createdSuccessfully && (
          <div className="text-green-500">User Created Successfully</div>
        )}
        {fields.map((field, index) =>
          field.type === "select" ? (
            <SelectModel
              key={index}
              labelText={field.labelText}
              labelFor={field.labelFor}
              name={field.name}
              register={register}
              options={field.options ? field.options : []}
              error={errors[field.name]?.message}
            />
          ) : (
            <Input
              key={index}
              labelText={field.labelText}
              labelFor={field.labelFor}
              register={register}
              placeholder={field.placeholder}
              name={field.name}
              error={errors[field.name]?.message} // Pass error message from validationSchemaSignUp
              type={field.type}
            />
          )
        )}
        <FormExtra
          Data1="Accept Our Policies"
          Data2="Already Have an account ?"
          Data2Link="/login"
          setIsChecked={togglePolicies}
        />
        {policiesCheked.errorMsg && (
          <span className="text-red-500 text-sm italic">
            {policiesCheked.errorMsg}
          </span>
        )}
        <FormAction
          text="Sign Up"
          type="Button"
          action="submit"
          isSubmitting={isSubmitting}
        />
        <Policies name="" linkUrl="" />
      </div>
    </form>
  );
}
