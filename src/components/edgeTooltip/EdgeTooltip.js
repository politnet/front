import '../Common.css'

const EdgeTooltip = ({ edge, position }) => {
  const visible = edge ? 1 : 0
  const from_account_name = edge && edge.from_account_name ? edge.from_account_name : ''
  const to_account_name = edge && edge.to_account_name ? edge.to_account_name : ''
  const mentions_count = edge && edge.mentions_count ? edge.mentions_count : ''

  return (
    <div className="tooltip"
      style={{
        left: position.x,
        top: position.y,
        opacity: visible,
      }}
    >
      <p><b>{from_account_name}</b> mentions <b>{to_account_name}</b></p>
      <p><b>{mentions_count}</b> times</p>
    </div>
  );
}

export default EdgeTooltip;