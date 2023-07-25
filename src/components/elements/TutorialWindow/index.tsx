import React, { useState, useRef } from 'react'
import { TutorialWindowProps } from './interface'
import { Button } from '../Button'
import { BsFillArrowRightCircleFill } from 'react-icons/bs'
import { TUTORIAL_STEPS } from './constant'
import { Modal } from 'flowbite-react'

export const TutorialWindow: React.FC<TutorialWindowProps> = ({
  onClose,
  showModal,
}) => {
  // TODO: Write element's logic
  const [step, setStep] = useState<number>(0)
  const rootRef = useRef<HTMLDivElement>(null)

  return (
    <Modal
      show={showModal}
      className="h-screen my-auto items-screen justify-center"
    >
      <Modal.Body>
        <div className="flex flex-col items-center justify-center lg:flex-row gap-4 w-full">
          <div className="flex flex-col gap-6 px-4">
            <div className="flex gap-4 flex-row justify-between">
              <Button variant="secondary" onClick={onClose}>
                <h4>Keluar Tutorial</h4>
              </Button>
              <div className="rounded-xl bg-paleGreen flex justify-center items-center px-7">
                <h4 className="text-left ">
                  {step + 1}/{TUTORIAL_STEPS.length}
                </h4>
              </div>
            </div>
            <h2 className="text-left">{TUTORIAL_STEPS[step].title}</h2>
            <h4 className="text-[#777B97] text-left ">
              {TUTORIAL_STEPS[step].content}
            </h4>
            {step == 0 && (
              <Button
                variant="secondary"
                onClick={() => {
                  setStep(step + 1)
                }}
                className="flex justify-end items-end w-full"
              >
                {
                  <BsFillArrowRightCircleFill
                    size="28"
                    fill="dark:fill-white fill-[#7D8DC1s]"
                  />
                }
              </Button>
            )}
            <div className={`flex flex-row justify-between`}>
              {step > 0 && (
                <Button
                  variant="secondary"
                  onClick={() => {
                    setStep(step - 1)
                  }}
                >
                  {
                    <BsFillArrowRightCircleFill
                      size="28"
                      fill="dark:fill-white fill-[#7D8DC1s]"
                      className="rotate-180"
                    />
                  }
                </Button>
              )}
              {step < TUTORIAL_STEPS.length - 1 && step > 0 && (
                <Button
                  variant="secondary"
                  onClick={() => {
                    setStep(step + 1)
                  }}
                >
                  {
                    <BsFillArrowRightCircleFill
                      size="28"
                      fill="dark:fill-white fill-[#7D8DC1s]"
                    />
                  }
                </Button>
              )}
              {step === TUTORIAL_STEPS.length - 1 && (
                <Button variant="greeny" onClick={onClose}>
                  <h4>{'Iya, Saya Siap!'}</h4>
                </Button>
              )}
            </div>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  )
}
