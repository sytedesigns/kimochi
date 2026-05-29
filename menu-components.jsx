// menu-components.jsx — three menu page variations for Kimochi
// Requires: hero-components.jsx (HpHeader), menu-data.jsx (MENU_SECTIONS, TOPPINGS, ...)

function CaffeineMark() {
  return <span className="caf" title="Contains caffeine">*</span>;
}

/* ─────────────────────────────────────────────────────────────
   A — Editorial column menu
   Quiet centered measure, sticky section headers (visually), generous gaps.
   ───────────────────────────────────────────────────────────── */
function MenuA({ tweaks }) {
  return (
    <div className="mp mpA">
      <HpHeader variant="blur" active="menu" />
      <div className="mp-intro">
        <span className="mp-intro__eyebrow">Menu · Updated weekly</span>
        <h1 className="mp-intro__title">
          Everyday <em>menu</em>
          <span className="script">made fresh, served slow</span>
        </h1>
        <p className="mp-intro__lead">
          Bubble tea, lemonade, hot drinks, and espresso —
          made the way we'd make it for a friend.
          Items marked with <span style={{ color: "var(--accent-highlight)", fontWeight: 600 }}>*</span> contain caffeine.
        </p>
        <div className="mp-chips">
          {MENU_FILTERS.map((f, i) => (
            <button key={f.id} className={"mp-chip " + (i === 0 ? "is-active" : "")}>{f.label}</button>
          ))}
        </div>
      </div>

      <div className="mpA__body">
        {MENU_SECTIONS.map((s, idx) => {
          const num = String(idx + 1).padStart(2, "0");
          const items = s.items.map(parseItem);
          const cols = items.length > 8 ? "mpA__items--three" : "";
          return (
            <section className="mpA__section" key={s.id}>
              <div className="mpA__section--inner">
                <div className="mpA__sectionHead">
                  <span className="mpA__sectionNum">{num} / 07</span>
                  <h2 className="mpA__sectionName">{s.name}</h2>
                  <p className="mpA__sectionSub">{s.sub}</p>
                  {s.pickHint && <span className="mpA__pickHint">{s.pickHint}</span>}
                  {s.note && <span className="mpA__note">✦ {s.note}</span>}
                </div>
                <div className={"mpA__items " + cols}>
                  {items.map((it) => (
                    <div className="mpA__item" key={it.label}>
                      <span className="mpA__item__swatch" style={{ background: flavorColor(it.caffeine ? it.label + "*" : it.label) }}></span>
                      <span>{it.label}</span>
                      {it.caffeine && <span className="mpA__item__caf">*</span>}
                    </div>
                  ))}
                </div>
              </div>
            </section>
          );
        })}
      </div>

      <div className="mpA__toppings">
        <div className="mpA__toppings__inner">
          <div className="mpA__toppings__head">
            <h2 className="mpA__toppings__title">Toppings</h2>
            <p className="mpA__toppings__sub">a little extra.</p>
          </div>
          <div className="mpA__toppings__grid">
            <div className="mpA__toppings__col">
              <h4>The basics</h4>
              <div className="mpA__toppings__list">
                {TOPPINGS.base.items.map((t) => (
                  <div className="mpA__toppings__item" key={t.name}>
                    {t.name.replace("*", "")}
                    {t.name.endsWith("*") && <span style={{ color: "#F2DADA", fontWeight: 600, marginLeft: 4 }}>*</span>}
                    {t.note && <small>{t.note}</small>}
                  </div>
                ))}
              </div>
            </div>
            <div className="mpA__toppings__col">
              <h4>Jelly</h4>
              <div className="mpA__toppings__list">
                {TOPPINGS.jelly.items.map((t) => (
                  <div className="mpA__toppings__item" key={t.name}>
                    {t.name.replace("*", "")}
                    {t.name.endsWith("*") && <span style={{ color: "#F2DADA", fontWeight: 600, marginLeft: 4 }}>*</span>}
                  </div>
                ))}
              </div>
            </div>
            <div className="mpA__toppings__col">
              <h4>Popping boba</h4>
              <div className="mpA__toppings__list">
                {TOPPINGS.popping.items.map((t) => (
                  <div className="mpA__toppings__item" key={t.name}>{t.name}</div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   B — Filterable card grid
   3-col card grid, signature card spans 2 cols.
   ───────────────────────────────────────────────────────────── */
function MenuB({ tweaks }) {
  // give the milk-tea card a featured "wide" treatment since it has the most flavors
  const featuredId = "milk-tea";

  function BadgeFor(s) {
    if (s.pickHint) return <span className="mpB__cardBadge">{s.pickHint}</span>;
    if (s.note)     return <span className="mpB__cardBadge mpB__cardBadge--blush">✦ {s.note}</span>;
    if (s.hot)      return <span className="mpB__cardBadge mpB__cardBadge--mango">Hot</span>;
    return null;
  }

  return (
    <div className="mp mpB">
      <HpHeader variant="blur" active="menu" />
      <div className="mp-intro">
        <span className="mp-intro__eyebrow">Menu · Updated weekly</span>
        <h1 className="mp-intro__title">Build your<br /><em>everyday</em> drink.</h1>
        <p className="mp-intro__lead">
          Pick a base, layer in flavors, finish with a topping.
          Items marked <span style={{ color: "var(--accent-highlight)", fontWeight: 600 }}>*</span> contain caffeine.
        </p>
        <div className="mp-chips">
          {MENU_FILTERS.map((f, i) => (
            <button key={f.id} className={"mp-chip " + (i === 0 ? "is-active" : "")}>{f.label}</button>
          ))}
        </div>
      </div>

      <div className="mpB__body">
        <div className="mpB__grid">
          {MENU_SECTIONS.map((s) => {
            const items = s.items.map(parseItem);
            const wide = s.id === featuredId;
            const visibleFlavors = wide ? items : items.slice(0, 8);
            const extra = items.length - visibleFlavors.length;
            return (
              <article key={s.id} className={"mpB__card " + (wide ? "mpB__card--wide" : "")}>
                <div className="mpB__cardHead">
                  <div>
                    <span className="mpB__cardEyebrow">{`0${MENU_SECTIONS.indexOf(s) + 1}`} · Drink</span>
                    <h3 className="mpB__cardName">{s.name}</h3>
                    <p className="mpB__cardSub">{s.sub}</p>
                  </div>
                  <BadgeFor {...{}} {...s} />
                </div>
                <div className="mpB__flavors">
                  {visibleFlavors.map((it) => (
                    <span className="mpB__flavor" key={it.label}>
                      <span className="mpB__flavor__dot" style={{ background: flavorColor(it.caffeine ? it.label + "*" : it.label) }}></span>
                      {it.label}
                      {it.caffeine && <span className="mpB__flavor__caf">*</span>}
                    </span>
                  ))}
                  {extra > 0 && <span className="mpB__flavor" style={{ background: "transparent", color: "var(--fg-muted)" }}>+{extra} more</span>}
                </div>
                <div className="mpB__cardFooter">
                  <span className="mpB__cardFooter__count">{items.length} flavor{items.length !== 1 ? "s" : ""}</span>
                  <a className="mpB__cardFooter__cta">Build {s.name} →</a>
                </div>
              </article>
            );
          })}
        </div>

        <div className="mpB__toppingsStrip">
          <div className="mpB__toppingsCard mpB__toppingsCard--cream">
            <h4>Toppings · Base</h4>
            <h3>The classics</h3>
            <div className="mpB__toppingsList">
              {TOPPINGS.base.items.map((t) => <span key={t.name}>{t.name.replace("*", "")}{t.name.endsWith("*") && <span style={{ color: "var(--accent-highlight)", marginLeft: 2, fontWeight: 600 }}>*</span>}</span>)}
            </div>
          </div>
          <div className="mpB__toppingsCard">
            <h4>Toppings · Jelly</h4>
            <h3>Cool & soft</h3>
            <div className="mpB__toppingsList">
              {TOPPINGS.jelly.items.map((t) => <span key={t.name}>{t.name.replace("*","")}{t.name.endsWith("*") && <span style={{ color: "#F2DADA", marginLeft: 2, fontWeight: 600 }}>*</span>}</span>)}
            </div>
          </div>
          <div className="mpB__toppingsCard">
            <h4>Toppings · Popping boba</h4>
            <h3>Pop & fizz</h3>
            <div className="mpB__toppingsList">
              {TOPPINGS.popping.items.map((t) => <span key={t.name}>{t.name}</span>)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   C — Poster homage
   Faithful to their existing menu board: dark teal section header
   blocks, two-column flavor lists, banner ribbons.
   ───────────────────────────────────────────────────────────── */
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

function MenuC({ tweaks }) {
  const byId = Object.fromEntries(MENU_SECTIONS.map((s) => [s.id, s]));
  const sec = (id) => byId[id];
  return (
    <div className="mp mpC">
      <HpHeader variant="blur" active="menu" />
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

        <p className="mpC__legend">
          <span className="caf">*</span>&nbsp; Contains caffeine
        </p>
      </div>
    </div>
  );
}

Object.assign(window, { MenuA, MenuB, MenuC });
