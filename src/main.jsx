import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import CircularCarousel from './components/CircularCarousel.jsx';
import TechText from './components/TechText.jsx';
import BorderGlow from './components/BorderGlow.jsx';
import ElectricBorder from './components/ElectricBorder.jsx';
import RefineFrame from './components/RefineFrame.jsx';
import './styles.css';

const Arrow = ({ diagonal = false }) => (
  <svg aria-hidden="true" viewBox="0 0 18 18" className="arrow-icon">
    {diagonal ? <path d="M4 14 14 4M5 4h9v9" /> : <path d="M3 9h11M9 4l5 5-5 5" />}
  </svg>
);

function Header() {
  return (
    <header className="site-header shell">
      <a className="wordmark" href="#home" aria-label="回到首页">
        <span className="wordmark-mark">Y<span>.</span></span>
        <span className="wordmark-copy"><strong>YANG STUDIO</strong><small>INDEPENDENT DESIGNER</small></span>
      </a>
      <nav className="main-nav" aria-label="主导航">
        <a href="#profile"><span>01</span> 档案</a>
        <a href="#world"><span>02</span> 兴趣世界</a>
        <a href="#contact"><span>03</span> 联系</a>
      </nav>
      <a href="#contact" className="header-status"><i /> OPEN TO WORK <Arrow diagonal /></a>
    </header>
  );
}

function Hero() {
  return (
    <section className="hero shell" id="home">
      <div className="hero-copy">
        <div className="eyebrow"><span className="eyebrow-line" /> VISUAL DESIGNER <span className="eyebrow-separator">/</span> AI CREATOR <span className="eyebrow-separator">/</span> HENAN, CN</div>
        <p className="hero-kicker">你好，我是 <span>丹阳</span> <span className="sparkle">✳</span></p>
        <h1 className="hero-title">
          <span className="visually-hidden">把想象，设计成可进入的世界。</span>
          <span className="hero-title-line" aria-hidden="true">
            <TechText text="把想象，设计成" align="left" fontWeight={600} fontSize={75} letterSpacing={-0.065} color="#f3f0fa" accentColor="#b8aaff" reveal="letter" reach={150} softness={0.68} dashLength={3} dashGap={3} specks={8} speed={0.55} />
          </span>
          <span className="hero-title-line hero-title-line-accent" aria-hidden="true">
            <TechText text="可进入的世界。" align="left" fontWeight={600} fontSize={75} letterSpacing={-0.065} color="#b8aaff" accentColor="#eeeaff" reveal="letter" reach={150} softness={0.68} dashLength={3} dashGap={3} specks={8} speed={0.55} sweep={false} />
          </span>
        </h1>
        <p className="hero-description">在品牌、视觉与 AI 的交叉点上，探索新的表达方式。<br />为真实的世界，创造一点不太真实的想象。</p>
        <div className="hero-actions">
          <a href="#profile" className="button button-primary">认识我 <Arrow /></a>
          <a href="#world" className="button button-quiet">进入我的世界 <span>↓</span></a>
        </div>
        <div className="hero-footnote"><span className="mono">SCROLL TO EXPLORE</span><span className="scroll-track"><i /></span><span className="mono">01 / 03</span></div>
      </div>
      <span className="hero-edge mono"><span>PERSONAL ARCHIVE</span><i /> EST. 199X</span>
    </section>
  );
}

const stats = [
  { label: 'VISUAL DESIGN', value: 92, level: 'LV. 09' },
  { label: 'AI EXPERIMENT', value: 78, level: 'LV. 07' },
  { label: 'CREATIVE CODE', value: 64, level: 'LV. 06' },
];

function GlowCard({ className, children }) {
  return (
    <BorderGlow
      as="article"
      className={`glow-card-frame ${className}`}
      edgeSensitivity={40}
      glowColor="252 72 78"
      backgroundColor="transparent"
      borderRadius={3}
      glowRadius={18}
      glowIntensity={0.68}
      coneSpread={16}
      animated={false}
      colors={['#8070df', '#b9adff', '#6796a3']}
      fillOpacity={0.12}
    >
      {children}
    </BorderGlow>
  );
}

