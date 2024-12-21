import React, { useState } from 'react';
import { useTranslation } from 'next-i18next';
import { motion } from 'framer-motion';
import { DocumentArrowDownIcon } from '@heroicons/react/24/outline';
import { CVData } from '../types/cv';

interface PDFExportProps {
  cvData: CVData;
}

export default function PDFExport({ cvData }: PDFExportProps) {
  const { t } = useTranslation('common');
  const [isGenerating, setIsGenerating] = useState(false);

  const generatePDF = async () => {
    setIsGenerating(true);
    try {
      const html2pdf = (await import('html2pdf.js')).default;
      const element = document.getElementById('cv-content');
      if (!element) return;

      const opt = {
        margin: 0,
        filename: `${cvData.basics.name.replace(/\s+/g, '-').toLowerCase()}-cv.pdf`,
        image: { type: 'jpeg', quality: 1 },
        html2canvas: { 
          scale: 2,
          useCORS: true,
          letterRendering: true,
          backgroundColor: '#ffffff',
          width: element.offsetWidth,
          height: element.offsetHeight,
          x: 0,
          y: 0,
          scrollX: 0,
          scrollY: 0,
          windowWidth: document.documentElement.offsetWidth,
          windowHeight: document.documentElement.offsetHeight
        },
        jsPDF: { 
          unit: 'mm', 
          format: 'a4', 
          orientation: 'portrait',
          putOnlyUsedFonts: true,
          compress: true
        },
        pagebreak: { 
          mode: ['avoid-all', 'css', 'legacy'],
          before: '.page-break'
        }
      };

      await html2pdf().set(opt).from(element).save();
    } catch (error) {
      console.error('Error generating PDF:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <motion.div
      className="fixed bottom-8 right-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.05 }}
    >
      <button
        onClick={generatePDF}
        disabled={isGenerating}
        className="flex items-center space-x-2 px-4 py-2 bg-blue-500 text-white rounded-lg 
                 shadow-lg hover:bg-blue-600 transition-colors disabled:opacity-50"
      >
        <DocumentArrowDownIcon className="w-5 h-5" />
        <span>{isGenerating ? t('pdf.generating') : t('pdf.download')}</span>
      </button>
    </motion.div>
  );
} 