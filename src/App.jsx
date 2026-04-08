import { useState, useEffect, useRef } from "react";

const GOLD = "#b8860b";
const GOLD_ACCENT = "#d4a017";
const GOLD_LIGHT = "#f0d98c";
const DARK = "#0e0e0e";
const WHITE = "#ffffff";
const WARM_BG = "#fdf9f0";
const TEXT_DARK = "#2c2c2c";
const TEXT_MED = "#5a5a5a";
const TEXT_LIGHT = "#8a8a7a";
const CORAL = "#e8734a";
const SKY = "#4a90d9";
const GREEN = "#2d8a4e";
const PURPLE = "#6a1b9a";

const IMG = {
  hero: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=1400&q=80",
  marketplace: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=600&q=80",
  meetgreet: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&q=80",
  speeddating: "https://images.unsplash.com/photo-1543269865-cbf427effbad?w=600&q=80",
  comedy: "https://images.unsplash.com/photo-1585699324551-f6c309eedeca?w=600&q=80",
  pajama: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=600&q=80",
  nightclub: "https://images.unsplash.com/photo-1571266028243-d220a06a3f24?w=600&q=80",
  panel: "https://images.unsplash.com/photo-1591115765373-5207764f72e7?w=600&q=80",
  fishfry: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&q=80",
  afterparty: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=600&q=80",
  rooftop: "https://images.unsplash.com/photo-1470219556762-1fd5b92f8c60?w=600&q=80",
  hotel1: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&q=80",
  hotel2: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=600&q=80",
  hotel3: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=600&q=80",
};

const EVENTS = {
  thursday: { date: "THURSDAY", subdate: "JUNE 18, 2026", label: "THURSDAY", color: GOLD_ACCENT, events: [
    { time: "10 AM – 6 PM", title: "The Market Place", venue: "Renaissance Hotel Meeting Space", address: "233 W 125th Street, Harlem", description: "Two days of curated vendors, local entrepreneurs, and brand sponsors. Shop, network, and support Black-owned businesses in the heart of Harlem.", price: "FREE ENTRY", img: IMG.marketplace },
    { time: "5 PM – 10 PM", title: "The Meet & Greet", venue: "The Victoria Restaurant & Bar", address: "233 W 125th Street, Harlem", description: "Kick off the weekend at Harlem's premier dining destination. Soul fusion cuisine by Executive Chef Melvin Johnson, craft cocktails, live piano, and the chance to connect with attendees from across the country.", price: "RSVP", img: IMG.meetgreet },
    { time: "6 PM – 8 PM", title: "Speed Dating Experience", venue: "Renaissance Hotel", address: "233 W 125th Street, Harlem", description: "An exclusive speed dating event hosted by a male and female influencer. Meet new people, make connections, and set the tone for the weekend.", price: "TICKET REQ'D", img: IMG.speeddating },
  ]},
  friday: { date: "FRIDAY", subdate: "JUNE 19, 2026 — JUNETEENTH", label: "FRIDAY", color: CORAL, events: [
    { time: "10 AM – 6 PM", title: "The Market Place — Day 2", venue: "Renaissance Hotel Meeting Space", address: "233 W 125th Street, Harlem", description: "The Market Place continues with a fresh lineup of vendors, live demos, and exclusive drops.", price: "FREE ENTRY", img: IMG.marketplace },
    { time: "8 PM", title: "Comedy in Harlem", venue: "Comedy in Harlem", address: "750A St. Nicholas Ave, NY 10031", description: "NYC's only Black-owned comedy club in the historic Sugar Hill neighborhood. Featured on CBS News and Fox 5 — a night of laughs with a full food and drink menu.", price: "TICKET REQ'D", img: IMG.comedy },
    { time: "LATE NIGHT", title: "Pajama Party", venue: "Harry Denny Jr. House", address: "528 W 150th Street, Harlem", description: "A legendary late-night house party with complimentary drinks and an electric atmosphere. Mandatory pajama or lingerie dress code.", price: "$100 / $50", img: IMG.pajama },
    { time: "10 PM – 4 AM", title: "NYC Nightlife Experience", venue: "Doux Supper Club", address: "59 W 21st Street, Flatiron District", description: "One of NYC's last OG Hip-Hop nightclubs. Retro Parisian décor, live entertainers, and an exclusive atmosphere for socialites and those who appreciate premium nightlife.", price: "COVER", img: IMG.nightclub },
  ]},
  saturday: { date: "SATURDAY", subdate: "JUNE 20, 2026", label: "SATURDAY", color: GREEN, events: [
    { time: "10 AM – 12 PM", title: "The Business of Freedom", venue: "TBA", address: "Harlem, NYC", description: "Building Wealth in the Age of AI — a powerful panel on financial freedom, entrepreneurship, and leveraging technology for generational wealth. The perfect Juneteenth reflection.", price: "FREE W/ RSVP", img: IMG.panel },
    { time: "12 PM – 8 PM", title: "The Fish Fry", venue: "Randalls Island", address: "Icahn Stadium Area, NYC", description: "The Northeast's biggest outdoor day party and cultural celebration. World-class food vendors, curated music, electric energy, and the vibes that keep thousands coming back every summer.", price: "TICKETS ON SALE", featured: true, img: IMG.fishfry, djFeature: true },
    { time: "AFTER PARTY", title: "The Fish Fry After-Party", venue: "iNine Bistro", address: "53 Bruckner Blvd, Bronx, NY 10454", description: "Keep the energy alive at this vibrant Caribbean and West African kitchen in the Bronx's Piano District. International cuisine, craft cocktails, and nightlife atmosphere.", price: "RSVP", img: IMG.afterparty },
  ]},
  sunday: { date: "SUNDAY", subdate: "JUNE 21, 2026", label: "SUNDAY", color: SKY, events: [
    { time: "3 PM – 10 PM", title: "Rooftop Farewell Day Party", venue: "The DL Rooftop", address: "95 Delancey Street, Lower East Side", description: "The grand finale. 7,500 sq ft of rooftop energy with a retractable roof, panoramic skyline views, and the Williamsburg Bridge as your backdrop. Live music from the Fish Fry Band as we close out an unforgettable weekend.", price: "FREE W/ WRISTBAND", img: IMG.rooftop },
  ]},
};

