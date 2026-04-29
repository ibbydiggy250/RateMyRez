# RateMyRez

RateMyRez is a Stony Brook dorm review platform built to make housing decisions less scattered, less stressful, and more grounded in real student experience.

Every year, students try to figure out where to live by piecing together Reddit threads, old forum posts, group chat opinions, and half-remembered advice from upperclassmen. I ran into that problem myself as a freshman, so I built RateMyRez to put the important dorm information in one place.

Students can browse residence halls by quad, compare buildings side by side, and read structured reviews from other Stony Brook students. Anyone can explore the dorm information, but only verified `@stonybrook.edu` users can submit reviews.

## Live Site

Visit RateMyRez at [ratemyrezsbu.com](https://www.ratemyrezsbu.com).

## Why I Built This

Picking a dorm is one of the first big decisions students make on campus, but the information available is often fragmented or outdated. A building might be quiet but far from classes. Another might have a better social scene but weaker bathrooms or amenities. Those tradeoffs are hard to understand from a single comment thread.

RateMyRez is meant to turn that messy search into a clearer decision process. Instead of asking, "Which dorm is best?" it helps students ask better questions:

- Which building fits the way I want to live?
- What do students consistently like or dislike about it?
- How does it compare with another dorm I am considering?
- Would people who lived there choose it again?

The goal is simple: give students a central, student-powered housing guide before they make their selection.

## Features

- Browse dorms by Stony Brook quad or individual building
- Search for dorms directly from the home page
- View building pages with overall ratings, review counts, category averages, and full review history
- Compare two dorms side by side across ratings, building type, kitchen access, review count, class-year trends, and "would live again" percentage
- Submit structured reviews with scores for cleanliness, noise, bathrooms, location, social life, amenities, and room quality
- Add written pros, cons, residence dates, class year, and best-fit tags
- Upload dorm photos with reviews
- Require verified `@stonybrook.edu` sign-in for review submission
- Limit each student to one review per building
- Keep reviews public to read so students can browse without needing an account

## Tech Stack

- Next.js App Router
- React
- TypeScript
- Tailwind CSS
- Supabase Auth
- Supabase Postgres
- Supabase Storage for review photos
- Vercel-ready deployment structure

## Review Model

RateMyRez uses structured review fields so dorms can be compared consistently instead of relying only on free-form comments. Each review includes:

- Overall rating
- Cleanliness rating
- Noise rating
- Bathroom rating
- Location rating
- Social life rating
- Amenities rating
- Room quality rating
- Whether the student would live there again
- Best-fit category
- Class year when the student lived there
- Residence semester range
- Written review, pros, cons, and optional photos

## Access Rules

- Anyone can browse dorms, ratings, comparisons, and public reviews.
- Only users with a `@stonybrook.edu` email address can submit reviews.
- Each authenticated student can leave only one review per building.
- Profile rows are created automatically from Supabase Auth users through the database schema.

## Roadmap Ideas

- Expand and refine the dorm data set
- Add more filtering and sorting options
- Improve photo browsing on building pages
- Add moderation tools for review quality
- Surface trends as more students submit reviews

## About

RateMyRez started as a small project after I went through the Stony Brook housing selection process and realized how hard it was to find clear, current dorm information. It is built for students who want to make a better housing decision without digging through scattered posts and outdated advice.
