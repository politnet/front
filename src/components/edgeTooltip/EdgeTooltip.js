import '../Common.css'

const EdgeTooltip = ({ edge, position }) => {
  const visible = edge ? 1 : 0
  const from_full_name = edge && edge.from_full_name ? edge.from_full_name : ''
  const to_full_name = edge && edge.to_full_name ? edge.to_full_name : ''
  const mentions_count = edge && edge.mentions_count ? edge.mentions_count : ''

  return (
    <div className="tooltip"
      style={{
        left: position.x,
        top: position.y,
        opacity: visible,
      }}
    >
      <p><b>{from_full_name}</b> mentions <b>{to_full_name}</b></p>
      <p><b>{mentions_count}</b> times</p>
    </div>
  );
}

export default EdgeTooltip;