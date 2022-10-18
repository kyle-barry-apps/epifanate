const About = () => {
  return (
    <section className="about-container">
      <div className="about-epifanate">
        <h1 style={{letterSpacing: '2px'}}>About Epifanate</h1>
        <p>Have you ever had a profound realization and wanted to share it with the world? Have you ever forgotten something important only to remember it again years later?</p>
        <p>Epifanate is a way to keep track of your own insights and steal the best ones from everyone else. We'll keep track of your progress as a thinker. You'll be able to see which of your epifanies have become popular, and which you may want to rethink. Just keep epifanating.</p>
      </div>
      <div className="about-titles">
        <h3>Titles</h3>
        <p>Your title, listed below your username, is based on your epifany output. It will be one of the following:</p>
        <div>
          <h4>Baby Mind</h4>
          <p>A novice thinker but showing great potential for deep insights. You’ll just have to grow a bit.</p>
        </div>
        <div>
          <h4>Freethinker</h4>
          <p>You’re beginning to see through the bullshit. Keep your mind open and keep epifanating.</p>
        </div>
        <div>
          <h4>Armchair Philosopher</h4>
          <p>Mature and insightful enough to see some truths, but not quite reaching the level of profundity.</p>
        </div>
        <div>
          <h4>Scholar</h4>
          <p>Consistently producing great thoughts in an organized manner. It’s an honor to have you here.</p>
        </div>
        <div>
          <h4>Freakin' Genius</h4>
          <p>Mind-blowing stuff. Seriously. You’re one-of-a-kind.</p>
        </div>
      </div>
    </section>
  )
}

export default About