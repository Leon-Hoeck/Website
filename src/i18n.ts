const detectLanguageFromSubdomain = () => {
  if (typeof window === 'undefined') {
    // Detect subdomain on the server
    const hostname = process.env.HOSTNAME || ''; // Adjust for server environment
    const subdomain = hostname.split('.')[0];
    console.log('Detected Subdomain (i18n - Server):', subdomain);
    return subdomain === 'de' ? 'de' : 'en';
  } else {
    // Detect subdomain in the browser
    const hostname = window.location.hostname;
    const subdomain = hostname.split('.')[0];
    console.log('Detected Subdomain (i18n - Browser):', subdomain);
    return subdomain === 'de' ? 'de' : 'en';
  }
};