const DAYS = ["thursday", "friday", "saturday", "sunday"];
const DAY_SHORT = { thursday: "THU", friday: "FRI", saturday: "SAT", sunday: "SUN" };
const DAY_NUM = { thursday: "18", friday: "19", saturday: "20", sunday: "21" };

export default function JuneteenthFishFryWeekend() {
  const [activeDay, setActiveDay] = useState("thursday");
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const eventsRef = useRef(null);
  const hotelRef = useRef(null);
  const sponsorsRef = useRef(null);
  const heroRef = useRef(null);
  const [sponsorForm, setSponsorForm] = useState({ name: "", email: "", company: "", tier: "", message: "" });
  const [sponsorSubmitted, setSponsorSubmitted] = useState(false);

  useEffect(() => {
    const h = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, []);

  const scrollTo = (ref) => ref?.current?.scrollIntoView({ behavior: "smooth" });

  return (
    <div style={{ background: WHITE, color: TEXT_DARK, fontFamily: "'DM Sans', sans-serif", minHeight: "100vh", overflowX: "hidden" }}>
      <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700&family=Instrument+Serif:ital@0;1&display=swap" rel="stylesheet" />
      <style>{`
        @keyframes fadeInUp{from{opacity:0;transform:translateY(30px)}to{opacity:1;transform:translateY(0)}}
        @keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-8px)}}
        .fu{animation:fadeInUp .7s ease forwards;opacity:0}
        .d1{animation-delay:.1s}.d2{animation-delay:.25s}.d3{animation-delay:.4s}.d4{animation-delay:.55s}
        .ec{transition:all .3s ease}.ec:hover{transform:translateY(-4px);box-shadow:0 12px 40px rgba(0,0,0,.12)}
        .cb{transition:all .25s ease;cursor:pointer}.cb:hover{transform:translateY(-2px);box-shadow:0 6px 24px rgba(184,134,11,.3)}
        .dp{transition:all .25s ease;cursor:pointer}.dp:hover{transform:scale(1.05)}
        .ic{transition:transform .5s ease}.ic:hover{transform:scale(1.02)}
        .nl{transition:color .2s;cursor:pointer}.nl:hover{color:${GOLD}!important}
        *{box-sizing:border-box;margin:0;padding:0}html{scroll-behavior:smooth}
        ::selection{background:${GOLD_LIGHT};color:${DARK}}
      `}</style>

      {/* NAV */}
      <nav style={{ position:"fixed",top:0,left:0,right:0,zIndex:1000,background:scrollY>80?"rgba(255,255,255,.97)":"transparent",backdropFilter:scrollY>80?"blur(16px)":"none",borderBottom:scrollY>80?"1px solid rgba(0,0,0,.08)":"1px solid transparent",transition:"all .4s",padding:"0 24px" }}>
        <div style={{ maxWidth:1100,margin:"0 auto",display:"flex",justifyContent:"space-between",alignItems:"center",height:64 }}>
          <div style={{ fontFamily:"'Bebas Neue',sans-serif",fontSize:22,color:scrollY>80?DARK:WHITE,letterSpacing:2,transition:"color .4s" }}>
            JFFW <span style={{color:GOLD}}>2026</span>
          </div>
          <div style={{ display:"flex",gap:28,alignItems:"center" }}>
            <span className="nl" onClick={()=>scrollTo(eventsRef)} style={{ fontSize:13,fontWeight:500,color:scrollY>80?TEXT_MED:"rgba(255,255,255,.85)",letterSpacing:.5,transition:"color .4s" }}>Events</span>
            <span className="nl" onClick={()=>scrollTo(hotelRef)} style={{ fontSize:13,fontWeight:500,color:scrollY>80?TEXT_MED:"rgba(255,255,255,.85)",letterSpacing:.5,transition:"color .4s" }}>Hotel</span>
            <span className="nl" onClick={()=>scrollTo(sponsorsRef)} style={{ fontSize:13,fontWeight:500,color:scrollY>80?TEXT_MED:"rgba(255,255,255,.85)",letterSpacing:.5,transition:"color .4s" }}>Sponsors</span>
            <button className="cb" style={{ padding:"8px 20px",background:GOLD,color:WHITE,border:"none",borderRadius:6,fontSize:12,fontWeight:600,letterSpacing:.5 }}>Get Tickets</button>
          </div>
        </div>
      </nav>

      {/* HERO — DARK BACKGROUND */}
      <div ref={heroRef} style={{ position:"relative",minHeight:"100vh",display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center",textAlign:"center",padding:"100px 24px 80px",overflow:"hidden",background:DARK }}>
        <div style={{ position:"absolute",inset:0,backgroundImage:`url(${IMG.hero})`,backgroundSize:"cover",backgroundPosition:"center 30%",zIndex:0,opacity:0.35 }} />
        <div style={{ position:"absolute",inset:0,background:"linear-gradient(to bottom,rgba(14,14,14,.4) 0%,rgba(14,14,14,.6) 50%,rgba(14,14,14,.95) 100%)",zIndex:1 }} />
        <div style={{ position:"relative",zIndex:2,maxWidth:850 }}>
          <div className="fu d1" style={{ display:"inline-block",padding:"8px 20px",background:"rgba(255,255,255,.1)",backdropFilter:"blur(8px)",borderRadius:24,marginBottom:28,border:"1px solid rgba(255,255,255,.15)" }}>
            <span style={{ fontSize:13,fontWeight:500,color:WHITE,letterSpacing:2 }}>JUNE 18 – 21, 2026 · HARLEM, NYC</span>
          </div>
          <h1 className="fu d2" style={{ fontFamily:"'Bebas Neue',sans-serif",fontSize:"clamp(56px,12vw,120px)",fontWeight:400,lineHeight:.9,color:WHITE,letterSpacing:4,marginBottom:0 }}>
            JUNETEENTH
          </h1>
          <h1 className="fu d2" style={{ fontFamily:"'Bebas Neue',sans-serif",fontSize:"clamp(60px,13vw,130px)",fontWeight:400,lineHeight:.85,color:GOLD_LIGHT,letterSpacing:6,marginBottom:28 }}>
            FISH FRY WEEKEND
          </h1>
          <p className="fu d3" style={{ fontFamily:"'DM Sans',sans-serif",fontSize:"clamp(15px,2vw,18px)",fontWeight:300,lineHeight:1.7,color:"rgba(255,255,255,.8)",maxWidth:550,margin:"0 auto 36px" }}>
            Four days. Ten events. One unforgettable destination weekend celebrating culture, community, and freedom.
          </p>
          <div className="fu d4" style={{ display:"flex",gap:14,justifyContent:"center",flexWrap:"wrap" }}>
            <button className="cb" onClick={()=>scrollTo(eventsRef)} style={{ padding:"14px 36px",background:GOLD,color:WHITE,border:"none",borderRadius:8,fontSize:14,fontWeight:600,letterSpacing:.5 }}>View Schedule</button>
            <button className="cb" style={{ padding:"14px 36px",background:"rgba(255,255,255,.1)",color:WHITE,border:"1px solid rgba(255,255,255,.25)",borderRadius:8,fontSize:14,fontWeight:600,letterSpacing:.5,backdropFilter:"blur(8px)" }}>Get Tickets</button>
          </div>
        </div>
        <div style={{ position:"absolute",bottom:32,left:"50%",transform:"translateX(-50%)",zIndex:2,animation:"float 2.5s ease-in-out infinite" }}>
          <div style={{ width:28,height:44,borderRadius:14,border:"2px solid rgba(255,255,255,.25)",display:"flex",justifyContent:"center",paddingTop:8 }}>
            <div style={{ width:3,height:10,borderRadius:2,background:"rgba(255,255,255,.5)" }} />
          </div>
        </div>
      </div>

      {/* DAY PILLS */}
      <div style={{ background:WARM_BG,padding:"32px 24px",borderBottom:"1px solid rgba(0,0,0,.06)" }}>
        <div style={{ maxWidth:700,margin:"0 auto",display:"flex",justifyContent:"center",gap:12,flexWrap:"wrap" }}>
          {DAYS.map(day=>(
            <div key={day} className="dp" onClick={()=>{setActiveDay(day);scrollTo(eventsRef);}} style={{ padding:"14px 28px",borderRadius:12,background:activeDay===day?DARK:WHITE,color:activeDay===day?WHITE:TEXT_DARK,border:activeDay===day?"none":"1px solid rgba(0,0,0,.1)",textAlign:"center",minWidth:130,boxShadow:activeDay===day?"0 4px 20px rgba(0,0,0,.15)":"0 1px 4px rgba(0,0,0,.04)" }}>
              <div style={{ fontFamily:"'Bebas Neue',sans-serif",fontSize:14,letterSpacing:3,lineHeight:1,opacity:.6 }}>{DAY_SHORT[day]}</div>
              <div style={{ fontFamily:"'DM Sans',sans-serif",fontSize:11,fontWeight:500,letterSpacing:1,marginTop:4 }}>JUNE {DAY_NUM[day]}</div>
            </div>
          ))}
        </div>
      </div>

      {/* EVENTS */}
      <div ref={eventsRef} style={{ maxWidth:900,margin:"0 auto",padding:"56px 24px 72px" }}>
        <div style={{ marginBottom:40 }}>
          <h2 style={{ fontFamily:"'Bebas Neue',sans-serif",fontSize:"clamp(36px,6vw,56px)",fontWeight:400,color:DARK,lineHeight:1,letterSpacing:3,marginBottom:4 }}>
            {EVENTS[activeDay].date}
          </h2>
          <div style={{ display:"inline-block",padding:"6px 16px",background:EVENTS[activeDay].color,color:WHITE,borderRadius:6,fontSize:12,fontWeight:600,letterSpacing:2 }}>
            {EVENTS[activeDay].subdate}
          </div>
        </div>

        {EVENTS[activeDay].events.map((evt,i)=>(
          <div key={`${activeDay}-${i}`} className="ec" style={{ display:"flex",flexWrap:"wrap",background:WHITE,borderRadius:16,overflow:"hidden",marginBottom:20,border:evt.featured?`2px solid ${GOLD}`:"1px solid rgba(0,0,0,.08)",boxShadow:evt.featured?"0 4px 30px rgba(184,134,11,.12)":"0 2px 12px rgba(0,0,0,.04)" }}>
            {evt.img&&<div style={{ flex:"0 0 260px",minHeight:200,backgroundImage:`url(${evt.img})`,backgroundSize:"cover",backgroundPosition:"center" }} />}
            <div style={{ flex:1,padding:"24px 28px",minWidth:280 }}>
              <div style={{ display:"flex",justifyContent:"space-between",alignItems:"flex-start",flexWrap:"wrap",gap:10,marginBottom:10 }}>
                <div>
                  <div style={{ fontFamily:"'Bebas Neue',sans-serif",fontSize:16,color:EVENTS[activeDay].color,letterSpacing:2,marginBottom:4 }}>{evt.time}</div>
                  <h3 style={{ fontFamily:"'Instrument Serif',serif",fontSize:evt.featured?28:22,fontWeight:400,color:DARK,lineHeight:1.2 }}>{evt.title}</h3>
                </div>
                <span style={{ fontSize:11,fontWeight:600,color:WHITE,background:EVENTS[activeDay].color,padding:"5px 12px",borderRadius:6,letterSpacing:1,whiteSpace:"nowrap" }}>{evt.price}</span>
              </div>
              <div style={{ fontSize:13,fontWeight:500,color:GOLD,marginBottom:2 }}>{evt.venue}</div>
              <div style={{ fontSize:12,color:TEXT_LIGHT,marginBottom:12 }}>{evt.address}</div>
              <p style={{ fontSize:14,lineHeight:1.7,color:TEXT_MED }}>{evt.description}</p>
              {evt.djFeature&&(
                <div style={{ marginTop:16,padding:"14px 18px",background:WARM_BG,borderRadius:12,display:"flex",alignItems:"center",gap:14,flexWrap:"wrap",border:"1px solid rgba(184,134,11,.15)" }}>
                  <div style={{ width:52,height:52,borderRadius:12,background:`linear-gradient(135deg,${GOLD},${GOLD_ACCENT})`,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0 }}>
                    <span style={{ fontSize:22 }}>🎧</span>
                  </div>
                  <div>
                    <div style={{ fontSize:14,fontWeight:700,color:DARK }}>DJ Self</div>
                    <div style={{ fontSize:12,color:GOLD,fontWeight:500 }}>Power 105.1 FM · NYC's Top 3 Club DJ</div>
                    <div style={{ fontSize:12,color:TEXT_LIGHT,marginTop:1 }}>Brooklyn-born · On air weekdays 10PM–2AM</div>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}

        <div style={{ display:"flex",justifyContent:"space-between",marginTop:28 }}>
          {DAYS.indexOf(activeDay)>0?(
            <button className="cb" onClick={()=>{setActiveDay(DAYS[DAYS.indexOf(activeDay)-1]);window.scrollTo({top:eventsRef.current.offsetTop-80,behavior:"smooth"});}} style={{ padding:"10px 24px",background:WHITE,color:TEXT_DARK,border:"1px solid rgba(0,0,0,.12)",borderRadius:8,fontSize:13,fontWeight:500 }}>← {EVENTS[DAYS[DAYS.indexOf(activeDay)-1]].date}</button>
          ):<div/>}
          {DAYS.indexOf(activeDay)<DAYS.length-1?(
            <button className="cb" onClick={()=>{setActiveDay(DAYS[DAYS.indexOf(activeDay)+1]);window.scrollTo({top:eventsRef.current.offsetTop-80,behavior:"smooth"});}} style={{ padding:"10px 24px",background:WHITE,color:TEXT_DARK,border:"1px solid rgba(0,0,0,.12)",borderRadius:8,fontSize:13,fontWeight:500 }}>{EVENTS[DAYS[DAYS.indexOf(activeDay)+1]].date} →</button>
          ):<div/>}
        </div>
      </div>

      {/* TICKETS CTA */}
      <div style={{ background:`linear-gradient(135deg,${GOLD} 0%,${GOLD_ACCENT} 100%)`,padding:"64px 24px",textAlign:"center" }}>
        <div style={{ maxWidth:600,margin:"0 auto" }}>
          <h2 style={{ fontFamily:"'Bebas Neue',sans-serif",fontSize:"clamp(32px,6vw,52px)",fontWeight:400,color:WHITE,marginBottom:12,lineHeight:1,letterSpacing:3 }}>SECURE YOUR WEEKEND</h2>
          <p style={{ fontSize:15,color:"rgba(255,255,255,.85)",lineHeight:1.6,marginBottom:28 }}>GA entry, Seafood Platters, and VIP "Tent Owt" packages for the full experience. This weekend sells out — don't wait.</p>
          <button className="cb" style={{ padding:"16px 44px",background:WHITE,color:GOLD,border:"none",borderRadius:8,fontSize:15,fontWeight:700,letterSpacing:.5 }}>Get Tickets Now</button>
        </div>
      </div>

      {/* HOST HOTEL */}
      <div ref={hotelRef} style={{ maxWidth:1000,margin:"0 auto",padding:"72px 24px" }}>
        <div style={{ textAlign:"center",marginBottom:40 }}>
          <div style={{ fontSize:12,fontWeight:600,letterSpacing:3,color:GOLD,marginBottom:8 }}>OFFICIAL HOST HOTEL</div>
          <h2 style={{ fontFamily:"'Bebas Neue',sans-serif",fontSize:"clamp(30px,5vw,48px)",fontWeight:400,color:DARK,lineHeight:1,letterSpacing:2 }}>RENAISSANCE NEW YORK HARLEM</h2>
          <p style={{ fontSize:14,color:TEXT_LIGHT,marginTop:8 }}>233 West 125th Street, Harlem, NYC</p>
        </div>
        <div style={{ maxWidth:720,margin:"0 auto 36px",textAlign:"center" }}>
          <p style={{ fontSize:15,lineHeight:1.8,color:TEXT_MED }}>
            Built on the site of the iconic Victoria Theater, the Renaissance New York Harlem Hotel is your home base for Juneteenth Fish Fry Weekend. Thoughtfully designed guestrooms celebrate Harlem's rich history with art honoring Josephine Baker, Duke Ellington, and Louis Armstrong. Stunning views of Central Park, the Hudson, and the Harlem River — plus The Victoria restaurant, rooftop bar, and live jazz right downstairs.
          </p>
        </div>
        <div style={{ display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(250px,1fr))",gap:14,marginBottom:36 }}>
          {[{url:IMG.hotel1,label:"Lobby & Lounge"},{url:IMG.hotel2,label:"Guest Rooms & Suites"},{url:IMG.hotel3,label:"The Victoria Restaurant"}].map((img,i)=>(
            <div key={i} className="ic" style={{ position:"relative",overflow:"hidden",borderRadius:12,aspectRatio:"16/10" }}>
              <img src={img.url} alt={img.label} style={{ width:"100%",height:"100%",objectFit:"cover",display:"block" }} />
              <div style={{ position:"absolute",bottom:0,left:0,right:0,padding:"32px 16px 14px",background:"linear-gradient(to top,rgba(0,0,0,.7),transparent)",borderRadius:"0 0 12px 12px" }}>
                <span style={{ fontSize:12,fontWeight:600,color:WHITE,letterSpacing:1 }}>{img.label}</span>
              </div>
            </div>
          ))}
        </div>
        <div style={{ display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(150px,1fr))",gap:20,maxWidth:800,margin:"0 auto 36px" }}>
          {[
            {icon:"🏨",title:"211 Rooms",desc:"King, Queen & Suites"},
            {icon:"🍽️",title:"The Victoria",desc:"Soul fusion cuisine"},
            {icon:"🎹",title:"Live Jazz",desc:"Nightly entertainment"},
            {icon:"🌆",title:"Rooftop Bar",desc:"Panoramic city views"},
            {icon:"🚇",title:"Transit Hub",desc:"A/C/B/D & 1/2/3 lines"},
            {icon:"✈️",title:"Near LGA",desc:"15 min from airport"},
          ].map((a,i)=>(
            <div key={i} style={{ textAlign:"center",padding:"16px 8px",background:WARM_BG,borderRadius:12 }}>
              <div style={{ fontSize:24,marginBottom:8 }}>{a.icon}</div>
              <div style={{ fontSize:13,fontWeight:600,color:DARK }}>{a.title}</div>
              <div style={{ fontSize:12,color:TEXT_LIGHT,marginTop:2 }}>{a.desc}</div>
            </div>
          ))}
        </div>
        <div style={{ textAlign:"center" }}>
          <a href="https://www.marriott.com/en-us/hotels/nychl-renaissance-new-york-harlem-hotel/overview/" target="_blank" rel="noopener noreferrer" style={{ textDecoration:"none" }}>
            <button className="cb" style={{ padding:"14px 36px",background:DARK,color:WHITE,border:"none",borderRadius:8,fontSize:14,fontWeight:600,letterSpacing:.5 }}>Book Your Stay</button>
          </a>
        </div>
      </div>

      {/* SPONSORS */}
      <div ref={sponsorsRef} style={{ background:DARK,padding:"80px 24px",color:WHITE }}>
        <div style={{ maxWidth:1000,margin:"0 auto" }}>
          <div style={{ textAlign:"center",marginBottom:48 }}>
            <div style={{ fontSize:12,fontWeight:600,letterSpacing:3,color:GOLD,marginBottom:8 }}>PARTNERSHIP OPPORTUNITIES</div>
            <h2 style={{ fontFamily:"'Bebas Neue',sans-serif",fontSize:"clamp(32px,6vw,52px)",fontWeight:400,color:WHITE,lineHeight:1,letterSpacing:3,marginBottom:16 }}>BECOME A SPONSOR</h2>
            <p style={{ fontSize:15,color:"rgba(255,255,255,.65)",maxWidth:600,margin:"0 auto",lineHeight:1.7 }}>
              Juneteenth Fish Fry Weekend draws thousands of engaged attendees across four days of cultural events, nightlife, and community celebration in NYC. Align your brand with one of the Northeast's premier destination weekends.
            </p>
          </div>

          {/* Stats */}
          <div style={{ display:"flex",justifyContent:"center",gap:40,flexWrap:"wrap",marginBottom:48 }}>
            {[
              { num: "2,500+", label: "Expected Attendees" },
              { num: "100K+", label: "Digital Campaign Reach" },
              { num: "10", label: "Events Over 4 Days" },
              { num: "7", label: "Premium Venues" },
            ].map((s,i)=>(
              <div key={i} style={{ textAlign:"center" }}>
                <div style={{ fontFamily:"'Bebas Neue',sans-serif",fontSize:36,color:GOLD_LIGHT,letterSpacing:2 }}>{s.num}</div>
                <div style={{ fontSize:12,color:"rgba(255,255,255,.45)",letterSpacing:1.5,fontWeight:500,marginTop:4 }}>{s.label}</div>
              </div>
            ))}
          </div>

          {/* Tiers */}
          <div style={{ display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(220px,1fr))",gap:16,marginBottom:48 }}>
            {[
              { tier:"TITLE SPONSOR",price:"$10,000",slots:"1 Available",color:GOLD,benefits:["\"Presented by\" naming rights on select events","Logo on all marketing & website hero","Featured in digital campaign reaching 100K+ people","Banner placement at Fish Fry main stage","DJ Self shoutouts during the event","Featured booth at The Market Place","VIP Tent Owt package (10 guests)","Full social media campaign","Priority placement on all materials"] },
              { tier:"GOLD SPONSOR",price:"$5,000",slots:"3 Available",color:GOLD_ACCENT,benefits:["Logo on marketing materials & website","Banner at Fish Fry","Booth at The Market Place","10 VIP tickets","Social media mentions","Event program feature"] },
              { tier:"SILVER SPONSOR",price:"$2,500",slots:"5 Available",color:"#c0c0c0",benefits:["Logo on website & event signage","Market Place booth","6 VIP tickets","Social media mention","Event program listing"] },
              { tier:"COMMUNITY PARTNER",price:"$1,000",slots:"10 Available",color:"#cd7f32",benefits:["Logo on website","Event program mention","4 GA tickets","Market Place table"] },
            ].map((t,i)=>(
              <div key={i} style={{ background:"rgba(255,255,255,.04)",border:`1px solid ${i===0?GOLD:"rgba(255,255,255,.1)"}`,borderRadius:16,padding:"28px 24px",position:"relative",overflow:"hidden" }}>
                {i===0&&<div style={{ position:"absolute",top:12,right:-28,background:GOLD,color:DARK,fontSize:10,fontWeight:700,letterSpacing:2,padding:"4px 36px",transform:"rotate(45deg)" }}>TOP</div>}
                <div style={{ fontFamily:"'Bebas Neue',sans-serif",fontSize:14,letterSpacing:3,color:t.color,marginBottom:4 }}>{t.tier}</div>
                <div style={{ fontFamily:"'Bebas Neue',sans-serif",fontSize:36,color:WHITE,letterSpacing:1,marginBottom:4 }}>{t.price}</div>
                <div style={{ fontSize:12,color:"rgba(255,255,255,.35)",marginBottom:16,fontWeight:500 }}>{t.slots}</div>
                <div style={{ borderTop:"1px solid rgba(255,255,255,.08)",paddingTop:16 }}>
                  {t.benefits.map((b,j)=>(
                    <div key={j} style={{ fontSize:13,color:"rgba(255,255,255,.6)",lineHeight:1.5,marginBottom:6,paddingLeft:16,position:"relative" }}>
                      <span style={{ position:"absolute",left:0,color:t.color }}>✓</span>
                      {b}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Vendor Booth */}
          <div style={{ textAlign:"center",padding:"24px",background:"rgba(255,255,255,.04)",borderRadius:12,border:"1px solid rgba(255,255,255,.08)",marginBottom:48 }}>
            <div style={{ fontFamily:"'Bebas Neue',sans-serif",fontSize:18,letterSpacing:3,color:WHITE,marginBottom:4 }}>VENDOR BOOTH — $500</div>
            <p style={{ fontSize:13,color:"rgba(255,255,255,.5)",maxWidth:500,margin:"0 auto" }}>Market Place table Thursday & Friday at the Renaissance Hotel, plus an outdoor vendor spot Saturday at the Fish Fry on Randalls Island. Three days of exposure to thousands of attendees.</p>
          </div>

          {/* Inquiry Form */}
          <div style={{ maxWidth:560,margin:"0 auto",textAlign:"center" }}>
            <h3 style={{ fontFamily:"'Bebas Neue',sans-serif",fontSize:24,letterSpacing:3,color:GOLD_LIGHT,marginBottom:20 }}>SPONSOR INQUIRY</h3>
            {sponsorSubmitted ? (
              <div style={{ fontSize:15,fontWeight:600,color:GOLD_LIGHT,padding:"20px 28px",background:"rgba(201,168,76,.1)",borderRadius:12,border:`1px solid ${GOLD}` }}>
                ✓ Thank you! We'll be in touch within 48 hours to discuss your partnership.
              </div>
            ) : (
              <div style={{ display:"flex",flexDirection:"column",gap:12 }}>
                <div style={{ display:"flex",gap:12,flexWrap:"wrap" }}>
                  <input type="text" placeholder="Your Name" value={sponsorForm.name} onChange={e=>setSponsorForm({...sponsorForm,name:e.target.value})} style={{ flex:"1 1 200px",padding:"12px 16px",background:"rgba(255,255,255,.06)",border:"1px solid rgba(255,255,255,.12)",borderRadius:8,color:WHITE,fontSize:14,outline:"none",fontFamily:"'DM Sans',sans-serif" }} />
                  <input type="email" placeholder="Email Address" value={sponsorForm.email} onChange={e=>setSponsorForm({...sponsorForm,email:e.target.value})} style={{ flex:"1 1 200px",padding:"12px 16px",background:"rgba(255,255,255,.06)",border:"1px solid rgba(255,255,255,.12)",borderRadius:8,color:WHITE,fontSize:14,outline:"none",fontFamily:"'DM Sans',sans-serif" }} />
                </div>
                <input type="text" placeholder="Company / Brand Name" value={sponsorForm.company} onChange={e=>setSponsorForm({...sponsorForm,company:e.target.value})} style={{ padding:"12px 16px",background:"rgba(255,255,255,.06)",border:"1px solid rgba(255,255,255,.12)",borderRadius:8,color:WHITE,fontSize:14,outline:"none",fontFamily:"'DM Sans',sans-serif" }} />
                <select value={sponsorForm.tier} onChange={e=>setSponsorForm({...sponsorForm,tier:e.target.value})} style={{ padding:"12px 16px",background:"rgba(255,255,255,.06)",border:"1px solid rgba(255,255,255,.12)",borderRadius:8,color:sponsorForm.tier?WHITE:"rgba(255,255,255,.4)",fontSize:14,outline:"none",fontFamily:"'DM Sans',sans-serif",appearance:"auto" }}>
                  <option value="" style={{color:"#333"}}>Select Sponsorship Tier</option>
                  <option value="title" style={{color:"#333"}}>Title Sponsor — $10,000</option>
                  <option value="gold" style={{color:"#333"}}>Gold Sponsor — $5,000</option>
                  <option value="silver" style={{color:"#333"}}>Silver Sponsor — $2,500</option>
                  <option value="community" style={{color:"#333"}}>Community Partner — $1,000</option>
                  <option value="vendor" style={{color:"#333"}}>Vendor Booth — $500</option>
                </select>
                <textarea placeholder="Tell us about your brand and partnership goals..." value={sponsorForm.message} onChange={e=>setSponsorForm({...sponsorForm,message:e.target.value})} rows={4} style={{ padding:"12px 16px",background:"rgba(255,255,255,.06)",border:"1px solid rgba(255,255,255,.12)",borderRadius:8,color:WHITE,fontSize:14,outline:"none",fontFamily:"'DM Sans',sans-serif",resize:"vertical" }} />
                <button className="cb" onClick={()=>{if(sponsorForm.name&&sponsorForm.email) setSponsorSubmitted(true);}} style={{ padding:"14px 36px",background:GOLD,color:WHITE,border:"none",borderRadius:8,fontSize:14,fontWeight:600,letterSpacing:.5,marginTop:4 }}>Submit Inquiry</button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* VENUE PARTNERS */}
      <div style={{ background:WARM_BG,padding:"48px 24px",borderTop:"1px solid rgba(0,0,0,.06)",borderBottom:"1px solid rgba(0,0,0,.06)" }}>
        <div style={{ fontFamily:"'Bebas Neue',sans-serif",fontSize:16,letterSpacing:4,color:TEXT_LIGHT,textAlign:"center",marginBottom:24 }}>WEEKEND VENUE PARTNERS</div>
        <div style={{ display:"flex",justifyContent:"center",flexWrap:"wrap",gap:24,maxWidth:800,margin:"0 auto" }}>
          {[
            {name:"The Victoria",url:"https://www.victoriatheaternyc.com/"},
            {name:"Comedy in Harlem",url:"https://www.comedyinharlem.com/"},
            {name:"Doux Supper Club",url:"https://www.alwaysthevip.com/nightlife/doux-supper-club/"},
            {name:"Randalls Island",url:null},
            {name:"iNine Bistro",url:"https://ininebistro.com/"},
            {name:"The DL Rooftop",url:"https://www.thedl-nyc.com/"},
          ].map((v,i)=>v.url?(
            <a key={i} href={v.url} target="_blank" rel="noopener noreferrer" style={{ fontFamily:"'Instrument Serif',serif",fontSize:17,color:TEXT_MED,fontStyle:"italic",padding:"6px 12px",textDecoration:"none" }}>{v.name}</a>
          ):(
            <span key={i} style={{ fontFamily:"'Instrument Serif',serif",fontSize:17,color:TEXT_MED,fontStyle:"italic",padding:"6px 12px" }}>{v.name}</span>
          ))}
        </div>
      </div>

      {/* NEWSLETTER */}
      <div style={{ padding:"64px 24px",textAlign:"center",background:WHITE }}>
        <h2 style={{ fontFamily:"'Bebas Neue',sans-serif",fontSize:"clamp(28px,5vw,40px)",fontWeight:400,color:DARK,marginBottom:8,letterSpacing:2 }}>JOIN THE WEEKEND</h2>
        <p style={{ fontSize:14,color:TEXT_LIGHT,maxWidth:420,margin:"0 auto 24px",lineHeight:1.6 }}>Early access to tickets, performer announcements, vendor opportunities, and insider updates.</p>
        {subscribed?(
          <div style={{ fontSize:14,fontWeight:600,color:GREEN,padding:"14px 24px",background:"#e8f5e9",borderRadius:8,display:"inline-block" }}>✓ You're in — see you in Harlem!</div>
        ):(
          <div style={{ display:"flex",gap:8,justifyContent:"center",flexWrap:"wrap",maxWidth:460,margin:"0 auto" }}>
            <input type="email" placeholder="Your email address" value={email} onChange={e=>setEmail(e.target.value)} style={{ flex:"1 1 240px",padding:"13px 16px",background:WARM_BG,border:"1px solid rgba(0,0,0,.1)",borderRadius:8,color:DARK,fontSize:14,outline:"none",fontFamily:"'DM Sans',sans-serif" }} />
            <button className="cb" onClick={()=>email&&setSubscribed(true)} style={{ padding:"13px 24px",background:GOLD,color:WHITE,border:"none",borderRadius:8,fontSize:13,fontWeight:600,letterSpacing:.5 }}>Sign Up</button>
          </div>
        )}
      </div>

      {/* FOOTER */}
      <footer style={{ background:DARK,padding:"48px 24px 32px",textAlign:"center" }}>
        <div style={{ fontFamily:"'Bebas Neue',sans-serif",fontSize:32,color:GOLD_LIGHT,letterSpacing:4,marginBottom:6 }}>JUNETEENTH FISH FRY WEEKEND</div>
        <div style={{ fontSize:12,color:"rgba(255,255,255,.4)",letterSpacing:2,marginBottom:28 }}>JUNE 18 – 21, 2026 · HARLEM, NYC</div>
        <div style={{ fontSize:13,color:PURPLE,fontWeight:600,marginBottom:16,letterSpacing:1 }}>Sponsored by Kappa Omicron Chapter</div>
        <div style={{ fontSize:11,color:"rgba(255,255,255,.15)" }}>© 2026 Juneteenth Fish Fry Weekend. All rights reserved. · Site by <a href="https://qfsg.ai" target="_blank" rel="noopener noreferrer" style={{ color:"rgba(255,255,255,.25)",textDecoration:"none" }}>qfsg.ai</a></div>
      </footer>
    </div>
  );
}
