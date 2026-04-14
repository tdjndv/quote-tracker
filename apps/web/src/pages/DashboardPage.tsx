import { Link } from "react-router-dom";
import { useMemo, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteQuote, getQuotes } from "../api/quotes";
import { useAuthStore } from "../store/authStore";
import { QuoteCard } from "../components/QuoteCard";

export function DashboardPage() {
  const user = useAuthStore((s) => s.user);
  const queryClient = useQueryClient();

  const [search, setSearch] = useState("");
  const [selectedTag, setSelectedTag] = useState("");

  const { data: quotes = [], isLoading, isError } = useQuery({
    queryKey: ["quotes"],
    queryFn: getQuotes,
    enabled: !!user,
  });

  const deleteMutation = useMutation({
    mutationFn: deleteQuote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["quotes"] });
    },
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

  function handleDelete(id: number) {
    deleteMutation.mutate(id);
  }

  if (!user) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm">
        <h1 className="text-2xl font-semibold text-slate-900">Welcome to Quote Tracker</h1>
        <p className="mt-2 text-slate-600">
          Log in to create, edit, and organize your favorite book quotes.
        </p>
        <div className="mt-6 flex justify-center gap-3">
          <Link
            to="/login"
            className="rounded-xl bg-slate-900 px-4 py-2 text-white hover:bg-slate-800"
          >
            Login
          </Link>
          <Link
            to="/signup"
            className="rounded-xl border border-slate-300 px-4 py-2 text-slate-700 hover:bg-slate-50"
          >
            Signup
          </Link>
          <Link
            to="/public"
            className="rounded-xl border border-slate-300 px-4 py-2 text-slate-700 hover:bg-slate-50"
          >
            Browse Public Quotes
          </Link>
        </div>
      </div>
    );
  }

  return (
    <section className="space-y-6">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight text-slate-900">
            Your Quotes
          </h1>
          <p className="mt-1 text-slate-600">
            Save memorable lines, organize them with tags, and revisit them anytime.
          </p>
        </div>

        <div className="flex gap-3">
          <Link
            to="/public"
            className="inline-flex items-center justify-center rounded-xl border border-slate-300 px-4 py-2 text-slate-700 hover:bg-slate-50"
          >
            Public Quotes
          </Link>
          <Link
            to="/quotes/new"
            className="inline-flex items-center justify-center rounded-xl bg-slate-900 px-4 py-2 text-white hover:bg-slate-800"
          >
            + New Quote
          </Link>
        </div>
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

      {isLoading ? <div className="text-slate-600">Loading quotes...</div> : null}
      {isError ? <div className="text-red-600">Failed to load quotes.</div> : null}

      {!isLoading && !filteredQuotes.length ? (
        <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center">
          <p className="text-lg font-medium text-slate-900">No matching quotes</p>
          <p className="mt-2 text-slate-600">
            Try a different keyword or tag filter, or create a new quote.
          </p>
          <Link
            to="/quotes/new"
            className="mt-5 inline-flex rounded-xl bg-slate-900 px-4 py-2 text-white hover:bg-slate-800"
          >
            Create a quote
          </Link>
        </div>
      ) : null}

      <div className="grid gap-4">
        {filteredQuotes.map((quote) => (
          <QuoteCard
            key={quote.id}
            quote={quote}
            onDelete={handleDelete}
            isDeleting={deleteMutation.isPending && deleteMutation.variables === quote.id}
          />
        ))}
      </div>
    </section>
  );
}