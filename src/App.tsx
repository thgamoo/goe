import { useEffect, useMemo, useState } from "react";
import type { ComponentType, ReactNode } from "react";
import {
  BookOpenText,
  Castle,
  ChevronRight,
  ClipboardList,
  Database,
  Flag,
  Gamepad2,
  GitBranch,
  Grid3X3,
  Map,
  Printer,
  Search,
  ScrollText,
  X,
} from "lucide-react";
import heroInk from "./assets/hero-ink.png";
import fieldBoardArt from "./assets/field-board-art.png";
import paperTexture from "./assets/paper-texture.png";
import cardDatabase from "./data/cards.json";

type TabId =
  | "intro"
  | "rules"
  | "board"
  | "occupation"
  | "cards"
  | "tutorial"
  | "notes";
type CardType =
  | "soldier"
  | "general"
  | "tool"
  | "operation"
  | "weather"
  | "grandGeneral";
type CardFilter = "all" | CardType;
type CardDbView = "regular" | "grandGenerals";

type Tab = {
  id: TabId;
  label: string;
  path: string;
  icon: ComponentType<{ size?: number; "aria-hidden"?: boolean }>;
};

type CardRecord = {
  id: string;
  cardType: CardType;
  name: string;
  rarity: string;
  serial: string;
  effect: string;
  flavor: string;
  sigil: string;
  emblem?: string;
  illustration?: string;
  frame?: string;
  packId?: string;
  keywords?: string[];
  quantity?: number;
  faction?: string;
  classId?: string;
  className?: string;
  typeLabel?: string;
  typeSpeciesLabel?: string;
  species?: string;
  movement?: string;
  controlIconPosition?: string;
  capacity?: number;
  attackInfluence?: string;
  attackIconPosition?: string;
  timing?: string;
};

type OccupationCardRecord = {
  id: string;
  name: string;
  theme: string;
  front: string;
  back: string;
  frontLabel: string;
  backLabel: string;
};

const tabs: Tab[] = [
  { id: "intro", label: "처음", path: "/", icon: Castle },
  { id: "rules", label: "룰", path: "/rules", icon: ScrollText },
  { id: "board", label: "보드", path: "/board", icon: Grid3X3 },
  { id: "occupation", label: "점령카드", path: "/occupation", icon: Flag },
  { id: "cards", label: "카드 DB", path: "/cards", icon: Database },
  { id: "tutorial", label: "튜토리얼", path: "/tutorial", icon: Gamepad2 },
  { id: "notes", label: "개발노트", path: "/notes", icon: GitBranch },
];

const basePath = import.meta.env.BASE_URL.replace(/\/$/, "");
const brushLabelImage = `${basePath}/card-assets/common/goe-card-brush-label-v1.png`;
const rangeGridFrameImage = `${basePath}/card-assets/ranges/range-grid-frame.png`;
const rangeCellControlImage = `${basePath}/card-assets/ranges/range-cell-control.png`;
const rangeCellAttackImage = `${basePath}/card-assets/ranges/range-cell-attack.png`;
const rangePersonMarkerImage = `${basePath}/card-assets/ranges/range-person-marker-v1.png`;

const allCards = [
  ...cardDatabase.soldiers,
  ...cardDatabase.generals,
  ...cardDatabase.operations,
  ...cardDatabase.tools,
  ...cardDatabase.weather,
  ...cardDatabase.grandGenerals,
] as CardRecord[];

function chunk<T>(items: T[], size: number) {
  return Array.from({ length: Math.ceil(items.length / size) }, (_, index) =>
    items.slice(index * size, index * size + size),
  );
}

const occupationCards: OccupationCardRecord[] = [
  {
    id: "occupation-berserker",
    name: "광소하는 광전사",
    theme: "붉은 안광",
    front: "/goe/card-assets/occupation/berserker-front-p1.png",
    back: "/goe/card-assets/occupation/berserker-back-p2.png",
    frontLabel: "1P",
    backLabel: "2P",
  },
  {
    id: "occupation-dokkaebi-throne",
    name: "옥좌의 외뿔 도깨비",
    theme: "녹색 옥좌",
    front: "/goe/card-assets/occupation/dokkaebi-throne-front-p1.png",
    back: "/goe/card-assets/occupation/dokkaebi-throne-back-p2.png",
    frontLabel: "1P",
    backLabel: "2P",
  },
  {
    id: "occupation-steel-giant",
    name: "청철 촉수거인",
    theme: "파란 쇳물",
    front: "/goe/card-assets/occupation/steel-giant-front-p1.png",
    back: "/goe/card-assets/occupation/steel-giant-back-p2.png",
    frontLabel: "1P",
    backLabel: "2P",
  },
  {
    id: "occupation-purple-ghost",
    name: "보랏빛 손아귀 귀신",
    theme: "연보라 안광",
    front: "/goe/card-assets/occupation/purple-ghost-front-p1.png",
    back: "/goe/card-assets/occupation/purple-ghost-back-p2.png",
    frontLabel: "1P",
    backLabel: "2P",
  },
];

const occupationCopiesPerDesign = 27;

const occupationPrintCards = occupationCards.flatMap((source) =>
  Array.from({ length: occupationCopiesPerDesign }, (_, index) => ({
    ...source,
    copyNumber: index + 1,
    printId: `${source.id}-${index + 1}`,
  })),
);

const occupationPrintSheets = chunk(occupationPrintCards, 9);

const quickRules = [
  ["목표", "5x5 전장에서 절반 이상을 점령하면 승리한다."],
  ["전쟁 준비", "대장군을 공개하고 기지 40장과 날씨 3장을 준비한다."],
  ["차례", "보급을 받고 카드를 사용한 뒤 출정, 이동, 전투를 선택한다."],
  ["전령", "쓰지 않을 카드를 덮어 다음 보급을 더 불러오게 한다."],
  ["국면", "전투 선언으로 시작되는 전장 충돌 상태다."],
  ["국면 전환", "국면이 끝나면 다음 날씨를 확인한다."],
];

const setupRules = [
  ["대장군 공개", "각 플레이어는 대장군 1장을 공개하고 자기 성에서 시작한다."],
  ["기지 준비", "병사, 장군, 도구, 작전 문서로 구성된 기지 40장을 준비한다."],
  ["기우제", "각자 원하는 날씨 3장을 낸 뒤 가위바위보로 날씨 흐름을 정한다."],
  [
    "첫 날씨 확인",
    "온보딩에서는 모든 날씨 효과를 외우지 않고, 지금 적용될 날씨만 본다.",
  ],
];

const turnFlowRules = [
  [
    "보급",
    "차례 시작마다 기지에서 4장을 받고, 전령으로 보낸 카드 수만큼 추가로 받는다.",
  ],
  ["사용", "병사, 도구, 작전 문서를 군영의 카드 수만큼 사용할 수 있다."],
  ["출정", "병사를 자신의 영향권에 앞면으로 배치하고 주둔시킨다."],
  [
    "이동",
    "이동 가능 범위 안으로 이동한다. 점령지는 주둔을 포기해야 떠날 수 있다.",
  ],
  ["전투", "공격범위 안의 상대 병사를 지정하고 한 번의 싸움을 처리한다."],
  [
    "전령",
    "쓰지 않을 카드를 뒷면으로 보내 다음 차례의 추가 보급을 지시한다.",
  ],
];

const boardRules = [
  ["성", "5x5 전장 밖 가운데 모서리에 붙은 시작점. 점령지로 세지 않는다."],
  ["영향권", "출정, 전투, 이동 등 행동 가능 범위를 판단하는 영역이다."],
  ["주둔", "병사가 칸에 남아 그 칸을 지키는 상태다."],
  ["점령", "병사가 주둔 중인 칸은 그 플레이어의 땅이 된다."],
];

