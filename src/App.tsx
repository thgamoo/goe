import { useEffect, useMemo, useState } from "react";
import type { ComponentType, ReactNode } from "react";
import {
  BookOpenText,
  Castle,
  ChevronRight,
  ClipboardList,
  Database,
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

type TabId = "intro" | "rules" | "board" | "cards" | "tutorial" | "notes";
type CardType = "soldier" | "general" | "operation";
type CardFilter = "all" | CardType;

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
  faction?: string;
  className?: string;
  species?: string;
  movement?: string;
  capacity?: number;
  attackInfluence?: string;
  powerCost?: number;
  timing?: string;
};

const tabs: Tab[] = [
  { id: "intro", label: "처음", path: "/", icon: Castle },
  { id: "rules", label: "룰", path: "/rules", icon: ScrollText },
  { id: "board", label: "보드", path: "/board", icon: Grid3X3 },
  { id: "cards", label: "카드 DB", path: "/cards", icon: Database },
  { id: "tutorial", label: "튜토리얼", path: "/tutorial", icon: Gamepad2 },
  { id: "notes", label: "개발노트", path: "/notes", icon: GitBranch },
];

const basePath = import.meta.env.BASE_URL.replace(/\/$/, "");

const allCards = [
  ...cardDatabase.soldiers,
  ...cardDatabase.generals,
  ...cardDatabase.operations,
] as CardRecord[];

const commandRules = [
  ["훈련", "훈련소에서 병사 카드 1장을 군영으로 가져온다."],
  ["출정", "병사를 자신의 영향권에 앞면으로 배치한다."],
  ["전투", "공격 영향권 안의 상대 병사를 지정하고 교전을 시작한다."],
  ["이동", "이동 가능 범위 안으로 이동한다. 점령지는 주둔을 포기해야 떠날 수 있다."],
];

const tutorialSteps = [
  ["1. 장군을 공개한다", "각 플레이어는 장군 카드 1장을 공개하고 자기 성에서 시작한다."],
  ["2. 병사를 훈련한다", "차례가 오면 훈련 명령으로 병사를 군영에 준비한다."],
  ["3. 영향권에 출정한다", "병사는 본인의 영향권에만 앞면으로 배치할 수 있다."],
  ["4. 교전을 해결한다", "작전 카드로 전멸, 항복, 퇴각 중 하나의 결과를 만든다."],
  ["5. 국면을 전환한다", "교전이 끝나면 무조건 국면이 바뀐다."],
];

const openQuestions = [
  "날씨와 지형의 종류",
  "장군이 전투에 참여하는 예외 조건",
  "장군 능력과 그 외 행동의 처리 순서",
  "사용한 작전 카드 더미의 명칭과 재활용 규칙",
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
      {activeTab === "rules" && <RulesPage />}
      {activeTab === "board" && <BoardPage />}
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
            onClick={() => onNavigate(tabs[3])}
            type="button"
          >
            카드 DB
          </button>
        </div>
      </div>
    </section>
  );
}

function RulesPage() {
  return (
    <ContentPage eyebrow="rules v0.1" title="룰">
      <div className="grid grid-cols-[minmax(0,1fr)_minmax(280px,.85fr)] gap-[clamp(22px,5vw,64px)] max-lg:grid-cols-1">
        <div>
          <h3 className="mb-4 text-xl font-black">핵심 흐름</h3>
          <ol className="grid gap-3 pl-5 leading-8 text-[#211710]/75">
            <li>장군을 공개하고 자기 성에서 시작한다.</li>
            <li>차례마다 명령을 하나 수행한다.</li>
            <li>병사를 영향권에 출정시켜 주둔시킨다.</li>
            <li>전투가 벌어지면 교전으로 승패를 결정한다.</li>
            <li>교전이 끝날 때마다 국면이 전환된다.</li>
          </ol>
        </div>
        <div className="rounded-lg border border-[#211710]/15 bg-[#fff8ea]/50 p-6 shadow-[0_16px_50px_rgba(33,23,16,.08)]">
          <BookOpenText className="mb-4 text-[#9a3f2d]" size={24} aria-hidden="true" />
          <h3 className="mb-3 text-xl font-black">현재 문서</h3>
          <p className="leading-7 text-[#211710]/70">
            기준 룰은 <code className="rounded bg-[#211710]/10 px-1.5 py-0.5">docs/rules/v0.1.md</code>다.
            카드 DB의 덱 구성 규칙도 이 문서에 함께 반영한다.
          </p>
        </div>
      </div>

      <div className="mt-8 grid grid-cols-4 gap-3 max-lg:grid-cols-2 max-sm:grid-cols-1">
        {commandRules.map(([name, text]) => (
          <article
            className="rounded-lg border border-[#211710]/15 bg-[#fff8ea]/50 p-5 shadow-[0_16px_50px_rgba(33,23,16,.08)]"
            key={name}
          >
            <h3 className="mb-2 text-lg font-black">{name}</h3>
            <p className="leading-7 text-[#211710]/70">{text}</p>
          </article>
        ))}
      </div>
    </ContentPage>
  );
}

