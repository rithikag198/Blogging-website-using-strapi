# Orange Flex Blog

A modern blog platform built with Next.js and Strapi, featuring a vibrant orange gradient design and advanced search functionality.

## 🚀 Features

- **Modern Design**: Orange Flex branding with gradient effects
- **Blog Categories**: Technology, Business, and Sports articles
- **Image Support**: Featured images for all blog posts
- **Search Functionality**: Advanced search with live filtering
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Dark Mode**: Full dark/light theme support
- **Admin Panel**: Content management via Strapi admin

## 🛠️ Tech Stack

### Frontend
- **Next.js 16** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Modern styling framework
- **Lucide React** - Beautiful icons

### Backend
- **Strapi** - Headless CMS
- **SQLite** - Database (development)
- **Node.js** - Runtime environment

## 📁 Project Structure

```
├── frontend/          # Next.js frontend application
│   ├── src/
│   │   ├── app/       # App Router pages
│   │   ├── components/ # React components
│   │   └── lib/       # Utilities and API calls
│   └── public/        # Static assets
├── backend/           # Strapi backend application
│   ├── src/api/       # Content types and API routes
│   ├── config/        # Strapi configuration
│   └── public/        # Static uploads
└── README.md          # This file
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd round-3-project
   ```

2. **Install backend dependencies**
   ```bash
   cd backend
   npm install
   ```

3. **Install frontend dependencies**
   ```bash
   cd ../frontend
   npm install
   ```

### Development

1. **Start the backend server**
   ```bash
   cd backend
   npm run develop
   ```
   The backend will be available at `http://localhost:1337`

2. **Start the frontend server**
   ```bash
   cd frontend
   npm run dev
   ```
   The frontend will be available at `http://localhost:3000`

3. **Access the admin panel**
   Visit `http://localhost:1337/admin` to manage content

## 📝 Content Management

### Adding Blog Posts
1. Access the admin panel at `http://localhost:1337/admin`
2. Navigate to "Content Manager" → "Blog posts"
3. Click "Create new entry"
4. Fill in the details:
   - **Title**: Blog post title
   - **Content**: Rich text content using the block editor
   - **Author**: Author name
   - **Published Date**: Publication date
   - **Featured Image**: Upload an image for the post

### Categories
The blog supports three main categories:
- **Technology**: Latest tech news and insights
- **Business**: Business trends and analysis
- **Sports**: Sports news and commentary

## 🎨 Design System

### Colors
- **Primary**: Orange gradient (#FF6B35 to #F7931E)
- **Dark**: #1a1a1a
- **Light**: #ffffff
- **Gray**: #6b7280

### Typography
- **Headings**: Modern, bold sans-serif
- **Body**: Clean, readable sans-serif
- **Accent**: Orange gradient for highlights

## 🔍 Search Functionality

The search page allows users to:
- Search by title and content
- Real-time filtering
- Clean, responsive results display

## 🌐 Deployment

### Frontend (Vercel)
1. Connect your GitHub repository to Vercel
2. Configure build settings:
   - Build Command: `npm run build`
   - Output Directory: `frontend/.next`
3. Deploy automatically on push

### Backend (Strapi Cloud)
1. Export your Strapi data
2. Deploy to Strapi Cloud
3. Update frontend API URL to production endpoint

## 📄 License

This project is licensed under the MIT License.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📞 Support

For questions or support, please open an issue in the repository.
