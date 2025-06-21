// app/api/chat/route.ts
import { OpenAI } from "openai";
import { NextResponse } from "next/server";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Enhanced manual response system for fallback
function getEnhancedManualResponse(question: string): string {
  const q = question.toLowerCase();
  
  // Language detection
  const isEnglish = /\b(what|how|who|when|where|can|could|would|should|hello|hi|about|service|portfolio|contact)\b/.test(q);
  
  if (isEnglish) {
    // English responses
    if (q.includes('portfolio') || q.includes('project')) {
      return "🎯 **Nawfal's Portfolio** includes diverse web development projects:\n\n• **Modern Web Applications** - Built with React & Next.js\n• **Responsive UI/UX Designs** - Using Figma & modern CSS\n• **E-commerce Solutions** - With payment integration\n• **Photography Portfolio** - Street, landscape & portrait\n\nVisit https://nawfal.vercel.app to see the complete portfolio! 🚀";
    }
    
    if (q.includes('skill') || q.includes('technology') || q.includes('tech')) {
      return "💻 **Nawfal's Technical Skills:**\n\n**Frontend:** React, Next.js, JavaScript, TypeScript, Tailwind CSS, Bootstrap\n**Backend:** PHP, Laravel, Node.js\n**Database:** Supabase, Firebase\n**Design:** Figma (UI/UX), Photoshop\n**Photography:** Street, Portrait, Landscape\n\nReady to bring your digital ideas to life! ✨";
    }
    
    if (q.includes('contact') || q.includes('reach')) {
      return "📞 **Contact Nawfal:**\n\n🌐 Portfolio: https://nawfal.vercel.app\n💼 LinkedIn: nawfal-irfan\n📱 Instagram: @nawfaljr__\n📧 Email: Available on website\n\nLet's discuss your next project! 🚀";
    }
    
    if (q.includes('hello') || q.includes('hi') || q.includes('about')) {
      return "👋 Hello! I'm Nawfal AI, virtual assistant for Nawfal Irfan - a Frontend Web Developer from Indonesia.\n\nI can help you with:\n• Portfolio & Projects info\n• Technical skills & services\n• Photography work\n• Contact information\n\nWhat would you like to know? 😊";
    }

    if (q.includes('service') || q.includes('work') || q.includes('hire')) {
      return "🔥 **Nawfal's Services:**\n\n• **Web Development** - Custom & responsive websites\n• **UI/UX Design** - User-friendly interfaces\n• **E-commerce** - Online stores with full features\n• **Landing Pages** - Conversion-focused design\n• **Website Maintenance** - Ongoing support\n• **Photography Services** - Event, portrait, product\n\nContact for free consultation! 📞";
    }
  } else {
    // Indonesian responses
    if (q.includes('portfolio') || q.includes('portofolio') || q.includes('proyek') || q.includes('project')) {
      return "🎯 **Portfolio Nawfal** mencakup berbagai proyek web development:\n\n• **Aplikasi Web Modern** - Dibangun dengan React & Next.js\n• **UI/UX Design Responsif** - Menggunakan Figma & CSS modern\n• **Solusi E-commerce** - Dengan integrasi pembayaran\n• **Portfolio Fotografi** - Street, landscape & portrait photography\n\nKunjungi https://nawfal.vercel.app untuk portfolio lengkap! 🚀";
    }
    
    if (q.includes('keahlian') || q.includes('skill') || q.includes('teknologi') || q.includes('tech')) {
      return "💻 **Keahlian Teknis Nawfal:**\n\n**Frontend:** React, Next.js, JavaScript, TypeScript, Tailwind CSS, Bootstrap\n**Backend:** PHP, Laravel, Node.js\n**Database:** Supabase, Firebase\n**Design:** Figma (UI/UX), Photoshop\n**Fotografi:** Street, Portrait, Landscape\n\nSiap mewujudkan ide digital Anda! ✨";
    }
    
    if (q.includes('kontak') || q.includes('contact') || q.includes('hubungi')) {
      return "📞 **Kontak Nawfal:**\n\n🌐 Portfolio: https://nawfal.vercel.app\n💼 LinkedIn: nawfal-irfan\n📱 Instagram: @nawfaljr__\n📧 Email: Tersedia di website\n\nAyo diskusikan proyek Anda! 🚀";
    }
    
    if (q.includes('fotografi') || q.includes('photography') || q.includes('foto')) {
      return "📸 **Portfolio Fotografi Nawfal:**\n\n• **Street Photography** - Anak-anak bermain di kampung\n• **Landscape** - Sunset dan pemandangan alam\n• **Architecture** - Foto bangunan dan struktur\n• **Nature** - Tanaman hias dan alam\n• **Maritime** - Perahu layar di pantai\n\nLihat koleksi lengkap di https://nawfal.vercel.app! 📷";
    }
    
    if (q.includes('layanan') || q.includes('service') || q.includes('jasa')) {
      return "🔥 **Layanan Nawfal:**\n\n• **Web Development** - Website custom & responsif\n• **UI/UX Design** - Interface yang user-friendly\n• **E-commerce** - Toko online dengan fitur lengkap\n• **Landing Page** - Design conversion-focused\n• **Website Maintenance** - Support berkelanjutan\n• **Jasa Fotografi** - Event, portrait, product\n\nHubungi untuk konsultasi gratis! 📞";
    }
    
    if (q.includes('halo') || q.includes('hai') || q.includes('hello') || q.includes('tentang')) {
      return "👋 Halo! Saya Nawfal AI, asisten virtual untuk Nawfal Irfan - Frontend Web Developer dari Indonesia.\n\nSaya bisa membantu dengan informasi tentang:\n• Portfolio & proyek-proyek\n• Keahlian teknis & layanan\n• Karya fotografi\n• Informasi kontak\n\nAda yang bisa saya bantu? 😊";
    }
  }
  
  // Check if question is outside scope
  const offTopicKeywords = ['cuaca', 'weather', 'politik', 'politics', 'gosip', 'celebrity', 'olahraga', 'sports', 'masak', 'cooking', 'kesehatan', 'health', 'agama', 'religion'];
  const isOffTopic = offTopicKeywords.some(keyword => q.includes(keyword));
  
  if (isOffTopic) {
    return isEnglish 
      ? "I specialize in helping with questions about web development, technology, business, and photography. Is there something else I can help you with regarding Nawfal's expertise? 🤔"
      : "Maaf, saya khusus membantu dengan pertanyaan seputar web development, teknologi, bisnis, dan fotografi. Apakah ada hal lain yang bisa saya bantu terkait keahlian Nawfal? 🤔";
  }
  
  // Default responses
  const defaultResponses = isEnglish ? [
    "🤔 That's an interesting question! I can help you with information about web development, portfolio, technical skills, or photography. What specifically would you like to know?",
    "💡 I'm here to help! Would you like to know about Nawfal's portfolio, technical expertise, services, or photography work?",
    "🚀 As Nawfal's AI assistant, I can discuss web development, technology, business, and photography topics. What interests you most?",
  ] : [
    "🤔 Pertanyaan yang menarik! Saya bisa membantu dengan informasi tentang web development, portfolio, keahlian teknis, atau fotografi. Apa yang ingin Anda ketahui?",
    "💡 Saya di sini untuk membantu! Apakah Anda ingin tahu tentang portfolio, keahlian teknis, layanan, atau karya fotografi Nawfal?",
    "🚀 Sebagai asisten AI Nawfal, saya bisa membahas topik web development, teknologi, bisnis, dan fotografi. Apa yang paling menarik bagi Anda?",
  ];
  
  return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
}

