import FAQItem from "./FAQItem/FAQItem";
// Define your FAQ data as an array of objects
const faqData = [
  {
    id: 1,
    question: "Can I use this app for open-source projects?",
    mainContent:
      "Yes, our app is designed to be versatile and can be integrated into open-source projects. It offers a range of features to manage tasks, track progress, and collaborate with teams effectively.",
    additionalContent:
      "Check out our documentation and integration guides to get started with incorporating our app into your open-source projects.",
  },
  {
    id: 3,
    question:
      "What are the main features of this app compared to other project management tools?",
    mainContent:
      "Our app stands out with its robust project tracking capabilities, intuitive task management, and real-time collaboration features. Unlike other tools, we focus on seamless integration with team workflows and customizable project views.",
    additionalContent:
      "We recommend exploring our feature comparison page to see how our app stacks up against other project management solutions and find out how it can fit into your team’s workflow.",
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
