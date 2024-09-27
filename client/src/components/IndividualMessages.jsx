export default function IndividualMessages({ mapMsg }) {
  return (
    <div id={mapMsg.id}>
      <p
        id={`message-${mapMsg.id}`}
      >{`${mapMsg.message} - ${mapMsg.username}`}</p>
    </div>
  );
}
