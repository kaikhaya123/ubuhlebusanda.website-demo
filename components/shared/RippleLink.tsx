import React, { useRef } from 'react';

interface RippleLinkProps {
  href: string;
  className?: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
}

const RippleLink: React.FC<RippleLinkProps> = ({ href, className = '', style, children }) => {
  const ref = useRef<HTMLAnchorElement>(null);

  function handleClick(e: React.MouseEvent<HTMLAnchorElement>) {
    const btn = ref.current;
    if (!btn) return;
    const ripple = document.createElement('span');
    ripple.className = 'absolute bg-white/60 rounded-full pointer-events-none';
    ripple.style.width = ripple.style.height = '60px';
    ripple.style.left = `${e.nativeEvent.offsetX - 30}px`;
    ripple.style.top = `${e.nativeEvent.offsetY - 30}px`;
    ripple.style.position = 'absolute';
    ripple.style.opacity = '0.7';
    ripple.style.transform = 'scale(0)';
    ripple.style.transition = 'transform 0.4s, opacity 0.4s';
    btn.appendChild(ripple);
    setTimeout(() => {
      ripple.style.transform = 'scale(1)';
      ripple.style.opacity = '0';
    }, 10);
    setTimeout(() => btn.removeChild(ripple), 400);
  }

  return (
    <a
      href={href}
      className={className + ' relative overflow-hidden'}
      style={style}
      ref={ref}
      onClick={handleClick}
    >
      {children}
    </a>
  );
};

export default RippleLink;
