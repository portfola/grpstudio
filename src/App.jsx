import { useEffect } from 'react';
import reggae from './assets/reggae-is-happening.jpg';
import summer from './assets/GRP_Summer.jpg';
import './App.css';

function App() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
          }
        });
      },
      { threshold: 0.15 }
    );

    document.querySelectorAll('.anim-scroll').forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="App">
      <div className="grain" aria-hidden="true" />

      {/* Hero */}
      <section className="hero">
        <div className="hero-content">
          <h1 className="brand anim-initial">
            <span className="brand-grp">GRP</span>
            <span className="brand-sub">Georgetown Reggae Project &mdash; Sammy-on-Fire Sound Systems</span>
          </h1>

          <div className="hero-photo-container anim-initial" style={{ animationDelay: '0.3s' }}>
            <div className="photo-overlay" />
            <div className="photo-grain" />
            <img src={reggae} className="hero-photo" alt="Two men play reggae guitar" />
            <div className="photo-border" />
          </div>

          <blockquote className="quote anim-initial" style={{ animationDelay: '0.7s' }}>
            <p>Maybe we are the only one who can express the people's feeling through music.</p>
            <p>And because we can do that, the people love it&hellip;</p>
            <p className="quote-kicker">so we did it.</p>
          </blockquote>
        </div>
      </section>

      {/* Divider ticker */}
      <div className="ticker anim-scroll" aria-hidden="true">
        <div className="ticker-track">
          {[0, 1].map((i) => (
            <span className="ticker-set" key={i}>
              <span>RIDDIM</span><span className="ticker-dot" />
              <span>TR-808</span><span className="ticker-dot" />
              <span>BASSO PROFUNDO</span><span className="ticker-dot" />
              <span>CR-78</span><span className="ticker-dot" />
              <span>LINNDRUM</span><span className="ticker-dot" />
              <span>TR-909</span><span className="ticker-dot" />
              <span>DUB</span><span className="ticker-dot" />
              <span>DR-202</span><span className="ticker-dot" />
              <span>RIDDIM</span><span className="ticker-dot" />
              <span>TR-707</span><span className="ticker-dot" />
              <span>BASSO PROFUNDO</span><span className="ticker-dot" />
              <span>LM-1</span><span className="ticker-dot" />
              <span>TR-727</span><span className="ticker-dot" />
              <span>DR-110</span><span className="ticker-dot" />
              <span>DUB</span><span className="ticker-dot" />
              <span>TR-606</span><span className="ticker-dot" />
              <span>RIDDIM</span><span className="ticker-dot" />
              <span>LINN 9000</span><span className="ticker-dot" />
              <span>TR-505</span><span className="ticker-dot" />
              <span>BASSO PROFUNDO</span><span className="ticker-dot" />
              <span>CR-68</span><span className="ticker-dot" />
              <span>LM-2</span><span className="ticker-dot" />
              <span>DR-55</span><span className="ticker-dot" />
              <span>DUB</span><span className="ticker-dot" />
              <span>TR-626</span><span className="ticker-dot" />
              <span>RIDDIM</span><span className="ticker-dot" />
              <span>TR-77</span><span className="ticker-dot" />
              <span>BASSO PROFUNDO</span><span className="ticker-dot" />
              <span>LINNDRUM II</span><span className="ticker-dot" />
              <span>DR-220</span><span className="ticker-dot" />
              <span>R-8</span><span className="ticker-dot" />
              <span>DUB</span><span className="ticker-dot" />
              <span>DR-550</span><span className="ticker-dot" />
              <span>LINN DRUM MKIII</span><span className="ticker-dot" />
            </span>
          ))}
        </div>
      </div>

      {/* Player */}
      <section className="player-section anim-scroll">
        <div className="player-label">
          <span className="label-rule" />
          <span className="label-text">NOW SPINNING</span>
          <span className="label-rule" />
        </div>
        <div className="player-embed">
          <iframe
            width="100%"
            height="300"
            scrolling="no"
            frameBorder="no"
            allow="autoplay"
            src="https://w.soundcloud.com/player/?url=https%3A//soundcloud.com/tabula-rasta/sets/tabbula-rasta-reggae-regatta&color=%23c4873a&auto_play=false&hide_related=true&show_comments=false&show_user=true&show_reposts=false&show_teaser=false&visual=true"
            title="SoundCloud Player"
          />
        </div>
      </section>

      {/* About */}
      <section className="about anim-scroll">
        <h2 className="section-heading">Whaddaman Say</h2>
        <div className="about-grid">
          <div className="about-photo-container">
            <div className="photo-overlay" />
            <div className="photo-grain" />
            <img src={summer} className="about-photo" alt="Three men stand in front of the sea" />
          </div>
          <div className="about-body">
            <p>Georgetown Reggae Project is a musical experiment focused on innovative, studio-produced, sample-rich reggae riddims.</p>
            <p className="about-motto">Always militant. Never political.</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer anim-scroll">
        <div className="footer-rule" />
        <p className="footer-text">We used to go to church.<br />We don't go to church no more.</p>
      </footer>
    </div>
  );
}

export default App;
