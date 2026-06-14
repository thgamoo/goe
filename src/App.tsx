import {
  ArrowUpRight,
  Binary,
  CircleDotDashed,
  Compass,
  Crown,
  Dice5,
  Flame,
  Gauge,
  Gem,
  Map,
  Swords,
} from "lucide-react";
import heroInk from "./assets/hero-ink.png";
import fieldBoardArt from "./assets/field-board-art.png";
import paperTexture from "./assets/paper-texture.png";

const factions = [
  {
    name: "사로",
    role: "질서를 세우는 선봉",
    tone: "결속, 방진, 서약",
  },
  {
    name: "가락",
    role: "길을 여는 상단",
    tone: "거래, 항해, 변칙",
  },
  {
    name: "예맥",
    role: "경계를 넘는 기마대",
    tone: "추격, 매복, 속도",
  },
  {
    name: "십제",
    role: "의식을 다루는 궁정",
    tone: "주술, 기억, 대가",
  },
];

const loops = [
  {
    icon: Compass,
    label: "정찰",
    text: "지도 위의 징후를 읽고 다음 충돌지를 고른다.",
  },
  {
    icon: Dice5,
    label: "결단",
    text: "세력의 특기와 위험한 선택지로 판을 뒤집는다.",
  },
  {
    icon: Swords,
    label: "충돌",
    text: "짧은 전술 라운드에서 위치, 자원, 명분을 건다.",
  },
  {
    icon: Crown,
    label: "유산",
    text: "승패의 흔적이 다음 장의 규칙과 세력 관계를 바꾼다.",
  },
];

const roadmap = [
  "월드맵 기반 세력 선택",
  "3턴짜리 미니 캠페인",
  "카드 IP와 연결되는 사건 덱",
  "웹 플레이테스트용 룰 로그",
];

function App() {
  return (
    <main>
      <section className="hero">
        <img className="hero__art" src={heroInk} alt="" />
        <div className="hero__shade" />
        <nav className="topbar" aria-label="주요 메뉴">
          <a href="#loop">플레이</a>
          <a href="#factions">세력</a>
          <a href="#prototype">프로토타입</a>
        </nav>
        <div className="hero__content">
          <p className="eyebrow">GRNS alternate game concept</p>
          <h1>Boundary Runners</h1>
          <p className="hero__lead">
            귀문이 열린 땅에서 세력의 사절들이 경계선을 달리고, 한 번의
            원정이 다음 시대의 규칙을 다시 쓴다.
          </p>
          <div className="hero__actions">
            <a className="button button--primary" href="#prototype">
              <span>프로토타입 보기</span>
              <ArrowUpRight size={18} aria-hidden="true" />
            </a>
            <a className="button button--ghost" href="#loop">
              게임 루프
            </a>
          </div>
        </div>
      </section>

      <section className="section section--dark" id="loop">
        <div className="section__heading">
          <p className="eyebrow">core loop</p>
          <h2>지도, 결단, 충돌, 유산</h2>
        </div>
        <div className="loop-grid">
          {loops.map((item) => {
            const Icon = item.icon;
            return (
              <article className="loop-card" key={item.label}>
                <Icon size={28} aria-hidden="true" />
                <h3>{item.label}</h3>
                <p>{item.text}</p>
              </article>
            );
          })}
        </div>
      </section>

      <section
        className="section section--paper"
        id="factions"
        style={{ backgroundImage: `url(${paperTexture})` }}
      >
        <div className="split">
          <div>
            <p className="eyebrow">faction tension</p>
            <h2>카드 게임의 세력성을 다른 판 위로 옮긴다</h2>
            <p>
              기존 IP의 사국 구도와 신성, 요력, 변방의 긴장을 가져오되 승부는
              덱 구축이 아니라 원정 경로와 사건 해결에서 난다.
            </p>
          </div>
          <div className="faction-list">
            {factions.map((faction) => (
              <article className="faction" key={faction.name}>
                <Gem size={18} aria-hidden="true" />
                <div>
                  <h3>{faction.name}</h3>
                  <p>{faction.role}</p>
                  <small>{faction.tone}</small>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--board" id="prototype">
        <div className="board-copy">
          <p className="eyebrow">prototype surface</p>
          <h2>첫 빌드는 플레이테스트 허브로 시작</h2>
          <p>
            현재 웹사이트는 새 repo의 출발점이다. 이후 룰 로그, 월드맵 이벤트,
            플레이어 선택지를 React 컴포넌트로 하나씩 붙이면 된다.
          </p>
          <div className="metric-row" aria-label="프로토타입 기준">
            <span>
              <Gauge size={16} aria-hidden="true" />
              15분 세션
            </span>
            <span>
              <Binary size={16} aria-hidden="true" />
              웹 우선
            </span>
            <span>
              <Flame size={16} aria-hidden="true" />
              사건 중심
            </span>
          </div>
        </div>
        <div className="board-panel">
          <img src={fieldBoardArt} alt="GRNS 필드 보드 콘셉트 아트" />
          <div className="roadmap">
            <Map size={22} aria-hidden="true" />
            <h3>다음 마일스톤</h3>
            <ul>
              {roadmap.map((item) => (
                <li key={item}>
                  <CircleDotDashed size={15} aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </main>
  );
}

export default App;
