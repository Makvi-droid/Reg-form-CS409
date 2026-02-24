import { useState, useEffect, useRef } from "react";
import styles from "./css/Home.module.css";
import img from "./profile.jpg";
import yo from "./yo.jpg";

const SKILLS = [
  "React",
  "UI/UX Designer",
  "Frontend",
  "Problem Solver",
  "JavaScript",
  "Matcha Lover",
];

const TYPING_SPEED = 80;
const DELETING_SPEED = 40;
const PAUSE_AFTER_TYPE = 1800;
const PAUSE_AFTER_DELETE = 400;

export default function Home() {
  const [displayText, setDisplayText] = useState("");
  const [skillIndex, setSkillIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [photoHovered, setPhotoHovered] = useState(false);
  const timeoutRef = useRef(null);

  useEffect(() => {
    const currentSkill = SKILLS[skillIndex];

    if (!isDeleting && displayText === currentSkill) {
      timeoutRef.current = setTimeout(
        () => setIsDeleting(true),
        PAUSE_AFTER_TYPE,
      );
      return;
    }

    if (isDeleting && displayText === "") {
      setIsDeleting(false);
      setSkillIndex((prev) => (prev + 1) % SKILLS.length);
      timeoutRef.current = setTimeout(() => {}, PAUSE_AFTER_DELETE);
      return;
    }

    const speed = isDeleting ? DELETING_SPEED : TYPING_SPEED;
    timeoutRef.current = setTimeout(() => {
      setDisplayText((prev) =>
        isDeleting
          ? currentSkill.slice(0, prev.length - 1)
          : currentSkill.slice(0, prev.length + 1),
      );
    }, speed);

    return () => clearTimeout(timeoutRef.current);
  }, [displayText, isDeleting, skillIndex]);

  return (
    <div className={styles.terminal}>
      {/* Scanline overlay */}
      <div className={styles.scanlines} />

      {/* Top bar */}
      <div className={styles.topBar}>
        <div className={styles.dots}>
          <span className={styles.dot} style={{ background: "#ff5f57" }} />
          <span className={styles.dot} style={{ background: "#febc2e" }} />
          <span className={styles.dot} style={{ background: "#28c840" }} />
        </div>
        <span className={styles.topBarTitle}>portfolio.exe — bash</span>
      </div>

      {/* Main content */}
      <main className={styles.main}>
        {/* Boot lines */}
        <div className={styles.bootLines}>
          <p>
            <span className={styles.prompt}>$</span> ./init_portfolio.sh
          </p>
          <p className={styles.dim}>
            Loading modules... <span className={styles.ok}>[OK]</span>
          </p>
          <p className={styles.dim}>
            Mounting assets... <span className={styles.ok}>[OK]</span>
          </p>
        </div>

        <div className={styles.hero}>
          {/* Photo section */}
          <div className={styles.photoSection}>
            <div
              className={styles.photoWrapper}
              onMouseEnter={() => setPhotoHovered(true)}
              onMouseLeave={() => setPhotoHovered(false)}
            >
              <div className={styles.photoFrame}>
                <img
                  src={img}
                  alt="Profile"
                  className={`${styles.photo} ${!photoHovered ? styles.photoVisible : ""}`}
                />
                <img
                  src={yo}
                  alt="Profile alternate"
                  className={`${styles.photo} ${styles.photoAlt} ${photoHovered ? styles.photoVisible : ""}`}
                />
                <div className={styles.photoOverlay}>
                  <i className="fas fa-terminal" />
                </div>
              </div>
              <div className={styles.photoLabel}>
                <span className={styles.prompt}>user@portfolio</span>
                <span className={styles.dim}>
                  :{photoHovered ? "~/fun" : "~/work"}
                </span>
                <span className={styles.cursor}>█</span>
              </div>
            </div>
          </div>

          {/* Info section */}
          <div className={styles.infoSection}>
            <div className={styles.nameBlock}>
              <p className={styles.greeting}>
                <span className={styles.prompt}>$</span> whoami
              </p>
              <h1 className={styles.name}>Pascual Bernard T. Benauro</h1>
            </div>

            <div className={styles.roleBlock}>
              <p className={styles.roleLabel}>
                <span className={styles.prompt}>$</span> cat role.txt
              </p>
              <p className={styles.roleDisplay}>
                <span className={styles.roleText}>{displayText}</span>
                <span className={styles.caret}>▌</span>
              </p>
            </div>

            <div className={styles.aboutBlock}>
              <p className={styles.prompt}>$ cat about.md</p>
              <p className={styles.aboutText}>
                Hey there 👋 I'm a passionate developer who loves crafting
                beautiful and functional web experiences. I thrive at the
                intersection of design and code — turning ideas into reality,
                one commit at a time.
              </p>
            </div>

            <div className={styles.linksBlock}>
              <p className={styles.prompt}>$ ls ./links</p>
              <div className={styles.links}>
                <a href="#" className={styles.link}>
                  <i className="fab fa-github" /> GitHub
                </a>
                <a href="#" className={styles.link}>
                  <i className="fab fa-linkedin" /> LinkedIn
                </a>
                <a href="#" className={styles.link}>
                  <i className="fas fa-envelope" /> Email
                </a>
                <a href="#" className={styles.link}>
                  <i className="fas fa-file-alt" /> Resume
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Skills grid */}
        <div className={styles.skillsSection}>
          <p className={styles.prompt}>$ cat skills.json</p>
          <div className={styles.skillsJson}>
            <p className={styles.jsonBrace}>{"{"}</p>
            <div className={styles.skillsList}>
              {[
                { icon: "fab fa-react", label: "React" },
                { icon: "fab fa-js-square", label: "JavaScript" },
                { icon: "fab fa-css3-alt", label: "CSS" },
                { icon: "fab fa-node-js", label: "Node.js" },
                { icon: "fab fa-git-alt", label: "Git" },
                { icon: "fas fa-paint-brush", label: "UI/UX Design" },
                { icon: "fas fa-database", label: "Databases" },
                { icon: "fas fa-mobile-alt", label: "Responsive Design" },
              ].map((skill, i) => (
                <div key={skill.label} className={styles.skillItem}>
                  <span className={styles.jsonKey}>"skill_{i + 1}"</span>
                  <span className={styles.dim}>: </span>
                  <span className={styles.jsonVal}>
                    <i className={skill.icon} /> "{skill.label}"
                  </span>
                  {i < 7 && <span className={styles.dim}>,</span>}
                </div>
              ))}
            </div>
            <p className={styles.jsonBrace}>{"}"}</p>
          </div>
        </div>

        {/* Footer line */}
        <div className={styles.footer}>
          <span className={styles.dim}>// Made with</span>{" "}
          <span className={styles.green}>♥</span>{" "}
          <span className={styles.dim}>and too much coffee</span>
          <span className={styles.blinkCursor}>█</span>
        </div>
      </main>
    </div>
  );
}
