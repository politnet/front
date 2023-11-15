import './Tooltip.css'

const Tooltip = ({ node, position }) => {
  const visible = node ? 1 : 0
  const full_name = node && node.full_name ? node.full_name : ''
  const political_party = node && node.political_party ? node.political_party : ''

  return (
    <div className="tooltip"
      style={{
        left: position.x,
        top: position.y,
        opacity: visible,
      }}
    >
      <h5>{full_name}</h5>
      <p>{political_party}</p>
    </div>
  );
}

export default Tooltip;