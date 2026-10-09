import { useEffect, useRef, useState } from 'react';
import './RefineFrame.css';

const STAGES = {
  queued: { blur: 4, sat: 0.6, scale: 1.04, opacity: 0.55 },
  generating: { blur: 1.5, sat: 0.8, scale: 1.02, opacity: 0.85 },
  refining: { blur: 0.5, sat: 0.95, scale: 1.005, opacity: 1 },
  complete: { blur: 0, sat: 1, scale: 1, opacity: 1 },
  error: { blur: 2, sat: 0.5, scale: 1, opacity: 0.28 },
};
const TARGET = { queued: 0, generating: 0.5, refining: 0.875, complete: 1 };
const LEVELS = [48, 32, 20, 12, 8, 5, 3, 2, 1];
const ACTIVE = new Set(['queued', 'generating', 'refining']);
const DEFAULT_LABELS = {
  queued: '等待中',
  generating: '正在生成',
  refining: '细节优化',
  complete: '视觉就绪',
  error: '加载失败',
};

function build(simulation, canvas, image, dpr) {
  const rect = canvas.getBoundingClientRect();
  const width = Math.max(1, Math.round(rect.width * dpr));
  const height = Math.max(1, Math.round(rect.height * dpr));
  const key = `${image.currentSrc}|${width}x${height}`;
  if (simulation.key === key) return;
  simulation.key = key;
  simulation.width = width;
  simulation.height = height;
  canvas.width = width;
  canvas.height = height;

  const cover = Math.max(width / image.naturalWidth, height / image.naturalHeight);
  const sourceWidth = width / cover;
  const sourceHeight = height / cover;
  const sourceX = (image.naturalWidth - sourceWidth) / 2;
  const sourceY = (image.naturalHeight - sourceHeight) / 2;
  simulation.levels = LEVELS.map((block) => {
    const pixelSize = block === 1 ? 1 : Math.max(2, Math.round(block * dpr));
    const layer = document.createElement('canvas');
    layer.width = pixelSize === 1 ? width : Math.max(1, Math.ceil(width / pixelSize));
    layer.height = pixelSize === 1 ? height : Math.max(1, Math.ceil(height / pixelSize));
    const context = layer.getContext('2d');
    if (!context) return layer;
    if (pixelSize === 1) {
      context.imageSmoothingEnabled = true;
      context.imageSmoothingQuality = 'high';
      context.drawImage(image, sourceX, sourceY, sourceWidth, sourceHeight, 0, 0, width, height);
      return layer;
    }
    context.imageSmoothingEnabled = true;
    context.imageSmoothingQuality = 'high';
    context.drawImage(image, sourceX, sourceY, sourceWidth, sourceHeight, 0, 0, layer.width, layer.height);
    return layer;
  });

  const glint = canvas.getContext('2d')?.createLinearGradient(0, 0, width, 0);
  if (glint) {
    [[0, 0], [0.08, 0.1], [0.2, 0.7], [0.32, 1], [0.68, 1], [0.8, 0.7], [0.92, 0.1], [1, 0]]
      .forEach(([position, alpha]) => glint.addColorStop(position, `rgba(255,255,255,${alpha})`));
  }
  simulation.glint = glint;
}

function StatusMark({ status }) {
  if (status === 'complete') return <svg viewBox="0 0 16 16" aria-hidden="true"><path d="m3 8 3.2 3.2L13 4.8" /></svg>;
  if (status === 'error') return <svg viewBox="0 0 16 16" aria-hidden="true"><path d="M8 3v6m0 3h.01" /><circle cx="8" cy="8" r="6" /></svg>;
  return <svg className="refine-frame__spinner" viewBox="0 0 16 16" aria-hidden="true"><circle cx="8" cy="8" r="5.5" /></svg>;
}

