<div align="center">
<img alt="Personal Website" src="https://github.com/jatanrathod13/portfolio-enhanced/assets/16860528/57ffca81-3f0a-4425-b31d-094f61725455" width="90%">
</div>

# Jatan Rathod's Personal Website

[![Next.js](https://img.shields.io/badge/Next.js-14.2.4-black?logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)](https://www.typescriptlang.org/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4-38B2AC?logo=tailwind-css)](https://tailwindcss.com/)
[![Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?logo=vercel)](https://vercel.com)
[![License](https://img.shields.io/badge/License-MIT-green)](./LICENSE)

A modern, responsive personal portfolio and blog built with Next.js, [shadcn/ui](https://ui.shadcn.com/), and [magic ui](https://magicui.design/).

## ✨ Features

- **Easy Configuration** - Setup takes minutes by editing the [single config file](./src/data/resume.tsx)
- **Modern Stack** - Built with Next.js 14.2.4, React 18, TypeScript, Framer Motion for animations
- **Beautiful UI** - Leverages shadcn/ui and Magic UI for a polished interface
- **Blog Support** - Integrated blog functionality with Markdown support
- **Fully Responsive** - Optimized for all device sizes
- **Performance Optimized** - Fast load times and optimal Lighthouse scores
- **Dark Mode** - Built-in light/dark theme support
- **SEO Friendly** - Enhanced metadata for better search engine visibility

## 🚀 Quick Start

### Local Development

1. Clone this repository:

   ```bash
   git clone https://github.com/jatanrathod13/portfolio-enhanced.git
   ```

2. Navigate to the project directory:

   ```bash
   cd portfolio-enhanced
   ```

3. Install dependencies:

   ```bash
   pnpm install
   ```

4. Start the development server:

   ```bash
   pnpm dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

### Deployment

Deploy your own version of this portfolio with one click:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fjatanrathod13%2Fportfolio-enhanced)

## 🔧 Customization

1. Open the [resume.tsx](./src/data/resume.tsx) config file
2. Update the personal information, experiences, skills, and other details
3. Replace images in the `public` directory with your own
4. Customize the blog content in the `content` directory

## 📚 Project Structure

```
/
├── content/         # Blog content files
├── public/          # Static assets
├── src/
│   ├── app/         # Next.js app router pages
│   ├── components/  # React components
│   ├── data/        # Configuration and data files
│   └── lib/         # Utility functions and libraries
└── ...              # Configuration files
```

## 🛠️ Technologies Used

- **Framework**: Next.js 14
- **Language**: TypeScript
- **Styling**: TailwindCSS
- **UI Components**: shadcn/ui, Magic UI
- **Animations**: Framer Motion
- **Content**: Markdown with MDX support

## 📄 License

This project is licensed under the [MIT License](./LICENSE).
