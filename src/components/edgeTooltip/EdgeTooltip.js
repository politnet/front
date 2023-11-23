import '../Common.css'

const EdgeTooltip = ({ edge, position }) => {
  const visible = edge ? 1 : 0
  const from = edge && edge.from ? edge.from : ''
  const to = edge && edge.to ? edge.to : ''
  const value = edge && edge.mentions_count ? edge.mentions_count : ''

  return (
    <div className="tooltip"
      style={{
        left: position.x,
        top: position.y,
        opacity: visible,
      }}
    >
      <p><b>{from}</b> mentions <b>{to}</b></p>
      <p><b>{value}</b> times</p>
    </div>
  );
}

export default EdgeTooltip;