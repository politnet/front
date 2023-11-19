const MentionList = ({ title, mentions }) => {
    console.log(mentions)

    return (
        <div className="mention-list">
          <h4>{title}</h4>
          {mentions.map((mention, index) => (
            <div key={index}>
              {mention.full_name}
            </div>
          ))}
        </div>
    )
}

export default MentionList;