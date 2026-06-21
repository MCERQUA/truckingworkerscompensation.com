import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Clock, Calendar, User } from "lucide-react";
import { SmoothScroll } from "@/components/animations/SmoothScroll";
import { Navbar } from "@/components/sections/Navbar";
import { Footer } from "@/components/sections/Footer";
import { FadeIn } from "@/components/animations/FadeIn";
import { CtaBand } from "@/components/sections/CtaBand";
import { getAllPosts, getPostBySlug } from "@/lib/blog";

export async function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};
  return {
    title: `${post.title} | Trucking WC Blog`,
    description: post.description,
    openGraph: { images: [post.image] },
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  return (
    <SmoothScroll>
      <Navbar />
      <main className="pt-28">
        <article>
          <section className="py-12 bg-warm-radial">
            <div className="container-wide max-w-3xl mx-auto">
              <FadeIn>
                <Link href="/blog" className="inline-flex items-center gap-2 text-sm text-mocha hover:text-clay transition-colors mb-6">
                  <ArrowLeft className="h-4 w-4" /> Back to Blog
                </Link>
                <h1 className="font-heading font-extrabold text-espresso text-3xl sm:text-4xl md:text-5xl leading-tight mb-4">{post.title}</h1>
                <p className="lead mb-6">{post.description}</p>
                <div className="flex flex-wrap items-center gap-4 text-sm text-mocha">
                  <span className="flex items-center gap-1.5"><User className="h-4 w-4" />{post.author}</span>
                  <span className="flex items-center gap-1.5"><Calendar className="h-4 w-4" />{post.date}</span>
                  <span className="flex items-center gap-1.5"><Clock className="h-4 w-4" />{post.readingTime}</span>
                </div>
              </FadeIn>
            </div>
          </section>

          <div className="relative h-64 sm:h-80 overflow-hidden">
            <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent" />
          </div>

          <section className="py-12 bg-white">
            <div className="container-wide max-w-3xl mx-auto">
              <FadeIn>
                <div className="prose prose-lg max-w-none prose-headings:font-heading prose-headings:text-espresso prose-h2:text-3xl prose-h3:text-xl prose-p:text-mocha prose-p:leading-relaxed prose-li:text-mocha prose-a:text-clay prose-a:no-underline hover:prose-a:underline prose-strong:text-espresso">
                  <div dangerouslySetInnerHTML={{ __html: post.content.replace(/^---[\s\S]*?---\n/, "") }} />
                </div>
              </FadeIn>
            </div>
          </section>
        </article>

        <CtaBand />
      </main>
      <Footer />
    </SmoothScroll>
  );
}
