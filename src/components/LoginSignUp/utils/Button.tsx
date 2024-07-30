interface FormActionProps {
  type?: "Button";
  action?: "submit" | "reset" | "button"; // Define possible values for action attribute
  text?: string;
  isSubmitting?: boolean;
}
const styles =
  "group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-purple-800 hover:bg-purple-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 mt-2";
function FormAction({ type, action, text, isSubmitting }: FormActionProps) {
  if (type === "Button") {
    return (
      <button
        type={action || "submit"} // Default to 'button' type if action is not specified
        className={`${styles} ${
          isSubmitting ? "cursor-not-allowed bg-purple-300" : ""
        }`}
        disabled={isSubmitting}
      >
        {isSubmitting ? text + "..." : text}
      </button>
    );
  }

  return null; // Return null for non-supported types or no type specified
}

export default FormAction;
