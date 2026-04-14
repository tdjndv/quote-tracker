import { Link } from "react-router-dom";
import type { Quote } from "../types/quote";

type QuoteCardProps = {
  quote: Quote;
  onDelete?: (id: number) => void;
  isDeleting?: boolean;
};

export function QuoteCard({ quote, onDelete, isDeleting = false }: QuoteCardProps) {
  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md">
      <div className="flex items-start justify-between gap-4">
        <div className="space-y-3">
          <p className="text-lg leading-7 text-slate-900">“{quote.content}”</p>

          <div className="space-y-1 text-sm text-slate-600">
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
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <span
              className={`rounded-full px-2.5 py-1 text-xs font-medium ${
                quote.is_public
                  ? "bg-emerald-100 text-emerald-700"
                  : "bg-slate-100 text-slate-700"
              }`}
            >
              {quote.is_public ? "Public" : "Private"}
            </span>

            {quote.tags?.map((tag) => (
              <span
                key={tag.id}
                className="rounded-full bg-blue-50 px-2.5 py-1 text-xs font-medium text-blue-700"
              >
                #{tag.name}
              </span>
            ))}
          </div>
        </div>

        <div className="flex shrink-0 gap-2">
          <Link
            to={`/quotes/${quote.id}/edit`}
            className="rounded-lg border border-slate-300 px-3 py-1.5 text-sm text-slate-700 hover:bg-slate-50"
          >
            Edit
          </Link>

          <button
            onClick={() => onDelete?.(quote.id)}
            disabled={isDeleting}
            className="rounded-lg border border-red-300 px-3 py-1.5 text-sm text-red-700 hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isDeleting ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>
    </article>
  );
}