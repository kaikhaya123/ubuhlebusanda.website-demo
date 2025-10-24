"use client"
import { ReactNode } from 'react';
import { motion } from 'framer-motion';

const baseVariants = { hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0 } };

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
}

// Use a permissive any cast to avoid strict motion typings conflicts in this workspace
const M: any = motion;

export default function Reveal({ children, className, delay = 0 }: RevealProps) {
  return (
    <M.div className={className} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }} variants={baseVariants} transition={{ duration: 0.6, delay }}>
      {children}
    </M.div>
  );
}