function Profile() {
  return (
    <section className="section shell profile-section" id="profile">
      <div className="section-heading">
        <div className="section-heading-lockup">
          <span className="section-heading-display" data-motion-display aria-hidden="true">PROFILE</span>
          <div className="section-heading-copy"><p className="section-index mono">01 — PERSONAL PROFILE</p><h2>关于我<span className="heading-dot">.</span></h2></div>
        </div>
        <p className="section-aside">每个创作者，都是一个持续更新的<br />开放世界。</p>
      </div>
      <div className="profile-grid">
        <GlowCard className="profile-card identity-card">
          <div className="card-topline"><span className="mono">CHARACTER FILE / 001</span><span className="file-mark">✳</span></div>
          <div className="identity-main">
            <div className="avatar-frame"><img src="/images/danyang-avatar.webp" alt="丹阳的卡通头像" loading="lazy" decoding="async" /><span className="avatar-cross">+</span></div>
            <div><p className="mono micro-label">PLAYER ONE</p><h3>丹阳 <small>DAN YANG</small></h3><p className="identity-role">视觉设计师 <span>·</span> AI 创作者</p></div>
          </div>
          <div className="identity-meta">
            <div><span className="mono micro-label">BASE</span><strong>河南 <small>CN</small></strong></div>
            <div><span className="mono micro-label">STATUS</span><strong className="available"><i /> 接受新项目</strong></div>
          </div>
          <p className="identity-bio">从代码出发，在 AI、设计和创意之间探索。喜欢二次元、游戏与摄影，乐于把想法变成作品。</p>
          <span className="card-coordinate mono">HENAN · CN</span>
        </GlowCard>

        <GlowCard className="profile-card level-card">
          <div className="card-topline"><span className="mono">CURRENT BUILD</span><span className="tiny-signal">● LIVE</span></div>
          <div className="level-number">08<span>/10</span></div>
          <p className="level-caption">创意探索者 <span>Creative Explorer</span></p>
          <div className="xp-track"><i /></div>
          <div className="xp-labels mono"><span>XP 8,420</span><span>NEXT LEVEL 10,000</span></div>
          <div className="level-decoration">✳</div>
        </GlowCard>

        <GlowCard className="profile-card location-card">
          <span className="mono micro-label">CURRENT LOCATION</span>
          <div className="location-graphic"><div className="map-lines" /><span className="map-label mono">CN / HN</span><i className="map-pin"><b /></i><span className="map-radius" /></div>
          <div className="location-bottom"><strong>河南</strong><span className="mono">HENAN · CN<br />CENTRAL CHINA</span></div>
        </GlowCard>

        <GlowCard className="profile-card attributes-card">
          <div className="card-topline"><span className="mono">CORE ATTRIBUTES</span><span className="mono card-top-note">SKILL TREE</span></div>
          <div className="stat-list">{stats.map((item) => <div className="stat-row" key={item.label}><div className="stat-name"><span>{item.label}</span><b className="mono">{item.level}</b></div><div className="stat-track"><i style={{ width: `${item.value}%` }} /></div></div>)}</div>
          <div className="interests"><span>✳ &nbsp; AI</span><span>⌘ &nbsp; CODING</span><span>◉ &nbsp; PHOTO</span><span>あ &nbsp; 日本語</span></div>
        </GlowCard>

        <GlowCard className="profile-card quote-card">
          <div className="quote-header"><span className="mono micro-label">PERSONAL NOTE — 001</span><span className="quote-icon" aria-hidden="true">✳</span></div>
          <p>性格温和，喜欢观察与思考。对感兴趣的事物总有些执着，享受独处，也珍惜真诚的交流。比起追逐短暂的热闹，更倾向于按照自己的节奏探索世界，相信热爱与长期积累的力量，<span className="quote-signoff">你喜欢我=我喜欢你</span></p>
          <div className="quote-lines"><i /><i /><i /></div>
        </GlowCard>
      </div>
    </section>
  );
}

function MusicCard() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeTrack, setActiveTrack] = useState(0);
  const track = musicItems[activeTrack];

  return (
    <GlowCard className={`world-card music-card music-theme-${activeTrack} ${isPlaying ? 'is-playing' : ''}`}>
      <div className="card-topline"><span className="mono">03 / LISTENING ROOM</span><span className="mono music-track-count">{String(activeTrack + 1).padStart(2, '0')} / 03</span></div>
      <div className="music-main" key={track.cover} style={{ '--music-accent': track.accent }} aria-live="polite">
        <div className="music-cover"><img src={track.cover} alt={track.alt} loading="lazy" decoding="async" fetchPriority="low" /><span className="music-cover-mark mono">SIDE A</span></div>
        <div className="music-info">
          <span className="music-overline">NOW SELECTED · {String(activeTrack + 1).padStart(2, '0')}</span>
          <h3>{track.title}</h3>
          <p>{track.artist}</p>
          <span className="music-mode mono">COVER ARCHIVE / VISUAL PLAYER</span>
        </div>
      </div>
      <div className="music-controls">
        <button type="button" aria-label={isPlaying ? '暂停波形动画' : '播放波形动画'} aria-pressed={isPlaying} onClick={() => setIsPlaying(!isPlaying)}>{isPlaying ? 'Ⅱ' : '▶'}</button>
        <div className="waveform" aria-hidden="true">{Array.from({ length: 22 }, (_, i) => <i key={i} style={{ '--bar': `${8 + ((i * 13) % 24)}px`, '--delay': `${(i % 7) * -0.14}s` }} />)}</div>
        <span className="mono music-visual-status">{isPlaying ? 'VISUALIZER ON' : 'SELECT A TRACK'}</span>
      </div>
      <div className="music-tracklist" aria-label="选择音乐封面">
        {musicItems.map((item, index) => (
          <button key={item.cover} type="button" className={index === activeTrack ? 'is-active' : ''} aria-label={`选择《${item.title}》- ${item.artist}`} aria-pressed={index === activeTrack} onClick={() => setActiveTrack(index)}>
            <img src={item.cover} alt="" loading="lazy" decoding="async" fetchPriority="low" />
            <span className="mono">0{index + 1}</span>
          </button>
        ))}
      </div>
    </GlowCard>
  );
}

