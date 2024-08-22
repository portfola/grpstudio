import reggae from './reggae-is-happening.jpg';
import summer from './GRP_Summer.jpg';
import './App.css';
import ReactPlayer from "react-player"


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div class="wrapper">
          <img src={reggae} className="reggae" alt="Two men play reggae guitar" />
          <p>
            Maybe we are the only one who can express the people's feeling through music.
          </p>
          <p>
            And because we can do that, the people love it... 
          </p>
          <p>
            so we did it.
          </p>
          <div>
            <ReactPlayer
              url="https://soundcloud.com/tabula-rasta/sets/tabbula-rasta-reggae-regatta"
              className="reggae"
            />
          </div>
          <img src={summer} className="summer" alt="Three men stand in front of the sea" />
        </div>
      </header>
    </div>
  );
}

export default App;
