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
  name: Yup.string().required(),
  description: Yup.string().optional(),
  endDate: Yup.date().optional(),
  statusId: Yup.number().required(),
});

// Validation schema for task modification

export {
  validationSchemaTeamCreation,
  validationSchemaProjectCreation,
  validationSchemaTaskCreation,
  validationSchemaProjectModification,
};
