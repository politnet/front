import "./Details.css"

const Details = ({ node }) => {
    const visible = node ? 1 : 0
    const full_name = node && node.full_name ? node.full_name : ''
    const political_party = node && node.political_party ? node.political_party : ''
  
    return (
      <div className="details"
        style={{
          opacity: visible,
        }}
      >
        <h2>{full_name}</h2>
        <p>{political_party}</p>
      </div>
    );
  }
  
export default Details;