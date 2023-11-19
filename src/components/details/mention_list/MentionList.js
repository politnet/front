const MentionList = ({ title, mentions }) => {
    return (
        <div className="mention-list">
          <h4>{title}</h4>
          {mentions.map((mention, index) => (
            <div key={index}>
              {mention}
            </div>
          ))}
        </div>
    )
}

export default MentionList;