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
import { useCollectionData, useCollection } from "react-firebase-hooks/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { signInWithPopup, signOut } from "firebase/auth";
import { Send, Sparkles, Reply, X, CheckCircle2, LogOut, Github, AlertCircle } from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

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
        className={`rounded-2xl px-4 py-2 text-sm shadow-sm leading-relaxed break-words w-fit ${
          isSender
            ? "bg-primary text-primary-foreground rounded-tr-none"
            : isOwner
              ? "bg-sky-500/10 dark:bg-sky-500/5 text-foreground border border-sky-500/20 rounded-tr-none"
              : "bg-muted text-foreground rounded-tl-none border border-border/50"
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
    ? message.createdAt.toDate().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    : "...";

  const isOwner = !!(message.email && OWNER_EMAILS.includes(message.email));
  // Owner messages or current user messages appear on the right
  const isOnRight = isSender || isOwner;

  return (
    <div className={`group flex w-full gap-x-3 mb-6 ${isOnRight ? "flex-row-reverse" : "flex-row"}`}>
      <Avatar className="h-9 w-9 border border-border/50 shrink-0 shadow-sm mt-1">
        <AvatarImage src={message.photoURL} alt={message.displayName} />
        <AvatarFallback className="bg-primary/10 text-primary uppercase font-bold text-xs">{message.displayName?.[0] || "?"}</AvatarFallback>
      </Avatar>
      
      <div className={`flex flex-col gap-y-1 ${isOnRight ? "items-end text-right" : "items-start text-left"} max-w-[calc(100%-48px)]`}>
        <div className="flex items-center gap-x-2">
          {!isOnRight && (
            <button onClick={() => onTag(message.displayName)} className="flex items-center gap-x-1 hover:opacity-70 transition-opacity">
              <span className="text-xs font-semibold text-foreground/80">{message.displayName}</span>
            </button>
          )}
          <span className="text-[10px] text-muted-foreground font-medium opacity-60 tabular-nums">{time}</span>
          {isOnRight && (
            <div className="flex items-center gap-x-1">
              {isOwner && <CheckCircle2 className="h-3 w-3 text-sky-500 fill-sky-500/10" />}
              <span className={`text-xs font-semibold ${isSender ? "text-primary" : "text-foreground/80"}`}>{message.displayName}</span>
            </div>
          )}
          {!isOnRight && isOwner && (
             <CheckCircle2 className="h-3 w-3 text-sky-500 fill-sky-500/10" />
          )}
        </div>
        
        <div className={`flex items-center gap-x-2 w-full group ${isOnRight ? "flex-row-reverse" : "flex-row"}`}>
          <div className="max-w-[85%] md:max-w-[90%]">
            <Bubble isSender={isSender} isOwner={isOwner} replyTo={message.replyTo}>
              <TaggedText text={message.text} />
            </Bubble>
          </div>
          {userLoggedIn && (
            <button 
              onClick={() => onReply(message)}
              className={`p-1.5 rounded-full hover:bg-muted opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-all shrink-0`}
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
  const [input, setInput] = useState("");
  const [replyTo, setReplyTo] = useState<ReplyTo | null>(null);
  const [error, setError] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

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
  }, [messages]);

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
      console.log("Attempting to send message:", messageData);
      await addDoc(messagesRef, messageData);
      setInput("");
      setReplyTo(null);
    } catch (err: any) {
      console.error("FIREBASE_ERROR:", err);
      // More descriptive error for debugging
      const errorMsg = err.code === "permission-denied" 
        ? "Access Denied: Please check if you're signed in with a valid account." 
        : "Sending failed. This could be due to your network or account settings.";
      setError(errorMsg);
      setTimeout(() => setError(null), 6000);
    }
  };

  const handleReply = (msg: Message) => {
    setReplyTo({
      id: msg.id,
      text: msg.text,
      displayName: msg.displayName
    });
    // Auto insert @name in input
    handleTag(msg.displayName);
  };

  const handleTag = (name: string) => {
    const sanitizedName = name.replace(/\s+/g, '');
    if (!input.includes(`@${sanitizedName}`)) {
      setInput((prev) => `@${sanitizedName} ${prev}`);
    }
  };

  const signInWithGoogle = () => signInWithPopup(auth, googleProvider);
  const signInWithGithub = () => signInWithPopup(auth, githubProvider);
  const handleSignOut = () => signOut(auth);

  if (userLoading) {
    return (
      <div className="flex w-full h-[600px] items-center justify-center rounded-2xl border bg-card/50 backdrop-blur-sm">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="flex w-full flex-col h-full max-h-[700px] border rounded-2xl bg-card/50 backdrop-blur-sm overflow-hidden shadow-xl ring-1 ring-border/20">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b bg-muted/30">
        <div className="flex items-center gap-x-2.5">
          <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
          <h2 className="text-sm font-bold tracking-tight bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text">
            CHAT ROOM
          </h2>
        </div>
        <div className="flex items-center gap-x-3">
           <span className="text-[10px] font-medium text-muted-foreground uppercase tracking-widest bg-muted/50 px-2 py-0.5 rounded border border-border/50">Public</span>
           <Sparkles className="h-4 w-4 text-primary/60 dark:text-primary/40" />
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
          <div className="flex flex-col gap-y-4 py-2">
             <div className="text-center space-y-1">
               <p className="text-sm font-semibold">Join the Conversation</p>
               <p className="text-xs text-muted-foreground">Sign in to share your thoughts and chat with others.</p>
             </div>
             <div className="grid grid-cols-2 gap-3">
                <Button variant="outline" size="sm" className="gap-x-2 h-9" onClick={signInWithGoogle}>
                  <FcGoogle className="h-4 w-4" />
                  <span>Google</span>
                </Button>
                <Button variant="outline" size="sm" className="gap-x-2 h-9 bg-[#24292F] text-white hover:bg-[#24292F]/90 border-transparent" onClick={signInWithGithub}>
                  <Github className="h-4 w-4" />
                  <span>GitHub</span>
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
                className="shrink-0 rounded-xl h-10 w-10 shadow-lg shadow-primary/10 transition-transform active:scale-95 disabled:opacity-50"
              >
                <Send className="h-4 w-4" />
              </Button>
            </form>
            <div className="flex items-center justify-between px-1">
               <div className="flex items-center gap-x-2">
                  <Avatar className="h-5 w-5 border border-border/50">
                    <AvatarImage src={user.photoURL || ""} />
                    <AvatarFallback className="text-[8px] bg-primary/10 text-primary">{user.displayName?.[0]}</AvatarFallback>
                  </Avatar>
                  <span className="text-[10px] text-muted-foreground">
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
  );
};

export default Chat;
