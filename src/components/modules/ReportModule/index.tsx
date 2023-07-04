import { Button } from '@elements'
import React, { useState } from 'react'
import { CreateReportModal } from './module-elements/CreateReportModal'
// import {HeroSection, FAQSection} from './sections
// import {} from './module-elements'

export const ReportModuleModule: React.FC = () => {
  // TODO: Write module's logic
  const [isShowModal, setIsShowModal] = useState<boolean>(false)

  return (
    <>
      <div className="relative h-screen">
        <Button
          variant={'primary'}
          className="mt-28"
          onClick={() => setIsShowModal(true)}
        >
          <h4>CREATE REPORT</h4>
        </Button>{' '}
      </div>
      <CreateReportModal
        showModal={isShowModal}
        onClose={() => setIsShowModal(false)}
      />
    </>
  )
}
