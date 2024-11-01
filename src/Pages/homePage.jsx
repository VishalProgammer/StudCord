import './homePage.css'

const Home = (props) =>{
    return(
        <>
        <div id='homeBody'>
            <div id='homeText'>
                <h1 >StudCord</h1>
                <p>Best way to manage the Student Records and Productivity!!</p>
            </div>
            <div id="home-banner">
                <img src="https://i.imgur.com/DFfjhVD.png" alt="Work  together, faster and digitally!" />
            </div>
        </div>
        <footer id='home-footer'>Note: This project is for public use, all data added here will be visible to everyone. Be careful and respectful!</footer>
        </>
    )
}

export {Home}