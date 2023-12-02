import "./Details.css"
import "../Common.css"
import MentionList from "./mention_list/MentionList";
import React, { useEffect, useRef } from 'react';

const lorem_ipsum = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'

function getColor(sentiment) {
  const red_dark = Math.floor((1 - sentiment) * 100);
  const green_dark = Math.floor(sentiment * 100);
  return `rgb(${red_dark}, ${green_dark}, 0)`;
}

function getLighterColor(sentiment) {
  const red_light = Math.floor((1 - sentiment) * 200);
  const green_light = Math.floor(sentiment * 200);
  return `rgb(${red_light}, ${green_light}, 0)`
}

const Details = ({ node, nodeSetter }) => {
    const visible = node ? 1 : 0
    const display = visible ? 'flex' : 'none'
    const full_name = node && node.full_name ? node.full_name : ''
    const account_name = node && node.account_name ? node.account_name : ''
    const political_party = node && node.political_party ? node.political_party : ''
    const profile_image_url = node && node.image ? node.image : ''
    const sentiment = node && node.sentiment ? parseFloat(node.sentiment).toFixed(2) : ''
    const description = node && node.description ? node.description : lorem_ipsum
    const top_5_in_mentions = node && node.top_5_in_mentions ? node.top_5_in_mentions : []
    const top_5_out_mentions = node && node.top_5_out_mentions ? node.top_5_out_mentions : []

    const detailsRef = useRef(null);

    useEffect(() => {
      if (detailsRef.current) {
        detailsRef.current.scrollTop = 0;
      }
    }, [node]);

    return (
      <div className="details side-panel"
        style={{
          opacity: visible,
          display: display
        }}
        ref={detailsRef}
      >
        <img src={profile_image_url} className="profile-image" alt="Profile" />
        <h2>{full_name}</h2>
        <p>{political_party}</p>
        <div className="stats">
          <h5>How positive are his statements? </h5>
          <p style={{background: `linear-gradient(to bottom, ${getLighterColor(sentiment)}, ${getColor(sentiment)})`}}>
            {sentiment}
          </p>
        </div>
        <div className="description">
          <p>{description}</p>
        </div>
        <h5>Twitter @{account_name}</h5>
        <MentionList title={"Top 5 Mentioned by"} mentions={top_5_in_mentions} nodeSetter={nodeSetter}/>
        <MentionList title={"Top 5 Mentions"} mentions={top_5_out_mentions} nodeSetter={nodeSetter}/>
      </div>
    );
  }
  
export default Details;