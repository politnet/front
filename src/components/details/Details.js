import "./Details.css"
import { ReactComponent as PositivenessIcon } from './resources/positivness.svg'
import MentionList from "./mention_list/MentionList";

function getPositivenessColor(positiveness) {
  const red = Math.floor((1 - positiveness) * 200);
  const green = Math.floor(positiveness * 200);
  return `rgb(${red}, ${green}, 0)`;
}

const Details = ({ node }) => {
    const visible = node ? 1 : 0
    const display = visible ? 'flex' : 'none'
    const full_name = node && node.full_name ? node.full_name : ''
    const political_party = node && node.political_party ? node.political_party : ''
    const profile_image_url = node && node.image ? node.image : ''
    const positiveness = node && node.positiveness ? node.positiveness : ''
    const description = node && node.description ? node.description : ''
    const top_5_in_mentions = node && node.top_5_in_mentions ? node.top_5_in_mentions : []
    const top_5_out_mentions = node && node.top_5_out_mentions ? node.top_5_out_mentions : []

    return (
      <div className="details"
        style={{
          opacity: visible,
          display: display
        }}
      >
        <img src={profile_image_url} className="profile-image" alt="Profile" />
        <h2>{full_name}</h2>
        <p>{political_party}</p>
        <div className="stats">
          <PositivenessIcon style={{ fill: getPositivenessColor(positiveness) }} className="stats-icon" alt="Positiveness" title="Positiveness Score"/>
          <p>{positiveness}</p>
        </div>
        <div className="description">
          <p>{description}</p>
        </div>
        <MentionList title={"Top 5 Mentioned by"} mentions={top_5_in_mentions} />
        <MentionList title={"Top 5 Mentions"} mentions={top_5_out_mentions} />
      </div>
    );
  }
  
export default Details;