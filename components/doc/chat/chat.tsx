"use client";

import React, { useState, useRef, useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { db, auth, googleProvider, githubProvider } from "@/lib/firebase";
import {
  collection,
  query,
  orderBy,
  limit,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";
import { useCollection } from "react-firebase-hooks/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { signInWithPopup, signInWithRedirect, signOut } from "firebase/auth";
import { Send, Sparkles, Reply, X, CheckCircle2, LogOut, Github, AlertCircle, Bot, User, MessageSquare, ChevronDown } from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getAiResponseAction } from "@/app/actions/ai";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const OWNER_EMAILS = ["nawfalirfan005@gmail.com", "nawfalirfan052@gmail.com"];

interface ReplyTo {
  id: string;
  text: string;
  displayName: string;
}

interface Message {
  id: string;
  text: string;
  uid: string;
  displayName: string;
  photoURL: string;
  email?: string;
  createdAt: any;
  replyTo?: ReplyTo;
}

interface AIMessage {
  role: "user" | "model";
  text: string;
  timestamp: Date;
}

const TaggedText = ({ text }: { text: string }) => {
  const parts = text.split(/(@\w+)/g);
  return (
    <>
      {parts.map((part, i) => {
        if (part && part.startsWith("@")) {
          return (
            <span key={i} className="font-bold text-sky-400 dark:text-sky-300 pointer-events-none">
              {part}
            </span>
          );
        }
        return part;
      })}
    </>
  );
};

const Bubble = ({ 
  children, 
  isSender, 
  isOwner,
  replyTo 
}: { 
  children: React.ReactNode; 
  isSender: boolean; 
  isOwner?: boolean;
  replyTo?: ReplyTo 
}) => {
  const onRight = isSender || isOwner;
  return (
    <div className={`flex flex-col gap-y-1 w-fit max-w-full ${onRight ? "items-end" : "items-start"}`}>
      {replyTo && (
        <div className={`text-[10px] px-2 py-1 rounded-t-lg bg-black/10 dark:bg-white/5 border-l-2 border-primary/40 truncate max-w-[200px] mb-[-4px] opacity-80`}>
          <span className="font-bold">Replying to {replyTo.displayName}: </span>
          <span className="italic">{replyTo.text}</span>
        </div>
      )}
      <div
        className={`rounded-2xl px-4 py-1.5 sm:py-2 text-sm shadow-sm leading-snug break-words w-fit transition-all duration-200 ${
          isSender
            ? "bg-primary text-primary-foreground rounded-tr-none hover:shadow-md"
            : isOwner
              ? "bg-sky-500/10 dark:bg-sky-500/5 text-foreground border border-sky-500/20 rounded-tr-none hover:bg-sky-500/20"
              : "bg-muted text-foreground rounded-tl-none border border-border/50 hover:bg-muted/80"
        }`}
      >
        {children}
      </div>
    </div>
  );
};

const ChatMessage = ({ 
  message, 
  isSender, 
  userLoggedIn,
  onReply,
  onTag
}: { 
  message: Message; 
  isSender: boolean; 
  userLoggedIn: boolean;
  onReply: (msg: Message) => void;
  onTag: (name: string) => void;
}) => {
  const time = message.createdAt?.toDate?.()
    ? message.createdAt.toDate().toLocaleString([], { 
        day: '2-digit', 
        month: 'short', 
        year: 'numeric',
        hour: '2-digit', 
        minute: '2-digit' 
      })
    : "...";

  const isOwner = !!(message.email && OWNER_EMAILS.includes(message.email));
  const isOnRight = isSender || isOwner;

  return (
    <div className={`flex w-full gap-x-3 mb-4 ${isOnRight ? "flex-row-reverse" : "flex-row"}`}>
      <Avatar className="h-9 w-9 border border-border/50 shrink-0 mt-1 shadow-sm">
        <AvatarImage 
          src={message.photoURL} 
          alt={message.displayName} 
          referrerPolicy="no-referrer"
        />
        <AvatarFallback className="bg-primary/10 text-primary uppercase font-bold text-xs">{message.displayName?.[0] || "?"}</AvatarFallback>
      </Avatar>
      
      <div className={`flex flex-col gap-y-1 ${isOnRight ? "items-end" : "items-start"} max-w-[85%]`}>
        <div className="flex items-center gap-x-2">
          {!isOnRight && (
            <button onClick={() => onTag(message.displayName)} className="flex items-center gap-x-1 hover:opacity-70 transition-opacity">
              <span className="text-xs font-semibold text-foreground/90">{message.displayName}</span>
            </button>
          )}
          <span className="text-[10px] text-muted-foreground font-medium opacity-60 tabular-nums">{time}</span>
          {isOnRight && (
            <div className="flex items-center gap-x-1">
              {isOwner && <CheckCircle2 className="h-3 w-3 text-sky-500 fill-sky-500/10" />}
              <span className={`text-xs font-semibold ${isSender ? "text-primary" : "text-foreground/90"}`}>{message.displayName}</span>
            </div>
          )}
          {!isOnRight && isOwner && (
             <CheckCircle2 className="h-3 w-3 text-sky-500 fill-sky-500/10" />
          )}
        </div>
        
        <div className={`flex items-center gap-x-2 group ${isOnRight ? "flex-row-reverse" : "flex-row"}`}>
          <Bubble isSender={isSender} isOwner={isOwner} replyTo={message.replyTo}>
            <TaggedText text={message.text} />
          </Bubble>
          {userLoggedIn && (
            <button 
              onClick={() => onReply(message)}
              className="p-1.5 rounded-full hover:bg-muted opacity-0 group-hover:opacity-100 transition-all shrink-0"
              title="Reply"
            >
              <Reply className="h-3.5 w-3.5 text-muted-foreground" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

const Chat = () => {
  const [user, userLoading] = useAuthState(auth);
  const [activeTab, setActiveTab] = useState<"public" | "ai">("public");
  const [showAiOnDesktop, setShowAiOnDesktop] = useState(true);
  
  // Public Chat States
  const [input, setInput] = useState("");
  const [replyTo, setReplyTo] = useState<ReplyTo | null>(null);
  const [error, setError] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  // AI Chat States
  const [aiInput, setAiInput] = useState("");
  const [aiMessages, setAiMessages] = useState<AIMessage[]>([]);
  const [aiLoading, setAiLoading] = useState(false);
  const [aiError, setAiError] = useState<string | null>(null);
  const aiScrollRef = useRef<HTMLDivElement>(null);

  const messagesRef = collection(db, "messages");
  const q = query(messagesRef, orderBy("createdAt", "asc"), limit(50));
  const [snapshot, loading] = useCollection(q);
  
  const messages = snapshot?.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  } as Message));

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, activeTab]);

  useEffect(() => {
    if (aiScrollRef.current) {
      aiScrollRef.current.scrollTop = aiScrollRef.current.scrollHeight;
    }
  }, [aiMessages, activeTab, aiLoading]);

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || !user) return;
    setError(null);

    const { uid, displayName, photoURL, email } = user;
    const messageData: any = {
      text: input,
      createdAt: serverTimestamp(),
      uid,
      displayName: displayName || "Anonymous",
      photoURL: photoURL || "",
      email: email || "",
    };

    if (replyTo) {
      messageData.replyTo = replyTo;
    }

    try {
      await addDoc(messagesRef, messageData);
      setInput("");
      setReplyTo(null);
    } catch (err: any) {
      console.error("FIREBASE_ERROR:", err);
      const errorMsg = err.code === "permission-denied" 
        ? "Access Denied: Please check if you're signed in with a valid account." 
        : "Sending failed. This could be due to your network or account settings.";
      setError(errorMsg);
      setTimeout(() => setError(null), 6000);
    }
  };

  const sendAiMessage = async (e?: React.FormEvent, overrideMsg?: string) => {
    if (e) e.preventDefault();
    const messageToSend = overrideMsg || aiInput;
    if (!messageToSend.trim() || aiLoading) return;
    
    console.log("[Chat] Sending AI message:", messageToSend);
    const userMsg = messageToSend.trim();
    setAiInput("");
    const newMessages: AIMessage[] = [...aiMessages, { role: "user", text: userMsg, timestamp: new Date() }];
    setAiMessages(newMessages);
    setAiLoading(true);
    setAiError(null);

    try {
      const history = aiMessages.map(m => ({
        role: m.role,
        parts: [{ text: m.text }]
      }));
      
      const response = await getAiResponseAction(userMsg, history);
      console.log("[Chat] AI response success");
      setAiMessages(prev => [...prev, { role: "model", text: response, timestamp: new Date() }]);
    } catch (err: any) {
      console.error("[Chat] AI ERROR:", err);
      setAiError(err.message || "Failed to get AI response. Please try again.");
    } finally {
      setAiLoading(false);
    }
  };

  const handleReply = (msg: Message) => {
    setReplyTo({
      id: msg.id,
      text: msg.text,
      displayName: msg.displayName
    });
    handleTag(msg.displayName);
  };

  const handleTag = (name: string) => {
    const sanitizedName = name.replace(/\s+/g, '');
    if (!input.includes(`@${sanitizedName}`)) {
      setInput((prev) => `@${sanitizedName} ${prev}`);
    }
  };

  const handleSignIn = async (provider: any) => {
    setError(null);
    try {
      // Always try popup first, even on mobile.
      // Modern mobile browsers handle popups better than redirect cycles in many cases.
      await signInWithPopup(auth, provider);
    } catch (err: any) {
      console.error("SIGNIN_ERROR:", err.code, err.message);
      if (err.code === "auth/popup-blocked" || err.code === "auth/cancelled-popup-request") {
        // Fallback to redirect only if popup is strictly blocked or cancelled by browser
        await signInWithRedirect(auth, provider);
      } else if (err.code === "auth/popup-closed-by-user") {
        // User closed it, no error needed
      } else {
        setError("Sign in failed. Please check your browser settings or try again.");
        setTimeout(() => setError(null), 5000);
      }
    }
  };

  const signInWithGoogle = () => handleSignIn(googleProvider);
  const signInWithGithub = () => handleSignIn(githubProvider);
  const handleSignOut = () => signOut(auth);

  if (userLoading) {
    return (
      <div className="flex w-full h-[600px] items-center justify-center rounded-2xl border bg-card/50 backdrop-blur-sm">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="flex w-full h-full gap-x-4 overflow-hidden group/chat-container">
      {/* Public Chat Panel */}
      <div className={cn(
        "flex flex-col h-full border rounded-2xl bg-card/50 backdrop-blur-sm overflow-hidden shadow-xl ring-1 ring-border/20 transition-all duration-300",
        "w-full md:flex-1",
        activeTab !== "public" && "hidden md:flex"
      )}>
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b bg-muted/30">
          <div className="flex items-center gap-x-2.5">
            <div className="h-2 w-2 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)] animate-pulse" />
            <h2 className="text-sm font-bold tracking-tight bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text uppercase">
              Chat Room
            </h2>
          </div>
          
          {/* Desktop Badge / Mobile Switcher */}
          <div className="flex items-center gap-x-3">
             {/* Mobile Switcher (Hidden on Desktop) */}
             <div className="flex md:hidden items-center bg-muted/50 p-1 rounded-lg border border-border/50 relative overflow-hidden">
                <AnimatePresence mode="wait">
                  <button 
                    key="mode-toggle"
                    onClick={() => setActiveTab(activeTab === "public" ? "ai" : "public")}
                    className="flex items-center gap-x-2 px-2 py-0.5"
                  >
                    <span className="text-[10px] font-medium text-muted-foreground uppercase tracking-widest">
                      {activeTab === "public" ? "Public" : "Nawfal Assistant"}
                    </span>
                    <ChevronDown className="h-3 w-3 text-muted-foreground" />
                  </button>
                </AnimatePresence>
             </div>

             {/* Desktop Badge (Hidden on Mobile) */}
             <span className="hidden md:inline-flex text-[10px] font-medium text-muted-foreground uppercase tracking-widest bg-muted/50 px-2 py-0.5 rounded border border-border/50">
               Public
             </span>

              <Sparkles className="h-4 w-4 text-emerald-500/60 dark:text-emerald-500/40 shrink-0" />
              
               {/* Desktop AI Toggle */}
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => setShowAiOnDesktop(!showAiOnDesktop)}
                aria-label={showAiOnDesktop ? "Hide Assistant" : "Show Assistant"}
                className={cn(
                  "hidden md:flex h-7 w-7 rounded-lg transition-colors",
                  showAiOnDesktop ? "bg-primary/10 text-primary hover:bg-primary/20" : "text-muted-foreground hover:bg-muted"
                )}
                title={showAiOnDesktop ? "Hide Assistant" : "Show Assistant"}
              >
                <Bot className="h-4 w-4" />
              </Button>
           </div>
        </div>

        {/* Messages */}
        <div 
          ref={scrollRef}
          className="flex-1 overflow-y-auto p-4 flex flex-col scroll-smooth scrollbar-thin scrollbar-thumb-border hover:scrollbar-thumb-primary/20"
        >
          {loading ? (
            <div className="flex-1 flex items-center justify-center">
              <div className="h-6 w-6 animate-spin rounded-full border-2 border-primary border-t-transparent" />
            </div>
          ) : messages && messages.length > 0 ? (
            messages.map((msg) => (
              <ChatMessage 
                key={msg.id} 
                message={msg} 
                isSender={msg.uid === user?.uid} 
                userLoggedIn={!!user}
                onReply={handleReply}
                onTag={handleTag}
              />
            ))
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-center p-8 space-y-3">
               <div className="p-3 rounded-full bg-muted/50">
                 <Sparkles className="h-6 w-6 text-muted-foreground" />
               </div>
               <div>
                 <p className="text-sm font-medium">No messages yet</p>
                 <p className="text-xs text-muted-foreground">Start the conversation by saying hello!</p>
               </div>
            </div>
          )}
        </div>

        {/* Auth & Input Area */}
        <div className="p-4 bg-muted/20 border-t space-y-3 relative">
          {error && (
            <div className="absolute -top-12 left-4 right-4 bg-destructive/10 text-destructive text-[10px] px-3 py-1.5 rounded-lg border border-destructive/20 flex items-center gap-x-2 anim fade-in">
              <AlertCircle className="h-3 w-3" />
              {error}
            </div>
          )}
          
          {replyTo && (
            <div className="absolute -top-12 left-0 right-0 bg-background/95 backdrop-blur-md border-t px-4 py-2 flex items-center justify-between anim slide-in-from-bottom-2 z-10">
              <div className="flex items-center gap-x-2 overflow-hidden">
                 <Reply className="h-3 w-3 text-primary shrink-0" />
                 <p className="text-[11px] truncate text-muted-foreground">
                   Replying to <span className="font-bold text-foreground">{replyTo.displayName}</span>: {replyTo.text}
                 </p>
              </div>
              <button onClick={() => setReplyTo(null)} className="p-1 hover:bg-muted rounded-full">
                <X className="h-3 w-3" />
              </button>
            </div>
          )}

          {!user ? (
            <div className="flex flex-col items-center gap-y-3 pb-2 pt-1">
              <div className="space-y-1 text-center">
                <h3 className="text-xs font-bold uppercase tracking-wider text-foreground/80">Join the Conversation</h3>
                <p className="text-[10px] text-muted-foreground italic">Sign in to share your thoughts and chat with others.</p>
              </div>
              <div className="flex flex-wrap justify-center gap-2">
                <Button size="sm" className="gap-x-2 h-9 px-4 shadow-sm" onClick={signInWithGoogle}>
                  <FcGoogle className="h-4 w-4" />
                  <span className="whitespace-nowrap font-medium">Sign in with Google</span>
                </Button>
                <Button size="sm" className="gap-x-2 bg-[#24292F] text-white hover:bg-[#24292F]/90 border-transparent transition-all h-9 px-4 shadow-sm" onClick={signInWithGithub}>
                  <Github className="h-4 w-4" />
                  <span className="whitespace-nowrap font-medium">GitHub</span>
                </Button>
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              <form onSubmit={sendMessage} className="flex gap-x-2 items-center">
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Type your message..."
                  className="flex-1 bg-background border-border/60 focus-visible:ring-primary/20 h-10 px-4 text-sm rounded-xl transition-all duration-200"
                />
                <Button 
                  type="submit" 
                  disabled={!input.trim()} 
                  size="icon" 
                  aria-label="Send message"
                  className="shrink-0 rounded-xl h-10 w-10 shadow-lg shadow-primary/10 transition-transform active:scale-95 disabled:opacity-50"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </form>
              <div className="flex items-center justify-between px-1 gap-x-2">
                 <div className="flex items-center gap-x-2 min-w-0">
                     <Avatar className="h-6 w-6 shrink-0 border border-border/50 shadow-sm">
                       <AvatarImage 
                         src={user.photoURL || undefined} 
                         referrerPolicy="no-referrer" 
                       />
                       <AvatarFallback className="text-[10px] bg-primary/10 text-primary uppercase font-bold">{user.displayName?.[0]}</AvatarFallback>
                     </Avatar>
                    <span className="text-[10px] text-muted-foreground truncate min-w-0">
                      Signed in as <span className="font-semibold text-foreground">{user.displayName}</span>
                    </span>
                 </div>
                 <button 
                   onClick={handleSignOut} 
                   className="text-[10px] font-medium text-muted-foreground hover:text-destructive flex items-center gap-x-1 underline-offset-4 hover:underline transition-colors"
                 >
                   <LogOut className="h-3 w-3" />
                   Sign out
                 </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Nawfal Assistant Panel */}
      <div className={cn(
        "flex flex-col h-full border rounded-2xl bg-card/50 backdrop-blur-sm overflow-hidden shadow-xl ring-1 ring-border/20 transition-all duration-300",
        "w-full md:w-[320px] lg:w-[380px] shrink-0",
        activeTab !== "ai" && "hidden md:flex",
        !showAiOnDesktop && "md:hidden"
      )}>
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b bg-muted/30">
          <div className="flex items-center gap-x-2.5">
             <div className="h-2 w-2 rounded-full bg-primary" />
             <h2 className="text-sm font-bold tracking-tight bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text uppercase">
               Nawfal Assistant
             </h2>
          </div>

          <div className="flex items-center gap-x-3">
             {/* Mobile Switcher (Hidden on Desktop) */}
             <div className="flex md:hidden items-center bg-muted/50 p-1 rounded-lg border border-border/50 relative overflow-hidden">
                <AnimatePresence mode="wait">
                  <button 
                    key="mode-toggle-ai"
                    onClick={() => setActiveTab(activeTab === "public" ? "ai" : "public")}
                    className="flex items-center gap-x-2 px-2 py-0.5"
                  >
                    <span className="text-[10px] font-medium text-muted-foreground uppercase tracking-widest">
                      {activeTab === "public" ? "Public" : "Assistant"}
                    </span>
                    <ChevronDown className="h-3 w-3 text-muted-foreground" />
                  </button>
                </AnimatePresence>
             </div>

             {/* Digital Badge (Desktop Only) */}
             <span className="hidden md:inline-flex text-[10px] font-medium text-muted-foreground uppercase tracking-widest bg-muted/50 px-2 py-0.5 rounded border border-border/50">
               Digital
             </span>
             <Sparkles className="h-4 w-4 text-primary/60 dark:text-primary/40 shrink-0" />
          </div>
        </div>

        {/* AI Messages */}
        <div 
          ref={aiScrollRef}
          className="flex-1 overflow-y-auto p-4 flex flex-col space-y-4 scroll-smooth scrollbar-none"
        >
          {aiMessages.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center text-center p-6 space-y-4">
               <motion.div 
                 {...({
                   initial: { scale: 0.8, opacity: 0 },
                   animate: { scale: 1, opacity: 1 },
                   className: "p-4 rounded-full bg-primary/5 border border-primary/10"
                 } as any)}
               >
                 <Bot className="h-8 w-8 text-primary/40" />
               </motion.div>
               <motion.div 
                 {...({
                   initial: { y: 10, opacity: 0 },
                   animate: { y: 0, opacity: 1 },
                   transition: { delay: 0.1 },
                   className: "space-y-2"
                 } as any)}
               >
                 <p className="text-sm font-semibold">I&apos;m Nawfal&apos;s AI Assistant</p>
                 <p className="text-xs text-muted-foreground leading-relaxed">
                   Ask me anything about Nawfal&apos;s projects, skills, or even just say hi!
                 </p>
               </motion.div>
               <motion.div 
                 {...({
                   initial: { y: 10, opacity: 0 },
                   animate: { y: 0, opacity: 1 },
                   transition: { delay: 0.2 },
                   className: "grid grid-cols-1 gap-2 w-full pt-4"
                 } as any)}
               >
                  {[
                    "Tell me about Nawfal's projects",
                    "What are his technical skills?",
                    "How can I contact him?"
                  ].map((suggestion) => (
                    <button 
                      key={suggestion}
                      onClick={() => sendAiMessage(undefined, suggestion)}
                      className="text-left p-2.5 rounded-xl border border-border/40 bg-muted/20 text-[11px] hover:bg-primary/5 hover:border-primary/20 transition-all text-muted-foreground hover:text-foreground"
                    >
                      {suggestion}
                    </button>
                  ))}
               </motion.div>
            </div>
          ) : (
            aiMessages.map((msg, i) => (
               <div key={i} className={cn(
                 "flex w-full gap-x-3",
                 msg.role === "user" ? "flex-row-reverse" : "flex-row"
               )}>
                 <div className={cn(
                   "h-7 w-7 rounded-full flex items-center justify-center shrink-0 border shadow-sm",
                   msg.role === "user" ? "bg-muted border-border/50" : "bg-primary/10 border-primary/20"
                 )}>
                   {msg.role === "user" ? (
                     user?.photoURL ? (
                       <Avatar className="h-full w-full">
                         <AvatarImage 
                           src={user.photoURL || undefined} 
                           referrerPolicy="no-referrer" 
                         />
                         <AvatarFallback className="text-[8px] bg-primary/10 text-primary uppercase font-bold">{user.displayName?.[0]}</AvatarFallback>
                       </Avatar>
                     ) : (
                       <User className="h-4 w-4 text-muted-foreground" />
                     )
                   ) : (
                     <Bot className="h-4 w-4 text-primary" />
                   )}
                 </div>
                 <div className={cn(
                   "flex flex-col gap-y-1 max-w-[83%]",
                   msg.role === "user" ? "items-end text-right" : "items-start text-left"
                 )}>
                  <div className={cn(
                    "rounded-2xl px-3.5 py-2 text-xs leading-relaxed shadow-sm prose prose-neutral dark:prose-invert prose-p:leading-relaxed prose-pre:my-2 prose-code:text-[10px]",
                    msg.role === "user" 
                      ? "bg-primary text-primary-foreground rounded-tr-none" 
                      : "bg-muted text-foreground rounded-tl-none border border-border/50"
                  )}>
                    <ReactMarkdown 
                      remarkPlugins={[remarkGfm]}
                      components={{
                        a: ({node, ...props}) => (
                          <a {...props} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline font-medium" />
                        )
                      }}
                    >
                      {msg.text}
                    </ReactMarkdown>
                  </div>
                  <span className="text-[9px] text-muted-foreground opacity-50 px-1">
                    {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
              </div>
            ))
          )}
          {aiLoading && (
            <div className="flex w-full gap-x-3 anim fade-in">
              <div className="h-7 w-7 rounded-full flex items-center justify-center shrink-0 border bg-primary/10 border-primary/20">
                <Bot className="h-4 w-4 text-primary animate-pulse" />
              </div>
              <div className="bg-muted border border-border/50 rounded-2xl rounded-tl-none px-4 py-2 flex items-center gap-x-1.5">
                {[0, 1, 2].map((i) => (
                  <div key={i} className="h-1.5 w-1.5 rounded-full bg-primary/40 animate-bounce" style={{ animationDelay: `${i * 150}ms` }} />
                ))}
              </div>
            </div>
          )}
          {aiError && (
            <div className="flex items-center gap-x-2 p-2 rounded-lg bg-destructive/10 text-destructive text-[10px] border border-destructive/20">
              <AlertCircle className="h-3 w-3" />
              {aiError}
            </div>
          )}
        </div>

        {/* AI Input Area */}
        <div className="p-4 bg-muted/10 border-t">
          <form onSubmit={sendAiMessage} className="relative">
            <Input
              value={aiInput}
              onChange={(e) => setAiInput(e.target.value)}
              placeholder="Ask AI assistant..."
              className="bg-background border-border/60 focus-visible:ring-primary/20 h-10 pl-4 pr-10 text-sm rounded-xl transition-all duration-200"
              disabled={aiLoading}
            />
            <Button 
              type="submit" 
              disabled={!aiInput.trim() || aiLoading} 
              size="icon" 
              variant="ghost"
              className="absolute right-1 top-1 h-8 w-8 rounded-lg hover:bg-primary/10 text-primary transition-all disabled:opacity-30"
            >
              <Send className="h-4 w-4" />
            </Button>
          </form>
          <p className="text-[9px] text-center text-muted-foreground mt-2 opacity-50 px-2 leading-tight">
            Nawfal Assistant can provide helpful information but may verify facts.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Chat;
