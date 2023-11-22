import "./About.css"
import "../Common.css"

const About = ({ setAboutOpen, graph }) => {
    let text_1 = `Welcome to Politnet, where we aim to provide a visual representation of the intricate network of US politicians. 
                    Our goal is to offer users a unique perspective on the relationships and connections that shape the political landscape.`
    let text_2 = `The network is based on knowledge from X platform, from where we extract data about the politicians and their relationships. 
                    Currently the network contains ${graph.nodes.length} nodes representing politicians and ${graph.edges.length} edges representing tweet mentions.
                    Weight of edges indicate the number of outgoing mentions from a politician to another. The nodes are resized according to the number of incoming mentions.`
    let text_3 = `Last data update: 10.11.2023`
    return (
        <div className="about side-panel">
            <button className="close" onClick={() => setAboutOpen(false)}>&times;</button>
            <h1>Politnet</h1>
            <p>{text_1}</p>
            <p>{text_2}</p>
            <p>{text_3}</p>
        </div>
    )
}

export default About;