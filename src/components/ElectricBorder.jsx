import { useEffect, useRef } from 'react';
import './ElectricBorder.css';

function roundedRectPoint(t, left, top, width, height, radius) {
  const straightWidth = width - radius * 2;
  const straightHeight = height - radius * 2;
  const arc = Math.PI * radius / 2;
  const perimeter = 2 * straightWidth + 2 * straightHeight + 4 * arc;
  let distance = t * perimeter;
  const line = (length, start, end) => {
    if (distance > length) {
      distance -= length;
      return null;
    }
    const progress = distance / length;
    return { x: start.x + (end.x - start.x) * progress, y: start.y + (end.y - start.y) * progress };
  };
  const point =
    line(straightWidth, { x: left + radius, y: top }, { x: left + width - radius, y: top }) ||
    (distance <= arc ? { x: left + width - radius + radius * Math.cos(-Math.PI / 2 + distance / arc * Math.PI / 2), y: top + radius + radius * Math.sin(-Math.PI / 2 + distance / arc * Math.PI / 2) } : (distance -= arc, null)) ||
    line(straightHeight, { x: left + width, y: top + radius }, { x: left + width, y: top + height - radius }) ||
    (distance <= arc ? { x: left + width - radius + radius * Math.cos(distance / arc * Math.PI / 2), y: top + height - radius + radius * Math.sin(distance / arc * Math.PI / 2) } : (distance -= arc, null)) ||
    line(straightWidth, { x: left + width - radius, y: top + height }, { x: left + radius, y: top + height }) ||
    (distance <= arc ? { x: left + radius + radius * Math.cos(Math.PI / 2 + distance / arc * Math.PI / 2), y: top + height - radius + radius * Math.sin(Math.PI / 2 + distance / arc * Math.PI / 2) } : (distance -= arc, null)) ||
    line(straightHeight, { x: left, y: top + height - radius }, { x: left, y: top + radius }) ||
    { x: left + radius + radius * Math.cos(Math.PI + distance / arc * Math.PI / 2), y: top + radius + radius * Math.sin(Math.PI + distance / arc * Math.PI / 2) };
  return point;
}

export default function ElectricBorder({
  children,
  color = '#9d8bff',
  speed = 0.65,
  chaos = 0.08,
  borderRadius = 5,
  className = '',
  style = {},
}) {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    const context = canvas?.getContext('2d');
    if (!container || !canvas || !context) return undefined;

    let frame = 0;
    let time = 0;
    let previous = 0;
    let lastDraw = 0;
    let width = 0;
    let height = 0;
    let dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    let inView = false;
    let alive = true;
    const offset = 5;
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

    const resize = () => {
      const rect = container.getBoundingClientRect();
      width = rect.width + offset * 2;
      height = rect.height + offset * 2;
      dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      canvas.width = Math.max(1, Math.round(width * dpr));
      canvas.height = Math.max(1, Math.round(height * dpr));
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
    };

    const draw = (now) => {
      frame = 0;
      if (!alive || !inView || document.hidden || motionQuery.matches) return;
      if (now - lastDraw < 1000 / 30) {
        frame = requestAnimationFrame(draw);
        return;
      }
      const delta = previous ? (now - previous) / 1000 : 0.016;
      previous = now;
      lastDraw = now;
      time += delta * speed;
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
      context.clearRect(0, 0, width, height);
      context.strokeStyle = color;
      context.lineWidth = 1.15;
      context.lineJoin = 'round';
      context.lineCap = 'round';
      context.shadowColor = color;
      context.shadowBlur = 5;
      const innerWidth = Math.max(1, width - offset * 2);
      const innerHeight = Math.max(1, height - offset * 2);
      const radius = Math.min(borderRadius, innerWidth / 2, innerHeight / 2);
      const samples = Math.min(480, Math.max(120, Math.ceil((innerWidth + innerHeight) * 0.65)));
      context.beginPath();
      for (let index = 0; index <= samples; index += 1) {
        const progress = index / samples;
        const point = roundedRectPoint(progress, offset, offset, innerWidth, innerHeight, radius);
        const waveA = Math.sin(progress * 79 + time * 4.6);
        const waveB = Math.sin(progress * 27 - time * 2.8 + 1.1);
        const waveC = Math.sin(progress * 151 + time * 1.6 + 2.4);
        const displacement = (waveA * 0.55 + waveB * 0.3 + waveC * 0.15) * chaos * 9;
        const x = point.x + displacement * Math.sin(progress * Math.PI * 2 + 1.2);
        const y = point.y + displacement * Math.cos(progress * Math.PI * 2 + 1.2);
        if (index === 0) context.moveTo(x, y);
        else context.lineTo(x, y);
      }
      context.closePath();
      context.stroke();
      context.shadowBlur = 0;
      frame = requestAnimationFrame(draw);
    };

    const wake = () => {
      if (!alive || !inView || document.hidden || motionQuery.matches || frame) return;
      previous = 0;
      frame = requestAnimationFrame(draw);
    };
    const pause = () => {
      cancelAnimationFrame(frame);
      frame = 0;
      previous = 0;
    };
    const visibilityObserver = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting;
      if (inView) wake();
      else pause();
    });
    const onVisibilityChange = () => {
      if (document.hidden || motionQuery.matches) pause();
      else wake();
    };
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(container);
    visibilityObserver.observe(container);
    document.addEventListener('visibilitychange', onVisibilityChange);
    motionQuery.addEventListener('change', onVisibilityChange);
    resize();
    return () => {
      alive = false;
      pause();
      resizeObserver.disconnect();
      visibilityObserver.disconnect();
      document.removeEventListener('visibilitychange', onVisibilityChange);
      motionQuery.removeEventListener('change', onVisibilityChange);
    };
  }, [color, speed, chaos, borderRadius]);

  return (
    <div ref={containerRef} className={`electric-border${className ? ` ${className}` : ''}`} style={{ '--electric-border-color': color, borderRadius, ...style }}>
      <div className="eb-canvas-container" aria-hidden="true"><canvas ref={canvasRef} className="eb-canvas" /></div>
      <div className="eb-glow eb-glow-soft" aria-hidden="true" />
      <div className="eb-glow eb-glow-sharp" aria-hidden="true" />
      <div className="eb-content">{children}</div>
    </div>
  );
}
