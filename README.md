# Matin Jahi - Portfolio Website

A modern, animated portfolio website built with Nuxt 3, showcasing frontend development expertise with Vue.js, Three.js, and advanced animations.

🌐 **Live Demo**: [https://matinjahi.netlify.app](https://matinjahi.netlify.app)

## ✨ Features

- 🎨 Modern UI with custom animations (GSAP, Three.js)
- 🌓 Dark/Light mode support
- 📧 **Functional contact form with email delivery**
- 🎯 SEO optimized with structured data
- 📱 Fully responsive design
- 🚀 Server-side rendering (SSR)
- ⚡ Optimized performance
- 🔒 Secure form submission with validation

## 🛠️ Tech Stack

### Core
- **Nuxt 3** - Vue.js meta-framework
- **Vue 3** - Progressive JavaScript framework
- **TypeScript** - Type-safe development

### Styling & Animations
- **Tailwind CSS** - Utility-first CSS framework
- **GSAP** - Professional animations
- **Three.js** - 3D graphics and effects
- **Lenis** - Smooth scroll

### Features
- **Nuxt Content** - File-based CMS
- **Nuxt SEO** - SEO optimization
- **Resend** - Email delivery service
- **VueUse** - Vue composition utilities

## 📧 Contact Form Setup

The contact form is fully functional and sends emails to `matinjahi@gmail.com`. To set it up:

1. **Get a Resend API Key**
   - Sign up at [resend.com](https://resend.com)
   - Create an API key from the dashboard

2. **Configure Environment Variables**
   ```bash
   # Copy the example env file
   cp .env.example .env
   
   # Edit .env and add your Resend API key
   NUXT_RESEND_API_KEY=re_your_api_key_here
   ```

3. **Test the Form**
   ```bash
   npm run dev
   # Visit http://localhost:3000/contact
   ```

For detailed setup instructions, see [CONTACT_SETUP.md](./CONTACT_SETUP.md)

## 🚀 Setup

Make sure to install dependencies:

```bash
npm install
```

**Important**: After installation, configure your `.env` file with the Resend API key (see Contact Form Setup above).

## Development Server

Start the development server on `http://localhost:3000`:

```bash
npm run dev
```

## 📁 Project Structure

```
portfolio/
├── .env                          # Environment variables (not in git)
├── .env.example                  # Environment variables template
├── pages/
│   ├── index.vue                # Home page
│   ├── contact.vue              # Contact page with form
│   └── projects.vue             # Projects showcase
├── components/                   # Vue components
│   ├── ContactSection.vue       # Contact section component
│   ├── HeroSection.vue          # Hero section
│   └── ...
├── server/
│   ├── api/
│   │   └── contact.post.ts      # Contact form API endpoint
│   └── utils/
│       └── rateLimit.ts         # Rate limiting utility
├── composables/                  # Vue composables
├── assets/                       # Static assets
└── public/                       # Public files
```

## 🔐 Security Features

- ✅ Server-side form validation
- ✅ Client-side form validation
- ✅ Rate limiting (5 requests/hour per IP)
- ✅ Input sanitization
- ✅ XSS protection
- ✅ CSRF protection
- ✅ Environment variables for secrets

## 📧 Contact Form Features

- **Validation**: Real-time client & server validation
- **Rate Limiting**: Prevents spam (5 emails/hour per IP)
- **Error Handling**: User-friendly error messages
- **Loading States**: Visual feedback during submission
- **Success/Error Notifications**: Clear feedback to users
- **Professional Email Template**: HTML email with styling
- **Reply-To Support**: Direct replies to sender's email

## 🌍 Deployment

### Netlify (Recommended)

1. Connect your repository to Netlify
2. Add environment variable:
   - `NUXT_RESEND_API_KEY`: Your Resend API key
3. Deploy!

### Vercel

1. Connect your repository to Vercel
2. Add environment variable:
   - `NUXT_RESEND_API_KEY`: Your Resend API key
3. Deploy!

## Production

Build the application for production:

```bash
npm run build
```

Locally preview production build:

```bash
npm run preview
```

## 📝 Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `NUXT_RESEND_API_KEY` | Resend API key for email delivery | Yes |

## 🤝 Contributing

This is a personal portfolio project. If you find any issues or have suggestions, feel free to open an issue!

## 📄 License

© 2024 Matin Jahi. All rights reserved.

## 📬 Contact

- **Email**: matinjahi@gmail.com
- **Telegram**: [@Ritalleral](https://t.me/Ritalleral)
- **GitHub**: [@Matinj031](https://github.com/Matinj031)
- **LinkedIn**: [Matin Jahi](https://linkedin.com/in/matin-jahi)

---

Check out the [Nuxt documentation](https://nuxt.com/docs) and [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.
