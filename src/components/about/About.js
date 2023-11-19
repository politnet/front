import "./About.css"
import "../Common.css"

const About = ({ setAboutOpen }) => {
    return (
        <div className="about side-panel">
            <button class="close" onClick={() => setAboutOpen(false)}>&times;</button>
            <h1>About</h1>
            <p>This is the about page</p>
        </div>
    )
}

export default About;