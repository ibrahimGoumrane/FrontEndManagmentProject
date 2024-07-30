import { Button } from "flowbite-react";
import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <main className="error-page">
      <div className="text-center">
        <section className="bg-white dark:bg-gray-900">
          <div className="mx-auto max-w-screen-xl px-4 py-8 lg:px-6 lg:py-16">
            <div className="mx-auto max-w-screen-sm text-center">
              <h1 className="dark:text-primary-500 mb-4 text-7xl font-extrabold tracking-tight text-purple-600 lg:text-9xl">
                500
              </h1>
              <p className="mb-4 text-3xl font-bold tracking-tight text-gray-900 md:text-4xl dark:text-white">
                Internal Server Error.
              </p>
              <p className="mb-4 text-lg font-light text-gray-500 dark:text-gray-400">
                Sorry something went wrong.
              </p>
            </div>
          </div>
        </section>
        <Button color="purple" as={Link} to={"/"} className="inline-block">
          Go to home Page
        </Button>
      </div>
    </main>
  );
};

export default ErrorPage;