const musicItems = [
  {
    cover: '/images/music/david-tao-22.webp',
    alt: '陶喆《二十二》封面：黑白眼睛与暖色倒影',
    title: '二十二',
    artist: '陶喆 · David Tao',
    accent: '#d7a879',
  },
  {
    cover: '/images/music/yorushika-matasaburo.webp',
    alt: 'ヨルシカ《又三郎》封面：云层下电线杆上的人物',
    title: '又三郎',
    artist: 'ヨルシカ · Yorushika',
    accent: '#69b9db',
  },
  {
    cover: '/images/music/aimer-six-stars.webp',
    alt: 'Aimer《六等星の夜》封面：紫色天空与远处的旗帜',
    title: '六等星の夜',
    artist: 'Aimer',
    accent: '#a697d9',
  },
];

const animeItems = [
  {
    src: '/images/anime/frieren-night.webp',
    alt: '蓝色花海中的奇幻旅人',
    title: '旅途的终章',
    subtitle: 'BEYOND THE JOURNEY'
  },
  {
    src: '/images/anime/anime-city.webp',
    alt: '霓虹城市夜色中的动画群像',
    title: '城市夜行',
    subtitle: 'CITY AFTER DARK'
  },
  {
    src: '/images/anime/bleach.webp',
    alt: '橙发少年与刀的动漫海报',
    title: 'BLEACH',
    subtitle: '死神 · MANGA ARCHIVE'
  },
  {
    src: '/images/anime/naruto-sasuke.webp',
    alt: '鸣人与佐助并肩战斗',
    title: 'NARUTO × SASUKE',
    subtitle: '火影忍者 · RIVALRY'
  }
];

const gameItems = [
  {
    src: '/images/games/run-blade.webp',
    alt: '游戏画面：金发角色站在蓝色场景中',
    level: 'LV. 60',
    title: '跑刀日常',
  },
  {
    src: '/images/games/journey-365.webp',
    alt: '游戏画面：骑士向黑暗中的人物伸出手',
    level: 'LV. 365',
    title: '三百六十五里路~',
  },
  {
    src: '/images/games/lands-between.webp',
    alt: '交界地的黄金树与远方城堡',
    level: 'LV. 126',
    title: '遨游交界地',
  },
  {
    src: '/images/games/endfield.webp',
    alt: '明日方舟：终末地的游戏画面',
    level: 'LV. 325',
    title: '老大，我们这个游戏会不会太隐晦了。',
  },
  {
    src: '/images/games/life-destroyed.webp',
    alt: '蓝发角色躲在被子后，旁边有技能图标',
    level: 'LV. 18',
    title: '就这样小伙的人生被毁掉了！',
  },
];

