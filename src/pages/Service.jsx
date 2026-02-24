import { useState, useEffect, useRef } from "react";
import styles from "./css/Service.module.css";

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
        { threshold: 0.08 },
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

/* ── GitHub project card ── */
function GithubCard({ repo, index }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className={`${styles.repoCard} ${hovered ? styles.repoCardHovered : ""}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <div className={styles.repoTop}>
        <div className={styles.repoIconWrap}>
          <i className="fas fa-folder-open" />
        </div>
        <a
          href={repo.url}
          target="_blank"
          rel="noreferrer"
          className={styles.repoGithubLink}
          title="Open on GitHub"
        >
          <i className="fab fa-github" />
        </a>
      </div>

      <h3 className={styles.repoName}>{repo.name}</h3>
      <p className={styles.repoDesc}>{repo.desc}</p>

      <div className={styles.repoTags}>
        {repo.tech.map((t) => (
          <span key={t} className={styles.repoTag}>
            {t}
          </span>
        ))}
      </div>

      <div className={styles.repoStats}>
        <span className={styles.repoStat}>
          <i className="fas fa-star" /> {repo.stars ?? 0}
        </span>
        <span className={styles.repoStat}>
          <i className="fas fa-code-branch" /> {repo.forks ?? 0}
        </span>
        <span
          className={`${styles.repoLangDot}`}
          style={{ background: repo.langColor ?? "#00ff41" }}
        />
        <span className={styles.repoLang}>{repo.lang}</span>
      </div>

      <a
        href={repo.url}
        target="_blank"
        rel="noreferrer"
        className={styles.repoBtn}
      >
        <i className="fab fa-github" /> View on GitHub
        <i className="fas fa-arrow-right" />
      </a>
    </div>
  );
}

const GITHUB_PROJECTS = [
  {
    name: "PROJECT 1",
    desc: "PASSION PROJECT 1",
    tech: ["HTML", "CSS", "JS"],
    lang: "JavaScript",
    langColor: "#f1e05a",
    stars: 12,
    forks: 3,
    url: "https://makvi-droid.github.io/etch-a-sketch/",
  },
  {
    name: "PROJECT 2",
    desc: "PASSION PROJECT 2",
    tech: ["HTML", "CSS", "JS"],
    lang: "JavaScript",
    langColor: "#f1e05a",
    stars: 8,
    forks: 1,
    url: "https://makvi-droid.github.io/ako-na-lang/",
  },
  {
    name: "PROJECT 3",
    desc: "PASSION PROJECT 3",
    tech: ["HTML", "CSS", "JS"],
    lang: "JavaScript",
    langColor: "#f1e05a",
    stars: 5,
    forks: 2,
    url: "https://makvi-droid.github.io/Valentines/",
  },
];

export default function Service() {
  const [activeIllust, setActiveIllust] = useState(null);

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
        <span className={styles.topBarTitle}>services.sh — bash</span>
      </div>

      {/* Boot */}
      <div className={styles.boot}>
        <p>
          <span className={styles.prompt}>$</span> ./services.sh --list-all
        </p>
        <p className={styles.dim}>
          Scanning project directories...{" "}
          <span className={styles.ok}>[OK]</span>
        </p>
      </div>

      {/* ── SECTION 2: GitHub Projects ── */}
      <TerminalBlock delay={200}>
        <div className={styles.sectionHeader}>
          <div className={styles.sectionMeta}>
            <span className={styles.sectionIndex}>02 /</span>
            <i className="fab fa-github" />
            <h2 className={styles.sectionTitle}>github_repos/</h2>
          </div>
          <p className={styles.sectionSub}>
            <span className={styles.prompt}>$</span> git ls-remote —{" "}
            {GITHUB_PROJECTS.length} repositories
          </p>
        </div>

        <div className={styles.repoGrid}>
          {GITHUB_PROJECTS.map((repo, i) => (
            <GithubCard key={repo.name} repo={repo} index={i} />
          ))}
        </div>

        {/* GitHub profile CTA */}
        <div className={styles.githubCta}>
          <span className={styles.dim}>$ # Want to see more?</span>
          <a
            href="https://github.com/Makvi-droid?page=2&tab=repositories" // ← replace
            target="_blank"
            rel="noreferrer"
            className={styles.ctaBtn}
          >
            <i className="fab fa-github" />
            View Full GitHub Profile
            <i className="fas fa-external-link-alt" />
          </a>
        </div>
      </TerminalBlock>

      {/* Footer */}
      <TerminalBlock delay={300}>
        <div className={styles.footer}>
          <span className={styles.dim}>// process exited with code</span>{" "}
          <span className={styles.green}>0</span>{" "}
          <span className={styles.dim}>
            — all projects compiled successfully
          </span>
          <span className={styles.blinkCursor}>█</span>
        </div>
      </TerminalBlock>
    </div>
  );
}
