import { createClientFromRequest } from 'npm:@base44/sdk@0.8.52';

// ── Autonomous SEO Content Generator ──────────────────────────────────────
// Uses InvokeLLM with web search (gemini_3_8_flash) to research trending
// mushroom coffee / instant coffee topics and generate a high-quality blog
// post draft. Saves as published:false so a human reviews before it goes live.
//
// Called by the "Weekly SEO Content Generator" workflow every Monday at 9am.

const CONTENT_PROMPT = `You are an expert SEO content strategist and coffee writer for Torch Republic Coffee Company, a premium DTC brand selling instant coffee and mushroom coffee.

Your task: Research current trending topics, questions, and search queries related to mushroom coffee, instant coffee, lion's mane coffee, chaga coffee, adaptogens, and morning rituals. Find a topic that has real search demand but where existing content is thin or low quality.

Then write ONE exceptional blog post that:
1. Targets a specific long-tail keyword with genuine search demand
2. Provides real, actionable value — practical tips, specific benefits, honest comparisons
3. Naturally references Torch Republic products where genuinely relevant (Instant Classic Coffee for bold energy; Instant Mushroom Coffee for focus with functional mushroom extracts)
4. Is 800-1200 words, well-structured with H2 and H3 headings
5. Includes a brief FAQ section (3-5 questions with concise answers)
6. Reads like it was written by a knowledgeable coffee expert, NOT generic AI content
7. Has a unique angle or perspective — not just rehashing what's already out there

Tone: warm, authoritative, practical. Like a knowledgeable friend who really knows coffee.

Categories available: science, habits, recipes, wellness, news.

Return the complete blog post as structured JSON.`;

export default async function(req) {
  try {
    const base44 = createClientFromRequest(req);

    // Admin-only: scheduled workflow provides service-level admin auth
    const user = await base44.auth.me();
    if (user?.role !== 'admin') {
      return Response.json({ error: 'Forbidden: Admin access required' }, { status: 403 });
    }

    // Generate blog post using LLM with live web search
    const result = await base44.asServiceRole.integrations.Core.InvokeLLM({
      prompt: CONTENT_PROMPT,
      add_context_from_internet: true,
      model: 'gemini_3_8_flash',
      response_json_schema: {
        type: 'object',
        properties: {
          title: { type: 'string', description: 'SEO-optimized title under 60 characters' },
          slug: { type: 'string', description: 'URL-friendly slug, lowercase with hyphens' },
          excerpt: { type: 'string', description: 'Compelling 1-2 sentence summary under 160 characters' },
          content: { type: 'string', description: 'Full HTML blog post content with h2/h3, paragraphs, lists, and a FAQ section' },
          category: { type: 'string', enum: ['science', 'habits', 'recipes', 'wellness', 'news'] },
          tags: { type: 'array', items: { type: 'string' }, description: '3-5 relevant tags' },
          target_keyword: { type: 'string', description: 'The primary keyword this article targets' },
          seo_title: { type: 'string', description: 'SEO page title under 60 chars' },
          seo_description: { type: 'string', description: 'Meta description under 160 chars' },
        },
        required: ['title', 'slug', 'excerpt', 'content', 'category'],
      },
    });

    // Calculate read time from word count
    const wordCount = (result.content || '').split(/\s+/).filter(Boolean).length;
    const readTime = Math.max(3, Math.ceil(wordCount / 200));

    // De-duplicate slug if one already exists
    const slugBase = result.slug
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');

    const existing = await base44.asServiceRole.entities.BlogPost.filter({ slug: slugBase });
    const finalSlug = existing && existing.length > 0
      ? `${slugBase}-${Date.now().toString(36)}`
      : slugBase;

    // Save as DRAFT — human reviews before publishing
    const blogPost = await base44.asServiceRole.entities.BlogPost.create({
      title: result.title,
      slug: finalSlug,
      excerpt: result.excerpt,
      content: result.content,
      category: result.category,
      tags: result.tags || [],
      author: 'Torch Republic',
      published: false,
      published_date: new Date().toISOString(),
      read_time: readTime,
    });

    // Track generation for analytics
    try {
      await base44.asServiceRole.analytics.track({
        eventName: 'seo_blog_post_generated',
        properties: {
          title: result.title,
          slug: finalSlug,
          target_keyword: result.target_keyword || '',
          word_count: wordCount,
        },
      });
    } catch (_) {}

    return Response.json({
      success: true,
      message: 'Blog post draft generated. Review and publish from the blog editor.',
      post: {
        id: blogPost.id,
        title: blogPost.title,
        slug: finalSlug,
        target_keyword: result.target_keyword,
        word_count: wordCount,
        read_time: readTime,
        category: result.category,
      },
    });
  } catch (error) {
    return Response.json({ error: error.message, success: false }, { status: 500 });
  }
}