function GameLogCard() {
  const [activeGame, setActiveGame] = useState(0);
  const [stageNear, setStageNear] = useState(!('IntersectionObserver' in window));
  const stageRef = useRef(null);
  const game = gameItems[activeGame];

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage || stageNear) return undefined;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      setStageNear(true);
      observer.disconnect();
    }, { rootMargin: '280px 0px' });
    observer.observe(stage);
    return () => observer.disconnect();
  }, [activeGame, stageNear]);

  return (
    <GlowCard className="world-card game-card">
      <div className="card-topline"><span className="mono">02 / GAME LOG</span><span className="game-count mono">{String(activeGame + 1).padStart(2, '0')} <i>/</i> 05</span></div>
      <div className="game-stage" key={game.src} ref={stageRef}>
        {stageNear && <div className="game-backdrop" aria-hidden="true" style={{ backgroundImage: `url("${game.src}")` }} />}
        <img className="game-image" src={game.src} alt={game.alt} loading="lazy" decoding="async" fetchPriority="low" />
        <span className="game-image-index mono">GAME MEMORY / {String(activeGame + 1).padStart(2, '0')}</span>
      </div>
      <div className="game-info" aria-live="polite">
        <span className="game-level mono">{game.level}</span>
        <h3>{game.title}</h3>
      </div>
      <div className="game-selector" aria-label="选择游戏档案">
        {gameItems.map((item, index) => (
          <button
            key={item.src}
            type="button"
            className={index === activeGame ? 'is-active' : ''}
            aria-label={`选择第 ${index + 1} 张游戏图：${item.title}`}
            aria-pressed={index === activeGame}
            onClick={() => setActiveGame(index)}
          >
            <span>{String(index + 1).padStart(2, '0')}</span>
            <i />
          </button>
        ))}
      </div>
    </GlowCard>
  );
}

const travelCities = [
  {
    id: 'beijing',
    countryCode: 'CN',
    name: '北京',
    english: 'BEIJING',
    tone: '城墙与街巷之间，历史感和日常烟火在同一片天空下相遇。',
    cover: '/images/travel/beijing-palace.webp',
    coverAlt: '北京天安门与晴朗天空',
    date: '',
    note: '',
    photos: [
      { src: '/images/travel/beijing-palace.webp', alt: '北京天安门与晴朗天空' },
      { placeholder: true, label: 'PERSONAL PHOTO SLOT / 02' },
      { placeholder: true, label: 'PERSONAL PHOTO SLOT / 03' },
    ],
  },
  {
    id: 'kobe',
    countryCode: 'JP',
    name: '神户',
    english: 'KOBE',
    tone: '海风穿过山与港口，城市的节奏也跟着开阔起来。',
    cover: '/images/travel/kobe-bridge.webp',
    coverAlt: '神户明石海峡大桥与海面',
    date: '',
    note: '',
    photos: [
      { src: '/images/travel/kobe-bridge.webp', alt: '神户明石海峡大桥与海面' },
      { placeholder: true, label: 'PERSONAL PHOTO SLOT / 02' },
      { placeholder: true, label: 'PERSONAL PHOTO SLOT / 03' },
    ],
  },
  {
    id: 'osaka',
    countryCode: 'JP',
    name: '大阪',
    english: 'OSAKA',
    tone: '热闹街区与生活气息交织，适合放慢脚步随意走走。',
    cover: '/images/travel/osaka-dotonbori.webp',
    coverAlt: '大阪道顿堀繁华街景与霓虹招牌',
    date: '',
    note: '',
    photos: [
      { src: '/images/travel/osaka-dotonbori.webp', alt: '大阪道顿堀繁华街景与霓虹招牌' },
      { src: '/images/travel/osaka-lantern-street.webp', alt: '大阪夜晚挂满灯笼的热闹街道' },
      { placeholder: true, label: 'PERSONAL PHOTO SLOT / 03' },
    ],
  },
  {
    id: 'kyoto',
    countryCode: 'JP',
    name: '京都',
    english: 'KYOTO',
    tone: '晚霞落在鸭川，朱红鸟居把寻常路途拉成长长的故事。',
    cover: '/images/travel/kyoto-sunset.webp',
    coverAlt: '京都鸭川边的晚霞与行人',
    date: '',
    note: '',
    photos: [
      { src: '/images/travel/kyoto-sunset.webp', alt: '京都鸭川边的晚霞与行人' },
      { src: '/images/travel/kyoto-torii.webp', alt: '京都伏见稻荷的朱红鸟居' },
      { placeholder: true, label: 'PERSONAL PHOTO SLOT / 03' },
    ],
  },
  {
    id: 'tokyo',
    countryCode: 'JP',
    name: '东京',
    english: 'TOKYO',
    tone: '霓虹沿着夜色铺开，在高处看这座城市持续发光。',
    cover: '/images/travel/tokyo-night.webp',
    coverAlt: '东京塔与夜间城市灯火',
    date: '',
    note: '',
    photos: [
      { src: '/images/travel/tokyo-night.webp', alt: '东京塔与夜间城市灯火' },
      { placeholder: true, label: 'PERSONAL PHOTO SLOT / 02' },
      { placeholder: true, label: 'PERSONAL PHOTO SLOT / 03' },
    ],
  },
];

const travelCountries = [
  { id: 'CN', name: 'CHINA', native: '中国' },
  { id: 'JP', name: 'JAPAN', native: '日本' },
];

