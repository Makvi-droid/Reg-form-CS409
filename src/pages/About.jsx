import { useState, useEffect, useRef } from "react";
import styles from "./css/About.module.css";

function TerminalBlock({ delay = 0, children }) {
  const [visible, setVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setVisible(true);
            obs.disconnect();
          }
        },
        { threshold: 0.1 },
      );
      if (ref.current) obs.observe(ref.current);
      return () => obs.disconnect();
    }, delay);
    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <div
      ref={ref}
      className={`${styles.block} ${visible ? styles.blockVisible : ""}`}
    >
      {children}
    </div>
  );
}

/* ── Progress bar for skill levels ── */
function ProgressBar({ value, label }) {
  const [width, setWidth] = useState(0);
  const ref = useRef(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setWidth(value), 100);
          obs.disconnect();
        }
      },
      { threshold: 0.5 },
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [value]);

  const filled = Math.round((width / 100) * 20);
  const bar = "█".repeat(filled) + "░".repeat(20 - filled);

  return (
    <div ref={ref} className={styles.progressRow}>
      <span className={styles.progressLabel}>{label.padEnd(18, " ")}</span>
      <span className={styles.progressBar}>[{bar}]</span>
      <span className={styles.progressVal}>{width}%</span>
    </div>
  );
}

/* ── Stat card ── */
function StatCard({ icon, value, label }) {
  return (
    <div className={styles.statCard}>
      <i className={`${icon} ${styles.statIcon}`} />
      <span className={styles.statValue}>{value}</span>
      <span className={styles.statLabel}>{label}</span>
    </div>
  );
}

