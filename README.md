# Interactive CV Website

A modern, interactive web-based CV built with Next.js that showcases experience, skills, and projects in an engaging way. The application features smooth animations, multilingual support, and a responsive design.

## 🌟 Features

### Interactive Elements
- Dynamic skill graph with level visualization
- Animated skill selection with related technologies display
- Project cards with hover effects and technology tags
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

## 🛠 Tech Stack

- **Framework**: Next.js with TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Internationalization**: next-i18next
- **Icons**: Heroicons

## 📦 Project Structure

```
CV/
├── public/
│   └── locales/          # Translation files
├── src/
│   ├── components/       # React components
│   ├── pages/           # Next.js pages
│   └── types/           # TypeScript types
├── styles/              # Global styles
└── ...config files
```

## 🌐 Internationalization

The CV supports multiple languages with region-specific content. Translation files are located in `public/locales/`. To add a new language:

1. Create a new translation file in `public/locales/[lang]/common.json`
2. Add the language to `next-i18next.config.js`

## 🎨 Customization

### Styling
- Modify `tailwind.config.js` for theme customization
- Global styles are in `styles/globals.css`
- Component-specific styles use Tailwind classes

### Content
- Update CV data in the respective language files
- Modify components in `src/components/` for layout changes
- Add new features by extending existing components

## 📄 License

This project is licensed under the Creative Commons Attribution-NonCommercial-NoDerivatives 4.0 International License - see the [LICENSE](LICENSE) file for details.

## 🤝 Contributing

While this is a personal CV project, suggestions and feedback are welcome! Feel free to:

1. Report bugs
2. Suggest new features
3. Provide feedback on user experience
