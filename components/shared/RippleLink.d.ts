import * as React from 'react';

export interface RippleLinkProps {
  href: string;
  className?: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
}

declare const RippleLink: React.FC<RippleLinkProps>;
export default RippleLink;