function BoardPage() {
  return (
    <ContentPage eyebrow="battlefield" title="보드">
      <div className="grid grid-cols-[minmax(0,1fr)_minmax(280px,.8fr)] items-start gap-[clamp(24px,5vw,64px)] max-lg:grid-cols-1">
        <div className="max-w-xl">
          <h3 className="mb-4 text-xl font-black">공유 5x5 전장</h3>
          <p className="mb-4 leading-8 text-[#211710]/70">
            두 플레이어는 하나의 전장을 공유한다. 성은 점령지로 세지 않으며,
            장군은 정사각형 전장 바깥의 성 영역에서 시작한다.
          </p>
          <p className="leading-8 text-[#211710]/70">
            병사가 칸에 남으면 주둔 상태가 되고, 주둔 중인 칸은 그 플레이어가
            점령한 땅이 된다.
          </p>
        </div>
        <div className="grid gap-3">
          <div className="grid grid-cols-5 gap-1.5">
            {Array.from({ length: 25 }, (_, index) => {
              const north = index === 2;
              const south = index === 22;
              return (
                <div
                  className={`grid aspect-[63/90] min-w-0 place-items-center rounded-md border text-xs font-black ${
                    north || south
                      ? "border-[#314d3a]/60 bg-[#314d3a]/15 text-[#314d3a]"
                      : "border-[#211710]/15 bg-[#fff8ea]/40 text-[#211710]/40"
                  }`}
                  key={index}
                >
                  {north || south ? "영향" : ""}
                </div>
              );
            })}
          </div>
          <div className="grid grid-cols-2 gap-2 text-sm font-black text-[#6d241b]">
            <span className="rounded-md border border-[#9a3f2d]/35 bg-[#9a3f2d]/10 p-3 text-center">
              상대 성 / 장군
            </span>
            <span className="rounded-md border border-[#9a3f2d]/35 bg-[#9a3f2d]/10 p-3 text-center">
              내 성 / 장군
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

function CardsPage() {
  const [query, setQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState<CardFilter>("all");
  const [factionFilter, setFactionFilter] = useState("all");
  const [rarityFilter, setRarityFilter] = useState("all");
  const [valueFilter, setValueFilter] = useState("all");
  const [keywordFilter, setKeywordFilter] = useState("all");
  const [packFilter, setPackFilter] = useState("all");

  const factions = uniqueValues(allCards.map((card) => card.faction));
  const rarities = uniqueValues(allCards.map((card) => card.rarity));
  const keywords = uniqueValues(allCards.flatMap((card) => card.keywords ?? []));
  const packs = uniqueValues(allCards.map((card) => card.packId));
  const values = uniqueValues(
    allCards.map((card) =>
      card.cardType === "operation"
        ? card.powerCost !== undefined
          ? `힘 ${card.powerCost}`
          : undefined
        : card.capacity !== undefined
          ? `역량 ${card.capacity}`
          : undefined,
    ),
  );

  const filteredCards = allCards.filter((card) => {
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
      card.cardType === "operation" ? `힘 ${card.powerCost}` : `역량 ${card.capacity}`;

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

  return (
    <ContentPage eyebrow="card database" title="카드 DB">
      <div className="mb-6 max-w-3xl leading-8 text-[#211710]/70 print:hidden">
        카드 DB는 JSON으로 관리한다. 현재 병사 {cardDatabase.soldiers.length}종,
        장군 {cardDatabase.generals.length}종, 작전 {cardDatabase.operations.length}종을 예시로 둔다.
      </div>

      <section className="mb-7 grid gap-3 rounded-lg border border-[#211710]/15 bg-[#fff8ea]/55 p-4 shadow-[0_16px_50px_rgba(33,23,16,.08)] print:hidden">
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
              ["soldier", "병사"],
              ["general", "장군"],
              ["operation", "작전"],
            ]}
          />
          <SelectFilter
            label="진영"
            value={factionFilter}
            onChange={setFactionFilter}
            options={[["all", "전체"], ...factions.map((item) => [item, item] as [string, string])]}
          />
          <SelectFilter
            label="레어도"
            value={rarityFilter}
            onChange={setRarityFilter}
            options={[["all", "전체"], ...rarities.map((item) => [item, item] as [string, string])]}
          />
          <SelectFilter
            label="역량/힘"
            value={valueFilter}
            onChange={setValueFilter}
            options={[["all", "전체"], ...values.map((item) => [item, item] as [string, string])]}
          />
          <SelectFilter
            label="키워드"
            value={keywordFilter}
            onChange={setKeywordFilter}
            options={[["all", "전체"], ...keywords.map((item) => [item, item] as [string, string])]}
          />
          <SelectFilter
            label="팩"
            value={packFilter}
            onChange={setPackFilter}
            options={[["all", "전체"], ...packs.map((item) => [item, item] as [string, string])]}
          />
        </div>
        <div className="flex items-center justify-between gap-3">
          <strong className="text-sm text-[#211710]/70">{filteredCards.length}장</strong>
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
          <CardPreview card={card} key={card.id} />
        ))}
      </div>
    </ContentPage>
  );
}