export default function RefineFrame({
  status = 'generating',
  children,
  aspectRatio = '4 / 3',
  width = 320,
  radius = 5,
  background = '#11121a',
  color = '#c7baff',
  stageDuration = 420,
  sweep = true,
  showStatus = true,
  hideAfter = 1300,
  labels = DEFAULT_LABELS,
  alt = '作品预览',
  className = '',
}) {
  const stage = STAGES[status] ?? STAGES.generating;
  const active = ACTIVE.has(status);
  const text = { ...DEFAULT_LABELS, ...labels };
  const printRef = useRef(null);
  const canvasRef = useRef(null);
  const simulation = useRef({ p: 0, raf: 0, last: 0, key: '', width: 0, height: 0, levels: [], glint: null, sent: false, wake: null });
  const latest = useRef({ status, stageDuration, sweep, reduce: false });
  latest.current = { status, stageDuration, sweep, reduce: latest.current.reduce };
  const [mosaic, setMosaic] = useState(false);
  const [resolved, setResolved] = useState(false);
  const [chip, setChip] = useState(showStatus);

  useEffect(() => {
    let timer;
    if (!showStatus) {
      setChip(false);
      return undefined;
    }
    setChip(true);
    if (status === 'complete' && hideAfter > 0) timer = window.setTimeout(() => setChip(false), hideAfter);
    return () => window.clearTimeout(timer);
  }, [status, showStatus, hideAfter]);

  useEffect(() => {
    const sim = simulation.current;
    const canvas = canvasRef.current;
    const image = printRef.current?.querySelector('img');
    if (!canvas || !image) return undefined;

    // React StrictMode runs an effect setup/cleanup cycle in development.
    // Reset the RAF token and cached render data so the second setup can
    // schedule its reveal frame instead of waiting on a cancelled request.
    sim.raf = 0;
    sim.last = 0;
    sim.key = '';
    sim.levels = [];
    sim.sent = false;
    sim.p = 0;
    setResolved(false);

    const tick = (now) => {
      const current = simulation.current;
      if (!image.naturalWidth) {
        current.raf = 0;
        return;
      }
      const dt = Math.min(32, current.last ? now - current.last : 16);
      current.last = now;
      const dpr = Math.min(1.5, window.devicePixelRatio || 1);
      build(current, canvas, image, dpr);
      const max = current.levels.length - 1;
      const target = TARGET[latest.current.status] ?? current.p;
      const step = latest.current.reduce ? 1e9 : dt / (max * latest.current.stageDuration);
      if (target < current.p) current.p = target;
      else current.p = Math.min(target, current.p + step);

      const context = canvas.getContext('2d');
      if (context) {
        const level = current.p * max;
        const index = Math.min(max, Math.floor(level + 1e-6));
        const fraction = level - index;
        context.imageSmoothingEnabled = false;
        context.globalAlpha = 1;
        context.drawImage(current.levels[index], 0, 0, current.width, current.height);
        if (index < max && fraction > 0) {
          const edge = 28 * dpr;
          const front = fraction * (current.height + edge) - edge / 2;
          const top = Math.max(0, Math.floor(front - edge / 2));
          const nextLevel = current.levels[index + 1];
          const sourceTop = Math.max(1, Math.min(nextLevel.height, Math.ceil((top / current.height) * nextLevel.height)));
          if (top > 0) context.drawImage(nextLevel, 0, 0, nextLevel.width, sourceTop, 0, 0, current.width, top);
          const strips = 14;
          const stripHeight = edge / strips;
          for (let strip = 0; strip < strips; strip += 1) {
            const y = front - edge / 2 + strip * stripHeight;
            if (y + stripHeight <= 0 || y >= current.height) continue;
            const opacity = 1 - (strip + 0.5) / strips;
            const visibleY = Math.max(0, y);
            const visibleHeight = Math.min(current.height, y + stripHeight) - visibleY;
            if (visibleHeight > 0) {
              const sourceY = Math.min(nextLevel.height - 1, Math.floor((visibleY / current.height) * nextLevel.height));
              const sourceHeight = Math.max(1, Math.min(nextLevel.height - sourceY, Math.ceil((visibleHeight / current.height) * nextLevel.height)));
              context.globalAlpha = opacity * opacity * (3 - 2 * opacity);
              context.drawImage(nextLevel, 0, sourceY, nextLevel.width, sourceHeight, 0, visibleY, current.width, visibleHeight);
            }
          }
          context.globalAlpha = 1;
          if (latest.current.sweep && !latest.current.reduce && current.glint && front > 0 && front < current.height) {
            context.fillStyle = current.glint;
            context.globalAlpha = 0.14;
            context.fillRect(0, front - 2 * dpr, current.width, 4 * dpr);
            context.globalAlpha = 0.3;
            context.fillRect(0, front - dpr, current.width, 2 * dpr);
            context.globalAlpha = 1;
          }
        }
      }
      const done = current.p >= 1;
      if (done !== current.sent) {
        current.sent = done;
        setResolved(done);
      }
      const keep = (!latest.current.reduce && ACTIVE.has(latest.current.status)) || Math.abs(target - current.p) > 0.0005;
      current.raf = keep ? requestAnimationFrame(tick) : 0;
      if (!keep) current.last = 0;
    };

    const wake = () => {
      if (!simulation.current.raf) simulation.current.raf = requestAnimationFrame(tick);
    };
    simulation.current.wake = wake;
    const start = () => {
      setMosaic(true);
      wake();
    };
    if (image.complete && image.naturalWidth) start();
    else image.addEventListener('load', start, { once: true });
    window.addEventListener('resize', wake);
    wake();
    return () => {
      image.removeEventListener('load', start);
      window.removeEventListener('resize', wake);
      cancelAnimationFrame(sim.raf);
      sim.raf = 0;
      sim.last = 0;
      sim.wake = null;
    };
  }, []);

  useEffect(() => {
    simulation.current.wake?.();
  }, [status, stageDuration, width, aspectRatio]);

  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)');
    const sync = () => { latest.current.reduce = query.matches; };
    sync();
    query.addEventListener('change', sync);
    return () => query.removeEventListener('change', sync);
  }, []);

  const frameStyle = {
    '--rf-w': `${width}px`, '--rf-aspect': aspectRatio, '--rf-radius': `${radius}px`,
    '--rf-bg': background, '--rf-ink': color, '--rf-stage': `${stageDuration}ms`,
    '--rf-blur': `${mosaic ? 0 : stage.blur}px`, '--rf-sat': stage.sat,
    '--rf-scale': mosaic ? 1 : stage.scale, '--rf-opacity': stage.opacity,
  };

  return (
    <div className={`refine-frame${className ? ` ${className}` : ''}`} role="img" aria-label={`${alt} / ${text[status] ?? status}`} aria-busy={active || undefined} data-status={status} data-active={active ? '' : undefined} data-sweep={sweep && active ? '' : undefined} data-mosaic={mosaic ? '' : undefined} data-resolved={mosaic && resolved ? '' : undefined} style={frameStyle}>
      <div className="refine-frame__media" aria-hidden="true"><div ref={printRef} className="refine-frame__print">{children}</div><canvas ref={canvasRef} className="refine-frame__mosaic" /></div>
      <div className="refine-frame__sweep" aria-hidden="true" />
      {chip && showStatus ? <div className="refine-frame__chip" aria-hidden="true"><span className="refine-frame__mark" data-kind={active ? 'spin' : status}><StatusMark status={status} /></span><span key={status} className="refine-frame__label">{text[status] ?? status}</span></div> : null}
      <span className="refine-frame__sr" role="status">{text[status] ?? status}</span>
    </div>
  );
}