function TravelLog() {
  const [activeCity, setActiveCity] = useState(null);
  const dialogRef = useRef(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (activeCity && !dialog.open) dialog.showModal();
    if (!activeCity && dialog.open) dialog.close();
  }, [activeCity]);

  return (
    <GlowCard className="world-card travel-log-card">
      <div className="travel-log-heading">
        <div>
          <div className="card-topline"><span className="mono">04 / TRAVEL LOG</span><span className="mono travel-heading-mark">FIELD ARCHIVE</span></div>
          <h3>旅行图鉴<span>.</span></h3>
        </div>
        <div className="travel-total mono">05 CITIES <i>/</i> 02 COUNTRIES</div>
      </div>

      <div className="travel-country-groups">
        {travelCountries.map((country) => {
          const cities = travelCities.filter((city) => city.countryCode === country.id);
          return (
            <section className={`travel-country-group travel-country-${country.id.toLowerCase()}`} key={country.id}>
              <div className="travel-country-heading">
                <div><span className="mono">{country.name}</span><h4>{country.native}</h4></div>
                <span className="mono">{String(cities.length).padStart(2, '0')} {cities.length === 1 ? 'CITY' : 'CITIES'}</span>
              </div>
              <div className="travel-city-grid">
                {cities.map((city) => (
                  <button className={`travel-city-card ${country.id === 'CN' ? 'is-landscape' : 'is-portrait'}`} type="button" key={city.id} onClick={() => setActiveCity(city)} aria-label={`打开${city.name}旅行记忆`}>
                    <span className="travel-city-image">
                      {city.cover ? <img src={city.cover} alt={city.coverAlt} loading="lazy" /> : <span className="travel-cover-placeholder"><i className="mono">COVER SLOT</i><b>待添加大阪照片</b><small className="mono">PERSONAL MEMORY / {city.english}</small></span>}
                      <span className="travel-city-index mono">MEMORY / {String(travelCities.indexOf(city) + 1).padStart(2, '0')}</span>
                      <span className="travel-unlocked"><i /> UNLOCKED <small>已解锁</small></span>
                      <span className="travel-view-memory mono">VIEW MEMORY <b>↗</b></span>
                    </span>
                    <span className="travel-city-copy">
                      <span className="travel-city-title"><b>{city.name}</b><small className="mono">{city.english}</small></span>
                      <span className="travel-city-tone">{city.tone}</span>
                    </span>
                  </button>
                ))}
              </div>
            </section>
          );
        })}
      </div>

      <div className="travel-log-footer"><p>收集城市，也收集途中遇见的风景。</p><span className="mono">TO BE CONTINUED <i>↗</i></span></div>

      <dialog ref={dialogRef} className="travel-dialog" aria-labelledby="travel-dialog-title" onClose={() => setActiveCity(null)} onClick={(event) => { if (event.target === dialogRef.current) dialogRef.current.close(); }}>
        {activeCity && (
          <div className="travel-dialog-content">
            <div className="travel-dialog-topline"><span className="mono">TRAVEL MEMORY / {activeCity.english}</span><button type="button" aria-label="关闭旅行记忆" onClick={() => dialogRef.current?.close()}>×</button></div>
            <div className="travel-dialog-intro">
              <div className="travel-dialog-cover">
                {activeCity.cover ? <img src={activeCity.cover} alt={activeCity.coverAlt} /> : <div className="travel-cover-placeholder"><i className="mono">COVER SLOT</i><b>待添加大阪照片</b></div>}
              </div>
              <div className="travel-dialog-title-block"><span className="travel-unlocked"><i /> UNLOCKED <small>已解锁</small></span><h2 id="travel-dialog-title">{activeCity.name}<small className="mono">{activeCity.english}</small></h2><p>{activeCity.tone}</p></div>
            </div>
            <div className="travel-dialog-fields">
              <div><span className="mono">TRAVEL TIME</span><strong>{activeCity.date || '旅行时间待补充'}</strong></div>
              <div><span className="mono">COUNTRY</span><strong>{activeCity.countryCode === 'CN' ? 'CHINA / 中国' : 'JAPAN / 日本'}</strong></div>
            </div>
            <div className="travel-reflection"><span className="mono">MEMORY NOTE</span><p>{activeCity.note || '旅行心得待补充。这里预留给这趟旅程的片段、感受与小小发现。'}</p></div>
            <div className="travel-gallery-heading"><span className="mono">PHOTO MEMORIES</span><span className="mono">{String(activeCity.photos.length).padStart(2, '0')} SLOTS</span></div>
            <div className="travel-gallery">
              {activeCity.photos.map((photo, index) => photo.placeholder ? (
                <div className="travel-photo-placeholder" key={`${activeCity.id}-slot-${index}`}><span className="mono">{photo.label}</span><b>待添加个人照片</b></div>
              ) : (
                <img key={photo.src} src={photo.src} alt={photo.alt} loading="lazy" />
              ))}
            </div>
          </div>
        )}
      </dialog>
    </GlowCard>
  );
}

