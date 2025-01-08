import React from 'react';
import 'katex/dist/katex.min.css';
import { InlineMath, BlockMath } from 'react-katex';

interface MathProps {
  children: string;
  block?: boolean;
}

export default function Math({ children, block = false }: MathProps) {
  const equation = children.trim();
  
  return block ? (
    <BlockMath>{equation}</BlockMath>
  ) : (
    <InlineMath>{equation}</InlineMath>
  );
} 