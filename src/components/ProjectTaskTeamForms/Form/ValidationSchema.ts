import * as Yup from "yup";

// Validation schema for team creation
const validationSchemaTeamCreation = Yup.object().shape({
  name: Yup.string().required("Team name is required"),
});

// Validation schema for project creation
const validationSchemaProjectCreation = Yup.object().shape({
  name: Yup.string().required("Project name is required"),
  description: Yup.string().required("Description is required"),
});

// Validation schema for task creation
const validationSchemaTaskCreation = Yup.object().shape({
  name: Yup.string().required("Task name is required"),
});

// Validation schema for project modification
const validationSchemaProjectModification = Yup.object().shape({
  name: Yup.string(),
  description: Yup.string(),
  endDate: Yup.date(),
  statusId: Yup.number(),
});

// Validation schema for task modification
const validationSchemaTaskModification = Yup.object().shape({
  name: Yup.string(),
  AssigneeId: Yup.number(),
  statusId: Yup.number(),
  StoryPoint: Yup.number(),
  endDate: Yup.date(),
  description : Yup.string(),
});

export {
  validationSchemaTeamCreation,
  validationSchemaProjectCreation,
  validationSchemaTaskCreation,
  validationSchemaProjectModification,
  validationSchemaTaskModification,
};
