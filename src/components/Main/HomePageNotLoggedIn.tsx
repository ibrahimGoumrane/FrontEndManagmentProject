import FrequentlyAsked from "./components/askedQuestion";

const HomePageNotLoggedIn = () => {
  return (
    <main className="pt-10">
      <section className="bg-white dark:bg-gray-900 mt-10">
        <div className="grid max-w-screen-xl px-4 pt-28 pb-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12 lg:pt-28">
          <div className="mr-auto place-self-center lg:col-span-7">
            <h1 className="max-w-2xl mb-4 text-4xl font-extrabold leading-none tracking-tight md:text-5xl xl:text-6xl dark:text-white">
              Streamline Your Projects & Teams.
            </h1>
            <p className="max-w-2xl mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400">
              Our app provides comprehensive tools to manage projects, track
              progress, and collaborate with your team effectively. Built with
              modern technology and designed for ease of use, it helps you stay
              organized and achieve your project goals seamlessly.
            </p>
          </div>
          <div className="hidden lg:mt-0 lg:col-span-5 lg:flex">
            <img
              src="https://demo.themesberg.com/landwind/images/hero.png"
              alt="hero image"
            />
          </div>
        </div>
      </section>
      <section className="bg-white dark:bg-gray-900">
        <div className="max-w-screen-xl px-4 pb-8 mx-auto lg:pb-16">
          {/* Additional content about your app or features */}
        </div>
      </section>

      <section className="bg-gray-50 dark:bg-gray-800">
        <div className="max-w-screen-xl px-4 py-8 mx-auto text-center lg:py-24 lg:px-6">
          <figure className="max-w-screen-md mx-auto">
            <blockquote>
              <p className="text-xl font-medium text-gray-900 md:text-2xl dark:text-white">
                "This app has transformed the way our team manages projects. The
                features are intuitive and the integration with our workflow is
                seamless."
              </p>
            </blockquote>
            <figcaption className="flex items-center justify-center mt-6 space-x-3">
              <img
                className="w-6 h-6 rounded-full"
                src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/michael-gouch.png"
                alt="profile picture"
              />
              <div className="flex items-center divide-x-2 divide-gray-500 dark:divide-gray-700">
                <div className="pr-3 font-medium text-gray-900 dark:text-white">
                  Alex Johnson
                </div>
                <div className="pl-3 text-sm font-light text-gray-500 dark:text-gray-400">
                  Project Manager at TechCo
                </div>
              </div>
            </figcaption>
          </figure>
        </div>
      </section>
      <FrequentlyAsked />
    </main>
  );
};

export default HomePageNotLoggedIn;
