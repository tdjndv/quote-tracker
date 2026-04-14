import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getPublicQuotes } from "../api/quotes";

export function PublicQuotesPage() {
  const [search, setSearch] = useState("");
  const [selectedTag, setSelectedTag] = useState("");

  const { data: quotes = [], isLoading, isError } = useQuery({
    queryKey: ["publicQuotes"],
    queryFn: getPublicQuotes,
  });

  const allTags = useMemo(() => {
    const tagMap = new Map<string, string>();

    quotes.forEach((quote) => {
      quote.tags?.forEach((tag) => {
        tagMap.set(tag.name, tag.name);
      });
    });

    return Array.from(tagMap.values()).sort((a, b) => a.localeCompare(b));
  }, [quotes]);

  const filteredQuotes = useMemo(() => {
    const keyword = search.trim().toLowerCase();

    return quotes.filter((quote) => {
      const matchesSearch =
        !keyword ||
        quote.content.toLowerCase().includes(keyword) ||
        (quote.author ?? "").toLowerCase().includes(keyword) ||
        (quote.book_title ?? "").toLowerCase().includes(keyword) ||
        (quote.notes ?? "").toLowerCase().includes(keyword) ||
        quote.tags?.some((tag) => tag.name.toLowerCase().includes(keyword));

      const matchesTag =
        !selectedTag || quote.tags?.some((tag) => tag.name === selectedTag);

      return matchesSearch && matchesTag;
    });
  }, [quotes, search, selectedTag]);

  return (
    <section className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold tracking-tight text-slate-900">
          Public Quotes
        </h1>
        <p className="mt-1 text-slate-600">
          Explore quotes shared publicly by users.
        </p>
      </div>

      <div className="grid gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm md:grid-cols-[1fr_220px]">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search content, author, book, notes, or tags..."
          className="w-full rounded-xl border border-slate-300 px-3 py-2 outline-none transition focus:border-slate-500"
        />

        <select
          value={selectedTag}
          onChange={(e) => setSelectedTag(e.target.value)}
          className="w-full rounded-xl border border-slate-300 px-3 py-2 outline-none transition focus:border-slate-500"
        >
          <option value="">All tags</option>
          {allTags.map((tag) => (
            <option key={tag} value={tag}>
              #{tag}
            </option>
          ))}
        </select>
      </div>

      {isLoading ? <div className="text-slate-600">Loading public quotes...</div> : null}
      {isError ? <div className="text-red-600">Failed to load public quotes.</div> : null}

      {!isLoading && !filteredQuotes.length ? (
        <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center">
          <p className="text-lg font-medium text-slate-900">No matching quotes</p>
          <p className="mt-2 text-slate-600">
            Try a different keyword or tag filter.
          </p>
        </div>
      ) : null}

      <div className="grid gap-4">
        {filteredQuotes.map((quote) => (
          <article
            key={quote.id}
            className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
          >
            <p className="text-lg leading-7 text-slate-900">“{quote.content}”</p>

            <div className="mt-3 space-y-1 text-sm text-slate-600">
              <p>
                <span className="font-medium text-slate-800">Author:</span>{" "}
                {quote.author || "Unknown"}
              </p>
              <p>
                <span className="font-medium text-slate-800">Book:</span>{" "}
                {quote.book_title || "Unknown"}
              </p>
              {quote.notes ? (
                <p>
                  <span className="font-medium text-slate-800">Notes:</span>{" "}
                  {quote.notes}
                </p>
              ) : null}
              {quote.user?.email ? (
                <p>
                  <span className="font-medium text-slate-800">Shared by:</span>{" "}
                  {quote.user.email}
                </p>
              ) : null}
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              {quote.tags?.map((tag) => (
                <button
                  key={tag.id}
                  onClick={() => setSelectedTag(tag.name)}
                  className="rounded-full bg-blue-50 px-2.5 py-1 text-xs font-medium text-blue-700 hover:bg-blue-100"
                >
                  #{tag.name}
                </button>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}