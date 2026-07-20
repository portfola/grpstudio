/**
 * "Request the riddim" — a postcard-styled, one-click mailto CTA for a song
 * that's already getting radio play, inviting the listener to ask the
 * station to keep spinning it. We never send anything ourselves; the button
 * just opens the visitor's own mail client with the message pre-filled so
 * they can review it and hit send.
 *
 * Data-driven off release.radioRequest ({ station, email }) — see the
 * file-header comment in data/releases.js. A future single picked up by a
 * different station reuses this component for free: one data entry, no new
 * copy or markup.
 *
 * Three message variants, picked at random per click — so a station's inbox
 * doesn't fill up with identical copy-pasted requests. The first variant also
 * doubles as the static href (works without JS); the click handler re-rolls.
 */
function messageVariants(title, station) {
  return [
    {
      subject: `Play "${title}" again!`,
      body: `Hey everyone at ${station},\n\n`
        + `I heard "${title}" by Georgetown Reggae Project on the air and haven't been able to shake it since — please add it to the rotation and keep spinning it!\n\n`
        + `Thanks for keeping the island sound going.\n`,
    },
    {
      subject: `More "${title}" please!`,
      body: `Hi ${station},\n\n`
        + `Just heard "${title}" by Georgetown Reggae Project and had to write in. That riddim needs to be in heavy rotation! Can you play it again (and again)?\n\n`
        + `Appreciate you spinning local island sound.\n`,
    },
    {
      subject: `Requesting "${title}" by Georgetown Reggae Project`,
      body: `Hey ${station} crew,\n\n`
        + `I'm a fan of "${title}" by Georgetown Reggae Project and would love to hear it on the air again soon. Would you consider adding it back into rotation?\n\n`
        + `Thanks for all you do for the local music scene.\n`,
    },
  ];
}

function mailtoFor(email, { subject, body }) {
  return `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

export default function RadioRequestCard({ title, station, email, compact = false }) {
  const variants = messageVariants(title, station);
  const fallbackHref = mailtoFor(email, variants[0]);

  function handleClick(e) {
    e.preventDefault();
    const pick = variants[Math.floor(Math.random() * variants.length)];
    window.location.href = mailtoFor(email, pick);
  }

  return (
    <div className={`radio-request${compact ? ' radio-request--compact' : ''}`}>
      <p className="radio-request__eyebrow">Spread the Vibe</p>
      <p className="radio-request__copy">
        Love &ldquo;{title}&rdquo;? Tell {station} you want GRP on the air!
      </p>
      <a className="release__btn release__btn--primary" href={fallbackHref} onClick={handleClick}>
        Email {station} <span aria-hidden="true">&#9993;</span>
      </a>
    </div>
  );
}