export async function POST(req: Request) {
  const { messages, context } = await req.json();

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: `Anda adalah Nawfal AI, asisten virtual profesional untuk Nawfal Irfan, seorang Frontend Web Developer berbasis di Indonesia. 

🔍 INFORMASI LENGKAP NAWFAL:
👤 PROFIL:
- Nama: Nawfal Irfan
- Profesi: Frontend Web Developer
- Lokasi: Indonesia
- Tagline: "I create intuitive, visually stunning and highly functional Web"
- Spesialisasi: Web Development yang intuitif, visual stunning, dan highly functional

💻 TEKNOLOGI & KEAHLIAN:
Frontend: React, Next.js, JavaScript, TypeScript, Tailwind CSS, Bootstrap
Backend: PHP, Laravel, Node.js
Database & Services: Supabase, Firebase
Design: Figma (UI/UX), Photoshop (Graphic Design)
Fotografi: Street Photography, Landscape, Portrait, Architecture

📞 KONTAK RESMI:
- Website Portfolio: https://nawfal.vercel.app
- LinkedIn: linkedin.com/in/nawfal-irfan  
- Instagram: @nawfaljr__
- Email: Tersedia di website portfolio

🎯 LAYANAN:
- Custom Web Development
- Responsive UI/UX Design
- E-commerce Solutions
- Landing Page Development
- Website Maintenance & Support
- Photography Services (Event, Portrait, Product)

📸 PORTFOLIO FOTOGRAFI:
- Children playing in village scenes
- Beautiful ornamental plants
- Architectural photography (neighbor's roof)
- Sunset landscapes
- Beach and sailing boat photography
- Street and documentary photography

🌐 BAHASA:
- Deteksi bahasa pengguna otomatis
- Bahasa Indonesia (default untuk user Indonesia)
- English (untuk international users)
- Jawaban profesional, ramah, dan informatif

⚠️ BATASAN KETAT:
Hanya menjawab pertanyaan seputar:
- Web Development & Programming
- UI/UX Design & Technology
- Business & Entrepreneurship
- Photography & Visual Arts
- Portfolio & Projects Nawfal
- Informatika & Tech Industry

Untuk topik di luar area expertise (cuaca, politik, gosip, olahraga, kesehatan, agama, dll), berikan respon: "Maaf, saya khusus membantu dengan pertanyaan seputar teknologi, web development, bisnis, dan fotografi. Apakah ada hal lain yang bisa saya bantu terkait keahlian Nawfal?"

GAYA KOMUNIKASI:
- Profesional namun ramah dan approachable
- Gunakan emoji yang relevan untuk menarik perhatian
- Berikan informasi detail dengan contoh konkret
- Selalu sertakan call-to-action ke website atau kontak
- Adaptif dengan bahasa dan budaya pengguna
- Jawaban terstruktur dan mudah dibaca`
        },
        ...messages
      ],
      temperature: 0.7,
      max_tokens: 600
    });

    return NextResponse.json({ 
      message: response.choices[0]?.message?.content || "Maaf, saya tidak bisa memproses permintaan Anda saat ini. Silakan coba lagi! 😊"
    });
  } catch (error) {
    console.error('OpenAI API Error:', error);
    
    // Enhanced fallback response system
    const lastUserMessage = messages[messages.length - 1]?.content?.toLowerCase() || '';
    
    // Use manual response system for fallback
    const fallbackResponse = getEnhancedManualResponse(lastUserMessage);
    
    return NextResponse.json({ message: fallbackResponse }, { status: 200 });
  }
}