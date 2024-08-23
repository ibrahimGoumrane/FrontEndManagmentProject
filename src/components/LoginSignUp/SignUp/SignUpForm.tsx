import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as User from "../../../models/Users";
import { SignUp } from "../../../network/UserApi";
import FormAction from "../../utils/Button";
import FormExtra from "../../utils/FormExtra";
import Input from "../../utils/Input";
import SelectModel from "../../utils/Select";
import { validationSchemaSignUp } from "../Form/VlidationSchema";
import { getSignupFields, SignupField } from "../Form/formFields";

interface SignUpModalProps {
  onSignUpSuccessfull: (user: User.User) => void;
}

export default function SignupModal({ onSignUpSuccessfull }: SignUpModalProps) {
  const [errorText, setErrorText] = useState<string | null>(null);
  const [fields, setFields] = useState<SignupField[]>([]);
  const [createdSuccessfully, setCreatedSuccessfully] = useState(false);

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
      // Create FormData instance
      const formData = new FormData();

      // Append files
      if (credentials.profileImg && credentials.profileImg.length > 0) {
        formData.append("profileImg", credentials.profileImg[0]);
      }

      // Append other fields
      formData.append("name", credentials.name);
      formData.append("email", credentials.email);
      formData.append("password", credentials.password);
      formData.append("confirmPassword", credentials.confirmPassword);
      formData.append("age", credentials.age.toString());
      if (credentials.skills) {
        credentials.skills.forEach((skill) => {
          formData.append("skills", skill); // Use 'skills[]' to indicate array entries
        });
      }
      const newUser = await SignUp(formData);
      onSignUpSuccessfull(newUser);
      setCreatedSuccessfully(true);
      setErrorText("");
    } catch (error) {
      setErrorText((error as Error).message);
      console.error(error);
    }
  }

  return (
    <form
      className="mt-3 space-y-2 xl:w-5/6 sm:max-w-[75vw] sm:w-[75vw] w-screen "
      onSubmit={handleSubmit(onSubmit)}
    >
      {errorText && (
        <div className="text-red-500 font-sans font-bold text-left capitalize">
          {errorText}
        </div>
      )}{" "}
      <div className=" grid grid-cols-2 grid-rows-3  max-h-[80vh] overflow-hidden  gap-10">
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
      </div>
      <FormAction
        text="Sign Up"
        type="Button"
        action="submit"
        isSubmitting={isSubmitting}
      />
      <FormExtra Data2="Already Have an account ?" Data2Link="/login" />
    </form>
  );
}
