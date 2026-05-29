// site-components.jsx — Kimochi single-page website
// Requires: menu-data.jsx (MENU_SECTIONS, TOPPINGS, SPECIALTY, parseItem), image-slot.js

const SITE_NAV = [
  { id: "home",    label: "Home" },
  { id: "menu",    label: "Menu" },
  { id: "story",   label: "Our Story" },
  { id: "visit",   label: "Visit" },
];

const ORDER_URL = "#"; // online-ordering link (placeholder)

/* ───────────────── Header ───────────────── */
function SiteHeader({ active }) {
  const [scrolled, setScrolled] = React.useState(false);
  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > window.innerHeight * 0.55 - 84);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <header className={"site-header" + (scrolled ? " is-scrolled" : "")}>
      <a className="brand" href="#home">
        <img className="brand__logo" src={(window.__resources && window.__resources.logo) || "assets/logo.jpg"} alt="Kimochi Boba Cafe" />
        <span className="brand__txt">
          <span className="brand__name">Kimochi</span>
          <span className="brand__tag">Spread positivity</span>
        </span>
      </a>
      <nav className="nav">
        {SITE_NAV.map((n) => (
          <a key={n.id} href={`#${n.id}`} className={active === n.id ? "active" : ""}>{n.label}</a>
        ))}
      </nav>
      <div className="header-right">
        <span className="header-locale">Attleboro · MA</span>
        <a className={"k-btn k-btn--sm " + (scrolled ? "k-btn--primary" : "k-btn--ghost-light")} href={ORDER_URL}>Order Online</a>
      </div>
    </header>
  );
}

