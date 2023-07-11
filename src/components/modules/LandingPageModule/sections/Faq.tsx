import { Accordion } from 'flowbite-react'
import { FAQ_DATA } from './FaqConstant'

export const FAQ: React.FC = () => {
  return (
    <>
      <div className="relative lg:h-screen flex flex-col items-center justify-center lg:px-44 px-5 py-5">
        <h1 className="items-start flex w-full pb-2 z-50">
          Butuh Bantuan? Baca FAQs
        </h1>
        <Accordion className="w-full border-transparent focus:border-transparent focus:ring-0 ">
          {FAQ_DATA.map((item, index) => (
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
