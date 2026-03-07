import reggae from './assets/reggae-is-happening.jpg';
import summer from './assets/GRP_Summer.jpg';
import './App.css';


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
            <iframe
              width="100%"
              height="300"
              scrolling="no"
              frameBorder="no"
              allow="autoplay"
              src="https://w.soundcloud.com/player/?url=https%3A//soundcloud.com/tabula-rasta/sets/tabbula-rasta-reggae-regatta&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true"
              title="SoundCloud Player"
            />
          </div>
          <img src={summer} className="summer" alt="Three men stand in front of the sea" />
        </div>
      </header>
    </div>
  );
}

export default App;
