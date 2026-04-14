import { useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getQuoteById, updateQuote } from "../api/quotes";
import { QuoteForm, type QuoteFormValues } from "../components/QuoteForm";

export function EditQuotePage() {
  const { id } = useParams();
  const quoteId = Number(id);
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data: quote, isLoading, isError } = useQuery({
    queryKey: ["quote", quoteId],
    queryFn: () => getQuoteById(quoteId),
    enabled: Number.isFinite(quoteId),
  });

  const updateMutation = useMutation({
    mutationFn: (values: QuoteFormValues) =>
      updateQuote(quoteId, {
        quote: {
          content: values.content,
          author: values.author,
          book_title: values.book_title,
          notes: values.notes,
          is_public: values.is_public,
          tag_names: values.tag_names,
        },
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["quotes"] });
      queryClient.invalidateQueries({ queryKey: ["quote", quoteId] });
      navigate("/");
    },
  });

  const initialValues = useMemo(() => {
    if (!quote) return undefined;

    return {
      content: quote.content,
      author: quote.author ?? "",
      book_title: quote.book_title ?? "",
      notes: quote.notes ?? "",
      is_public: quote.is_public,
      tag_names: quote.tags?.map((tag) => tag.name) ?? [],
    };
  }, [quote]);

  async function handleSubmit(values: QuoteFormValues) {
    await updateMutation.mutateAsync(values);
  }

  const formError =
    (updateMutation.error as any)?.response?.data?.errors?.join(", ") ||
    "Failed to update quote";

  if (isLoading) {
    return <div className="text-slate-600">Loading quote...</div>;
  }

  if (isError || !quote) {
    return <div className="text-red-600">Failed to load quote.</div>;
  }

  return (
    <section className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold tracking-tight text-slate-900">
          Edit Quote
        </h1>
        <p className="mt-1 text-slate-600">Update your quote details and tags.</p>
      </div>

      <QuoteForm
        initialValues={initialValues}
        onSubmit={handleSubmit}
        isSubmitting={updateMutation.isPending}
        submitLabel="Update Quote"
        formError={updateMutation.isError ? formError : ""}
      />
    </section>
  );
}