const combatRules = [
  ["전투 선언", "공격 병사의 공격범위 안에 있는 상대 병사를 하나 지정한다."],
  ["반응 처리", "공격 선언 후 사용할 수 있는 작전과 전투 전 효과를 처리한다."],
  ["피해 처리", "공격 병사와 대상 병사의 전투 피해와 전사 여부를 확인한다."],
  ["국면 확인", "전투에 엮인 이웃 병사들을 같은 국면에 포함한다."],
  ["국면 전환", "국면이 끝나면 보상을 처리하고 날씨를 바꾼다."],
];

const cardLayoutRules = [
  "이동 범위",
  "카드명",
  "병력",
  "용모파기",
  "능력",
  "종족 및 진영",
  "엠블럼",
  "레어도 및 시리얼",
];

const glossaryTerms = [
  ["국면", "전투 선언으로 시작되어 엮인 이웃 병사들이 모두 전사할 때까지 지속되는 충돌 상태."],
  ["차례", "플레이어가 보급, 카드 사용, 행동, 전령을 처리하는 턴."],
  ["기지", "병사, 장군, 도구, 작전 문서가 들어 있는 40장 보급 묶음."],
  ["군영", "플레이어의 패."],
  [
    "전령",
    "군영의 카드를 뒷면으로 보내 다음 보급 때 그 수만큼 더 불러오는 행동.",
  ],
  ["명령", "대장군이 자기 차례에 한 번 사용할 수 있는 리더 능력."],
  ["기우제", "각자 고른 날씨 3장으로 게임 시작 전 날씨 흐름을 정하는 절차."],
  ["전투", "하나의 유닛과 유닛 사이에서 일어나는 한 번의 싸움."],
  ["매장지", "사용된 카드와 전사한 카드가 가는 플레이어별 영역."],
];

const tutorialSteps = [
  [
    "1. 대장군을 공개한다",
    "각 플레이어는 대장군 카드 1장을 공개하고 자기 성에서 시작한다.",
  ],
  [
    "2. 기우제를 지낸다",
    "각자 날씨 3장을 내고 가위바위보로 이번 전장의 날씨 흐름을 정한다.",
  ],
  [
    "3. 보급을 받는다",
    "차례마다 기지에서 4장을 받고 전령으로 보낸 카드 수만큼 더 받는다.",
  ],
  [
    "4. 카드를 사용한다",
    "병사, 도구, 작전 문서를 군영의 카드 수만큼 사용할 수 있다.",
  ],
  [
    "5. 전투와 국면을 처리한다",
    "전투 선언과 동시에 해당 전투에 엮인 병사들은 국면에 들어간다.",
  ],
  ["6. 국면을 전환한다", "국면이 끝나면 날씨가 바뀐다."],
];

const openQuestions = [
  "날씨와 지형의 종류",
  "도구 카드의 장착 제한과 지형 배치 제한",
  "장군 카드의 기지 투입 제한",
  "카드 능력과 그 외 행동의 처리 순서",
  "사용한 카드 더미의 명칭과 재활용 규칙",
];

function routeToTab(pathname: string): TabId {
  const normalizedBase = basePath || "";
  let localPath = pathname;

  if (normalizedBase && localPath.startsWith(normalizedBase)) {
    localPath = localPath.slice(normalizedBase.length) || "/";
  }

  const normalized = localPath.replace(/\/+$/, "") || "/";
  const found = tabs.find((tab) => tab.path === normalized);
  return found?.id ?? "intro";
}

function hrefFor(path: string) {
  const prefix = basePath || "";
  if (path === "/") return `${prefix}/`;
  return `${prefix}${path}`;
}

function uniqueValues(values: Array<string | undefined>) {
  return Array.from(new Set(values.filter(Boolean) as string[])).sort((a, b) =>
    a.localeCompare(b, "ko"),
  );
}

function App() {
  const [activeTab, setActiveTab] = useState<TabId>(() =>
    routeToTab(window.location.pathname),
  );

  useEffect(() => {
    if (window.location.pathname === basePath && basePath) {
      window.history.replaceState(null, "", `${basePath}/`);
    }

    const onPopState = () => {
      setActiveTab(routeToTab(window.location.pathname));
    };

    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);

  const active = useMemo(
    () => tabs.find((tab) => tab.id === activeTab) ?? tabs[0],
    [activeTab],
  );

  function navigate(tab: Tab) {
    window.history.pushState(null, "", hrefFor(tab.path));
    setActiveTab(tab.id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <main className="min-h-screen overflow-hidden bg-[#15120e] text-[#f6efe3]">
      <header className="sticky top-0 z-30 flex items-center justify-between gap-5 border-b border-white/10 bg-[#15120e]/90 px-[clamp(18px,4vw,56px)] py-3.5 backdrop-blur-xl max-lg:static max-lg:flex-col max-lg:items-start print:hidden">
        <a
          className="inline-flex min-w-max items-center gap-3"
          href={hrefFor("/")}
          onClick={(event) => {
            event.preventDefault();
            navigate(tabs[0]);
          }}
        >
          <span className="grid size-10 place-items-center rounded-lg border border-[#e7b453]/40 bg-[#e7b453]/15 text-lg font-black text-[#e7b453]">
            괴
          </span>
          <span>
            <strong className="block leading-tight">괴이전</strong>
            <small className="block text-xs text-[#f6efe3]/55">
              GRNS board/card prototype
            </small>
          </span>
        </a>
        <nav
          className="flex flex-wrap justify-end gap-2 max-lg:justify-start max-sm:grid max-sm:w-full max-sm:grid-cols-2"
          aria-label="주요 메뉴"
        >
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = active.id === tab.id;
            return (
              <a
                aria-current={isActive ? "page" : undefined}
                className={`inline-flex min-h-9 items-center justify-center gap-1.5 rounded-full border px-3 text-sm font-bold transition ${
                  isActive
                    ? "border-[#e7b453]/70 bg-[#e7b453]/15 text-[#fff8ea]"
                    : "border-white/15 text-[#f6efe3]/75 hover:border-white/30 hover:text-white"
                }`}
                href={hrefFor(tab.path)}
                key={tab.id}
                onClick={(event) => {
                  event.preventDefault();
                  navigate(tab);
                }}
              >
                <Icon size={16} aria-hidden={true} />
                {tab.label}
              </a>
            );
          })}
        </nav>
      </header>

      {activeTab === "intro" && <IntroPage onNavigate={navigate} />}
      {activeTab === "rules" && <RulesPage onNavigate={navigate} />}
      {activeTab === "board" && <BoardPage />}
      {activeTab === "occupation" && <OccupationCardsPage />}
      {activeTab === "cards" && <CardsPage />}
      {activeTab === "tutorial" && <TutorialPage />}
      {activeTab === "notes" && <NotesPage />}
    </main>
  );
}

