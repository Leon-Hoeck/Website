import { useTranslation } from 'next-i18next';

export default function CVPage() {
  // Load the 'cv' namespace
  const { t } = useTranslation('cv');

  // For example, if your cv.json has { "basics": { "name": "Leon Höck", ... } }
  return (
    <div>
      <h1>{t('basics.name')}</h1>
      <p>{t('basics.label')}</p>
      {/* etc. */}
    </div>
  );
}
