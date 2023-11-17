import "./Details.css"

const Details = ({ node }) => {
    const visible = node ? 1 : 0
    const display = visible ? 'block' : 'none'
    const full_name = node && node.full_name ? node.full_name : ''
    const political_party = node && node.political_party ? node.political_party : ''
  
    return (
      <div className="details"
        style={{
          opacity: visible,
          display: display
        }}
      >
        <h2>{full_name}</h2>
        <p>{political_party}</p>
      </div>
    );
  }
  
export default Details;