/* ───────────────── Hero ───────────────── */
function Hero() {
  return (
    <section id="home" className="hero" data-screen-label="Hero">
      <div className="hero__photo" aria-hidden="true">
        <div className="hero__scrim"></div>
      </div>
      <div className="hero__content">
        <div className="hero__main">
          <span className="hero__script">Pouring joy,</span>
          <h1 className="hero__title">Brewing<br />connection.</h1>
          <p className="hero__lead">
            Bubble tea, lemonade, &amp; espresso — made fresh and served slow.
            A third place in downtown Attleboro, built for board games and long conversations.
          </p>
          <div className="hero__ctas">
            <a className="k-btn k-btn--primary k-btn--lg" href={ORDER_URL}>Order online</a>
            <a className="k-btn k-btn--ghost k-btn--lg" href="#menu">View menu</a>
          </div>
        </div>
        <div className="hero__aside">
          <span className="hero__status"><span className="dot"></span>Open · 11am – 8pm</span>
          <div className="hero__mapslot">
            <image-slot
              id="hero-map"
              shape="rect"
              placeholder="Drop a map or storefront photo"
              style={{ width: "100%", height: "100%", display: "block" }}
            ></image-slot>
          </div>
          <div className="hero__find">
            <span className="lbl">Find us</span>
            <span className="addr">1 Park Street · Attleboro, MA</span>
            <span className="sub">4 min walk from the train</span>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ───────────────── Menu (Direction C poster + specialty folded) ───────────────── */
function MpCSection({ name, sub, items, pickHint, note, single }) {
  const parsed = items.map(parseItem);
  return (
    <div className="mpC__sec">
      <div className="mpC__secHead">
        <h3>{name}</h3>
        {sub && <p>{sub}</p>}
      </div>
      {pickHint && <div className="mpC__pickLine">{pickHint}</div>}
      <div className={"mpC__list " + (single || parsed.length <= 4 ? "mpC__list--single" : "")}>
        {parsed.map((it) => (
          <div className="mpC__listItem" key={it.label}>
            {it.label}{it.caffeine && <span className="caf">*</span>}
          </div>
        ))}
      </div>
      {note && (
        <div className="mpC__banner">
          <span>{note.includes("slush") ? <>Make it a <em>SLUSH</em></> : note.toUpperCase().includes("OAT") ? <>Upgrade to <em>OAT MILK</em></> : note}</span>
        </div>
      )}
    </div>
  );
}

function SpecialtyBlock() {
  const { series, specialtyEspresso, espresso, season } = SPECIALTY;
  return (
    <div className="sp">
      <div className="sp-hero">
        <span className="sp-hero__eyebrow">Seasonal feature · {season}</span>
        <h2 className="sp-hero__script">Specialty Drink Series</h2>
        <p className="sp-hero__lead">
          A rotating cast of signature builds — layered, named, and made to order.
          Here while the season lasts.
        </p>
      </div>
      <div className="sp-series">
        {series.map((d, i) => (
          <article className="sp-card" key={d.id}>
            <div className="sp-card__media">
              <image-slot
                id={`spec-${d.id}`}
                shape="rounded"
                radius="18"
                placeholder={`Drop ${d.name} photo`}
                style={{ width: "100%", height: "300px", display: "block" }}
              ></image-slot>
              <span className="sp-card__num">{String(i + 1).padStart(2, "0")}</span>
            </div>
            <div className="sp-card__body">
              <h3 className="sp-card__name">{d.name}{d.caffeine && <span className="sp-caf">*</span>}</h3>
              <span className="sp-card__base">{d.base}</span>
              <ul className="sp-card__build">{d.build.map((line) => <li key={line}>{line}</li>)}</ul>
            </div>
          </article>
        ))}
      </div>
      <div className="sp-espresso">
        <div className="sp-espresso__inner">
          <div className="sp-espresso__col sp-espresso__col--specialty">
            <div className="sp-espresso__head"><h2>Iced Specialty Espresso</h2><p>House signatures over a double shot.</p></div>
            <div className="sp-espresso__list">
              {specialtyEspresso.map((e) => (
                <div className="sp-espresso__item" key={e.name}>
                  <span className="sp-espresso__name">{e.name}<span className="sp-caf">*</span></span>
                  <span className="sp-espresso__build">{e.build}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="sp-espresso__col">
            <div className="sp-espresso__head"><h2>Iced Espresso</h2><p>The everyday bar.</p></div>
            <div className="sp-espresso__list sp-espresso__list--two">
              {espresso.map((e) => (
                <div className="sp-espresso__item" key={e.name}>
                  <span className="sp-espresso__name">{e.name}<span className="sp-caf">*</span></span>
                  <span className="sp-espresso__build">{e.build}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        <p className="sp-espresso__legend"><span className="sp-caf">*</span> Contains caffeine · Sub oat milk on any drink</p>
      </div>
    </div>
  );
}

function MenuSection() {
  const byId = Object.fromEntries(MENU_SECTIONS.map((s) => [s.id, s]));
  const sec = (id) => byId[id];
  return (
    <section id="menu" className="menu-sec" data-screen-label="Menu">
      <div className="mpC">
        <div className="mpC__body">
          <h1 className="mpC__title">Everyday Menu</h1>
          <p className="mpC__sub">Bubble tea · Lemonade · Espresso — made fresh, served slow.</p>
          <div className="mpC__grid">
            <div className="mpC__col">
              <MpCSection {...sec("classic-milk-tea")} single />
              <MpCSection {...sec("milk-tea")} />
            </div>
            <div className="mpC__col">
              <MpCSection {...sec("iced-or-hot-tea")} single />
              <MpCSection {...sec("hot-cocoa")} />
              <MpCSection {...sec("tea-latte")} />
            </div>
            <div className="mpC__col">
              <MpCSection {...sec("fruit-tea")} />
              <MpCSection {...sec("lemonade")} />
            </div>
            <div className="mpC__col">
              <div className="mpC__sec">
                <div className="mpC__secHead"><h3>Toppings</h3></div>
                <div className="mpC__list">
                  {TOPPINGS.base.items.map((t) => {
                    const p = parseItem(t.name);
                    return (
                      <div className="mpC__listItem" key={t.name} style={t.note ? { gridColumn: "1 / -1" } : null}>
                        {p.label}{p.caffeine && <span className="caf">*</span>}
                        {t.note && <div style={{ fontSize: 12, fontWeight: 500, color: "var(--fg-muted)", marginTop: 2 }}>{t.note}</div>}
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className="mpC__sec">
                <div className="mpC__secHead" style={{ background: "transparent", color: "var(--color-matcha-deep)", padding: 0, marginBottom: 8 }}>
                  <h3 style={{ color: "var(--color-matcha-deep)", fontSize: 20 }}>Jelly</h3>
                </div>
                <div className="mpC__list">
                  {TOPPINGS.jelly.items.map((t) => {
                    const p = parseItem(t.name);
                    return <div className="mpC__listItem" key={t.name}>{p.label}{p.caffeine && <span className="caf">*</span>}</div>;
                  })}
                </div>
              </div>
              <div className="mpC__sec">
                <div className="mpC__secHead" style={{ background: "transparent", color: "var(--color-matcha-deep)", padding: 0, marginBottom: 8 }}>
                  <h3 style={{ color: "var(--color-matcha-deep)", fontSize: 20 }}>Popping Boba</h3>
                </div>
                <div className="mpC__list">
                  {TOPPINGS.popping.items.map((t) => <div className="mpC__listItem" key={t.name}>{t.name}</div>)}
                </div>
              </div>
            </div>
          </div>
          <p className="mpC__legend"><span className="caf">*</span>&nbsp; Contains caffeine</p>
        </div>
      </div>

      <SpecialtyBlock />
    </section>
  );
}

/* ───────────────── Our Story ───────────────── */
function StorySection() {
  return (
    <section id="story" className="section story" data-screen-label="Our Story">
      <div className="wrap story__inner">
        <div className="story__media">
          <div className="story__photo">
            <image-slot
              id="story-photo"
              shape="rect"
              placeholder="Drop a photo of the shop or team"
              style={{ width: "100%", height: "100%", display: "block" }}
            ></image-slot>
          </div>
          <div className="story__ring" aria-hidden="true"></div>
        </div>
        <div className="story__text">
          <span className="eyebrow">Our Story</span>
          <h2 className="story__title">More than<br />what's on the <em>menu</em>.</h2>
          <p>
            Kimochi is Attleboro's premier spot for bubble tea, lemonade, and espresso drinks —
            but it goes beyond what's on the menu. We're deeply committed to creating a safe,
            inclusive environment and being a positive presence in the Attleboro community.
          </p>
          <p>
            Kimochi is personal to us. It's a place we have shared memories, and now it's something
            we're building for others to do the same. We believe in showing up, giving back, and
            creating something meaningful for the people who walk through our doors every day.
          </p>
          <p className="story__quote">
            Drop by with your bestie for board games and boba. Create memories and unwind.
          </p>
        </div>
      </div>
    </section>
  );
}

/* ───────────────── Instagram feed ───────────────── */
function InstagramSection() {
  const cells = ["ig1", "ig2", "ig3", "ig4", "ig5", "ig6"];
  return (
    <section id="instagram" className="section ig" data-screen-label="Instagram">
      <div className="wrap">
        <div className="section__head">
          <span className="eyebrow">@kimochiboba</span>
          <h2 className="section__title">Always something new.</h2>
          <p className="section__lead">
            Seasonal drops, daily specials, and the everyday happenings around the shop —
            follow along and never miss a thing.
          </p>
        </div>
        <div className="ig__grid">
          {cells.map((id) => (
            <div className="ig__cell" key={id}>
              <image-slot
                id={id}
                shape="rect"
                placeholder="Drop an IG post"
                style={{ width: "100%", height: "100%", display: "block" }}
              ></image-slot>
            </div>
          ))}
        </div>
        <div className="ig__foot">
          <a className="k-btn k-btn--primary k-btn--lg" href="https://instagram.com/kimochiboba" target="_blank" rel="noopener">Follow @kimochiboba</a>
        </div>
      </div>
    </section>
  );
}

/* ───────────────── Visit ───────────────── */
const VISIT_ACTIONS = [
  { label: "Order on DoorDash", href: "#" },
  { label: "Join Loyalty", href: "#" },
  { label: "Instagram", href: "https://instagram.com/kimochiboba" },
  { label: "Facebook", href: "#" },
  { label: "Linktree", href: "#" },
  { label: "Email Us", href: "mailto:hello@kimochiboba.com" },
  { label: "Share a Review", href: "#", wide: true },
];

function VisitSection() {
  return (
    <section id="visit" className="section visit" data-screen-label="Visit">
      <div className="wrap visit__inner">
        <div className="visit__left">
          <div className="visit__map">
            <image-slot
              id="visit-map"
              shape="rect"
              placeholder="Drop a map of downtown Attleboro"
              style={{ width: "100%", height: "100%", display: "block" }}
            ></image-slot>
          </div>
          <div className="visit__addr">
            <h3>1 Park Street</h3>
            <p>Attleboro, MA 02703</p>
            <a href="tel:7746776047">774 · 677 · 6047</a>
          </div>
          <span className="visit__parking">🅿︎&nbsp; <b>Downtown parking</b> — free street &amp; nearby lots</span>
        </div>
        <div className="visit__right">
          <span className="eyebrow">Visit</span>
          <h2 className="visit__title">Come say hi.</h2>
          <p className="visit__hours">Open 11am – 8pm, <span>all week</span>.</p>
          <p className="visit__copy">
            We're right in downtown Attleboro, just a short walk from the train station,
            with free parking on the street and in nearby lots. Drop by, pull up a chair,
            and stay a while.
          </p>
          <div className="visit__actions">
            {VISIT_ACTIONS.map((a) => (
              <a key={a.label} className={"k-btn k-btn--primary" + (a.wide ? " k-btn--wide" : "")} href={a.href}
                 target={a.href.startsWith("http") ? "_blank" : undefined} rel="noopener">{a.label}</a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ───────────────── Footer ───────────────── */
function SiteFooter() {
  return (
    <footer className="footer">
      <div className="wrap footer__inner">
        <div className="footer__brand">
          <span className="footer__name">Kimochi</span>
          <span className="footer__tag">Spread positivity</span>
          <p style={{ fontSize: 14, color: "rgba(253,248,245,0.7)", margin: "8px 0 0", lineHeight: 1.6 }}>
            Bubble tea, lemonade &amp; espresso in downtown Attleboro.
          </p>
        </div>
        <div className="footer__cols">
          <div className="footer__col">
            <h5>Explore</h5>
            {SITE_NAV.map((n) => <a key={n.id} href={`#${n.id}`}>{n.label}</a>)}
          </div>
          <div className="footer__col">
            <h5>Connect</h5>
            <a href="https://instagram.com/kimochiboba" target="_blank" rel="noopener">Instagram</a>
            <a href="#">Facebook</a>
            <a href="#">DoorDash</a>
            <a href="#">Linktree</a>
          </div>
          <div className="footer__col">
            <h5>Visit</h5>
            <span>1 Park Street</span>
            <span>Attleboro, MA 02703</span>
            <span>774 · 677 · 6047</span>
            <span>Open daily · 11am – 8pm</span>
          </div>
        </div>
      </div>
      <div className="wrap footer__base">
        <span>© 2026 Kimochi Boba Cafe</span>
        <span>Made fresh, served slow.</span>
      </div>
    </footer>
  );
}

/* ───────────────── App ───────────────── */
function SiteApp() {
  const [active, setActive] = React.useState("home");
  React.useEffect(() => {
    const ids = SITE_NAV.map((n) => n.id);
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => { if (e.isIntersecting) setActive(e.target.id); });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
    );
    ids.forEach((id) => { const el = document.getElementById(id); if (el) obs.observe(el); });
    return () => obs.disconnect();
  }, []);
  return (
    <>
      <SiteHeader active={active} />
      <Hero />
      <MenuSection />
      <StorySection />
      <InstagramSection />
      <VisitSection />
      <SiteFooter />
    </>
  );
}

Object.assign(window, { SiteApp });
