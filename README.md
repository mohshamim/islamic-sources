# Islamic Sources - Knowledge Platform

A comprehensive Next.js web application for managing and displaying authentic Islamic knowledge, guided by the methodology of the Salaf (righteous predecessors).

## 📚 Documentation

- **[PROJECT-DOCUMENTATION.md](./PROJECT-DOCUMENTATION.md)** - Complete project documentation with current status and next steps
- **[CURSOR-CONTEXT.md](./CURSOR-CONTEXT.md)** - Quick context for Cursor AI and new developers

## 🚀 Current Status

✅ **Public Website**: 100% complete with mock data  
🔄 **Next Phase**: Admin dashboard and backend integration  
📊 **Progress**: Ready for backend development

## ✨ Features

### 🎯 Core Functionality
- **Articles Management**: In-depth Islamic articles with categories and tags
- **Posts System**: Daily Islamic guidance and wisdom posts
- **Q&A Platform**: Questions answered by qualified scholars
- **Media Library**: Audio, video, and PDF resources
- **Dashboard**: Admin interface for content management

### 🎨 Design & UX
- **Modern UI**: Beautiful, responsive design with Tailwind CSS
- **Dark Mode**: Toggle between light and dark themes
- **Mobile First**: Optimized for all device sizes
- **Smooth Animations**: Engaging user interactions and transitions
- **Islamic Theme**: Culturally appropriate design elements

### 🔧 Technical Features
- **Next.js 15**: Latest React framework with App Router
- **TypeScript**: Type-safe development
- **MongoDB**: Scalable database with Mongoose ODM
- **RESTful APIs**: Clean, organized API endpoints
- **Authentication**: Secure user management system
- **SEO Optimized**: Search engine friendly

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn
- MongoDB database

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/islamic-sources.git
   cd islamic-sources
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   Create a `.env.local` file in the root directory:
   ```env
   MONGODB_URI=your_mongodb_connection_string
   NEXTAUTH_SECRET=your_nextauth_secret
   NEXTAUTH_URL=http://localhost:3000
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🏗️ Project Structure

```
islamic-sources/
├── app/                    # Next.js App Router
│   ├── api/               # API endpoints
│   ├── dashboard/         # Admin dashboard
│   ├── articles/          # Articles pages
│   ├── posts/            # Posts pages
│   ├── questions/        # Q&A pages
│   └── media/            # Media pages
├── components/            # Reusable UI components
│   ├── ui/               # Base UI components
│   ├── cards/            # Content cards
│   └── layout/           # Layout components
├── models/                # MongoDB schemas
├── lib/                   # Utility functions
└── public/                # Static assets
```

## 🚀 Deployment to Vercel

### Automatic Deployment

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Ready for deployment"
   git push origin main
   ```

2. **Connect to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Vercel will automatically detect Next.js and configure the build

3. **Environment Variables**
   Add your environment variables in Vercel dashboard:
   - `MONGODB_URI`
   - `NEXTAUTH_SECRET`
   - `NEXTAUTH_URL` (your production URL)

### Manual Deployment

1. **Build the project**
   ```bash
   npm run build
   ```

2. **Deploy to Vercel**
   ```bash
   npm install -g vercel
   vercel --prod
   ```

### Vercel Configuration

The project includes a `vercel.json` file with:
- Build and development commands
- API function timeouts
- Security headers
- Redirects and rewrites
- Performance optimizations

## 📱 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## 🎨 Customization

### Colors & Theme
The application uses CSS custom properties for easy theming:
- Primary colors in `app/globals.css`
- Islamic theme colors (gold, green, blue)
- Dark mode support

### Components
- All UI components are in `components/ui/`
- Custom components in `components/`
- Responsive design utilities

## 🔒 Security Features

- XSS Protection
- Content Security Policy
- Secure headers
- Input validation
- MongoDB injection protection

## 📊 Performance

- Image optimization
- Code splitting
- Lazy loading
- CDN ready
- SEO optimized

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built with Next.js and Tailwind CSS
- Islamic knowledge from qualified scholars
- Community contributions and feedback

## 📞 Support

For support and questions:
- Create an issue on GitHub
- Contact the development team
- Check the documentation

---

**Made with ❤️ for the Ummah**

*"Seek knowledge from the cradle to the grave" - Prophet Muhammad (ﷺ)* 
