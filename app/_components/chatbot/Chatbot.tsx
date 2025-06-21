"use client";
import { useState, useRef, useEffect } from "react";
import { MessageSquare, X, Send, Trash2, Sun, Moon, User, Bot } from "lucide-react";
import { AnimatePresence } from "framer-motion";
import { motion } from "framer-motion";

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [messages, setMessages] = useState<{ role: string; content: string }[]>([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Enhanced manual response system with bilingual support
  const getEnhancedManualResponse = (question: string): string => {
    const q = question.toLowerCase();
    
    // Language detection
    const isEnglish = /\b(what|how|who|when|where|can|could|would|should|hello|hi|about|service|portfolio|contact|work|hire|technology|skill)\b/.test(q);
    
    if (isEnglish) {
      // English responses
      if (q.includes('portfolio') || q.includes('project') || q.includes('work')) {
        return "🎯 **Nawfal's Portfolio** showcases diverse web development projects:\n\n• **Modern Web Applications** - Built with React, Next.js & TypeScript\n• **E-commerce Solutions** - Full-featured online stores with payment integration\n• **Dashboard Analytics** - Interactive data visualization interfaces\n• **Landing Pages** - Conversion-focused responsive designs\n• **API Integration** - Seamless third-party service connections\n• **Photography Portfolio** - Street, landscape & portrait photography\n\nVisit https://nawfal.vercel.app to explore the complete portfolio! 🚀";
      }
      
      if (q.includes('skill') || q.includes('technology') || q.includes('tech') || q.includes('framework')) {
        return "💻 **Nawfal's Technical Expertise:**\n\n**Frontend Technologies:**\n• React.js & Next.js (Advanced)\n• JavaScript & TypeScript\n• Tailwind CSS & SCSS\n• Vue.js & Angular\n\n**Backend Development:**\n• Node.js & Express.js\n• Python & Django\n• PHP & Laravel\n• REST API & GraphQL\n\n**Database Systems:**\n• MongoDB & PostgreSQL\n• MySQL & Firebase\n• Supabase & Redis\n\n**DevOps & Tools:**\n• Git & Docker\n• AWS & Vercel\n• CI/CD Pipelines\n\n**Design Tools:**\n• Figma & Adobe XD\n• Photoshop & UI/UX Design\n\nReady to bring your digital vision to life! ✨";
      }
      
      if (q.includes('contact') || q.includes('reach') || q.includes('hire')) {
        return "📞 **Contact Nawfal:**\n\n🌐 **Portfolio:** https://nawfal.vercel.app\n💼 **LinkedIn:** nawfal-irfan\n📱 **Instagram:** @nawfaljr__\n📧 **Email:** Available on website\n🐙 **GitHub:** Check portfolio for latest projects\n\n**Available for:**\n• Full-stack Web Development\n• UI/UX Design Projects\n• Photography Services\n• Technical Consulting\n\nLet's discuss your next project! 🚀";
      }
      
      if (q.includes('service') || q.includes('offer') || q.includes('price')) {
        return "🔥 **Professional Services:**\n\n**Web Development:**\n• Custom Website Development\n• E-commerce Solutions\n• Progressive Web Apps (PWA)\n• API Development & Integration\n\n**Design Services:**\n• UI/UX Design\n• Responsive Web Design\n• Brand Identity Design\n• Figma Prototyping\n\n**Photography:**\n• Event Photography\n• Portrait Sessions\n• Product Photography\n• Architectural Photography\n\n**Additional Services:**\n• Website Maintenance\n• Performance Optimization\n• SEO Implementation\n• Technical Consulting\n\nContact for free consultation and custom quotes! 📞";
      }
      
      if (q.includes('hello') || q.includes('hi') || q.includes('about') || q.includes('who')) {
        return "👋 **Hello! I'm Nawfal Ai**\n\nYour intelligent virtual assistant for Nawfal Irfan - a passionate Full-stack Developer and Photographer from Indonesia.\n\n**I can help you with:**\n• Portfolio & project information\n• Technical skills & expertise\n• Available services & pricing\n• Photography showcase\n• Contact information\n• General inquiries\n\n**About Nawfal:**\nWith 3+ years of experience in modern web development, Nawfal specializes in creating innovative, user-friendly digital solutions using cutting-edge technologies.\n\nWhat would you like to know? 😊";
      }
    } else {
      // Indonesian responses
      if (q.includes('portfolio') || q.includes('portofolio') || q.includes('proyek') || q.includes('project')) {
        return "🎯 **Portfolio Nawfal** menampilkan berbagai proyek web development:\n\n• **Aplikasi Web Modern** - Dibangun dengan React, Next.js & TypeScript\n• **Platform E-commerce** - Toko online dengan sistem pembayaran lengkap\n• **Dashboard Analytics** - Interface visualisasi data yang interaktif\n• **Landing Pages** - Design responsif yang conversion-focused\n• **Integrasi API** - Koneksi seamless dengan layanan third-party\n• **Portfolio Fotografi** - Street, landscape & portrait photography\n\nKunjungi https://nawfal.vercel.app untuk melihat portfolio lengkap! 🚀";
      }
      
      if (q.includes('keahlian') || q.includes('skill') || q.includes('teknologi') || q.includes('tech') || q.includes('framework')) {
        return "💻 **Keahlian Teknis Nawfal:**\n\n**Frontend Technologies:**\n• React.js & Next.js (Advanced)\n• JavaScript & TypeScript\n• Tailwind CSS & SCSS\n• Vue.js & Angular\n\n**Backend Development:**\n• Node.js & Express.js\n• Python & Django\n• PHP & Laravel\n• REST API & GraphQL\n\n**Database Systems:**\n• MongoDB & PostgreSQL\n• MySQL & Firebase\n• Supabase & Redis\n\n**DevOps & Tools:**\n• Git & Docker\n• AWS & Vercel\n• CI/CD Pipelines\n\n**Design Tools:**\n• Figma & Adobe XD\n• Photoshop & UI/UX Design\n\nSiap mewujudkan visi digital Anda! ✨";
      }
      
      if (q.includes('kontak') || q.includes('contact') || q.includes('hubungi') || q.includes('hire')) {
        return "📞 **Kontak Nawfal:**\n\n🌐 **Portfolio:** https://nawfal.vercel.app\n💼 **LinkedIn:** nawfal-irfan\n📱 **Instagram:** @nawfaljr__\n📧 **Email:** Tersedia di website\n🐙 **GitHub:** Lihat portfolio untuk proyek terbaru\n\n**Tersedia untuk:**\n• Full-stack Web Development\n• Proyek UI/UX Design\n• Jasa Fotografi\n• Konsultasi Teknis\n\nAyo diskusikan proyek Anda selanjutnya! 🚀";
      }
      
      if (q.includes('layanan') || q.includes('service') || q.includes('jasa') || q.includes('harga')) {
        return "🔥 **Layanan Profesional:**\n\n**Web Development:**\n• Pengembangan Website Custom\n• Solusi E-commerce\n• Progressive Web Apps (PWA)\n• Pengembangan & Integrasi API\n\n**Layanan Design:**\n• UI/UX Design\n• Responsive Web Design\n• Brand Identity Design\n• Prototyping Figma\n\n**Fotografi:**\n• Fotografi Event\n• Sesi Portrait\n• Fotografi Produk\n• Fotografi Arsitektur\n\n**Layanan Tambahan:**\n• Maintenance Website\n• Optimasi Performance\n• Implementasi SEO\n• Konsultasi Teknis\n\nHubungi untuk konsultasi gratis dan penawaran khusus! 📞";
      }
      
      if (q.includes('fotografi') || q.includes('photography') || q.includes('foto')) {
        return "📸 **Portfolio Fotografi Nawfal:**\n\n**Spesialisasi:**\n• **Street Photography** - Kehidupan sehari-hari dan kultur lokal\n• **Landscape Photography** - Sunset, sunrise, dan pemandangan alam\n• **Portrait Photography** - Professional headshots dan personal branding\n• **Architecture Photography** - Gedung, struktur, dan desain urban\n• **Nature Photography** - Flora, fauna, dan keindahan alam\n• **Maritime Photography** - Pantai, perahu, dan kehidupan bahari\n\n**Peralatan:**\n• Kamera DSLR Professional\n• Berbagai lensa untuk berbagai kebutuhan\n• Editing dengan Adobe Lightroom & Photoshop\n\nLihat koleksi lengkap di https://nawfal.vercel.app! 📷";
      }
      
      if (q.includes('halo') || q.includes('hai') || q.includes('hello') || q.includes('tentang') || q.includes('siapa')) {
        return "👋 **Halo! Saya Nawfal Ai**\n\nAsisten virtual cerdas untuk Nawfal Irfan - seorang Full-stack Developer dan Fotografer yang passionate dari Indonesia.\n\n**Saya bisa membantu dengan:**\n• Informasi portfolio & proyek\n• Keahlian teknis & expertise\n• Layanan yang tersedia & harga\n• Showcase fotografi\n• Informasi kontak\n• Pertanyaan umum\n\n**Tentang Nawfal:**\nDengan pengalaman 3+ tahun dalam web development modern, Nawfal mengkhususkan diri dalam menciptakan solusi digital yang inovatif dan user-friendly menggunakan teknologi terdepan.\n\nAda yang bisa saya bantu? 😊";
      }
    }
    
    // Check for off-topic questions
    const offTopicKeywords = ['cuaca', 'weather', 'politik', 'politics', 'gosip', 'celebrity', 'olahraga', 'sports', 'masak', 'cooking', 'kesehatan', 'health', 'agama', 'religion', 'berita', 'news'];
    const isOffTopic = offTopicKeywords.some(keyword => q.includes(keyword));
    
    if (isOffTopic) {
      return isEnglish 
        ? "🤔 I specialize in helping with questions about web development, technology, business, and photography. Is there something specific about Nawfal's expertise you'd like to know? Feel free to ask about his portfolio, skills, or services!"
        : "🤔 Maaf, saya khusus membantu dengan pertanyaan seputar web development, teknologi, bisnis, dan fotografi. Apakah ada hal spesifik tentang keahlian Nawfal yang ingin Anda ketahui? Silakan tanyakan tentang portfolio, skills, atau layanannya!";
    }
    
    // Default responses with more variety
    const defaultResponses = isEnglish ? [
      "🤔 That's an interesting question! I'm here to help with information about Nawfal's web development expertise, portfolio, photography work, or professional services. What specifically would you like to know?",
      "💡 I'd be happy to help! You can ask me about Nawfal's technical skills, past projects, available services, or photography portfolio. What interests you most?",
      "🚀 As Nawfal's AI assistant, I can discuss web development, technology trends, business solutions, and creative photography. What topic would you like to explore?",
      "✨ Great question! I'm designed to help with inquiries about modern web development, digital solutions, and creative services. How can I assist you today?",
    ] : [
      "🤔 Pertanyaan yang menarik! Saya di sini untuk membantu dengan informasi tentang keahlian web development Nawfal, portfolio, karya fotografi, atau layanan profesional. Apa yang spesifik ingin Anda ketahui?",
      "💡 Dengan senang hati saya membantu! Anda bisa bertanya tentang keahlian teknis Nawfal, proyek-proyek sebelumnya, layanan yang tersedia, atau portfolio fotografi. Apa yang paling menarik bagi Anda?",
      "🚀 Sebagai asisten AI Nawfal, saya bisa membahas web development, tren teknologi, solusi bisnis, dan fotografi kreatif. Topik apa yang ingin Anda jelajahi?",
      "✨ Pertanyaan bagus! Saya dirancang untuk membantu dengan pertanyaan tentang web development modern, solusi digital, dan layanan kreatif. Bagaimana saya bisa membantu Anda hari ini?",
    ];
    
    return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
  };

  const handleSend = async () => {
    if (!input.trim()) return;
    
    const userMessage = { role: "user", content: input };
    setMessages(prev => [...prev, userMessage]);
    const currentInput = input;
    setInput("");
    setIsTyping(true);

    // Simulate typing delay and use manual response
    setTimeout(() => {
      setMessages(prev => [...prev, { 
        role: "assistant", 
        content: getEnhancedManualResponse(currentInput) 
      }]);
      setIsTyping(false);
    }, 1000 + Math.random() * 1000); // Random delay between 1-2 seconds
  };

  const clearChat = () => setMessages([]);
  const closeChat = () => setIsOpen(false);
  const toggleTheme = () => setIsDarkMode(!isDarkMode);

  // Handle Enter key press
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  // Enhanced theme configuration
  const themeClasses = {
    chatWindow: isDarkMode 
      ? "bg-gray-900 border-gray-700 shadow-2xl" 
      : "bg-white border-gray-200 shadow-2xl",
    header: isDarkMode 
      ? "bg-gray-800 border-gray-700" 
      : "bg-gray-50 border-gray-200",
    chatBody: isDarkMode 
      ? "bg-gray-800" 
      : "bg-gray-50",
    emptyState: isDarkMode 
      ? "bg-gray-700 border-gray-600" 
      : "bg-gray-100 border-gray-200",
    userMessage: "bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-md",
    assistantMessage: isDarkMode 
      ? "bg-gray-700 text-gray-100 border-gray-600 shadow-sm" 
      : "bg-white text-gray-800 border-gray-200 shadow-sm",
    inputArea: isDarkMode 
      ? "border-gray-700 bg-gray-800" 
      : "border-gray-200 bg-white",
    inputField: isDarkMode 
      ? "border-gray-600 bg-gray-700 text-white placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500" 
      : "border-gray-300 bg-white text-gray-900 placeholder-gray-500 focus:ring-blue-300 focus:border-blue-300",
    primaryText: isDarkMode ? "text-gray-100" : "text-gray-800",
    secondaryText: isDarkMode ? "text-gray-400" : "text-gray-500",
    iconButton: isDarkMode 
      ? "text-gray-400 hover:text-blue-400 hover:bg-gray-700 rounded-lg p-2 transition-all duration-200" 
      : "text-gray-500 hover:text-blue-600 hover:bg-gray-100 rounded-lg p-2 transition-all duration-200",
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Enhanced Floating Chat Button */}
{!isOpen && (
  <motion.button
    onClick={() => setIsOpen(true)}
    onMouseEnter={() => setIsHovered(true)}
    onMouseLeave={() => setIsHovered(false)}
    whileTap={{ scale: 0.92, rotate: -5 }}
    whileHover={{ scale: 1.05 }}
    className={`bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 h-14 rounded-full shadow-lg flex items-center justify-center overflow-hidden transition-all duration-300 transform ${
      isHovered ? 'w-48' : 'w-14'
    }`}
  >
    <div className="flex items-center gap-2 px-4 whitespace-nowrap">
      <MessageSquare size={20} className="text-white" />
      {isHovered && (
        <span className="text-white text-sm font-medium">
          Nawfal Ai
        </span>
      )}
    </div>
  </motion.button>
)}

      {/* Enhanced Chat Window */}
      {isOpen && (
        <div className={`absolute bottom-0 right-0 w-96 h-[500px] rounded-2xl overflow-hidden border flex flex-col ${themeClasses.chatWindow}`}>
          {/* Header with improved design */}
          <div className={`p-4 border-b flex justify-between items-center ${themeClasses.header}`}>
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${isDarkMode ? 'bg-gradient-to-r from-blue-600 to-blue-700' : 'bg-gradient-to-r from-blue-100 to-blue-200'}`}>
                  <Bot className={isDarkMode ? 'text-white' : 'text-blue-600'} size={18} />
                </div>
                <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 rounded-full border-2 border-white animate-pulse"></div>
              </div>
              <div>
                <h2 className={`font-semibold ${themeClasses.primaryText}`}>Nawfal Ai</h2>
                <p className={`text-xs ${themeClasses.secondaryText}`}>Always ready to help • Online</p>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <button
                onClick={toggleTheme}
                className={themeClasses.iconButton}
                title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
              >
                {isDarkMode ? <Sun size={16} /> : <Moon size={16} />}
              </button>
              {messages.length > 0 && (
                <button
                  onClick={clearChat}
                  className={themeClasses.iconButton}
                  title="Clear Chat History"
                >
                  <Trash2 size={16} />
                </button>
              )}
              <button
                onClick={closeChat}
                className={themeClasses.iconButton}
                title="Close Chat"
              >
                <X size={18} />
              </button>
            </div>
          </div>

          {/* Chat Body */}
          <div className={`flex-1 overflow-y-auto ${themeClasses.chatBody}`}>
            {messages.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center p-6 text-center">
                <div className={`w-16 h-16 rounded-full border-2 flex items-center justify-center mb-4 ${themeClasses.emptyState}`}>
                  <Bot className="text-blue-500" size={24} />
                </div>
                <h3 className={`text-lg font-semibold mb-2 ${themeClasses.primaryText}`}>
                  Hi! I'm Nawfal Ai 👋
                </h3>
                <p className={`text-sm ${themeClasses.secondaryText} leading-relaxed mb-3`}>
                  Your intelligent assistant for all things about Nawfal's expertise in web development and photography.
                </p>
                <div className={`text-xs ${themeClasses.secondaryText} space-y-1`}>
                  <p>Ask me about:</p>
                  <p>• Portfolio & Projects • Technical Skills</p>
                  <p>• Services & Pricing • Photography</p>
                </div>
              </div>
            ) : (
              <div className="p-4 space-y-4">
                {messages.map((msg, idx) => (
                  <div
                    key={idx}
                    className={`flex gap-3 ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                  >
                    {msg.role === "assistant" && (
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${isDarkMode ? 'bg-gradient-to-r from-blue-600 to-blue-700' : 'bg-gradient-to-r from-blue-100 to-blue-200'}`}>
                        <Bot className={isDarkMode ? 'text-white' : 'text-blue-600'} size={14} />
                      </div>
                    )}
                    <div
                      className={`max-w-[75%] rounded-2xl px-4 py-3 ${
                        msg.role === "user"
                          ? themeClasses.userMessage
                          : `${themeClasses.assistantMessage} border`
                      }`}
                    >
                      <div className="text-sm whitespace-pre-wrap leading-relaxed">
                        {msg.content}
                      </div>
                    </div>
                    {msg.role === "user" && (
                      <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-600 to-blue-700 flex items-center justify-center flex-shrink-0">
                        <User className="text-white" size={14} />
                      </div>
                    )}
                  </div>
                ))}
                
                {isTyping && (
                  <div className="flex gap-3 justify-start">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${isDarkMode ? 'bg-gradient-to-r from-blue-600 to-blue-700' : 'bg-gradient-to-r from-blue-100 to-blue-200'}`}>
                      <Bot className={isDarkMode ? 'text-white' : 'text-blue-600'} size={14} />
                    </div>
                    <div className={`border rounded-2xl px-4 py-3 ${themeClasses.assistantMessage}`}>
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
            )}
          </div>

          {/* Enhanced Input Area */}
          <div className={`p-4 border-t ${themeClasses.inputArea}`}>
            <div className="flex gap-2 items-end">
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message here..."
                className={`flex-1 px-4 py-3 rounded-xl border transition-all duration-200 focus:outline-none focus:ring-2 resize-none min-h-[48px] max-h-[120px] ${themeClasses.inputField}`}
                disabled={isTyping}
                rows={1}
                style={{ height: 'auto' }}
                onInput={(e) => {
                  const target = e.target as HTMLTextAreaElement;
                  target.style.height = 'auto';
                  target.style.height = `${Math.min(target.scrollHeight, 120)}px`;
                }}
              />
              <button
                onClick={handleSend}
                disabled={!input.trim() || isTyping}
                className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 disabled:from-gray-400 disabled:to-gray-500 text-white p-3 rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-300 disabled:cursor-not-allowed transform hover:scale-105 disabled:hover:scale-100"
              >
                <Send size={18} />
              </button>
            </div>
            <p className={`text-xs mt-2 text-center ${themeClasses.secondaryText}`}>
              Press Enter to send • Shift+Enter for new line
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
