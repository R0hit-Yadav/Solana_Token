import { FC } from "react";
import { LuChevronDown } from "react-icons/lu";

export const FaqView: FC = ({})=> {

  const faqs = [
  {
    question: " Who are produces sit pleasure?",
    answer:
      " Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem.",
    id: "faq-1",
  },
  {
    question: " What is quo voluptas nulla pariatur?",
    answer:
      "Vivamus elementum semper nisi. Aenean vulputate eleifendtellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet.",
    id: "faq-2",
  },
  {
    question: "How to do transactions using iMbank?",
    answer:
      " Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem.",
    id: "faq-3",
  },
  {
    question: " hot to activate iMbank service?",
    answer:
      "Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem.",
    id: "faq-4",
  },
  {
    question: "  Who is eligible to open iMbank account?",
    answer:
      "Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem.",
    id: "faq-5",
  },
  {
    question: "wil i be given a passbook?",
    answer:
      "Aenean commodo ligula eget dolor. Aenean massa. Cum sociisnatoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem.",
    id: "faq-6",
  },
];

  return (
    <section id="faq" className="relative bg-gray-950 py-20 sm:py-24">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(122,_93,_248,_0.15),_transparent_40%)]"></div>

      <div className="container relative z-10">
        {/* Section Header */}
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <h2 className="mb-4 text-4xl font-extrabold tracking-tight text-white sm:text-5xl bg-gradient-to-b from-white to-gray-400 bg-clip-text text-transparent">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-gray-400">
            Have a question? We've got answers. If you can't find what you're looking for, feel free to contact us.
          </p>
        </div>

        {/* Accordion */}
        <div className="mx-auto max-w-3xl">
          <div className="hs-accordion-group space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="hs-accordion overflow-hidden rounded-xl border border-gray-700/50 bg-gray-900/50 backdrop-blur-lg"
                id={`faq-accordion-item-${index}`}
              >
                <button
                  className="hs-accordion-toggle group inline-flex w-full items-center justify-between gap-x-3 px-6 py-5 text-left text-white transition-colors duration-300 hover:bg-gray-800/40"
                  aria-controls={`faq-accordion-content-${index}`}
                >
                  <h5 className="flex text-lg font-semibold">{faq.question}</h5>
                  <LuChevronDown className="h-5 w-5 transition-transform duration-500 hs-accordion-active:rotate-180" />
                </button>

                <div
                  id={`faq-accordion-content-${index}`}
                  className="hs-accordion-content w-full overflow-hidden transition-[height] duration-300"
                  aria-labelledby={`faq-accordion-item-${index}`}
                >
                  <div className="px-6 pb-5 pt-0">
                    <p className="text-gray-400">{faq.answer}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};




