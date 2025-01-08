# Personal Website & Blog

A modern, interactive personal website and blog built with Next.js that showcases my professional experience, skills, and projects in an engaging way. The site features a dynamic CV section, blog with advanced search capabilities, smooth animations, multilingual support, and a responsive design.

## 🌟 Features

### Blog
- Advanced search functionality with tag filtering
- Support for pinned posts
- Related posts suggestions
- MDX support with code highlighting
- Math equation rendering
- Responsive image handling
- Development-only posts with DEV tag

### Interactive CV
- Dynamic skill visualization
- Animated section transitions
- Project cards with hover effects
- Smooth scrolling and transitions
- Language selection with region-specific content

### Multilingual Support
- English (EN)
- Swiss German (DE)
- French (FR)
- Italian (IT)

### Responsive Design
- Mobile-first approach
- Fluid layouts and animations
- Optimized for all screen sizes
- Adaptive content presentation

## 🛠 Tech Stack

- **Framework**: Next.js with TypeScript
- **Content**: MDX for blog posts
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Math**: KaTeX
- **Code**: Prism.js with custom theme
- **Internationalization**: next-i18next
- **Icons**: Heroicons

## 📦 Project Structure

```
/
├── public/
│   └── locales/          # Translation files
├── src/
│   ├── components/       # React components
│   ├── content/         # Blog posts and content
│   ├── pages/           # Next.js pages
│   ├── styles/          # Global styles
│   ├── types/           # TypeScript types
│   └── utils/           # Utility functions
└── ...config files
```

## 🌐 Internationalization

The site supports multiple languages with region-specific content. Translation files are located in `public/locales/`. To add a new language:

1. Create a new translation file in `public/locales/[lang]/common.json`
2. Add the language to `next-i18next.config.js`

## 🎨 Customization

### Styling
- Modify `tailwind.config.js` for theme customization
- Global styles in `styles/globals.css`
- Component-specific styles use Tailwind classes

### Content
- Blog posts in `src/content/blog/[lang]/*.mdx`
- CV data in `src/data/cv-[lang].json`
- Component modifications in `src/components/`

## 📄 License

This project is licensed under the Creative Commons Attribution-NonCommercial-NoDerivatives 4.0 International License - see the [LICENSE](LICENSE) file for details.

## 🤝 Contributing

While this is a personal website project, suggestions and feedback are welcome! Feel free to:

1. Report bugs
2. Suggest new features
3. Provide feedback on user experience
