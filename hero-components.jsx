// hero-components.jsx — Header + 3 hero variations for Kimochi
// Each variation is a self-contained section sized to its DCArtboard (1440×900).

const NAV = [
  { id: "home", label: "Home" },
  { id: "menu", label: "Menu" },
  { id: "story", label: "Our story" },
  { id: "visit", label: "Visit" },
];

/* ───────── Shared Header ───────── */
function HpHeader({ variant = "default", active = "home", primaryCta = "Order online", showLocale = true }) {
  const className =
    "hp-header " +
    (variant === "onphoto" ? "hp-header--onphoto " : "") +
    (variant === "blur" ? "hp-header--blur " : "");
  return (
    <header className={className}>
      <a className="hp-brand" href="#">
        <img className="hp-brand__logo" src="assets/logo.jpg" alt="Kimochi" />
        <span className="hp-brand__type">Kimochi</span>
      </a>
      <nav className="hp-nav">
        {NAV.map((l) => (
          <a key={l.id} href="#" className={active === l.id ? "active" : ""}>{l.label}</a>
        ))}
      </nav>
      <div className="hp-cta-right">
        {showLocale && <span className="hp-locale">Attleboro · MA</span>}
        <button className={"k-btn k-btn--sm " + (variant === "onphoto" ? "k-btn--ghost-light" : "k-btn--primary")}>
          {primaryCta}
        </button>
      </div>
    </header>
  );
}

/* ─────────────────────────────────────────────────────────────
   A — Editorial quiet
   Asymmetric two-column, Playfair lead, blush ring photo, stamp.
   ───────────────────────────────────────────────────────────── */
