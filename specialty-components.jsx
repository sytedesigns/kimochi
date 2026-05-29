// specialty-components.jsx — Kimochi "Specialty Drink Series" seasonal showcase
// Requires: hero-components.jsx (HpHeader), menu-data.jsx (SPECIALTY), image-slot.js

function SpecialtyShowcase({ tweaks }) {
  const { series, specialtyEspresso, espresso, season } = SPECIALTY;

  return (
    <div className="mp sp">
      <HpHeader variant="blur" active="menu" />

      {/* ── Seasonal hero band ── */}
      <div className="sp-hero">
        <span className="sp-hero__eyebrow">Seasonal feature · {season}</span>
        <h1 className="sp-hero__script">Specialty Drink Series</h1>
        <p className="sp-hero__lead">
          A rotating cast of signature builds — layered, named, and made to order.
          Here while the season lasts. Items marked
          <span className="sp-caf"> *</span> contain caffeine.
        </p>
      </div>

      {/* ── Signature series grid ── */}
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
              <h3 className="sp-card__name">
                {d.name}
                {d.caffeine && <span className="sp-caf">*</span>}
              </h3>
              <span className="sp-card__base">{d.base}</span>
              <ul className="sp-card__build">
                {d.build.map((line) => <li key={line}>{line}</li>)}
              </ul>
            </div>
          </article>
        ))}
      </div>

      {/* ── Espresso band (poster-homage teal, echoes Direction C) ── */}
      <div className="sp-espresso">
        <div className="sp-espresso__inner">
          <div className="sp-espresso__col sp-espresso__col--specialty">
            <div className="sp-espresso__head">
              <h2>Iced Specialty Espresso</h2>
              <p>House signatures over a double shot.</p>
            </div>
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
            <div className="sp-espresso__head">
              <h2>Iced Espresso</h2>
              <p>The everyday bar.</p>
            </div>
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

Object.assign(window, { SpecialtyShowcase });
