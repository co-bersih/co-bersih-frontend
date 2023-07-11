import { ReactNode } from 'react'

type FeatureProps = {
  icon: JSX.Element
  title: string
  text: string
}

export const FeatureCard: React.FC<FeatureProps> = (props: FeatureProps) => {
  return (
    <div className="flex flex-col sm:gap-2 md:gap-4 bg-white p-4 rounded-3xl shadow-sm md:w-[22vw] text-center items-center border-white hover:border-darkGreen border-2 hover:-translate-y-1 transition-all">
      {props.icon}
      <h3>{props.title}</h3>
      <p>{props.text}</p>
    </div>
  )
}
