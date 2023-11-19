import "./MentionList.css"

const MentionList = ({ title, mentions, nodeSetter }) => {
    return (
        <div className="mention-list">
          <h4>{title}</h4>
          {mentions.map((mention, index) => (
            <div className="mention" key={index} onClick={() => nodeSetter(mention)}>
              <img src={mention.image} alt="Profile" />
              <p>{mention.full_name}</p>
            </div>
          ))}
        </div>
    )
}

export default MentionList;