function IntroPage({ onNavigate }: { onNavigate: (tab: Tab) => void }) {
  return (
    <section className="relative grid min-h-[calc(100vh-69px)] isolate px-[clamp(20px,5vw,72px)] pb-16 pt-8">
      <img
        className="absolute inset-0 -z-30 size-full object-cover object-center contrast-105 saturate-90"
        src={heroInk}
        alt=""
      />
      <div className="absolute inset-0 -z-20 bg-[linear-gradient(90deg,#120f0c_0%,rgba(18,15,12,.82)_36%,rgba(18,15,12,.22)_78%),linear-gradient(0deg,#15120e_0%,rgba(21,18,14,0)_34%)]" />
      <div className="max-w-3xl self-end pt-[18vh]">
        <p className="mb-4 text-xs font-black uppercase tracking-[.14em] text-[#e7b453]">
          GRNS 세계관 보드/카드 게임
        </p>
        <h1 className="mb-6 max-w-[8ch] text-[clamp(4.5rem,14vw,9.5rem)] font-black leading-[.86] tracking-normal text-[#fff8ea]">
          괴이전
        </h1>
        <p className="max-w-xl text-[clamp(1.1rem,2vw,1.4rem)] leading-8 text-[#f6efe3]/90">
          탁월한 지휘 능력으로 땅을 점령하세요.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <button
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-[#e7b453] px-5 font-black text-[#211710]"
            onClick={() => onNavigate(tabs[1])}
            type="button"
          >
            룰 보기
            <ChevronRight size={18} aria-hidden="true" />
          </button>
          <button
            className="inline-flex min-h-11 items-center justify-center rounded-full border border-white/25 px-5 font-black text-[#f6efe3]"
            onClick={() =>
              onNavigate(tabs.find((tab) => tab.id === "cards") ?? tabs[0])
            }
            type="button"
          >
            카드 DB
          </button>
        </div>
      </div>
    </section>
  );
}

function RulesPage({ onNavigate }: { onNavigate: (tab: Tab) => void }) {
  const boardTab = tabs.find((tab) => tab.id === "board") ?? tabs[0];
  const cardsTab = tabs.find((tab) => tab.id === "cards") ?? tabs[0];
  const tutorialTab = tabs.find((tab) => tab.id === "tutorial") ?? tabs[0];

  return (
    <ContentPage eyebrow="rules v0.1" title="룰">
      <div className="grid grid-cols-[minmax(0,1fr)_minmax(280px,.72fr)] gap-[clamp(22px,5vw,64px)] max-lg:grid-cols-1">
        <section>
          <h3 className="mb-4 text-2xl font-black">전장의 큰 줄기</h3>
          <p className="max-w-3xl leading-8 text-[#211710]/72">
            괴이전은 공유 5x5 전장에서 병사를 출정시켜 땅을 점령하는
            게임이다. 병사가 칸에 남아 주둔하면 그 칸은 내 땅이 되고, 전장의
            절반 이상을 차지하면 승리한다.
          </p>
          <div className="mt-6 grid grid-cols-3 gap-3 max-xl:grid-cols-2 max-sm:grid-cols-1">
            {quickRules.map(([name, text]) => (
              <RuleMiniCard key={name} title={name}>
                {text}
              </RuleMiniCard>
            ))}
          </div>
        </section>
        <aside className="rounded-lg border border-[#211710]/15 bg-[#fff8ea]/50 p-6 shadow-[0_16px_50px_rgba(33,23,16,.08)]">
          <BookOpenText
            className="mb-4 text-[#9a3f2d]"
            size={24}
            aria-hidden="true"
          />
          <h3 className="mb-3 text-xl font-black">읽는 순서</h3>
          <p className="leading-7 text-[#211710]/70">
            처음에는 전쟁 준비와 차례 흐름만 익히고, 전투가 처음 선언될 때
            국면과 날씨를 확인한다. 전체 기준 문서는{" "}
            <code className="rounded bg-[#211710]/10 px-1.5 py-0.5">
              docs/rules/v0.1.md
            </code>
            에 함께 정리한다.
          </p>
          <div className="mt-5 grid gap-2">
            <button
              className="inline-flex min-h-10 items-center justify-center gap-2 rounded-lg border border-[#9a3f2d]/25 bg-[#9a3f2d]/10 px-4 text-sm font-black text-[#7a2d21] transition hover:bg-[#9a3f2d]/15"
              onClick={() => onNavigate(tutorialTab)}
              type="button"
            >
              <Gamepad2 size={16} aria-hidden="true" />
              튜토리얼
            </button>
            <button
              className="inline-flex min-h-10 items-center justify-center gap-2 rounded-lg border border-[#211710]/15 bg-white/35 px-4 text-sm font-black text-[#211710]/75 transition hover:bg-white/55"
              onClick={() => onNavigate(boardTab)}
              type="button"
            >
              <Grid3X3 size={16} aria-hidden="true" />
              보드 보기
            </button>
            <button
              className="inline-flex min-h-10 items-center justify-center gap-2 rounded-lg border border-[#211710]/15 bg-white/35 px-4 text-sm font-black text-[#211710]/75 transition hover:bg-white/55"
              onClick={() => onNavigate(cardsTab)}
              type="button"
            >
              <Database size={16} aria-hidden="true" />
              카드 DB
            </button>
          </div>
        </aside>
      </div>

      <RulesSection eyebrow="setup" title="전쟁 준비">
        <div className="grid grid-cols-4 gap-3 max-xl:grid-cols-2 max-sm:grid-cols-1">
          {setupRules.map(([name, text]) => (
            <RuleMiniCard key={name} title={name}>
              {text}
            </RuleMiniCard>
          ))}
        </div>
      </RulesSection>

      <RulesSection eyebrow="turn" title="차례 흐름">
        <div className="grid grid-cols-6 gap-3 max-2xl:grid-cols-3 max-lg:grid-cols-2 max-sm:grid-cols-1">
          {turnFlowRules.map(([name, text], index) => (
            <article
              className="relative rounded-lg border border-[#211710]/15 bg-[#fff8ea]/50 p-5 shadow-[0_16px_50px_rgba(33,23,16,.08)]"
              key={name}
            >
              <span className="mb-3 grid size-8 place-items-center rounded-full bg-[#211710] text-sm font-black text-[#fff8ea]">
                {index + 1}
              </span>
              <h3 className="mb-2 text-lg font-black">{name}</h3>
              <p className="leading-7 text-[#211710]/70">{text}</p>
            </article>
          ))}
        </div>
      </RulesSection>

      <div className="mt-8 grid grid-cols-2 gap-4 max-lg:grid-cols-1">
        <RulesSection eyebrow="field" title="전장과 점령" compact={true}>
          <div className="grid gap-3">
            {boardRules.map(([name, text]) => (
              <RuleLine key={name} title={name}>
                {text}
              </RuleLine>
            ))}
          </div>
        </RulesSection>
        <RulesSection eyebrow="combat" title="전투와 국면" compact={true}>
          <ol className="grid gap-3">
            {combatRules.map(([name, text], index) => (
              <li
                className="grid grid-cols-[auto_1fr] gap-3 rounded-lg border border-[#211710]/10 bg-white/30 p-4"
                key={name}
              >
                <span className="mt-0.5 grid size-7 place-items-center rounded-full bg-[#9a3f2d] text-xs font-black text-white">
                  {index + 1}
                </span>
                <span>
                  <strong className="block text-sm font-black text-[#211710]">
                    {name}
                  </strong>
                  <span className="mt-1 block leading-7 text-[#211710]/70">
                    {text}
                  </span>
                </span>
              </li>
            ))}
          </ol>
        </RulesSection>
      </div>

      <RulesSection eyebrow="card layout" title="카드 읽는 법">
        <div className="grid grid-cols-[minmax(0,1fr)_minmax(220px,.55fr)] gap-4 max-lg:grid-cols-1">
          <p className="leading-8 text-[#211710]/72">
            병사 카드는 움직임, 병력, 효과를 한 장에서 읽는다. 초보자는 먼저
            왼쪽 위 이동 범위와 오른쪽 위 병력, 가운데 능력만 보면 된다. 세부
            진영 정보와 시리얼은 카드 DB에서 확인한다.
          </p>
          <div className="grid grid-cols-2 gap-2">
            {cardLayoutRules.map((item) => (
              <span
                className="rounded-md border border-[#211710]/10 bg-white/35 px-3 py-2 text-sm font-black text-[#211710]/75"
                key={item}
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      </RulesSection>

      <RulesSection eyebrow="keywords" title="용어">
        <dl className="grid grid-cols-2 gap-3 max-lg:grid-cols-1">
          {glossaryTerms.map(([name, text]) => (
            <div
              className="rounded-lg border border-[#211710]/10 bg-[#fff8ea]/45 p-4"
              key={name}
            >
              <dt className="mb-1 text-sm font-black text-[#9a3f2d]">{name}</dt>
              <dd className="leading-7 text-[#211710]/70">{text}</dd>
            </div>
          ))}
        </dl>
      </RulesSection>
    </ContentPage>
  );
}

function RulesSection({
  children,
  compact = false,
  eyebrow,
  title,
}: {
  children: ReactNode;
  compact?: boolean;
  eyebrow: string;
  title: string;
}) {
  return (
    <section className={compact ? "" : "mt-8"}>
      <p className="mb-1 text-xs font-black uppercase tracking-[0.2em] text-[#9a3f2d]/70">
        {eyebrow}
      </p>
      <h3 className="mb-4 text-2xl font-black">{title}</h3>
      <div>{children}</div>
    </section>
  );
}

function RuleMiniCard({
  children,
  title,
}: {
  children: ReactNode;
  title: string;
}) {
  return (
    <article className="rounded-lg border border-[#211710]/15 bg-[#fff8ea]/50 p-5 shadow-[0_16px_50px_rgba(33,23,16,.08)]">
      <h3 className="mb-2 text-lg font-black">{title}</h3>
      <p className="leading-7 text-[#211710]/70">{children}</p>
    </article>
  );
}

function RuleLine({
  children,
  title,
}: {
  children: ReactNode;
  title: string;
}) {
  return (
    <div className="grid grid-cols-[72px_1fr] gap-3 rounded-lg border border-[#211710]/10 bg-white/30 p-4 max-sm:grid-cols-1">
      <strong className="text-sm font-black text-[#9a3f2d]">{title}</strong>
      <p className="leading-7 text-[#211710]/70">{children}</p>
    </div>
  );
}

function BoardPage() {
  const halfRowCells = ["", "접경", "접경", "접경", ""];
  const fieldCells = Array.from({ length: 10 }, (_, index) => {
    const row = Math.floor(index / 5);
    const col = index % 5;
    const isStartInfluence = row === 1 && col === 2;
    const isFlankInfluence = row === 1 && (col === 1 || col === 3);
    return { col, isFlankInfluence, isStartInfluence, row };
  });

  return (
    <ContentPage eyebrow="battlefield" title="보드">
      <div className="grid grid-cols-[minmax(0,1fr)_minmax(280px,.8fr)] items-start gap-[clamp(24px,5vw,64px)] max-lg:grid-cols-1">
        <div className="max-w-xl">
          <h3 className="mb-4 text-xl font-black">내 쪽 2.5x5 전장</h3>
          <p className="mb-4 leading-8 text-[#211710]/70">
            전체 전장은 5x5다. 화면은 한 플레이어가 바라보는 절반을 보여준다.
            위의 반 줄은 중앙 접경선이고, 성은 5x5 밖에서 가운데 모서리에 붙은
            정사각형 칸이다.
          </p>
          <p className="leading-8 text-[#211710]/70">
            병사가 칸에 남으면 주둔 상태가 되고, 주둔 중인 칸은 점령지가 된다.
            성은 영향권의 시작점이지만 점령지로 세지 않는다.
          </p>
        </div>
        <div className="grid gap-4">
          <div className="grid gap-1.5 rounded-lg border border-[#211710]/15 bg-[#fff8ea]/35 p-3 shadow-[0_16px_50px_rgba(33,23,16,.08)]">
            <div className="grid grid-cols-5 gap-1.5">
              {halfRowCells.map((label, index) => (
                <div
                  className={`grid aspect-[2/1] min-w-0 place-items-center rounded-md border text-[.65rem] font-black ${
                    label
                      ? "border-[#7a2d21]/40 bg-[#7a2d21]/10 text-[#7a2d21]"
                      : "border-[#211710]/10 bg-[#fff8ea]/30 text-[#211710]/25"
                  }`}
                  key={`half-${index}`}
                >
                  {label}
                </div>
              ))}
            </div>
            <div className="grid grid-cols-5 gap-1.5">
              {fieldCells.map(
                ({ col, isFlankInfluence, isStartInfluence, row }) => (
                  <div
                    className={`grid aspect-square min-w-0 place-items-center rounded-md border text-xs font-black ${
                      isStartInfluence
                        ? "border-[#314d3a]/65 bg-[#314d3a]/15 text-[#314d3a]"
                        : isFlankInfluence
                          ? "border-[#314d3a]/35 bg-[#314d3a]/8 text-[#314d3a]/70"
                          : "border-[#211710]/15 bg-[#fff8ea]/45 text-[#211710]/35"
                    }`}
                    key={`${row}-${col}`}
                  >
                    {isStartInfluence ? "시작" : isFlankInfluence ? "영향" : ""}
                  </div>
                ),
              )}
            </div>
            <div className="grid grid-cols-5 gap-1.5">
              <div className="col-start-3 grid aspect-square min-w-0 place-items-center rounded-md border-2 border-[#9a3f2d]/60 bg-[#9a3f2d]/15 text-sm font-black text-[#6d241b]">
                성
              </div>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-2 text-xs font-black text-[#211710]/70 max-sm:grid-cols-1">
            <span className="rounded-md border border-[#7a2d21]/25 bg-[#7a2d21]/10 p-3 text-center">
              반 칸 접경선
            </span>
            <span className="rounded-md border border-[#314d3a]/35 bg-[#314d3a]/10 p-3 text-center">
              시작 영향권
            </span>
            <span className="rounded-md border border-[#9a3f2d]/35 bg-[#9a3f2d]/10 p-3 text-center">
              성은 전장 밖
            </span>
          </div>
        </div>
      </div>
      <figure className="mt-10">
        <img
          className="max-h-[460px] w-full rounded-lg object-cover"
          src={fieldBoardArt}
          alt="괴이전 전장 콘셉트 아트"
        />
      </figure>
    </ContentPage>
  );
}

function OccupationCardsPage() {
  const [activeSide, setActiveSide] = useState<"front" | "back">("front");

  useEffect(() => {
    const onAfterPrint = () => {
      document.body.dataset.printingSide = activeSide;
    };

    window.addEventListener("afterprint", onAfterPrint);
    return () => window.removeEventListener("afterprint", onAfterPrint);
  }, [activeSide]);

  function printSide(side: "front" | "back") {
    setActiveSide(side);
    document.body.dataset.printingSide = side;
    requestAnimationFrame(() => window.print());
  }

  return (
    <ContentPage eyebrow="occupation cards" title="점령카드">
      <div className="mb-7 grid gap-4 print:hidden">
        <div className="max-w-3xl leading-8 text-[#211710]/70">
          점령은 병사 카드를 뒤집어 표시하지 않고, 별도의 양면 점령카드로
          표시한다. 5x5 전장에 맞춰 총 25장을 만들고, 앞면은 1P, 뒷면은 2P
          소유권을 나타낸다.
        </div>
      </div>

      <div className="mb-8 grid grid-cols-3 gap-2 text-sm font-black text-[#211710]/70 print:hidden max-md:grid-cols-1">
        <span className="rounded-md border border-[#9a3f2d]/25 bg-[#9a3f2d]/10 p-3 text-center">
          고유 일러스트 25장
        </span>
        <span className="rounded-md border border-[#314d3a]/25 bg-[#314d3a]/10 p-3 text-center">
          앞면 1P / 뒷면 2P
        </span>
        <span className="rounded-md border border-[#211710]/15 bg-[#fff8ea]/55 p-3 text-center">
          병사가 아닌 영토 표시물
        </span>
      </div>

      <div className="mb-10 grid grid-cols-[repeat(auto-fit,minmax(260px,1fr))] gap-6 print:hidden">
        {occupationCards.map((card) => (
          <OccupationCardPair card={card} key={card.id} />
        ))}
      </div>

      <section className="grid gap-4 print:hidden">
        <div className="max-w-3xl leading-8 text-[#211710]/70">
          현재 프린트 구성은 기존 4종 점령카드를 종류별로 27장씩, 총 108장
          출력한다. 각 카드는{" "}
          <strong className="font-black text-[#211710]">63mm x 88mm</strong>
          이고, 9장씩 한 페이지에 붙여 배치한다. 앞면과 뒷면은 따로 출력한다.
        </div>
        <div className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-[#211710]/15 bg-[#fff8ea]/55 p-4 shadow-[0_16px_50px_rgba(33,23,16,.08)]">
          <div className="flex flex-wrap gap-2">
            {[
              ["front", "앞면 미리보기"],
              ["back", "뒷면 미리보기"],
            ].map(([side, label]) => (
              <button
                className={`inline-flex min-h-10 items-center justify-center rounded-full border px-4 text-sm font-black transition ${
                  activeSide === side
                    ? "border-[#211710]/30 bg-[#211710] text-[#fff8ea]"
                    : "border-[#211710]/15 text-[#211710]/70 hover:border-[#211710]/30"
                }`}
                key={side}
                onClick={() => setActiveSide(side as "front" | "back")}
                type="button"
              >
                {label}
              </button>
            ))}
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              className="inline-flex min-h-10 items-center justify-center gap-1.5 rounded-full bg-[#e7b453] px-4 text-sm font-black text-[#211710]"
              onClick={() => printSide("front")}
              type="button"
            >
              <Printer size={15} aria-hidden="true" />
              앞면 프린트
            </button>
            <button
              className="inline-flex min-h-10 items-center justify-center gap-1.5 rounded-full border border-[#211710]/20 px-4 text-sm font-black text-[#211710]/75"
              onClick={() => printSide("back")}
              type="button"
            >
              <Printer size={15} aria-hidden="true" />
              뒷면 프린트
            </button>
          </div>
        </div>
      </section>

      <div className="print-area">
        {activeSide === "front" && (
          <OccupationPrintSide face="front" title="점령카드 앞면" />
        )}
        {activeSide === "back" && (
          <OccupationPrintSide face="back" title="점령카드 뒷면" />
        )}
      </div>
    </ContentPage>
  );
}

function OccupationCardPair({ card }: { card: OccupationCardRecord }) {
  return (
    <article className="grid gap-3 print:contents">
      <div className="print:hidden">
        <h3 className="text-xl font-black">{card.name}</h3>
        <p className="mt-1 text-sm font-bold text-[#211710]/55">{card.theme}</p>
      </div>
      <div className="grid grid-cols-2 gap-3 print:contents">
        <OccupationCardFace
          image={card.front}
          label={card.frontLabel}
          name={card.name}
        />
        <OccupationCardFace
          image={card.back}
          label={card.backLabel}
          name={`${card.name} SD`}
        />
      </div>
    </article>
  );
}

function OccupationCardFace({
  image,
  label,
  name,
}: {
  image: string;
  label: string;
  name: string;
}) {
  return (
    <figure className="relative isolate aspect-[63/90] overflow-hidden rounded-lg border border-[#24170f]/25 bg-[#17110c] shadow-[0_18px_42px_rgba(33,23,16,.18)] print:h-[90mm] print:w-[63mm] print:break-inside-avoid print:rounded-none print:shadow-none">
      <img
        className="absolute inset-0 size-full object-cover"
        src={image}
        alt={`${name} ${label}`}
      />
      <div className="absolute inset-x-0 bottom-0 z-10 bg-[linear-gradient(0deg,rgba(13,9,7,.82),rgba(13,9,7,0))] px-3 pb-3 pt-12 print:hidden">
        <figcaption className="flex items-end justify-between gap-2 text-[#fff8ea]">
          <span className="min-w-0 truncate text-sm font-black">{name}</span>
          <span className="rounded-full border border-white/25 bg-black/25 px-2 py-0.5 text-xs font-black">
            {label}
          </span>
        </figcaption>
      </div>
    </figure>
  );
}

function OccupationPrintSide({
  face,
  title,
}: {
  face: "front" | "back";
  title: string;
}) {
  return (
    <section className="grid gap-8">
      <div className="print:hidden">
        <h3 className="text-2xl font-black">{title}</h3>
        <p className="mt-2 text-sm font-bold text-[#211710]/55">
          108장, 9장씩 12페이지. 각 종류는 27장씩 3페이지를 채운다.
        </p>
      </div>
      <div className="grid gap-8 print:block">
        {occupationPrintSheets.map((sheet, sheetIndex) => (
          <section className="print-card-sheet" key={`${face}-${sheetIndex}`}>
            <div className="mb-3 flex items-center justify-between text-sm font-black text-[#211710]/60 print:hidden">
              <span>
                {title} {sheetIndex + 1}페이지
              </span>
              <span>
                {sheetIndex * 9 + 1}-{sheetIndex * 9 + sheet.length} /{" "}
                {occupationPrintCards.length}
              </span>
            </div>
            <div className="print-card-grid">
              {sheet.map((card) => (
                <figure
                  className="print-card-face"
                  key={`${face}-${card.printId}`}
                >
                  <img
                    className="absolute inset-0 size-full object-cover"
                    src={face === "front" ? card.front : card.back}
                    alt={`${card.name} ${face === "front" ? card.frontLabel : card.backLabel}`}
                  />
                  <figcaption className="absolute inset-x-0 bottom-0 z-10 bg-[linear-gradient(0deg,rgba(13,9,7,.82),rgba(13,9,7,0))] px-3 pb-3 pt-12 text-[#fff8ea] print:hidden">
                    <span className="flex items-end justify-between gap-2">
                      <span className="min-w-0 truncate text-sm font-black">
                        {card.name}
                      </span>
                      <span className="rounded-full border border-white/25 bg-black/25 px-2 py-0.5 text-xs font-black">
                        {String(card.copyNumber).padStart(2, "0")}/
                        {occupationCopiesPerDesign}
                      </span>
                    </span>
                  </figcaption>
                </figure>
              ))}
            </div>
          </section>
        ))}
      </div>
    </section>
  );
}

function CardsPage() {
  const [cardDbView, setCardDbView] = useState<CardDbView>("regular");
  const [query, setQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState<CardFilter>("all");
  const [factionFilter, setFactionFilter] = useState("all");
  const [rarityFilter, setRarityFilter] = useState("all");
  const [valueFilter, setValueFilter] = useState("all");
  const [keywordFilter, setKeywordFilter] = useState("all");
  const [packFilter, setPackFilter] = useState("all");

  const baseCards =
    cardDbView === "grandGenerals"
      ? allCards.filter((card) => card.cardType === "grandGeneral")
      : allCards.filter((card) => card.cardType !== "grandGeneral");
  const typeOptions = uniqueValues(baseCards.map((card) => card.cardType));
  const factions = uniqueValues(baseCards.map((card) => card.faction));
  const rarities = uniqueValues(baseCards.map((card) => card.rarity));
  const keywords = uniqueValues(
    baseCards.flatMap((card) => card.keywords ?? []),
  );
  const packs = uniqueValues(baseCards.map((card) => card.packId));
  const values = uniqueValues(
    baseCards.map((card) =>
      card.cardType === "weather"
        ? undefined
        : card.capacity !== undefined
          ? `병력 ${card.capacity}`
          : undefined,
    ),
  );

  const filteredCards = baseCards.filter((card) => {
    const text = [
      card.name,
      card.faction,
      card.className,
      card.species,
      card.effect,
      card.flavor,
      card.serial,
      ...(card.keywords ?? []),
    ]
      .filter(Boolean)
      .join(" ")
      .toLowerCase();
    const valueLabel =
      card.cardType === "weather"
        ? "날씨"
        : card.capacity !== undefined
          ? `병력 ${card.capacity}`
          : cardTypeLabel(card.cardType);

    return (
      (!query || text.includes(query.toLowerCase())) &&
      (typeFilter === "all" || card.cardType === typeFilter) &&
      (factionFilter === "all" || card.faction === factionFilter) &&
      (rarityFilter === "all" || card.rarity === rarityFilter) &&
      (valueFilter === "all" || valueLabel === valueFilter) &&
      (keywordFilter === "all" || card.keywords?.includes(keywordFilter)) &&
      (packFilter === "all" || card.packId === packFilter)
    );
  });

  function resetFilters() {
    setQuery("");
    setTypeFilter("all");
    setFactionFilter("all");
    setRarityFilter("all");
    setValueFilter("all");
    setKeywordFilter("all");
    setPackFilter("all");
  }

  function changeCardDbView(view: CardDbView) {
    setCardDbView(view);
    resetFilters();
  }

  return (
    <ContentPage eyebrow="card database" title="카드 DB">
      <div className="mb-6 max-w-3xl leading-8 text-[#211710]/70 print:hidden">
        카드 DB는 JSON으로 관리한다. 현재 병사 {cardDatabase.soldiers.length}종,
        장군 {cardDatabase.generals.length}종, 작전 문서{" "}
        {cardDatabase.operations.length}종, 도구 {cardDatabase.tools.length}종,
        날씨 {cardDatabase.weather.length}종, 대장군{" "}
        {cardDatabase.grandGenerals.length}종을 둔다.
      </div>

      <section className="mb-7 grid gap-3 rounded-lg border border-[#211710]/15 bg-[#fff8ea]/55 p-4 shadow-[0_16px_50px_rgba(33,23,16,.08)] print:hidden">
        <div className="flex flex-wrap gap-2" aria-label="카드 DB 보기">
          {[
            ["regular", "일반 카드"],
            ["grandGenerals", "대장군"],
          ].map(([view, label]) => (
            <button
              className={`inline-flex min-h-10 items-center justify-center rounded-full border px-4 text-sm font-black transition ${
                cardDbView === view
                  ? "border-[#211710]/30 bg-[#211710] text-[#fff8ea]"
                  : "border-[#211710]/15 text-[#211710]/70 hover:border-[#211710]/30"
              }`}
              key={view}
              onClick={() => changeCardDbView(view as CardDbView)}
              type="button"
            >
              {label}
            </button>
          ))}
        </div>
        <label className="relative block">
          <Search
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#211710]/40"
            size={18}
            aria-hidden="true"
          />
          <input
            className="h-11 w-full rounded-lg border border-[#211710]/15 bg-white/55 pl-10 pr-4 font-bold text-[#211710] outline-none ring-[#9a3f2d]/20 placeholder:text-[#211710]/35 focus:ring-4"
            onChange={(event) => setQuery(event.target.value)}
            placeholder="카드명, 효과, 키워드 검색"
            value={query}
          />
        </label>
        <div className="grid grid-cols-6 gap-2 max-xl:grid-cols-3 max-md:grid-cols-2">
          <SelectFilter
            label="타입"
            value={typeFilter}
            onChange={(value) => setTypeFilter(value as CardFilter)}
            options={[
              ["all", "전체"],
              ...typeOptions.map(
                (item) => [item, cardTypeLabel(item)] as [string, string],
              ),
            ]}
          />
          <SelectFilter
            label="진영"
            value={factionFilter}
            onChange={setFactionFilter}
            options={[
              ["all", "전체"],
              ...factions.map((item) => [item, item] as [string, string]),
            ]}
          />
          <SelectFilter
            label="레어도"
            value={rarityFilter}
            onChange={setRarityFilter}
            options={[
              ["all", "전체"],
              ...rarities.map((item) => [item, item] as [string, string]),
            ]}
          />
          <SelectFilter
            label="병력"
            value={valueFilter}
            onChange={setValueFilter}
            options={[
              ["all", "전체"],
              ...values.map((item) => [item, item] as [string, string]),
            ]}
          />
          <SelectFilter
            label="키워드"
            value={keywordFilter}
            onChange={setKeywordFilter}
            options={[
              ["all", "전체"],
              ...keywords.map((item) => [item, item] as [string, string]),
            ]}
          />
          <SelectFilter
            label="팩"
            value={packFilter}
            onChange={setPackFilter}
            options={[
              ["all", "전체"],
              ...packs.map((item) => [item, item] as [string, string]),
            ]}
          />
        </div>
        <div className="flex items-center justify-between gap-3">
          <strong className="text-sm text-[#211710]/70">
            {filteredCards.length}장
          </strong>
          <div className="flex flex-wrap justify-end gap-2">
            <button
              className="inline-flex min-h-9 items-center gap-1.5 rounded-full border border-[#211710]/15 px-3 text-sm font-black text-[#211710]/70 print:hidden"
              onClick={() => window.print()}
              type="button"
            >
              <Printer size={15} aria-hidden="true" />
              프린트
            </button>
            <button
              className="inline-flex min-h-9 items-center gap-1.5 rounded-full border border-[#211710]/15 px-3 text-sm font-black text-[#211710]/70 print:hidden"
              onClick={resetFilters}
              type="button"
            >
              <X size={15} aria-hidden="true" />
              초기화
            </button>
          </div>
        </div>
      </section>

      <div className="grid grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-5 print:flex print:flex-wrap print:items-start print:gap-0">
        {filteredCards.map((card) => (
          card.cardType === "grandGeneral" ? (
            <GrandGeneralPreview card={card} key={card.id} />
          ) : (
            <CardPreview card={card} key={card.id} />
          )
        ))}
      </div>
    </ContentPage>
  );
}

function CardPreview({ card }: { card: CardRecord }) {
  const isOperation = card.cardType === "operation";
  const isTool = card.cardType === "tool";
  const isWeather = card.cardType === "weather";
  const showControlGrid =
    !isWeather &&
    (card.movement !== undefined || card.controlIconPosition !== undefined);
  const showAttackGrid =
    !isWeather &&
    (card.attackInfluence !== undefined ||
      card.attackIconPosition !== undefined);
  const typeLabel = cardTypeLabel(card.cardType);
  const factionLabel = card.faction ?? "진영 없음";
  const classLabel = card.className ?? card.timing ?? "차례";
  const valueLabel =
    card.cardType === "weather"
      ? "날씨"
      : card.capacity !== undefined
        ? `병력 ${card.capacity}`
        : typeLabel;

  return (
    <article className="relative isolate aspect-[63/90] overflow-hidden rounded-xl border border-[#24170f]/25 bg-[#17110c] shadow-[0_18px_42px_rgba(33,23,16,.18)] print:h-[90mm] print:w-[63mm] print:break-inside-avoid print:rounded-none print:shadow-none">
      {card.illustration ? (
        <img
          className={`absolute left-[11.3%] top-[9.5%] z-0 h-[66.3%] w-[77.5%] object-cover ${
            isOperation || isTool ? "grayscale saturate-0" : ""
          }`}
          src={card.illustration}
          alt=""
        />
      ) : (
        <div className="absolute left-[11.3%] top-[9.5%] z-0 grid h-[66.3%] w-[77.5%] place-items-center bg-[#f3ead7] text-[clamp(2.5rem,7vw,4.6rem)] font-black text-[#211710]/10">
          {card.sigil}
        </div>
      )}
      {card.frame && (
        <img
          className="pointer-events-none absolute inset-0 z-30 size-full object-fill"
          src={card.frame}
          alt=""
        />
      )}
      <CardTitleLabel name={card.name} />
      {showControlGrid && (
        <div className="absolute left-[9.8%] top-[13.8%] z-40 w-[18.5%]">
          <RangeGrid
            activeCells={card.movement}
            markerCell={card.controlIconPosition}
            tone="control"
          />
        </div>
      )}
      {showAttackGrid && (
        <div className="absolute right-[9.8%] top-[13.8%] z-40 w-[18.5%]">
          <RangeGrid
            activeCells={card.attackInfluence}
            markerCell={card.attackIconPosition}
            tone="attack"
          />
        </div>
      )}
      {!isWeather && card.capacity !== undefined && (
        <PowerCircle value={card.capacity} />
      )}
      <div className="absolute left-[12%] right-[12%] top-[76%] z-40 h-[12.4%] overflow-hidden px-[3%] py-[1%]">
        <p className="line-clamp-4 text-[clamp(.5rem,.95vw,.66rem)] font-bold leading-[1.24] text-[#211710]/82">
          <CardEffectText text={card.effect} />
        </p>
      </div>
      <SpeciesLine
        label={card.typeSpeciesLabel ?? (isWeather ? "날씨" : typeLabel)}
      />
      <CardMeta rarity={card.rarity} serial={card.serial} />
      {card.emblem && (
        <CardEmblem src={card.emblem} label={`${factionLabel} 엠블럼`} />
      )}
      <div className="sr-only">
        {typeLabel} {valueLabel} {classLabel}
      </div>
    </article>
  );
}

function GrandGeneralPreview({ card }: { card: CardRecord }) {
  const factionLabel = card.faction ?? "진영 없음";

  return (
    <article className="relative isolate aspect-[88/63] overflow-hidden rounded-xl border border-[#24170f]/25 bg-white shadow-[0_18px_42px_rgba(33,23,16,.18)] print:h-[63mm] print:w-[88mm] print:break-inside-avoid print:rounded-none print:shadow-none">
      {card.illustration ? (
        <img
          className="absolute left-[4.2%] top-[4.8%] z-0 h-[68.8%] w-[91.6%] bg-white object-cover object-center"
          src={card.illustration}
          alt=""
        />
      ) : (
        <div className="absolute left-[4.2%] top-[4.8%] z-0 grid h-[68.8%] w-[91.6%] place-items-center bg-white text-[clamp(3rem,8vw,5rem)] font-black text-[#211710]/10">
          {card.sigil}
        </div>
      )}
      {card.frame && (
        <img
          className="pointer-events-none absolute inset-0 z-20 size-full object-fill"
          src={card.frame}
          alt=""
        />
      )}
      <div className="absolute left-[7.5%] top-[8%] z-40 flex h-[11%] w-[38%] items-center justify-center">
        <img
          className="pointer-events-none absolute inset-0 size-full object-fill opacity-95"
          src={brushLabelImage}
          alt=""
        />
        <h3 className="relative z-10 max-w-[80%] truncate text-center text-[clamp(.72rem,1.25vw,1.05rem)] font-black leading-none text-[#f8efdd] [text-shadow:0_1px_2px_rgba(0,0,0,.55)]">
          {card.name}
        </h3>
      </div>
      {card.emblem && (
        <div className="absolute right-[6.6%] top-[7.1%] z-40 grid size-[9.5%] place-items-center">
          <span className="absolute inset-[8%] rotate-45 border border-[#211710]/25 bg-white/82 shadow-[0_2px_8px_rgba(0,0,0,.14)]" />
          <img
            className="relative z-10 max-h-[78%] max-w-[78%] object-contain opacity-95"
            src={card.emblem}
            alt={`${factionLabel} 엠블럼`}
          />
        </div>
      )}
      <div className="absolute bottom-[17.4%] left-[12.3%] right-[12.3%] z-40 h-[12.5%] overflow-hidden">
        <p className="line-clamp-3 text-[clamp(.56rem,1.08vw,.74rem)] font-bold leading-[1.42] text-[#211710]/82">
          <CardEffectText text={card.effect} />
        </p>
      </div>
      <div className="absolute bottom-[6.7%] left-[8.4%] z-40 max-w-[22%]">
        <span className="block truncate text-[clamp(.52rem,.95vw,.68rem)] font-black text-[#211710]/78">
          {card.typeSpeciesLabel ?? "대장군"}
        </span>
      </div>
      <div className="absolute bottom-[6.7%] right-[8.4%] z-40 max-w-[28%] text-right text-[clamp(.52rem,.95vw,.68rem)] font-black text-[#211710]/78">
        <span>{card.rarity}</span>
        <span className="mx-1 text-[#211710]/35">/</span>
        <span>{card.serial}</span>
      </div>
      <div className="sr-only">
        대장군 {card.name} {factionLabel}
      </div>
    </article>
  );
}

function CardEffectText({ text }: { text: string }) {
  const parts = text.split(/(`[^`]+`|\[[^\]]+\])/g).filter(Boolean);

  return (
    <>
      {parts.map((part, index) => {
        if (part.startsWith("`") && part.endsWith("`")) {
          const inner = part.slice(1, -1);
          if (inner.startsWith("[") && inner.endsWith("]")) {
            return (
              <KeywordChip
                key={`${part}-${index}`}
                keyword={inner.slice(1, -1)}
              />
            );
          }
          return (
            <strong
              className="font-black text-[#17110c]"
              key={`${part}-${index}`}
            >
              {inner}
            </strong>
          );
        }

        if (part.startsWith("[") && part.endsWith("]")) {
          return (
            <KeywordChip key={`${part}-${index}`} keyword={part.slice(1, -1)} />
          );
        }

        return <span key={`${part}-${index}`}>{part}</span>;
      })}
    </>
  );
}

function KeywordChip({ keyword }: { keyword: string }) {
  return (
    <span
      className={`-translate-y-[1px] mx-[0.5px] inline-flex items-center rounded-[4px] border px-[2px] py-0 text-[.84em] font-black leading-none align-baseline ${keywordChipClassName(
        keyword,
      )}`}
    >
      {keyword}
    </span>
  );
}

function keywordChipClassName(keyword: string) {
  const palette: Record<string, string> = {
    출정: "border-[#8a3f0a] bg-[#fff8ea]/70 text-[#8a3f0a]",
    단말마: "border-[#7b1fb0] bg-[#f8ecff]/80 text-[#7b1fb0]",
    전투광: "border-[#bf1d16] bg-[#bf1d16] text-white",
    전투: "border-[#bf1d16] bg-[#fff8ea]/70 text-[#bf1d16]",
    전투광부여: "border-[#bf1d16] bg-[#bf1d16] text-white",
    매복: "border-[#04713a] bg-[#eaf7ef]/85 text-[#04713a]",
    자폭: "border-[#334f43] bg-[#334f43] text-white",
    상시: "border-[#04713a] bg-[#04713a] text-white",
    퇴각: "border-[#0f4c9c] bg-[#0f4c9c] text-white",
    전령: "border-[#0f4c9c] bg-[#edf4ff]/85 text-[#0f4c9c]",
    전령1: "border-[#0f4c9c] bg-[#edf4ff]/85 text-[#0f4c9c]",
    보급: "border-[#315847] bg-[#315847] text-white",
    장악: "border-[#c47b00] bg-[#fff5db]/90 text-[#c47b00]",
    국면: "border-[#6f3b00] bg-[#6f3b00] text-white",
    자폭부여: "border-[#334f43] bg-[#334f43] text-white",
    회복: "border-[#04713a] bg-[#eaf7ef]/85 text-[#04713a]",
    이동: "border-[#465e55] bg-[#eef4ef]/85 text-[#465e55]",
    기지탐색: "border-[#465e55] bg-[#eef4ef]/85 text-[#465e55]",
    기지조작: "border-[#465e55] bg-[#eef4ef]/85 text-[#465e55]",
    국면전환: "border-[#6f3b00] bg-[#fff1df]/90 text-[#6f3b00]",
  };

  return (
    palette[keyword.replace(/\s/g, "")] ??
    "border-[#211710] bg-[#fff8ea]/75 text-[#211710]"
  );
}

function CardTitleLabel({ name }: { name: string }) {
  return (
    <div className="absolute left-[20%] right-[20%] top-[4.9%] z-40 flex h-[8.4%] items-center justify-center">
      <img
        className="pointer-events-none absolute inset-0 size-full object-fill opacity-95"
        src={brushLabelImage}
        alt=""
      />
      <h3 className="relative z-10 max-w-[78%] truncate text-center text-[clamp(.68rem,1.25vw,.92rem)] font-black leading-none text-[#f8efdd] [text-shadow:0_1px_2px_rgba(0,0,0,.55)]">
        {name}
      </h3>
    </div>
  );
}

function RangeGrid({
  activeCells,
  markerCell,
  tone,
}: {
  activeCells?: string;
  markerCell?: string;
  tone: "control" | "attack";
}) {
  const active = parseRangeCells(activeCells);
  const marker = Number(markerCell);
  const cellImage =
    tone === "control" ? rangeCellControlImage : rangeCellAttackImage;
  const cellOrder = [7, 8, 9, 4, 5, 6, 1, 2, 3];

  return (
    <div className="relative aspect-square">
      <img
        className="absolute inset-0 size-full object-fill opacity-95"
        src={rangeGridFrameImage}
        alt=""
      />
      <div className="absolute inset-[4%] grid grid-cols-3 grid-rows-3">
        {cellOrder.map((cell) => (
          <div className="relative" key={cell}>
            {active.has(cell) && (
              <img
                className="absolute inset-[8%] size-[84%] object-fill opacity-85"
                src={cellImage}
                alt=""
              />
            )}
            {marker === cell && (
              <img
                className="absolute left-1/2 top-1/2 size-[54%] -translate-x-1/2 -translate-y-1/2 object-contain drop-shadow-[0_1px_1px_rgba(255,248,230,.8)]"
                src={rangePersonMarkerImage}
                alt=""
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function PowerCircle({ value }: { value: number }) {
  return (
    <div className="absolute right-[12%] top-[31.7%] z-40 grid size-[12.5%] place-items-center rounded-full border border-[#f8efdd]/35 bg-[#17110c] text-[clamp(.78rem,1.55vw,1.12rem)] font-black text-[#f8efdd] shadow-[0_3px_8px_rgba(0,0,0,.32)]">
      {value}
    </div>
  );
}

function SpeciesLine({ label }: { label: string }) {
  return (
    <div className="absolute bottom-[7.3%] left-[9.5%] z-40 max-w-[34%]">
      <span className="block truncate text-[clamp(.5rem,.95vw,.66rem)] font-black text-[#211710]/78">
        {label}
      </span>
    </div>
  );
}

function CardMeta({ rarity, serial }: { rarity: string; serial: string }) {
  return (
    <div className="absolute bottom-[7.3%] right-[9.5%] z-40 max-w-[38%] text-right text-[clamp(.48rem,.9vw,.64rem)] font-black text-[#211710]/78">
      <span>{rarity}</span>
      <span className="mx-1 text-[#211710]/35">/</span>
      <span>{serial}</span>
    </div>
  );
}

function CardEmblem({ label, src }: { label: string; src: string }) {
  return (
    <div className="absolute bottom-[3.9%] left-1/2 z-40 grid size-[10.5%] -translate-x-1/2 place-items-center">
      <img
        className="max-h-full max-w-full object-contain opacity-90"
        src={src}
        alt={label}
      />
    </div>
  );
}

function parseRangeCells(value?: string) {
  return new Set(
    (value ?? "")
      .split(",")
      .map((item) => Number(item.trim()))
      .filter((item) => item >= 1 && item <= 9),
  );
}

function SelectFilter({
  label,
  onChange,
  options,
  value,
}: {
  label: string;
  onChange: (value: string) => void;
  options: Array<[string, string]>;
  value: string;
}) {
  return (
    <label className="grid gap-1.5">
      <span className="text-xs font-black text-[#9a3f2d]">{label}</span>
      <select
        className="h-10 rounded-lg border border-[#211710]/15 bg-white/55 px-3 text-sm font-bold text-[#211710] outline-none ring-[#9a3f2d]/20 focus:ring-4"
        onChange={(event) => onChange(event.target.value)}
        value={value}
      >
        {options.map(([id, text]) => (
          <option key={id} value={id}>
            {text}
          </option>
        ))}
      </select>
    </label>
  );
}

function TutorialPage() {
  return (
    <ContentPage eyebrow="first play" title="튜토리얼">
      <div className="grid max-w-3xl gap-5">
        {tutorialSteps.map(([title, text]) => (
          <article className="grid grid-cols-[auto_1fr] gap-4" key={title}>
            <span className="mt-1.5 size-4 rounded-full border-4 border-[#9a3f2d]/20 bg-[#9a3f2d]" />
            <div>
              <h3 className="mb-2 text-lg font-black">{title}</h3>
              <p className="leading-7 text-[#211710]/70">{text}</p>
            </div>
          </article>
        ))}
      </div>
    </ContentPage>
  );
}

function NotesPage() {
  return (
    <ContentPage eyebrow="development" title="개발노트">
      <div className="grid grid-cols-2 gap-4 max-lg:grid-cols-1">
        <NotePanel icon={ClipboardList} title="룰 버전">
          현재 작업 기준은 v0.1이다. 큰 규칙 변경이 쌓이면 다음 버전으로
          분리한다.
        </NotePanel>
        <NotePanel icon={Map} title="다음 작업">
          카드 효과와 보드 구조를 실제 플레이테스트 규칙에 맞춰 조정한다.
        </NotePanel>
      </div>
      <div className="mt-5 rounded-lg border border-[#211710]/15 bg-[#fff8ea]/50 p-6 shadow-[0_16px_50px_rgba(33,23,16,.08)]">
        <h3 className="mb-4 text-xl font-black">미정 사항</h3>
        <ul className="grid gap-2 pl-5 leading-7 text-[#211710]/70">
          {openQuestions.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>
    </ContentPage>
  );
}

function ContentPage({
  children,
  eyebrow,
  title,
}: {
  children: ReactNode;
  eyebrow: string;
  title: string;
}) {
  return (
    <section
      className="min-h-[calc(100vh-69px)] bg-[#e3d3b3] bg-cover px-[clamp(20px,5vw,72px)] py-[clamp(48px,7vw,92px)] text-[#211710] print:min-h-0 print:bg-white print:p-0"
      style={{ backgroundImage: `url(${paperTexture})` }}
    >
      <div className="mb-[clamp(28px,5vw,54px)] max-w-5xl print:hidden">
        <p className="mb-3 text-xs font-black uppercase tracking-[.14em] text-[#9a3f2d]">
          {eyebrow}
        </p>
        <h1 className="text-[clamp(3rem,9vw,7rem)] font-black leading-none tracking-normal">
          {title}
        </h1>
      </div>
      {children}
    </section>
  );
}

function NotePanel({
  children,
  icon: Icon,
  title,
}: {
  children: ReactNode;
  icon: ComponentType<{
    size?: number;
    "aria-hidden"?: boolean;
    className?: string;
  }>;
  title: string;
}) {
  return (
    <article className="rounded-lg border border-[#211710]/15 bg-[#fff8ea]/50 p-6 shadow-[0_16px_50px_rgba(33,23,16,.08)]">
      <Icon className="mb-4 text-[#9a3f2d]" size={24} aria-hidden={true} />
      <h3 className="mb-2 text-xl font-black">{title}</h3>
      <p className="leading-7 text-[#211710]/70">{children}</p>
    </article>
  );
}

function cardTypeLabel(cardType: string) {
  if (cardType === "soldier") return "병사";
  if (cardType === "general") return "장군";
  if (cardType === "grandGeneral") return "대장군";
  if (cardType === "tool") return "도구";
  if (cardType === "weather") return "날씨";
  return "작전 문서";
}

export default App;
