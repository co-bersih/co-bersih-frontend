import IEvent from '../../../module-elements/EventCard/interface'

export const ParticipantDashboardMenu: React.FC<IEvent> = (event) => {
  return (
    <>
      <h3>participants</h3>
      <p>{event.total_participant}</p>
    </>
  )
}
