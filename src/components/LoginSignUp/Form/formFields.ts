import { SignUpCredentials, LogInCredentials } from "../../../models/Users";
import { getSkills } from "../../../network/SkillsApi";

interface LogInField {
  labelText: string;
  labelFor: string;
  id: string;
  name: keyof LogInCredentials;
  type: string;
  isRequired: boolean;
  placeholder: string;
  autoComplete?: string;
}

const loginFields: LogInField[] = [
  {
    labelText: "Name",
    labelFor: "name",
    id: "name",
    name: "name",
    type: "text",
    isRequired: true,
    placeholder: "Enter the Name",
    autoComplete: "current-name",
  },
  {
    labelText: "Password",
    labelFor: "password",
    id: "password",
    name: "password",
    type: "password",
    isRequired: true,
    placeholder: "Enter the Password",
    autoComplete: "current-password",
  },
];

export interface SignupField {
  labelText: string;
  labelFor: string;
  id: string;
  name: keyof SignUpCredentials;
  type: string;
  isRequired: boolean;
  placeholder: string;
  options?: { label: string; value: string }[];
}

async function getSignupFields(): Promise<SignupField[]> {
  const skills = await getSkills();
  const formattedSkills = skills.map((skill) => ({
    label: skill.name,
    value: `${skill.id}`,
  }));

  const signupFields: SignupField[] = [
    {
      labelText: "Name",
      labelFor: "name",
      id: "name",
      name: "name",
      type: "text",
      isRequired: true,
      placeholder: "Name",
    },
    {
      labelText: "Email address",
      labelFor: "email-address",
      id: "email-address",
      name: "email",
      type: "email",
      isRequired: true,
      placeholder: "Email address",
    },
    {
      labelText: "Password",
      labelFor: "password",
      id: "password",
      name: "password",
      type: "password",
      isRequired: true,
      placeholder: "Password",
    },
    {
      labelText: "Confirm Password",
      labelFor: "confirmPassword",
      id: "confirmPassword",
      name: "confirmPassword",
      type: "password",
      isRequired: true,
      placeholder: "Confirm Password",
    },
    {
      labelText: "Age",
      labelFor: "age",
      id: "age",
      name: "age",
      type: "number",
      isRequired: true,
      placeholder: "Age",
    },
    {
      labelText: "Skills",
      labelFor: "skills",
      id: "skills",
      name: "skills",
      type: "select",
      isRequired: false,
      placeholder: "Skills",
      options: formattedSkills,
    },
  ];

  return signupFields;
}

export { loginFields, getSignupFields };
