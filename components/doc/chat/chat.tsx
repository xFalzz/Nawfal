"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
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
import {
  Send,
  Sparkles,
  Reply,
  X,
  CheckCircle2,
  LogOut,
  Github,
  AlertCircle,
  Bot,
  User,
  MessageSquare,
  ChevronDown,
  RotateCcw,
  ShieldCheck,
  GripVertical,
  GripHorizontal,
  Maximize2,
} from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getAiResponseAction } from "@/app/actions/ai";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import TextareaAutosize from "react-textarea-autosize";

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
            <span
              key={i}
              className="font-bold text-sky-400 dark:text-sky-300 pointer-events-none"
            >
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
  replyTo,
}: {
  children: React.ReactNode;
  isSender: boolean;
  isOwner?: boolean;
  replyTo?: ReplyTo;
}) => {
  const onRight = isSender || isOwner;
  return (
    <div
      className={`flex flex-col gap-y-1 w-fit max-w-full ${
        onRight ? "items-end" : "items-start"
      }`}
    >
      {replyTo && (
        <div
          className={`text-[10px] px-2 py-1 rounded-t-lg bg-black/10 dark:bg-white/5 border-l-2 border-primary/40 truncate max-w-[220px] mb-[-4px] opacity-80`}
        >
          <span className="font-bold">Replying to {replyTo.displayName}: </span>
          <span className="italic">{replyTo.text}</span>
        </div>
      )}
      <div
        className={`rounded-2xl px-4 py-2 text-sm shadow-sm leading-relaxed break-words w-fit transition-all duration-200 ${
          isSender
            ? "bg-primary text-primary-foreground rounded-tr-none hover:shadow-md"
            : isOwner
            ? "bg-sky-500/10 dark:bg-sky-500/15 text-foreground border border-sky-500/30 rounded-tr-none hover:bg-sky-500/20"
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
  onTag,
}: {
  message: Message;
  isSender: boolean;
  userLoggedIn: boolean;
  onReply: (msg: Message) => void;
  onTag: (name: string) => void;
}) => {
  const time = message.createdAt?.toDate?.()
    ? message.createdAt.toDate().toLocaleString([], {
        day: "2-digit",
        month: "short",
        hour: "2-digit",
        minute: "2-digit",
      })
    : "...";

  const isOwner = !!(message.email && OWNER_EMAILS.includes(message.email));
  const isOnRight = isSender || isOwner;

  return (
    <div
      className={`flex w-full gap-x-3 mb-4 ${
        isOnRight ? "flex-row-reverse" : "flex-row"
      }`}
    >
      <Avatar className="h-8 w-8 border border-border/50 shrink-0 mt-0.5 shadow-sm">
        <AvatarImage
          src={message.photoURL}
          alt={message.displayName}
          referrerPolicy="no-referrer"
        />
        <AvatarFallback className="bg-primary/10 text-primary uppercase font-bold text-[10px]">
          {message.displayName?.[0] || "?"}
        </AvatarFallback>
      </Avatar>

      <div
        className={`flex flex-col gap-y-1 ${
          isOnRight ? "items-end" : "items-start"
        } max-w-[82%]`}
      >
        <div className="flex items-center gap-x-2">
          {!isOnRight && (
            <button
              onClick={() => onTag(message.displayName)}
              className="flex items-center gap-x-1 hover:opacity-70 transition-opacity"
            >
              <span className="text-xs font-semibold text-foreground/90">
                {message.displayName}
              </span>
            </button>
          )}
          <span className="text-[10px] text-muted-foreground font-medium opacity-60 tabular-nums">
            {time}
          </span>
          {isOnRight && (
            <div className="flex items-center gap-x-1">
              {isOwner && (
                <CheckCircle2 className="h-3 w-3 text-sky-500 fill-sky-500/10" />
              )}
              <span
                className={`text-xs font-semibold ${
                  isSender ? "text-primary" : "text-foreground/90"
                }`}
              >
                {message.displayName}
              </span>
            </div>
          )}
          {!isOnRight && isOwner && (
            <CheckCircle2 className="h-3 w-3 text-sky-500 fill-sky-500/10" />
          )}
        </div>

        <div
          className={`flex items-center gap-x-2 group ${
            isOnRight ? "flex-row-reverse" : "flex-row"
          }`}
        >
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

  // Resizable state
  const containerRef = useRef<HTMLDivElement>(null);
  const [leftWidthPercent, setLeftWidthPercent] = useState<number>(50);
  const [containerHeight, setContainerHeight] = useState<number>(780);
  const [isDraggingSplit, setIsDraggingSplit] = useState<boolean>(false);
  const [isDraggingHeight, setIsDraggingHeight] = useState<boolean>(false);

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

  const messages = snapshot?.docs.map(
    (doc) =>
      ({
        id: doc.id,
        ...doc.data(),
      } as Message)
  );

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

  // ─── Width Drag Handler ──────────────────────────────────────────────────
  const handleSplitMouseDown = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    setIsDraggingSplit(true);
  };

  const handleSplitMouseMove = useCallback(
    (e: MouseEvent | TouchEvent) => {
      if (!isDraggingSplit || !containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
      const relativeX = clientX - rect.left;
      const newPercent = (relativeX / rect.width) * 100;
      // Clamp between 20% and 80%
      setLeftWidthPercent(Math.min(Math.max(newPercent, 20), 80));
    },
    [isDraggingSplit]
  );

  const handleSplitMouseUp = useCallback(() => {
    setIsDraggingSplit(false);
  }, []);

  useEffect(() => {
    if (isDraggingSplit) {
      window.addEventListener("mousemove", handleSplitMouseMove);
      window.addEventListener("mouseup", handleSplitMouseUp);
      window.addEventListener("touchmove", handleSplitMouseMove);
      window.addEventListener("touchend", handleSplitMouseUp);
    }
    return () => {
      window.removeEventListener("mousemove", handleSplitMouseMove);
      window.removeEventListener("mouseup", handleSplitMouseUp);
      window.removeEventListener("touchmove", handleSplitMouseMove);
      window.removeEventListener("touchend", handleSplitMouseUp);
    };
  }, [isDraggingSplit, handleSplitMouseMove, handleSplitMouseUp]);

  // ─── Height Drag Handler ─────────────────────────────────────────────────
  const handleHeightMouseDown = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    setIsDraggingHeight(true);
  };

  const handleHeightMouseMove = useCallback(
    (e: MouseEvent | TouchEvent) => {
      if (!isDraggingHeight || !containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const clientY = "touches" in e ? e.touches[0].clientY : e.clientY;
      const newHeight = clientY - rect.top;
      // Clamp height between 500px and 1200px
      setContainerHeight(Math.min(Math.max(newHeight, 500), 1200));
    },
    [isDraggingHeight]
  );

  const handleHeightMouseUp = useCallback(() => {
    setIsDraggingHeight(false);
  }, []);

  useEffect(() => {
    if (isDraggingHeight) {
      window.addEventListener("mousemove", handleHeightMouseMove);
      window.addEventListener("mouseup", handleHeightMouseUp);
      window.addEventListener("touchmove", handleHeightMouseMove);
      window.addEventListener("touchend", handleHeightMouseUp);
    }
    return () => {
      window.removeEventListener("mousemove", handleHeightMouseMove);
      window.removeEventListener("mouseup", handleHeightMouseUp);
      window.removeEventListener("touchmove", handleHeightMouseMove);
      window.removeEventListener("touchend", handleHeightMouseUp);
    };
  }, [isDraggingHeight, handleHeightMouseMove, handleHeightMouseUp]);

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
      const errorMsg =
        err.code === "permission-denied"
          ? "Access Denied: Please check if you're signed in with a valid account."
          : "Sending failed. Please check your network or account settings.";
      setError(errorMsg);
      setTimeout(() => setError(null), 6000);
    }
  };

  const sendAiMessage = async (e?: React.FormEvent, overrideMsg?: string) => {
    if (e) e.preventDefault();
    const messageToSend = overrideMsg || aiInput;
    if (!messageToSend.trim() || aiLoading) return;

    const userMsg = messageToSend.trim();
    setAiInput("");
    const newMessages: AIMessage[] = [
      ...aiMessages,
      { role: "user", text: userMsg, timestamp: new Date() },
    ];
    setAiMessages(newMessages);
    setAiLoading(true);
    setAiError(null);

    try {
      const history = aiMessages.map((m) => ({
        role: m.role,
        parts: [{ text: m.text }],
      }));

      const response = await getAiResponseAction(userMsg, history);
      setAiMessages((prev) => [
        ...prev,
        { role: "model", text: response, timestamp: new Date() },
      ]);
    } catch (err: any) {
      console.error("[Chat] AI ERROR:", err);
      setAiError(err.message || "Failed to get AI response. Please try again.");
    } finally {
      setAiLoading(false);
    }
  };

  const clearAiChat = () => {
    setAiMessages([]);
    setAiError(null);
  };

  const handleReply = (msg: Message) => {
    setReplyTo({
      id: msg.id,
      text: msg.text,
      displayName: msg.displayName,
    });
    handleTag(msg.displayName);
  };

  const handleTag = (name: string) => {
    const sanitizedName = name.replace(/\s+/g, "");
    if (!input.includes(`@${sanitizedName}`)) {
      setInput((prev) => `@${sanitizedName} ${prev}`);
    }
  };

  const handleSignIn = async (provider: any) => {
    setError(null);
    try {
      await signInWithPopup(auth, provider);
    } catch (err: any) {
      console.error("SIGNIN_ERROR:", err.code, err.message);
      if (
        err.code === "auth/popup-blocked" ||
        err.code === "auth/cancelled-popup-request"
      ) {
        await signInWithRedirect(auth, provider);
      } else if (err.code === "auth/popup-closed-by-user") {
        // User closed
      } else {
        setError("Sign in failed. Please try again.");
        setTimeout(() => setError(null), 5000);
      }
    }
  };

  const signInWithGoogle = () => handleSignIn(googleProvider);
  const signInWithGithub = () => handleSignIn(githubProvider);
  const handleSignOut = () => signOut(auth);

  if (userLoading) {
    return (
      <div className="flex w-full h-[650px] items-center justify-center rounded-2xl border bg-card/50 backdrop-blur-md">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full relative">
      {/* Resizable Chat Container */}
      <div
        ref={containerRef}
        style={{ height: `${containerHeight}px` }}
        className={cn(
          "flex w-full overflow-hidden relative select-none-during-drag transition-height duration-75",
          (isDraggingSplit || isDraggingHeight) && "select-none"
        )}
      >
        {/* ─── Public Chat Room Panel ────────────────────────────────────────── */}
        <div
          style={{
            width: showAiOnDesktop ? `${leftWidthPercent}%` : "100%",
          }}
          className={cn(
            "flex flex-col h-full border rounded-2xl bg-card/60 backdrop-blur-md overflow-hidden shadow-xl ring-1 ring-border/30 transition-all duration-150",
            "w-full",
            activeTab !== "public" && "hidden md:flex"
          )}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-5 py-4 border-b bg-muted/40 backdrop-blur-sm">
            <div className="flex items-center gap-x-3">
              <div className="relative flex h-2.5 w-2.5 items-center justify-center">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
              </div>
              <div className="flex flex-col">
                <h2 className="text-sm font-bold tracking-wider uppercase text-foreground">
                  Public Discussion
                </h2>
                <span className="text-[10px] text-muted-foreground">
                  Live Community Space
                </span>
              </div>
            </div>

            <div className="flex items-center gap-x-3">
              {/* Mobile Switcher */}
              <div className="flex md:hidden items-center bg-muted/70 p-1 rounded-lg border border-border/50">
                <button
                  onClick={() =>
                    setActiveTab(activeTab === "public" ? "ai" : "public")
                  }
                  className="flex items-center gap-x-1.5 px-2.5 py-1 rounded-md text-xs font-semibold text-foreground"
                >
                  <span>{activeTab === "public" ? "Chat Room" : "AI Assistant"}</span>
                  <ChevronDown className="h-3.5 w-3.5 text-muted-foreground" />
                </button>
              </div>

              {/* Desktop Badge */}
              <span className="hidden md:inline-flex items-center gap-x-1 text-[10px] font-semibold text-muted-foreground uppercase tracking-widest bg-muted/60 px-2.5 py-1 rounded-md border border-border/50">
                <MessageSquare className="h-3 w-3 text-emerald-500" />
                Public
              </span>

              {/* Desktop AI Toggle */}
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowAiOnDesktop(!showAiOnDesktop)}
                aria-label={showAiOnDesktop ? "Hide Assistant" : "Show Assistant"}
                className={cn(
                  "hidden md:flex h-8 gap-x-1.5 text-xs font-medium rounded-xl transition-all shadow-none",
                  showAiOnDesktop
                    ? "bg-primary/10 border-primary/30 text-primary hover:bg-primary/20"
                    : "bg-muted/40 text-muted-foreground hover:bg-muted"
                )}
              >
                <Bot className="h-3.5 w-3.5" />
                <span>{showAiOnDesktop ? "Hide AI" : "Open AI"}</span>
              </Button>
            </div>
          </div>

          {/* Messages List */}
          <div
            ref={scrollRef}
            className="flex-1 overflow-y-auto p-4 md:p-5 flex flex-col scroll-smooth scrollbar-thin scrollbar-thumb-border hover:scrollbar-thumb-primary/20"
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
                <div className="p-3.5 rounded-2xl bg-muted/60 border border-border/40">
                  <Sparkles className="h-6 w-6 text-muted-foreground" />
                </div>
                <div>
                  <p className="text-sm font-semibold">No messages yet</p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    Be the first to say hello in Nawfal&apos;s community room!
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Public Chat Input / Auth Area */}
          <div className="p-4 bg-muted/20 border-t space-y-3 relative">
            {error && (
              <div className="absolute -top-12 left-4 right-4 bg-destructive/10 text-destructive text-[11px] px-3 py-2 rounded-xl border border-destructive/20 flex items-center gap-x-2 anim fade-in">
                <AlertCircle className="h-3.5 w-3.5 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {replyTo && (
              <div className="absolute -top-12 left-0 right-0 bg-background/95 backdrop-blur-md border-t px-4 py-2 flex items-center justify-between anim slide-in-from-bottom-2 z-10">
                <div className="flex items-center gap-x-2 overflow-hidden">
                  <Reply className="h-3.5 w-3.5 text-primary shrink-0" />
                  <p className="text-xs truncate text-muted-foreground">
                    Replying to{" "}
                    <span className="font-bold text-foreground">
                      {replyTo.displayName}
                    </span>
                    : {replyTo.text}
                  </p>
                </div>
                <button
                  onClick={() => setReplyTo(null)}
                  className="p-1 hover:bg-muted rounded-full"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              </div>
            )}

            {!user ? (
              <div className="flex flex-col items-center gap-y-3.5 py-2">
                <div className="space-y-1 text-center">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-foreground">
                    Join the Conversation
                  </h3>
                  <p className="text-[11px] text-muted-foreground">
                    Sign in with Google or GitHub to participate in the live chat.
                  </p>
                </div>
                <div className="flex flex-wrap justify-center gap-2.5">
                  <Button
                    size="sm"
                    className="gap-x-2 h-10 px-5 shadow-sm rounded-xl font-medium"
                    onClick={signInWithGoogle}
                  >
                    <FcGoogle className="h-4 w-4" />
                    <span>Google</span>
                  </Button>
                  <Button
                    size="sm"
                    className="gap-x-2 bg-[#24292F] text-white hover:bg-[#24292F]/90 border-transparent transition-all h-10 px-5 shadow-sm rounded-xl font-medium"
                    onClick={signInWithGithub}
                  >
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
                    className="flex-1 bg-background border-border/60 focus-visible:ring-primary/20 h-11 px-4 text-sm rounded-xl transition-all duration-200"
                  />
                  <Button
                    type="submit"
                    disabled={!input.trim()}
                    size="icon"
                    aria-label="Send message"
                    className="shrink-0 rounded-xl h-11 w-11 shadow-md shadow-primary/10 transition-transform active:scale-95 disabled:opacity-50"
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </form>
                <div className="flex items-center justify-between px-1 gap-x-2">
                  <div className="flex items-center gap-x-2 min-w-0">
                    <Avatar className="h-5 w-5 shrink-0 border border-border/50 shadow-sm">
                      <AvatarImage
                        src={user.photoURL || undefined}
                        referrerPolicy="no-referrer"
                      />
                      <AvatarFallback className="text-[9px] bg-primary/10 text-primary uppercase font-bold">
                        {user.displayName?.[0]}
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-[11px] text-muted-foreground truncate">
                      Signed in as{" "}
                      <span className="font-semibold text-foreground">
                        {user.displayName}
                      </span>
                    </span>
                  </div>
                  <button
                    onClick={handleSignOut}
                    className="text-[11px] font-medium text-muted-foreground hover:text-destructive flex items-center gap-x-1 transition-colors"
                  >
                    <LogOut className="h-3 w-3" />
                    Sign out
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* ─── Interactive Width Resizer Handle (Desktop Only) ──────────────── */}
        {showAiOnDesktop && (
          <div
            onMouseDown={handleSplitMouseDown}
            onTouchStart={handleSplitMouseDown}
            onDoubleClick={() => setLeftWidthPercent(50)}
            title="Drag to resize panel widths (Double click to reset 50/50)"
            className={cn(
              "hidden md:flex items-center justify-center cursor-col-resize px-1 my-auto group z-20 transition-all",
              isDraggingSplit ? "opacity-100" : "opacity-60 hover:opacity-100"
            )}
          >
            <div
              className={cn(
                "flex items-center justify-center h-16 w-3 rounded-full border border-border/60 bg-popover/80 shadow-md backdrop-blur-sm transition-all group-hover:border-primary/50 group-hover:bg-primary/10",
                isDraggingSplit && "border-primary bg-primary/20 ring-2 ring-primary/30"
              )}
            >
              <GripVertical className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
            </div>
          </div>
        )}

        {/* ─── Nawfal AI Assistant Panel ──────────────────────────────────────── */}
        <div
          style={{
            width: showAiOnDesktop ? `${100 - leftWidthPercent}%` : "0%",
          }}
          className={cn(
            "flex flex-col h-full border rounded-2xl bg-card/60 backdrop-blur-md overflow-hidden shadow-xl ring-1 ring-border/30 transition-all duration-150",
            "w-full",
            activeTab !== "ai" && "hidden md:flex",
            !showAiOnDesktop && "md:hidden"
          )}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-5 py-4 border-b bg-muted/40 backdrop-blur-sm">
            <div className="flex items-center gap-x-3">
              <div className="h-7 w-7 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary shrink-0">
                <Bot className="h-4 w-4" />
              </div>
              <div className="flex flex-col">
                <h2 className="text-sm font-bold tracking-wider uppercase text-foreground">
                  Nawfal Assistant
                </h2>
                <span className="text-[10px] text-muted-foreground flex items-center gap-x-1">
                  <ShieldCheck className="h-3 w-3 text-emerald-500 inline" />
                  Factual Knowledge Base
                </span>
              </div>
            </div>

            <div className="flex items-center gap-x-2">
              {/* Mobile Switcher */}
              <div className="flex md:hidden items-center bg-muted/70 p-1 rounded-lg border border-border/50">
                <button
                  onClick={() =>
                    setActiveTab(activeTab === "public" ? "ai" : "public")
                  }
                  className="flex items-center gap-x-1.5 px-2.5 py-1 rounded-md text-xs font-semibold text-foreground"
                >
                  <span>{activeTab === "public" ? "Public" : "Assistant"}</span>
                  <ChevronDown className="h-3.5 w-3.5 text-muted-foreground" />
                </button>
              </div>

              {/* Clear Chat Button */}
              {aiMessages.length > 0 && (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={clearAiChat}
                  title="Reset conversation"
                  className="h-8 w-8 rounded-lg text-muted-foreground hover:text-foreground"
                >
                  <RotateCcw className="h-3.5 w-3.5" />
                </Button>
              )}
            </div>
          </div>

          {/* AI Messages Area */}
          <div
            ref={aiScrollRef}
            className="flex-1 overflow-y-auto p-4 md:p-5 flex flex-col space-y-4 scroll-smooth scrollbar-thin scrollbar-thumb-border hover:scrollbar-thumb-primary/20"
          >
            {aiMessages.length === 0 ? (
              <div className="flex-1 flex flex-col items-center justify-center text-center p-4 space-y-4 my-auto">
                <div className="p-4 rounded-2xl bg-primary/10 border border-primary/20 shadow-sm">
                  <Bot className="h-8 w-8 text-primary" />
                </div>

                <div className="space-y-1.5 max-w-xs">
                  <p className="text-sm font-bold text-foreground">
                    Official AI Assistant
                  </p>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Tanyakan apapun seputar proyek, keahlian, pengalaman kerja, atau 48+ sertifikasi milik Nawfal.
                  </p>
                </div>

                {/* Quick Prompt Chips */}
                <div className="grid grid-cols-1 gap-2 w-full pt-2">
                  {[
                    {
                      label: "Proyek & Aplikasi (Hijara, KURA)",
                      query: "Apa saja proyek unggulan yang telah dibuat Nawfal?",
                    },
                    {
                      label: "Sertifikasi (Microsoft, Google, IBM)",
                      query: "Sertifikasi apa saja yang dimiliki oleh Nawfal?",
                    },
                    {
                      label: "Pengalaman Kerja & Pendidikan",
                      query: "Bagaimana riwayat pengalaman kerja dan pendidikan Nawfal?",
                    },
                    {
                      label: "Kontak & Media Sosial",
                      query: "Bagaimana cara menghubungi Nawfal?",
                    },
                  ].map((item) => (
                    <button
                      key={item.label}
                      onClick={() => sendAiMessage(undefined, item.query)}
                      className="text-left p-3 rounded-xl border border-border/50 bg-muted/30 text-xs hover:bg-primary/10 hover:border-primary/30 transition-all text-muted-foreground hover:text-foreground flex items-center justify-between group"
                    >
                      <span>{item.label}</span>
                      <Sparkles className="h-3.5 w-3.5 text-primary/40 group-hover:text-primary transition-colors shrink-0" />
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              aiMessages.map((msg, i) => (
                <div
                  key={i}
                  className={cn(
                    "flex w-full gap-x-3",
                    msg.role === "user" ? "flex-row-reverse" : "flex-row"
                  )}
                >
                  <div
                    className={cn(
                      "h-7 w-7 rounded-full flex items-center justify-center shrink-0 border shadow-sm mt-0.5",
                      msg.role === "user"
                        ? "bg-muted border-border/50"
                        : "bg-primary/10 border-primary/30 text-primary"
                    )}
                  >
                    {msg.role === "user" ? (
                      user?.photoURL ? (
                        <Avatar className="h-full w-full">
                          <AvatarImage
                            src={user.photoURL || undefined}
                            referrerPolicy="no-referrer"
                          />
                          <AvatarFallback className="text-[8px] bg-primary/10 text-primary uppercase font-bold">
                            {user.displayName?.[0]}
                          </AvatarFallback>
                        </Avatar>
                      ) : (
                        <User className="h-3.5 w-3.5 text-muted-foreground" />
                      )
                    ) : (
                      <Bot className="h-3.5 w-3.5 text-primary" />
                    )}
                  </div>
                  <div
                    className={cn(
                      "flex flex-col gap-y-1 max-w-[85%]",
                      msg.role === "user"
                        ? "items-end text-right"
                        : "items-start text-left"
                    )}
                  >
                    <div
                      className={cn(
                        "rounded-2xl px-4 py-2.5 text-xs leading-relaxed shadow-sm prose prose-neutral dark:prose-invert max-w-none",
                        msg.role === "user"
                          ? "bg-primary text-primary-foreground rounded-tr-none"
                          : "bg-muted text-foreground rounded-tl-none border border-border/50"
                      )}
                    >
                      <ReactMarkdown
                        remarkPlugins={[remarkGfm]}
                        components={{
                          a: ({ node, ...props }) => (
                            <a
                              {...props}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-sky-500 hover:underline font-medium"
                            />
                          ),
                        }}
                      >
                        {msg.text}
                      </ReactMarkdown>
                    </div>
                    <span className="text-[9px] text-muted-foreground opacity-50 px-1 tabular-nums">
                      {msg.timestamp.toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </div>
                </div>
              ))
            )}

            {aiLoading && (
              <div className="flex w-full gap-x-3 anim fade-in">
                <div className="h-7 w-7 rounded-full flex items-center justify-center shrink-0 border bg-primary/10 border-primary/20">
                  <Bot className="h-3.5 w-3.5 text-primary animate-pulse" />
                </div>
                <div className="bg-muted border border-border/50 rounded-2xl rounded-tl-none px-4 py-2.5 flex items-center gap-x-1.5">
                  {[0, 1, 2].map((i) => (
                    <div
                      key={i}
                      className="h-1.5 w-1.5 rounded-full bg-primary/50 animate-bounce"
                      style={{ animationDelay: `${i * 150}ms` }}
                    />
                  ))}
                </div>
              </div>
            )}

            {aiError && (
              <div className="flex items-center gap-x-2 p-3 rounded-xl bg-destructive/10 text-destructive text-xs border border-destructive/20">
                <AlertCircle className="h-4 w-4 shrink-0" />
                <span>{aiError}</span>
              </div>
            )}
          </div>

          {/* AI Input Area */}
          <div className="p-4 bg-muted/20 border-t space-y-2">
            <form
              onSubmit={(e) => sendAiMessage(e)}
              className="relative flex items-end gap-2 bg-background border border-border/60 focus-within:ring-1 focus-within:ring-primary/30 rounded-xl p-2 transition-all duration-200 shadow-sm"
            >
              <TextareaAutosize
                minRows={1}
                maxRows={5}
                value={aiInput}
                onChange={(e) => setAiInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    if (aiInput.trim() && !aiLoading) {
                      sendAiMessage(undefined);
                    }
                  }
                }}
                placeholder="Tanyakan sesuatu tentang Nawfal..."
                className="flex-1 bg-transparent border-none focus:ring-0 outline-none resize-none text-xs md:text-sm py-1.5 max-h-[120px] scrollbar-thin scrollbar-thumb-border"
                disabled={aiLoading}
              />
              <Button
                type="submit"
                disabled={!aiInput.trim() || aiLoading}
                size="icon"
                variant="ghost"
                className="h-8 w-8 rounded-lg hover:bg-primary/10 text-primary transition-all disabled:opacity-30 mb-0.5 shrink-0"
              >
                <Send className="h-4 w-4" />
              </Button>
            </form>
            <div className="flex items-center justify-between px-1 text-[10px] text-muted-foreground opacity-60">
              <span>Official Nawfal AI Engine</span>
              <span>Accurate &amp; Factual</span>
            </div>
          </div>
        </div>
      </div>

      {/* ─── Interactive Height Resizer Bar (Bottom) ───────────────────────── */}
      <div
        onMouseDown={handleHeightMouseDown}
        onTouchStart={handleHeightMouseDown}
        onDoubleClick={() => setContainerHeight(780)}
        title="Drag vertically to resize height (Double click to reset height)"
        className={cn(
          "w-full flex items-center justify-center py-2 cursor-row-resize group z-20 transition-all mt-1",
          isDraggingHeight ? "opacity-100" : "opacity-60 hover:opacity-100"
        )}
      >
        <div
          className={cn(
            "flex items-center justify-center h-3 w-28 rounded-full border border-border/60 bg-popover/80 shadow-sm backdrop-blur-sm transition-all group-hover:border-primary/50 group-hover:bg-primary/10",
            isDraggingHeight && "border-primary bg-primary/20 ring-2 ring-primary/30"
          )}
        >
          <GripHorizontal className="h-3 w-3 text-muted-foreground group-hover:text-primary transition-colors" />
        </div>
      </div>
    </div>
  );
};

export default Chat;
