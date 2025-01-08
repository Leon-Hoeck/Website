import React from 'react';

interface BlockquoteProps {
  children: React.ReactNode;
}

export default function Blockquote({ children }: BlockquoteProps) {
  return (
    <blockquote className="pl-4 my-4 border-l-4 border-blue-500 text-gray-300 italic">
      {children}
    </blockquote>
  );
} 