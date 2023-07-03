import { Accordion } from 'flowbite-react'
import { faqs } from './FaqConstant'

export const FaqModule: React.FC = () => {
  return (
    <>
      <div className="relative lg:h-screen flex flex-col items-center justify-center lg:px-44 px-5 py-5">
        <h1 className="items-start flex w-full pb-2 z-50">
          Butuh Bantuan? Baca FAQs
        </h1>
        <Accordion
          alwaysOpen={true}
          className="w-full border-transparent focus:border-transparent focus:ring-0 "
        >
          {faqs.map((item, index) => (
            <Accordion.Panel key={index}>
              <Accordion.Title className="text-black focus:bg-mintGreen border-transparent focus:border-transparent focus:ring-0 rounded-t-xl">
                <div>
                  <h4> {item.question}</h4>
                </div>
              </Accordion.Title>
              <Accordion.Content className="active:bg-mintGreen border-transparent focus:border-transparent focus:ring-0 rounded-b-xl">
                <p>{item.answer}</p>
              </Accordion.Content>
            </Accordion.Panel>
          ))}
        </Accordion>
      </div>
    </>
  )
}
