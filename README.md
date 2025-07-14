# 360 Points of Light - A Spiritual Compass

A beautiful, interactive web application featuring 360 spiritual compass points, each representing a unique lesson to guide our journey back to Christ. This project is designed to provide wholesome teachings for posterity and daily spiritual growth.

## 🌟 Features

### Interactive Spiritual Compass
- **360 Interactive Points**: Each degree represents a unique spiritual lesson
- **Beautiful Visual Design**: Modern, responsive interface with smooth animations
- **Category Organization**: Lessons organized into 10 spiritual categories:
  - Faith & Belief
  - Hope & Trust
  - Love & Charity
  - Repentance & Change
  - Service & Giving
  - Gratitude & Appreciation
  - Forgiveness & Healing
  - Patience & Endurance
  - Humility & Teachability
  - Courage & Strength

### Rich Content
- **Scripture-Based Lessons**: Every point includes relevant biblical references
- **Practical Applications**: Daily actionable steps for spiritual growth
- **Wholesome Content**: Family-friendly teachings focused on Christ
- **For Posterity**: Lessons designed to be shared with future generations

### Modern Technology
- **Next.js 14**: Latest React framework with App Router
- **TypeScript**: Type-safe development
- **Tailwind CSS**: Beautiful, responsive styling
- **Framer Motion**: Smooth animations and interactions
- **Lucide React**: Beautiful, consistent icons

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/book-360-points-of-light.git
   cd book-360-points-of-light
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000) to see the application.

## 📁 Project Structure

```
book-360-points-of-light/
├── app/                    # Next.js App Router
│   ├── globals.css        # Global styles and Tailwind
│   ├── layout.tsx         # Root layout component
│   └── page.tsx           # Main page component
├── components/            # React components
│   ├── Compass.tsx        # Interactive compass component
│   ├── Header.tsx         # Navigation header
│   ├── Footer.tsx         # Site footer
│   └── LessonCard.tsx     # Lesson modal component
├── data/                  # Data and content
│   └── compassPoints.ts   # 360 spiritual points data
├── public/                # Static assets
└── package.json           # Dependencies and scripts
```

## 🎯 How to Use

1. **Explore the Compass**: Click on any of the 360 points to view its spiritual lesson
2. **Read Lessons**: Each point includes a lesson, scripture reference, and practical application
3. **Navigate Categories**: Use the legend to understand different spiritual categories
4. **Share with Family**: Perfect for family home evening, personal study, or teaching moments

## 🎨 Customization

### Adding New Points
Edit `data/compassPoints.ts` to add or modify spiritual lessons:

```typescript
{
  degree: 361, // New degree
  direction: "N 1° E",
  title: "Your Lesson Title",
  lesson: "Your spiritual lesson content...",
  scripture: "Your scripture reference...",
  application: "Your practical application...",
  category: "faith" // Choose from available categories
}
```

### Styling
- Modify `tailwind.config.js` for custom colors and themes
- Update `app/globals.css` for additional custom styles
- Customize component styles in individual component files

## 📱 Responsive Design

The application is fully responsive and works beautifully on:
- Desktop computers
- Tablets
- Mobile phones
- All modern browsers

## 🛠️ Built With

- **[Next.js](https://nextjs.org/)** - React framework
- **[TypeScript](https://www.typescriptlang.org/)** - Type safety
- **[Tailwind CSS](https://tailwindcss.com/)** - Styling
- **[Framer Motion](https://www.framer.com/motion/)** - Animations
- **[Lucide React](https://lucide.dev/)** - Icons

## 🤝 Contributing

We welcome contributions! Please feel free to:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

### Contribution Guidelines
- Maintain wholesome, Christ-centered content
- Follow existing code style and patterns
- Test your changes thoroughly
- Update documentation as needed

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Inspired by the teachings of Jesus Christ
- Built for families and posterity
- Designed to strengthen faith and spiritual growth

## 📞 Support

If you have questions or need support:
- Open an issue on GitHub
- Contact the development team
- Check the documentation

---

**May this spiritual compass guide you and your family closer to Christ, one degree at a time.** ✨ 