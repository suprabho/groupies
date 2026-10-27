"use client";

import { useState } from "react";
import { BookOpen, X } from "@phosphor-icons/react";

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  coverImage: string;
  content: string;
}

interface BlogSectionProps {
  posts: BlogPost[];
}

export default function BlogSection({ posts }: BlogSectionProps) {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  return (
    <section className="py-12">
      {/* Section heading */}
      <div className="flex items-center gap-3 mb-8">
        <BookOpen size={24} weight="fill" className="text-[#e8ff47]" />
        <h2 className="text-2xl font-bold text-[#f5f5f0]">Blog</h2>
      </div>

      {/* Card grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => {
          const isExpanded = expandedId === post.id;

          return (
            <div
              key={post.id}
              className={`rounded-xl border border-[#2a2a2a] bg-[#161616] overflow-hidden transition-all duration-300 ${
                isExpanded
                  ? "md:col-span-2 lg:col-span-3"
                  : "hover:-translate-y-1 hover:border-[#e8ff47]/30 cursor-pointer"
              }`}
              onClick={() => {
                if (!isExpanded) setExpandedId(post.id);
              }}
            >
              {/* Cover image placeholder */}
              <div className="relative h-48 overflow-hidden">
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(135deg, #1e1e1e 0%, #2a2a2a 50%, #111111 100%)",
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#161616] via-transparent to-transparent" />
                <p className="absolute bottom-4 left-4 right-4 text-sm font-medium text-[#999999]/60 line-clamp-1">
                  {post.title}
                </p>
              </div>

              {/* Card body */}
              <div className="p-5">
                <h3 className="text-lg font-semibold text-[#f5f5f0] mb-2">
                  {post.title}
                </h3>

                {!isExpanded && (
                  <p className="text-sm text-[#999999] line-clamp-2 mb-4">
                    {post.excerpt}
                  </p>
                )}

                {isExpanded && (
                  <div className="mb-4">
                    <p className="text-sm text-[#999999] mb-4">{post.excerpt}</p>
                    <div className="text-sm text-[#666666] leading-relaxed whitespace-pre-line">
                      {post.content}
                    </div>
                  </div>
                )}

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3 text-xs text-[#666666]">
                    <span>{post.date}</span>
                    <span className="w-1 h-1 rounded-full bg-[#666666]" />
                    <span>{post.readTime}</span>
                  </div>

                  {isExpanded && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setExpandedId(null);
                      }}
                      className="flex items-center gap-1.5 text-xs font-medium text-[#e8ff47] hover:text-[#e8ff47]/80 transition-colors cursor-pointer"
                    >
                      <X size={14} weight="bold" />
                      Close
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