const lifePatchGoals = [
  '继续减脂进程',
  '学习摄影基础',
  '解锁料理练习',
  '尝试更稳定的生活方式',
];

function LifePatchCard() {
  const [open, setOpen] = useState(false);

  return (
    <GlowCard className={`world-card life-patch-card${open ? ' is-open' : ''}`}>
      <span className="life-patch-folder-back" aria-hidden="true" />
      <span className="life-patch-folder-tab" aria-hidden="true" />
      <span className="life-patch-paper" aria-hidden="true" />
      <span className="life-patch-folder-flap" aria-hidden="true" />
      <button
        type="button"
        className="life-patch-trigger"
        aria-expanded={open}
        aria-controls="life-patch-goals"
        onClick={() => setOpen((current) => !current)}
        onKeyDown={(event) => {
          if (event.key === 'Escape' && open) setOpen(false);
        }}
      >
        <span className="life-patch-topline card-topline">
          <span className="mono">05 / PERSONAL LIFE</span>
          <span className="life-patch-status mono"><i /> 04 ACTIVE NOTES</span>
        </span>
        <span className="life-patch-copy">
          <span className="life-patch-title">LIFE PATCH <small>0.8</small></span>
          <span className="life-patch-caption">生活，持续更新中。</span>
        </span>
        <span className="life-patch-bottomline mono">
          <span>PERSONAL QUEST LOG</span>
          <span>{open ? 'CLICK TO CLOSE' : 'CLICK TO OPEN'} <b>{open ? '−' : '↗'}</b></span>
        </span>
      </button>
      <ol className="life-patch-goals" id="life-patch-goals" aria-hidden={!open}>
        {lifePatchGoals.map((goal, index) => (
          <li className="life-patch-goal" key={goal} style={{ '--goal-index': index, '--goal-tilt': `${(index - 1.5) * 1.4}deg` }}>
            <span className="mono">{String(index + 1).padStart(2, '0')}</span>
            <b>{goal}</b>
            <i aria-hidden="true">↗</i>
          </li>
        ))}
      </ol>
    </GlowCard>
  );
}

function World() {
  return (
    <section className="section shell world-section" id="world">
      <div className="section-heading world-heading">
        <div className="section-heading-lockup">
          <span className="section-heading-display" data-motion-display aria-hidden="true">MY WORLD</span>
          <div className="section-heading-copy"><p className="section-index mono">02 — MY WORLD</p><h2>兴趣宇宙<span className="heading-dot">.</span></h2></div>
        </div>
        <p className="section-aside">不是灵感的来源，是灵感正在<br />发生的地方。<span className="aside-spark">✳</span></p>
      </div>
      <div className="world-grid">
        <GlowCard className="world-card anime-card">
          <div className="card-topline"><span className="mono">01 / ANIME ARCHIVE</span><span className="anime-instruction mono">DRAG / SWIPE <b>↔</b></span></div>
          <div className="anime-heading"><h3>动画，是一种 <span>生活的方法。</span></h3><span className="mono anime-selection">SELECTED ARTWORKS · 04</span></div>
          <div className="anime-carousel-wrap">
            <CircularCarousel
              items={animeItems}
              preset="cylinder"
              intro="rise"
              cardWidth={300}
              aspectRatio={1.15}
              gap={22}
              autoplay="off"
              draggable
              snap
              pauseOnHover
              focusOnClick
              parallax={0.12}
              stretch={0.08}
              depthFade={0.46}
              fadeColor="#101116"
              innerShade={0.45}
              cornerRadius={3}
              captions
              className="anime-carousel"
            />
          </div>
        </GlowCard>

        <GameLogCard />

        <MusicCard />

        <TravelLog />

        <LifePatchCard />
      </div>
    </section>
  );
}

const archiveSkills = [
  { icon: '⌘', title: '网络部署', english: <>Server /<br /> DNS / SSL</> },
  { icon: '✧', title: 'AI 创作', english: 'Image / Video' },
  { icon: '〈/〉', title: '应用开发', english: <>Web / Mini<br /> App</> },
];

const technicalLogs = [
  { id: 'LOG 001', title: '服务器与网站环境部署', tag: 'SERVER' },
  { id: 'LOG 002', title: '域名解析与 HTTPS 配置', tag: 'NETWORK' },
  { id: 'LOG 003', title: '代理服务与网络环境配置', tag: 'OPS' },
];

