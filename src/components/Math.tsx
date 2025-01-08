import React from 'react';
import 'katex/dist/katex.min.css';
import { InlineMath, BlockMath } from 'react-katex';

interface MathProps {
  children: string;
  block?: boolean;
}

export default function Math({ children, block = false }: MathProps) {
  // Remove backticks and $ symbols if present
  const equation = children.replace(/`|\$/g, '').trim();
  
  return block ? (
    <BlockMath math={equation} />
  ) : (
    <InlineMath math={equation} />
  );
} 