function HeroA({ tweaks }) {
  return (
    <div className="hp hpA">
      <div className="hpA__grain" aria-hidden="true"></div>
      <HpHeader variant="blur" />
      <div className="hpA__body">
        <div className="hpA__left">
          <span className="hp-eyebrow">Bubble tea · Lemonade · Espresso</span>
          <h1 className="hpA__title">
            Your <em>third place</em>,<br />in Attleboro.
          </h1>
          <p className="hpA__sub">
            Made fresh, served slow — in a room built for board games, long conversations,
            and the friend you haven't seen in a while.
          </p>
          <div className="hpA__ctas">
            <button className="k-btn k-btn--primary k-btn--lg">Order online</button>
            <button className="k-btn k-btn--ghost k-btn--lg">See the menu →</button>
          </div>
          <div className="hpA__meta">
            <span className="hp-pill">
              <span className="hp-pill__dot"></span>
              Open today · 11 am – 9 pm
            </span>
            <span className="hpA__metaline">A short walk from the train</span>
          </div>
        </div>

        <div className="hpA__right">
          <div className="hpA__ring" aria-hidden="true"></div>
          <div className="hpA__photo" role="img" aria-label="Kimochi drinks against floral wall"></div>
          <div className="hpA__stamp">
            <span className="hpA__stamp__script">ハッピー</span>
            <span className="hpA__stamp__sub">Spread positivity</span>
          </div>
          <span className="hpA__leaf">— since 2022</span>
        </div>
      </div>
      <div className="hpA__ribbon">
        <span>Boba</span><span>·</span><span>Lemonade</span><span>·</span><span>Espresso</span>
        <span style={{ marginLeft: "auto" }}><b>Sip slow.</b></span>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   B — Photo-forward refined
   Full-bleed photo, warm gradient veil, script + display lead.
   ───────────────────────────────────────────────────────────── */
function HeroB({ tweaks }) {
  return (
    <div className="hp hpB">
      <div className="hpB__photo" aria-hidden="true"></div>
      <div className="hpB__veil" aria-hidden="true"></div>
      <div className="hpB__grain" aria-hidden="true"></div>
      <HpHeader variant="onphoto" />
      <div className="hpB__topright">
        <span className="hp-pill">
          <span className="hp-pill__dot"></span>
          Open · 11 am – 9 pm
        </span>
      </div>
      <div className="hpB__content">
        <div className="hpB__main">
          <span className="hpB__script">spread positivity</span>
          <h1 className="hpB__title">
            Drop by with<br />your <em>bestie</em>.
          </h1>
          <p className="hpB__sub">
            Bubble tea, lemonade, espresso — made fresh and served slow.
            A third place in downtown Attleboro, built for board games and long
            conversations.
          </p>
          <div className="hpB__ctas">
            <button className="k-btn k-btn--primary k-btn--lg">Order online</button>
            <button className="k-btn k-btn--ghost-light k-btn--lg">See the menu →</button>
          </div>
        </div>
        <div className="hpB__aside">
          <div className="hpB__stamp">
            <img src="assets/logo.jpg" alt="Kimochi Boba Cafe" />
          </div>
          <div className="hpB__cards">
            <span className="lbl">Find us</span>
            <span>23 Park St · Attleboro, MA</span>
            <span style={{ color: "rgba(253,248,245,0.55)" }}>4 min walk from the train</span>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   C — Asymmetric with script medallion + drink rail peek
   ───────────────────────────────────────────────────────────── */
const DRINKS = [
  { name: "Brown Sugar Milk Tea", price: "$6.50", cup: "linear-gradient(180deg, #F0E0CC 0%, #D4A882 55%, #8B5E3C 100%)" },
  { name: "Taro Latte", price: "$6.25", cup: "linear-gradient(180deg, #F5EAF8 0%, #C9A8D4 100%)" },
  { name: "Mango Green", price: "$6.00", cup: "linear-gradient(180deg, #FFF3D0 0%, #F0C060 100%)" },
  { name: "Strawberry Matcha", price: "$6.75", cup: "linear-gradient(180deg, #D0E4E0 0%, #4B8A95 45%, #F2DADA 46%, #C87878 100%)" },
  { name: "Rose Lemonade", price: "$5.75", cup: "linear-gradient(180deg, #FFF6F6 0%, #F2DADA 60%, #C87878 100%)" },
];

function HeroC({ tweaks }) {
  return (
    <div className="hp hpC">
      <div className="hpC__washL" aria-hidden="true"></div>
      <div className="hpC__washR" aria-hidden="true"></div>
      <HpHeader variant="blur" />
      <div className="hpC__body">
        <div className="hpC__left">
          <div className="hpC__eyebrow-row">
            <span className="hp-eyebrow">Est. 2022 · Downtown Attleboro</span>
          </div>
          <h1 className="hpC__title">
            <span className="script">Sip slow,</span>
            stay a while.
          </h1>
          <p className="hpC__sub">
            Bubble tea, lemonade, and espresso — made the way we'd make it
            for a friend. Pull up a chair, pick a board game, and tell us
            what you're feeling.
          </p>
          <div className="hpC__ctas">
            <button className="k-btn k-btn--primary k-btn--lg">Order online</button>
            <button className="k-btn k-btn--ghost k-btn--lg">See the menu →</button>
          </div>

          <div className="hpC__rail" aria-hidden="true">
            {DRINKS.map((d, i) => (
              <div className="hpC__drink" key={d.name} style={{ transform: `translateY(${(i % 2) * -8}px)` }}>
                <div className="hpC__drink__cup" style={{ background: d.cup }}></div>
                <div className="hpC__drink__name">{d.name}</div>
                <div className="hpC__drink__price">{d.price}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="hpC__right">
          <div className="hpC__rightInner">
            <div className="hpC__medallion">
              <span className="hpC__medallion__script">ハッピー</span>
            </div>
            <div className="hpC__logo">
              <img src="assets/logo.jpg" alt="Kimochi" />
            </div>
          </div>
          <div className="hpC__rightMeta">
            <div>
              <span className="k">Today</span>
              <span className="v">11 — 9</span>
            </div>
            <div>
              <span className="k">Find us</span>
              <span className="v">23 Park St</span>
              <span style={{ color: "rgba(253,248,245,0.55)", fontSize: 12 }}>4 min from the train</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { HpHeader, HeroA, HeroB, HeroC });