export default function About() {
  const [time, setTime] = useState(new Date());
  const [activeTab, setActiveTab] = useState("story");

  useEffect(() => {
    const id = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  const pad = (n) => String(n).padStart(2, "0");
  const timestamp = `${time.getFullYear()}-${pad(time.getMonth() + 1)}-${pad(time.getDate())} ${pad(time.getHours())}:${pad(time.getMinutes())}:${pad(time.getSeconds())}`;

  const tabs = [
    { id: "story", label: "story.log", icon: "fas fa-book-open" },
    { id: "skills", label: "skills.sh", icon: "fas fa-code" },
    { id: "timeline", label: "timeline.txt", icon: "fas fa-history" },
    { id: "misc", label: "misc.json", icon: "fas fa-puzzle-piece" },
  ];

  return (
    <div className={styles.terminal}>
      <div className={styles.scanlines} />

      {/* Top bar */}
      <div className={styles.topBar}>
        <div className={styles.dots}>
          <span className={styles.dot} style={{ background: "#ff5f57" }} />
          <span className={styles.dot} style={{ background: "#febc2e" }} />
          <span className={styles.dot} style={{ background: "#28c840" }} />
        </div>
        <span className={styles.topBarTitle}>about.sh — bash</span>
        <span className={styles.clock}>{timestamp}</span>
      </div>

      {/* Boot sequence */}
      <div className={styles.boot}>
        <p>
          <span className={styles.prompt}>$</span> ./about.sh --full --verbose
        </p>
        <p className={styles.dim}>
          Reading user profile... <span className={styles.ok}>[OK]</span>
        </p>
      </div>

      {/* System header card */}
      <TerminalBlock delay={200}>
        <div className={styles.sysCard}>
          <div className={styles.sysLeft}>
            <div className={styles.avatar}>
              <i className="fas fa-user-astronaut" />
            </div>
          </div>
          <div className={styles.sysRight}>
            <p className={styles.sysLine}>
              <span className={styles.sysKey}>USER</span>
              <span className={styles.sysVal}>PASCUAL BERNARD T. BENAURO</span>
            </p>
            <p className={styles.sysLine}>
              <span className={styles.sysKey}>ROLE</span>
              <span className={styles.sysVal}>STUDENT</span>
            </p>
            <p className={styles.sysLine}>
              <span className={styles.sysKey}>LOCATION</span>
              <span className={styles.sysVal}>
                MILKY WAY GALAXY <i className="fas fa-map-marker-alt" />
              </span>
            </p>
            <p className={styles.sysLine}>
              <span className={styles.sysKey}>STATUS</span>
              <span className={styles.statusBadge}>
                <span className={styles.statusDot} /> OPEN TO WORK
              </span>
            </p>
            <p className={styles.sysLine}>
              <span className={styles.sysKey}>UPTIME</span>
              <span className={styles.sysVal}>20+ years of curiosity</span>
            </p>
          </div>
        </div>

        {/* Quick stats */}
        <div className={styles.stats}>
          <StatCard icon="fas fa-laptop-code" value="50+" label="Projects" />
          <StatCard icon="fas fa-coffee" value="∞" label="Coffees" />
          <StatCard icon="fas fa-star" value="3+" label="Yrs Exp" />
          <StatCard icon="fas fa-bug" value="99%" label="Bugs Fixed" />
        </div>
      </TerminalBlock>

      {/* Tab nav */}
      <TerminalBlock delay={350}>
        <div className={styles.tabs}>
          {tabs.map((t) => (
            <button
              key={t.id}
              className={`${styles.tab} ${activeTab === t.id ? styles.tabActive : ""}`}
              onClick={() => setActiveTab(t.id)}
            >
              <i className={t.icon} /> {t.label}
            </button>
          ))}
        </div>

        {/* ── TAB: STORY ── */}
        {activeTab === "story" && (
          <div className={styles.tabContent}>
            <p className={styles.logLine}>
              <span className={styles.logDate}>[INIT]</span> Hello, world.
              I&apos;m <strong className={styles.highlight}>PAS</strong> — a
              developer who genuinely loves what they do.
            </p>
            <p className={styles.logLine}>
              <span className={styles.logDate}>[EARLY]</span> My journey started
              with a childhood obsession with taking things apart to see how
              they worked — gadgets, games, websites. Spoiler: I never fully put
              them back together.
            </p>
            <p className={styles.logLine}>
              <span className={styles.logDate}>[SPARK]</span> I wrote my first
              line of HTML at age 18 and was immediately hooked. The idea that
              you could <em>build something from nothing</em> and share it with
              the entire world? That was magic to me.
            </p>
            <p className={styles.logLine}>
              <span className={styles.logDate}>[STUDY]</span> I pursued a degree
              in Information Technology, where I picked up everything from data
              structures to UI principles — but honestly, I learned just as much
              from late-night side projects and Stack Overflow rabbit holes.
            </p>
            <p className={styles.logLine}>
              <span className={styles.logDate}>[NOW]</span> Today I build
              accessible web experiences. I care deeply about the details — the
              micro-animations, the pixel-perfect spacing, the performance
              budgets. Good code should feel as good as it looks.
            </p>
            <p className={styles.logLine}>
              <span className={styles.logDate}>[GOAL]</span> I&apos;m always
              chasing that intersection of{" "}
              <strong className={styles.highlight}>
                design and engineering
              </strong>{" "}
              — where a component is both elegant in structure and delightful to
              use.
            </p>
            <div className={styles.logFooter}>
              <span className={styles.dim}>-- end of story.log --</span>
              <span className={styles.cursor}>█</span>
            </div>
          </div>
        )}

        {/* ── TAB: SKILLS ── */}
        {activeTab === "skills" && (
          <div className={styles.tabContent}>
            <p className={styles.sectionComment}>
              # Core proficiencies (self-assessed, brutally honest)
            </p>
            <div className={styles.progressList}>
              <ProgressBar value={90} label="React / JSX" />
              <ProgressBar value={85} label="JavaScript" />
              <ProgressBar value={88} label="CSS / Sass" />
              <ProgressBar value={75} label="Node.js" />
              <ProgressBar value={70} label="TypeScript" />
              <ProgressBar value={80} label="UI/UX Design" />
              <ProgressBar value={72} label="REST APIs" />
              <ProgressBar value={65} label="Databases" />
            </div>

            <p className={styles.sectionComment} style={{ marginTop: "24px" }}>
              # Tools I reach for daily
            </p>
            <div className={styles.toolGrid}>
              {[
                { icon: "fab fa-git-alt", name: "Git" },
                { icon: "fas fa-code-branch", name: "VS Code" },
                { icon: "fab fa-figma", name: "Figma" },
                { icon: "fab fa-docker", name: "Docker" },
                { icon: "fas fa-terminal", name: "Linux / Bash" },
                { icon: "fab fa-npm", name: "npm / yarn" },
                { icon: "fab fa-github", name: "GitHub" },
                { icon: "fas fa-fire", name: "Firebase" },
              ].map((tool) => (
                <div key={tool.name} className={styles.toolChip}>
                  <i className={tool.icon} /> {tool.name}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── TAB: TIMELINE ── */}
        {activeTab === "timeline" && (
          <div className={styles.tabContent}>
            <div className={styles.timeline}>
              {[
                {
                  year: "2024 — present",
                  icon: "fas fa-rocket",
                  title: "Freelance Developer",
                  sub: "Self-employed",
                  desc: "Building custom web apps and UI systems for clients across various industries. Specializing in React frontends and clean, maintainable codebases.",
                },
                {
                  year: "2023",
                  icon: "fas fa-briefcase",
                  title: "Junior Frontend Developer",
                  sub: "Some Cool Company",
                  desc: "Joined a small product team, shipping features weekly. Learned to love code reviews, design systems, and standing desks.",
                },
                {
                  year: "2022",
                  icon: "fas fa-graduation-cap",
                  title: "B.S. Computer Science",
                  sub: "Your University",
                  desc: "Graduated with honors. Thesis on progressive web applications. Also co-founded the university's web dev club.",
                },
                {
                  year: "2021",
                  icon: "fas fa-flask",
                  title: "Internship — Web Developer",
                  sub: "Tech Startup Co.",
                  desc: "First real-world dev experience. Rebuilt their landing page, improved load time by 40%, and discovered that coffee is non-optional.",
                },
                {
                  year: "2018",
                  icon: "fas fa-lightbulb",
                  title: "First Side Project Shipped",
                  sub: "Personal",
                  desc: "Launched a small productivity tool that exactly 12 people used — including my mom. Counted it as a win.",
                },
              ].map((item, i) => (
                <div key={i} className={styles.timelineItem}>
                  <div className={styles.timelineLeft}>
                    <span className={styles.timelineYear}>{item.year}</span>
                    <div className={styles.timelineLine} />
                  </div>
                  <div className={styles.timelineNode}>
                    <i className={item.icon} />
                  </div>
                  <div className={styles.timelineRight}>
                    <p className={styles.timelineTitle}>{item.title}</p>
                    <p className={styles.timelineSub}>{item.sub}</p>
                    <p className={styles.timelineDesc}>{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── TAB: MISC ── */}
        {activeTab === "misc" && (
          <div className={styles.tabContent}>
            <p className={styles.sectionComment}>
              # The stuff that doesn't fit on a résumé
            </p>
            <div className={styles.miscGrid}>
              {[
                {
                  icon: "fas fa-gamepad",
                  title: "Gamer",
                  desc: "Strategy games, indie roguelikes, and anything with a good story. Currently obsessing over the latest FromSoftware release.",
                },
                {
                  icon: "fas fa-headphones",
                  title: "Music Nerd",
                  desc: "Lo-fi while coding, metal while debugging, jazz while pretending to think. Spotify wrapped always surprises me.",
                },
                {
                  icon: "fas fa-book",
                  title: "Reader",
                  desc: "Mostly sci-fi, some philosophy, occasional self-help I immediately forget. Brandon Sanderson is basically a deity.",
                },
                {
                  icon: "fas fa-cat",
                  title: "Cat Person",
                  desc: "I have one cat. She is the most important stakeholder in all my projects and frequently walks on the keyboard.",
                },
                {
                  icon: "fas fa-utensils",
                  title: "Amateur Cook",
                  desc: "I treat recipes as suggestions. Sometimes this goes brilliantly. Sometimes I order pizza.",
                },
                {
                  icon: "fas fa-plane",
                  title: "Traveler",
                  desc: "Always planning the next trip, usually somewhere with strong wifi and interesting street food.",
                },
              ].map((item) => (
                <div key={item.title} className={styles.miscCard}>
                  <div className={styles.miscIcon}>
                    <i className={item.icon} />
                  </div>
                  <div>
                    <p className={styles.miscTitle}>{item.title}</p>
                    <p className={styles.miscDesc}>{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className={styles.funFacts}>
              <p
                className={styles.sectionComment}
                style={{ marginTop: "28px" }}
              >
                # fun_facts.push(...)
              </p>
              {[
                "I can type ~110 WPM but still hunt-and-peck for keyboard shortcuts sometimes.",
                "Dark mode is not a preference — it's a lifestyle.",
                "I have strong opinions about tab vs spaces. (Spaces. Final answer.)",
                "I once stayed up until 4am fixing a CSS centering bug. Worth it.",
                "My first programming language was Python. My heart still belongs to it.",
              ].map((fact, i) => (
                <p key={i} className={styles.factLine}>
                  <span className={styles.factIndex}>
                    [{String(i).padStart(2, "0")}]
                  </span>{" "}
                  {fact}
                </p>
              ))}
            </div>
          </div>
        )}
      </TerminalBlock>

      {/* Footer */}
      <TerminalBlock delay={500}>
        <div className={styles.footer}>
          <span className={styles.dim}>// process exited with code</span>{" "}
          <span className={styles.green}>0</span>{" "}
          <span className={styles.dim}>— no errors found in this human</span>
          <span className={styles.blinkCursor}>█</span>
        </div>
      </TerminalBlock>
    </div>
  );
}
