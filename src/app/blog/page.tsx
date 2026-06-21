import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Clock, Calendar } from "lucide-react";
import { SmoothScroll } from "@/components/animations/SmoothScroll";
import { Navbar } from "@/components/sections/Navbar";
import { Footer } from "@/components/sections/Footer";
import { FadeIn } from "@/components/animations/FadeIn";
import { CtaBand } from "@/components/sections/CtaBand";
import { getAllPosts } from "@/lib/blog";
import { COPY } from "@/lib/content";

export const metadata: Metadata = {
  title: "Trucking Insurance Blog | Workers Comp Insights",
  description: "Expert guides on trucking workers' comp, DOT compliance, driver classification, experience mods, and more from our specialist team.",
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <SmoothScroll>
      <Navbar />
      <main className="pt-28">
        <section className="py-16 bg-warm-radial">
          <div className="container-wide text-center max-w-2xl mx-auto">
            <FadeIn>
              <p className="section-eyebrow mb-3">{COPY.blogPage.eyebrow}</p>
              <h1 className="font-heading font-extrabold text-espresso text-4xl sm:text-5xl">{COPY.blogPage.heading}</h1>
              <p className="mt-4 lead">{COPY.blogPage.sub}</p>
            </FadeIn>
          </div>
        </section>

        <section className="py-20 bg-white">
          <div className="container-wide">
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post, i) => (
                <FadeIn key={post.slug} delay={i * 0.06}>
                  <Link href={`/blog/${post.slug}`} className="group flex flex-col h-full card-base overflow-hidden hover:border-clay/30">
                    <div className="relative overflow-hidden h-48">
                      <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      <div className="absolute inset-0 bg-gradient-to-t from-espresso/40 via-transparent to-transparent" />
                    </div>
                    <div className="p-6 flex flex-col flex-1">
                      <div className="flex items-center gap-3 text-xs text-mocha mb-3">
                        <span className="flex items-center gap-1"><Calendar className="h-3.5 w-3.5" />{post.date}</span>
                        <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" />{post.readingTime}</span>
                      </div>
                      <h2 className="font-heading font-bold text-espresso text-lg mb-2 group-hover:text-clay transition-colors leading-snug">{post.title}</h2>
                      <p className="text-sm text-mocha leading-relaxed flex-1">{post.description}</p>
                      <div className="mt-4 flex items-center gap-1.5 text-sm font-heading font-bold text-clay">
                        Read article <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </Link>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        <CtaBand />
      </main>
      <Footer />
    </SmoothScroll>
  );
}
