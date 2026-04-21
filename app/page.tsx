import Link from "next/link";
import { HomeSearch } from "@/components/home-search";
import { HomeSummary } from "@/components/home-summary";
import { getHomePageData } from "@/lib/data";
import { formatRating } from "@/lib/utils";

export default async function HomePage() {
  const { quads, buildings } = await getHomePageData();
  const reviewedBuildings = quads.reduce((total, quad) => total + quad.buildingCount, 0);
  const totalReviews = quads.reduce((total, quad) => total + quad.reviewCount, 0);
  const ratedQuads = quads.filter((quad) => quad.reviewCount > 0);

  return (
    <div className="shell pb-16 pt-12 sm:pb-24 sm:pt-20">
      <section className="grid gap-8 lg:grid-cols-[1.08fr_0.92fr] lg:items-start">
        <div className="space-y-6">
          <div className="space-y-4">
            <p className="eyebrow">Stony Brook Housing Guide</p>
            <div className="space-y-3">
              <h1 className="font-[family-name:var(--font-heading)] text-5xl font-bold tracking-tight sm:text-6xl">
                RatemyRez
              </h1>
              <p className="max-w-2xl text-lg leading-8 text-[color:var(--muted)]">
                A cleaner way to compare Stony Brook dorms, jump to a specific hall, and read
                student reviews that actually help with housing decisions.
              </p>
            </div>
          </div>

          <HomeSearch buildings={buildings} />

          <div className="flex flex-wrap gap-3">
            <Link href="/quads" className="btn-primary">
              Browse Dorms
            </Link>
            <Link href="/review" className="btn-secondary">
              Leave a Review
            </Link>
          </div>
          <div className="flex flex-wrap gap-3 text-sm text-[color:var(--muted)]">
            <span className="pill">Structured ratings</span>
            <span className="pill">Verified `@stonybrook.edu` sign-in</span>
            <span className="pill">One review per student per building</span>
          </div>
        </div>

        <div className="panel-strong overflow-hidden p-6 sm:p-8">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="eyebrow">At A Glance</p>
              <h2 className="mt-2 font-[family-name:var(--font-heading)] text-2xl font-semibold">
                Find the right dorm faster.
              </h2>
            </div>
            <div className="rounded-full bg-[color:var(--brand-soft)] px-4 py-2 text-sm font-semibold text-[color:var(--brand-deep)]">
              RatemyRez
            </div>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <HomeSummary label="Quads" value={quads.length.toString()} />
            <HomeSummary label="Buildings in directory" value={reviewedBuildings.toString()} />
            <HomeSummary label="Published reviews" value={totalReviews.toString()} />
            <HomeSummary
              label="Average sentiment"
              value={
                ratedQuads.length > 0
                  ? `${(
                      ratedQuads.reduce((sum, quad) => sum + quad.averageRating, 0) /
                      ratedQuads.length
                    ).toFixed(1)} / 5`
                  : "N/A"
              }
            />
          </div>

          <div className="mt-8 rounded-[1.25rem] bg-[color:var(--brand-deep)] p-5 text-white">
            <p className="text-sm uppercase tracking-[0.2em] text-white/70">Quick Start</p>
            <ol className="mt-3 space-y-3 text-sm text-white/85">
              <li>1. Search a building directly from the homepage.</li>
              <li>2. Open a quad to compare halls side by side.</li>
              <li>3. Leave your own verified review after signing in with your SBU email.</li>
            </ol>
          </div>
        </div>
      </section>

      <section className="mt-12 space-y-4 sm:mt-16">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div className="space-y-2">
            <p className="eyebrow">Quick View</p>
            <h2 className="section-title font-[family-name:var(--font-heading)]">
              Scroll through quads and jump straight into dorm pages.
            </h2>
            <p className="max-w-3xl text-lg text-[color:var(--muted)]">
              Each card gives you the community snapshot and the fastest route into individual
              halls.
            </p>
          </div>
          <Link href="/quads" className="btn-secondary w-fit">
            View all quads
          </Link>
        </div>

        <div className="flex snap-x gap-4 overflow-x-auto pb-2">
          {quads.map((quad) => (
            <article
              key={quad.id}
              className="panel-strong min-w-[290px] snap-start p-5 sm:min-w-[320px]"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="eyebrow">Quad</p>
                  <h3 className="mt-2 font-[family-name:var(--font-heading)] text-2xl font-semibold">
                    {quad.name}
                  </h3>
                </div>
                <span className="rounded-full bg-[color:var(--brand-soft)] px-3 py-1 text-sm font-semibold text-[color:var(--brand-deep)]">
                  {formatRating(quad.averageRating)}
                </span>
              </div>

              <div className="mt-5 grid grid-cols-3 gap-3 text-center">
                <div className="rounded-2xl bg-white/80 px-3 py-4">
                  <p className="text-xs uppercase tracking-[0.18em] text-[color:var(--muted)]">
                    Buildings
                  </p>
                  <p className="mt-2 text-xl font-semibold">{quad.buildingCount}</p>
                </div>
                <div className="rounded-2xl bg-white/80 px-3 py-4">
                  <p className="text-xs uppercase tracking-[0.18em] text-[color:var(--muted)]">
                    Reviews
                  </p>
                  <p className="mt-2 text-xl font-semibold">{quad.reviewCount}</p>
                </div>
                <div className="rounded-2xl bg-white/80 px-3 py-4">
                  <p className="text-xs uppercase tracking-[0.18em] text-[color:var(--muted)]">
                    Avg
                  </p>
                  <p className="mt-2 text-xl font-semibold">{formatRating(quad.averageRating)}</p>
                </div>
              </div>

              <div className="mt-5 flex flex-wrap gap-2">
                {quad.buildings.slice(0, 6).map((building) => (
                  <Link key={building.id} href={`/buildings/${building.slug}`} className="pill">
                    {building.name}
                  </Link>
                ))}
                {quad.buildings.length > 6 ? (
                  <Link href={`/quads/${quad.slug}`} className="pill">
                    +{quad.buildings.length - 6} more
                  </Link>
                ) : null}
              </div>

              <Link
                href={`/quads/${quad.slug}`}
                className="mt-6 inline-flex text-sm font-semibold text-[color:var(--brand-deep)]"
              >
                Open {quad.name}
              </Link>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
