import React from "react";
import "./Home.css";

const Home = () => {
    return (
        <div className="App">
            <div className="container">
                <br />
                <h1>TaskOrganizer</h1>
                <img className="wallpaper" alt="wallpaper" src="home_wallpaper.png" />
                <br />
                <br />
                <div>
                    <a href="/TaskOverview" className="btn btn-primary btn-lg">Go to TaskOverview</a>
                </div>
            </div>
        </div>
    );
};

export default Home;
