import { useMemo, useState } from "react";
import type { Quote } from "../types/quote";

export type QuoteFormValues = {
  content: string;
  author: string;
  book_title: string;
  notes: string;
  is_public: boolean;
  tag_names: string[];
};

type QuoteFormProps = {
  initialValues?: Partial<QuoteFormValues>;
  onSubmit: (values: QuoteFormValues) => Promise<void> | void;
  isSubmitting?: boolean;
  submitLabel?: string;
  formError?: string;
};

export function QuoteForm({
  initialValues,
  onSubmit,
  isSubmitting = false,
  submitLabel = "Save Quote",
  formError = "",
}: QuoteFormProps) {
  const defaults = useMemo<QuoteFormValues>(
    () => ({
      content: initialValues?.content ?? "",
      author: initialValues?.author ?? "",
      book_title: initialValues?.book_title ?? "",
      notes: initialValues?.notes ?? "",
      is_public: initialValues?.is_public ?? false,
      tag_names: initialValues?.tag_names ?? [],
    }),
    [initialValues]
  );

  const [content, setContent] = useState(defaults.content);
  const [author, setAuthor] = useState(defaults.author);
  const [bookTitle, setBookTitle] = useState(defaults.book_title);
  const [notes, setNotes] = useState(defaults.notes);
  const [isPublic, setIsPublic] = useState(defaults.is_public);
  const [tagsInput, setTagsInput] = useState(defaults.tag_names.join(", "));

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const tagNames = tagsInput
      .split(",")
      .map((tag) => tag.trim())
      .filter(Boolean);

    await onSubmit({
      content,
      author,
      book_title: bookTitle,
      notes,
      is_public: isPublic,
      tag_names: Array.from(new Set(tagNames)),
    });
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div>
        <label className="mb-2 block text-sm font-medium text-slate-700">Quote</label>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={5}
          required
          className="w-full rounded-xl border border-slate-300 px-3 py-2 outline-none ring-0 transition focus:border-slate-500"
          placeholder="Write the quote here..."
        />
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">Author</label>
          <input
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className="w-full rounded-xl border border-slate-300 px-3 py-2 outline-none transition focus:border-slate-500"
            placeholder="e.g. Socrates"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">Book Title</label>
          <input
            value={bookTitle}
            onChange={(e) => setBookTitle(e.target.value)}
            className="w-full rounded-xl border border-slate-300 px-3 py-2 outline-none transition focus:border-slate-500"
            placeholder="e.g. Apology"
          />
        </div>
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-slate-700">Notes</label>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          rows={3}
          className="w-full rounded-xl border border-slate-300 px-3 py-2 outline-none transition focus:border-slate-500"
          placeholder="Optional notes..."
        />
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-slate-700">
          Tags
        </label>
        <input
          value={tagsInput}
          onChange={(e) => setTagsInput(e.target.value)}
          className="w-full rounded-xl border border-slate-300 px-3 py-2 outline-none transition focus:border-slate-500"
          placeholder="philosophy, life, wisdom"
        />
        <p className="mt-1 text-xs text-slate-500">Separate tags with commas.</p>
      </div>

      <label className="flex items-center gap-2 text-sm text-slate-700">
        <input
          type="checkbox"
          checked={isPublic}
          onChange={(e) => setIsPublic(e.target.checked)}
          className="h-4 w-4 rounded border-slate-300"
        />
        Make this quote public
      </label>

      {formError ? <p className="text-sm text-red-600">{formError}</p> : null}

      <button
        type="submit"
        disabled={isSubmitting}
        className="rounded-xl bg-slate-900 px-4 py-2 text-white hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {isSubmitting ? "Saving..." : submitLabel}
      </button>
    </form>
  );
}