import FAQItem from "./FAQItem/FAQItem";
// Define your FAQ data as an array of objects
const faqData = [
  {
    id: 1,
    question: "Can I use Landwind in open-source projects?",
    mainContent:
      "Landwind is an open-source library of interactive components built on top of Tailwind CSS including buttons, dropdowns, modals, navbars, and more.",
    additionalContent:
      "Check out this guide to learn how to get started and start developing websites even faster with components on top of Tailwind CSS.",
  },
  {
    id: 2,
    question: "Is there a Figma file available?",
    mainContent:
      "Landwind is first conceptualized and designed using the Figma software so everything you see in the library has a design equivalent in our Figma file.",
    additionalContent:
      "Check out the Figma design system based on the utility classes from Tailwind CSS and components from Landwind.",
  },
  {
    id: 3,
    question: "What are the differences between Landwind and Tailwind UI?",
    mainContent:
      "The main difference is that the core components from Landwind are open-source under the MIT license, whereas Tailwind UI is a paid product. Another difference is that Landwind relies on smaller and standalone components, whereas Tailwind UI offers sections of pages.",
    additionalContent:
      "However, we actually recommend using both Landwind, Landwind Pro, and even Tailwind UI as there is no technical reason stopping you from using the best of two worlds. Learn more about these technologies:",
  },
  {
    id: 4,
    question: "What about browser support?",
    mainContent:
      "The main difference is that the core components from Landwind are open-source under the MIT license, whereas Tailwind UI is a paid product. Another difference is that Landwind relies on smaller and standalone components, whereas Tailwind UI offers sections of pages.",
    additionalContent:
      "However, we actually recommend using both Landwind, Landwind Pro, and even Tailwind UI as there is no technical reason stopping you from using the best of two worlds. Learn more about these technologies:",
  },
];

const FrequentlyAsked = () => {
  return (
    <section className="bg-white dark:bg-gray-900">
      <div className="max-w-screen-xl px-4 pb-8 mx-auto lg:pb-24 lg:px-6 mt-10">
        <h2 className="mb-6 text-3xl font-extrabold tracking-tight text-center text-gray-900 lg:mb-8 lg:text-3xl dark:text-white">
          Frequently asked questions
        </h2>
        <div className="max-w-screen-md mx-auto">
          <div
            id="accordion-flush"
            data-accordion="collapse"
            ata-active-classnamees="bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
            ata-inactive-classnamees="text-gray-500 dark:text-gray-400"
          >
            {faqData.map((item) => (
              <FAQItem
                key={item.id}
                id={item.id}
                question={item.question}
                mainContent={item.mainContent}
                additionalContent={item.additionalContent}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FrequentlyAsked;
