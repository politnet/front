import './Tooltip.css'

const Tooltip = ({ content, position }) => (
    <div className="tooltip"
      style={{
        left: position.x,
        top: position.y,
        display: content ? 'block' : 'none',
      }}
    >
      {content}
    </div>
  );

export default Tooltip;