function ProjectPreview({ src, alt, aspectRatio = '16 / 9', className = '' }) {
  const frameRef = useRef(null);
  const startedRef = useRef(false);
  const timersRef = useRef([]);
  const [status, setStatus] = useState('complete');

  useEffect(() => {
    const node = frameRef.current;
    if (!node) return undefined;

    const reveal = () => {
      if (startedRef.current) return;
      startedRef.current = true;
      setStatus('queued');
      timersRef.current = [
        window.setTimeout(() => setStatus('generating'), 160),
        window.setTimeout(() => setStatus('refining'), 760),
        window.setTimeout(() => setStatus('complete'), 1330),
      ];
    };

    if (!('IntersectionObserver' in window)) reveal();
    else {
      const observer = new IntersectionObserver((entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          reveal();
          observer.disconnect();
        }
      }, { rootMargin: '70px 0px', threshold: 0.12 });
      observer.observe(node);
      return () => {
        observer.disconnect();
        timersRef.current.forEach(window.clearTimeout);
      };
    }
    return () => timersRef.current.forEach(window.clearTimeout);
  }, []);

  return (
    <div ref={frameRef} className={`archive-project-preview${className ? ` ${className}` : ''}`}>
      <RefineFrame status={status} alt={alt} aspectRatio={aspectRatio} width={1500} radius={4} background="#11121a" color="#c7baff" stageDuration={430} sweep showStatus hideAfter={1450}>
        <img src={src} alt={alt} loading="lazy" />
      </RefineFrame>
    </div>
  );
}

function ArchiveProject({ children, className = '' }) {
  return (
    <ElectricBorder className="archive-project-electric" color="#9d8bff" speed={0.58} chaos={0.065} borderRadius={5}>
      <article className={`archive-project${className ? ` ${className}` : ''}`}>{children}</article>
    </ElectricBorder>
  );
}