function CardPreview({ card }: { card: CardRecord }) {
  const isGeneral = card.cardType === "general";
  const isOperation = card.cardType === "operation";
  const typeLabel = cardTypeLabel(card.cardType);
  const factionLabel = card.faction ?? "공용";
  const classLabel = card.className ?? card.timing ?? "교전";
  const valueLabel =
    card.cardType === "operation" ? `힘 ${card.powerCost}` : `역량 ${card.capacity}`;

  if (isGeneral) {
    return (
      <article className="relative isolate aspect-[90/63] overflow-hidden rounded-xl border border-[#24170f]/25 bg-[#24170f] p-[3%] shadow-[0_18px_42px_rgba(33,23,16,.18)] print:h-[63mm] print:w-[90mm] print:break-inside-avoid print:rounded-none print:shadow-none">
        <img
          className="absolute inset-0 -z-10 size-full object-cover opacity-70"
          src={card.illustration}
          alt=""
        />
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(20,14,9,.9),rgba(20,14,9,.46)),linear-gradient(0deg,rgba(232,221,199,.92),rgba(232,221,199,.18)_52%,rgba(232,221,199,.02))]" />
        <div className="grid h-full grid-cols-[1fr_.78fr] gap-[4%] rounded-lg border border-[#ead6ae]/35 bg-[#f3e8cf]/82 p-[4%] text-[#211710] backdrop-blur-[1px]">
          <div className="flex min-w-0 flex-col">
            <div className="mb-2 flex items-center justify-between gap-2 text-[clamp(.62rem,1.1vw,.78rem)] font-black text-[#7a2d21]">
              <span>{typeLabel}</span>
              <span>{card.serial}</span>
            </div>
            <h3 className="mb-2 truncate text-[clamp(1.1rem,2.2vw,1.7rem)] font-black leading-tight">
              {card.name}
            </h3>
            <p className="line-clamp-5 text-[clamp(.68rem,1.2vw,.86rem)] font-semibold leading-snug text-[#211710]/78">
              {card.effect}
            </p>
            <blockquote className="mt-auto line-clamp-2 border-l-4 border-[#7a2d21]/25 pl-2 text-[clamp(.56rem,1vw,.72rem)] font-bold italic text-[#211710]/55">
              {card.flavor}
            </blockquote>
          </div>
          <div className="grid min-w-0 grid-rows-[1fr_auto] gap-2">
            <div className="grid place-items-center rounded-md border border-[#211710]/15 bg-[#fff8ea]/55">
              {card.emblem ? (
                <img
                  className="max-h-[72%] max-w-[72%] object-contain opacity-80"
                  src={card.emblem}
                  alt={`${factionLabel} 엠블럼`}
                />
              ) : (
                <span className="text-[clamp(2.5rem,7vw,5rem)] font-black text-[#211710]/35">
                  {card.sigil}
                </span>
              )}
            </div>
            <div className="grid gap-1 text-[clamp(.58rem,1vw,.72rem)] font-black text-[#211710]/70">
              <div className="flex justify-between gap-2">
                <span className="truncate">{factionLabel} · {classLabel}</span>
                <span>{card.rarity}</span>
              </div>
            </div>
          </div>
        </div>
      </article>
    );
  }

  return (
    <article
      className="relative isolate aspect-[63/90] overflow-hidden rounded-xl border border-[#24170f]/25 bg-[#17110c] shadow-[0_18px_42px_rgba(33,23,16,.18)] print:h-[90mm] print:w-[63mm] print:break-inside-avoid print:rounded-none print:shadow-none"
    >
      <img
        className={`absolute left-[8.5%] top-[16%] z-0 h-[39%] w-[83%] object-cover ${
          isOperation ? "grayscale saturate-0" : ""
        }`}
        src={card.illustration}
        alt=""
      />
      {card.frame && (
        <img
          className="pointer-events-none absolute inset-0 z-30 size-full object-fill"
          src={card.frame}
          alt=""
        />
      )}
      <div className="absolute left-[24%] right-[24%] top-[6.9%] z-40 flex h-[5.6%] items-center justify-center">
        <h3 className="max-w-full truncate text-center text-[clamp(.7rem,1.35vw,1rem)] font-black leading-none text-[#211710]">
          {card.name}
        </h3>
      </div>
      <div className="absolute left-[8.2%] top-[19.6%] z-40 grid size-[11.5%] place-items-center rounded-full text-[clamp(.64rem,1.2vw,.9rem)] font-black text-[#f7ead5] [text-shadow:0_1px_2px_rgba(0,0,0,.65)]">
        {card.cardType === "operation" ? card.powerCost : card.movement?.replace(/\s/g, "")}
      </div>
      <div className="absolute right-[8.2%] top-[19.6%] z-40 grid size-[11.5%] place-items-center rounded-full text-[clamp(.75rem,1.45vw,1.05rem)] font-black text-[#f7ead5] [text-shadow:0_1px_2px_rgba(0,0,0,.65)]">
        {card.cardType === "operation" ? "作" : card.capacity}
      </div>
      <div className="absolute left-[12%] right-[12%] top-[58.7%] z-40 h-[20%] overflow-hidden px-[3%] py-[2%]">
        <p className="line-clamp-5 text-[clamp(.56rem,1.05vw,.74rem)] font-bold leading-snug text-[#211710]/82">
          {card.effect}
        </p>
      </div>
      <div className="absolute bottom-[7.8%] left-[10%] z-40 max-w-[31%] truncate text-[clamp(.52rem,1vw,.7rem)] font-black text-[#f7ead5] [text-shadow:0_1px_2px_rgba(0,0,0,.65)]">
        {factionLabel}
      </div>
      <div className="absolute bottom-[7.8%] right-[10%] z-40 max-w-[31%] truncate text-right text-[clamp(.52rem,1vw,.7rem)] font-black text-[#f7ead5] [text-shadow:0_1px_2px_rgba(0,0,0,.65)]">
        {card.serial}
      </div>
      <div className="absolute bottom-[7.8%] left-1/2 z-40 grid size-[12%] -translate-x-1/2 place-items-center">
        {card.emblem ? (
          <img
            className="max-h-full max-w-full object-contain"
            src={card.emblem}
            alt={`${factionLabel} 엠블럼`}
          />
        ) : (
          <span className="text-[clamp(.9rem,2vw,1.25rem)] font-black text-[#211710]/80">
            {card.sigil}
          </span>
        )}
      </div>
      <div className="sr-only">
        {typeLabel} {valueLabel} {classLabel}
      </div>
    </article>
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
          현재 작업 기준은 v0.1이다. 큰 규칙 변경이 쌓이면 다음 버전으로 분리한다.
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
  icon: ComponentType<{ size?: number; "aria-hidden"?: boolean; className?: string }>;
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
  return "작전";
}

export default App;
