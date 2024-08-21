import { yupResolver } from "@hookform/resolvers/yup";
import { Stack } from "@mui/material";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { ConflictError } from "../../../errors/http_errors";
import * as User from "../../../models/Users";
import { useUser } from "../../../utils/Contexte/UserContext/userContexte";
import Input from "../../ProjectComponent/components/InputProject";
import { validationUserUpdate } from "../Form/VlidationSchema";
import { userUpdateFields } from "../Form/formFields";

interface updateUserProps {
  onUpdatedSuccessfull: (user: User.User) => void;
}
const fields = userUpdateFields;

export default function UpdateProfileModal({
  onUpdatedSuccessfull,
}: updateUserProps) {
  const [errorText, setErrorText] = useState<string | null>(null);
  const [updatedSuccessfully, setupdatedSuccessfully] = useState(false);
  const { user, updateUser } = useUser();
  const formOptions = {
    resolver: yupResolver(validationUserUpdate),
  };
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<User.UserUpdate>(formOptions);
  async function onSubmit(credentials: User.UserUpdate) {
    try {
      if (!user) return;
      const newUser: User.User = {
        ...user,
        ...credentials,
      };
      await updateUser(newUser);
      onUpdatedSuccessfull(newUser);
      setupdatedSuccessfully(true);
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
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col justify-center mt-3 flex-1 gap-2"
    >
      <label htmlFor="Personnal" className="block text-lg font-bold leading-6 ">
        Personnal Information
      </label>

      {errorText && <div className="text-red-500">{errorText}</div>}
      <div className=" overflow-x-hidden overflow-y-auto space-y-6 ">
        {updatedSuccessfully && (
          <div className="text-green-500">User Updated Successfully</div>
        )}
        {fields.map((field, index) => (
          <Input
            key={index}
            labelText={field.labelText}
            labelFor={field.labelFor}
            register={register}
            placeholder={field.placeholder}
            name={field.name}
            error={errors[field.name]?.message}
            type={field.type}
            value={user ? user[field.name].toString() : ""}
          />
        ))}
      </div>
      <Stack direction="row" spacing={2} mt={5}>
        <button
          type="submit"
          className="w-full bg-purple-600 text-white p-2 rounded-md hover:bg-purple-500 "
          disabled={isSubmitting}
        >
          {isSubmitting ? "updateUser" + "..." : "updateUser"}
        </button>
      </Stack>
    </form>
  );
}
