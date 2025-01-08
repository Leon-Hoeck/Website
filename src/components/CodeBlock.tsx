import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface CodeBlockProps {
  children: string;
  className?: string;
}

export default function CodeBlock({ children, className }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(children);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative group">
      <pre className={className}>
        <motion.button
          className="absolute right-2 top-2 px-2 py-1 text-sm text-gray-400 bg-gray-800 rounded opacity-0 group-hover:opacity-100 transition-opacity"
          onClick={handleCopy}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {copied ? 'Copied!' : 'Copy'}
        </motion.button>
        <code className={className}>{children}</code>
      </pre>
    </div>
  );
} 