function CreatorArchive() {
  return (
    <footer className="creator-archive" id="contact">
      <div className="archive-orbit" aria-hidden="true"><i>✳</i><b>✧</b></div>
      <div className="shell archive-inner">
        <header className="archive-header">
          <p className="section-index mono">05 / CREATOR ARCHIVE</p>
          <span className="archive-heading-display" data-motion-display aria-hidden="true">ARCHIVE</span>
          <div className="archive-title-row">
            <div><h2>创作者档案<span>.</span></h2><p>从技能积累，到作品呈现。</p></div>
            <div className="archive-online mono"><i /> ARCHIVE ONLINE</div>
          </div>
        </header>

        <div className="archive-board">
          <section className="archive-panel archive-skills" aria-labelledby="archive-skills-title">
            <div className="archive-panel-head"><span id="archive-skills-title" className="mono">01 / SKILL TREE</span><span className="mono archive-panel-count">03 BRANCHES</span></div>
            <div className="archive-skill-grid">
              {archiveSkills.map((skill) => (
                <article className="archive-skill" key={skill.title}>
                  <span className="archive-skill-icon" aria-hidden="true">{skill.icon}</span>
                  <h3>{skill.title}</h3>
                  <p>{skill.english}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="archive-works" aria-labelledby="archive-works-title">
            <div className="archive-panel-head"><span id="archive-works-title" className="mono">02 / SELECTED WORKS</span><span className="mono archive-panel-count">PROJECTS / 003</span></div>
            <div className="archive-work-grid">
              <ArchiveProject className="archive-project-featured">
                <ProjectPreview src="/images/projects/pillow-library-concept.svg" alt="抱枕图库系统的概念界面预览，等待替换为真实项目截图" aspectRatio="2.25 / 1" />
                <div className="archive-project-copy">
                  <span className="mono archive-project-overline">PROJECT 001 / FEATURED</span>
                  <h3>抱枕图库系统</h3>
                  <p>动漫主题图像收藏、分类展示与站点部署。</p>
                  <div className="archive-tags"><span>Piwigo</span><span>MySQL</span><span>Cloudflare</span></div>
                  <span className="archive-project-arrow" aria-hidden="true">↗</span>
                </div>
              </ArchiveProject>

              <div className="archive-project-side">
                <ArchiveProject className="archive-project-compact">
                  <ProjectPreview src="/images/projects/mini-program-concept.svg" alt="微信小程序的概念界面预览，等待替换为真实项目截图" aspectRatio="1 / 1" />
                  <div className="archive-project-copy">
                    <span className="mono archive-project-overline">PROJECT 002 <b>▯</b></span>
                    <h3>微信小程序</h3>
                    <p>页面设计、功能开发与交互实现</p>
                    <span className="archive-project-note mono">MINI PROGRAM ↗</span>
                  </div>
                </ArchiveProject>
                <ArchiveProject className="archive-project-compact archive-project-experiment">
                  <ProjectPreview src="/images/projects/ai-lab-concept.svg" alt="AI 创意实验室的概念视觉预览，等待替换为真实项目截图" aspectRatio="1 / 1" />
                  <div className="archive-project-copy">
                    <span className="mono archive-project-overline">EXPERIMENT 003 <b>✧</b></span>
                    <h3>AI 创意实验室</h3>
                    <p>角色设计、AI 生图与影像实验</p>
                    <span className="archive-project-note mono">VISUAL COLLECTION ↗</span>
                  </div>
                </ArchiveProject>
              </div>
            </div>
          </section>

          <section className="archive-panel archive-logs" aria-labelledby="archive-logs-title">
            <div className="archive-panel-head"><span id="archive-logs-title" className="mono">03 / TECHNICAL LOG</span><span className="mono archive-panel-count">FIELD NOTES</span></div>
            <div className="archive-log-list">
              {technicalLogs.map((log) => (
                <div className="archive-log" key={log.id}>
                  <div><span className="mono">{log.id}</span><p>{log.title}</p></div>
                  <span className="mono archive-log-tag">{log.tag} <b>↗</b></span>
                </div>
              ))}
            </div>
          </section>
        </div>

        <div className="archive-footer">
          <a className="wordmark footer-mark" href="#home"><span className="wordmark-mark">Y<span>.</span></span><span className="wordmark-copy"><strong>YANG STUDIO</strong><small>INDEPENDENT DESIGNER</small></span></a>
          <a className="archive-contact-link mono" href="mailto:hello@example.com">来聊聊合作 <Arrow diagonal /></a>
          <span className="mono archive-copyright">© 2026 丹阳 · MADE WITH CURIOSITY</span>
        </div>
      </div>
    </footer>
  );
}

function App() {
  useLayoutEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) return undefined;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.dataset.motionVisible = 'true';
        entry.target.querySelector?.('[data-motion-display]')?.setAttribute('data-motion-visible', 'true');
        if (entry.target.hasAttribute('data-motion-art')) entry.target.dataset.motionVisible = 'true';
        entry.target.querySelectorAll?.('[data-motion-art]').forEach((image) => { image.dataset.motionVisible = 'true'; });
        observer.unobserve(entry.target);
      });
    }, { rootMargin: '0px 0px -12% 0px', threshold: 0.12 });

    document.documentElement.dataset.motionReady = 'true';

    document.querySelectorAll('[data-motion-display]').forEach((heading) => {
      const trigger = heading.closest('.section-heading, .archive-header');
      if (!trigger) return;
      trigger.dataset.motionHeadingTrigger = 'true';
      observer.observe(trigger);
    });

    const groups = [
      { selector: '.profile-grid', children: ':scope > .glow-card-frame', depth: 'main' },
      { selector: '.world-grid', children: ':scope > .glow-card-frame', depth: 'main' },
      { selector: '.archive-board', children: ':scope > .archive-skills, :scope > .archive-works, :scope > .archive-logs', depth: 'main' },
      { selector: '.archive-skill-grid', children: ':scope > .archive-skill', depth: 'inner' },
      { selector: '.archive-work-grid', children: ':scope > .electric-border', depth: 'inner' },
      { selector: '.archive-project-side', children: ':scope > .electric-border', depth: 'inner' },
      { selector: '.archive-log-list', children: ':scope > .archive-log', depth: 'inner' },
      { selector: '.travel-city-grid', children: ':scope > .travel-city-card', depth: 'inner' },
    ];

    groups.forEach(({ selector, children, depth }) => {
      document.querySelectorAll(selector).forEach((group) => {
        const items = group.querySelectorAll(children);
        if (!items.length) return;
        group.dataset.motionStagger = depth;
        items.forEach((item, index) => {
          item.dataset.motionItem = 'true';
          item.style.setProperty('--motion-delay', `${(depth === 'main' ? 320 : 630) + index * 125}ms`);
          observer.observe(item);
        });
        observer.observe(group);
      });
    });

    document.querySelectorAll('.avatar-frame img, .game-stage img, .music-cover img, .travel-city-image > img').forEach((image) => {
      image.dataset.motionArt = 'true';
      observer.observe(image);
    });

    return () => observer.disconnect();
  }, []);

  return <><Header /><main><Hero /><Profile /><World /></main><CreatorArchive /></>;
}

createRoot(document.getElementById('root')).render(<React.StrictMode><App /></React.StrictMode>);
