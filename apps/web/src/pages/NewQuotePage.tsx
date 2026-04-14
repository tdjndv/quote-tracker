import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createQuote } from "../api/quotes";
import { QuoteForm, type QuoteFormValues } from "../components/QuoteForm";

export function NewQuotePage() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const createMutation = useMutation({
    mutationFn: createQuote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["quotes"] });
      navigate("/");
    },
  });

  async function handleSubmit(values: QuoteFormValues) {
    await createMutation.mutateAsync({
      quote: {
        content: values.content,
        author: values.author,
        book_title: values.book_title,
        notes: values.notes,
        is_public: values.is_public,
        tag_names: values.tag_names,
      },
    });
  }

  const formError =
    (createMutation.error as any)?.response?.data?.errors?.join(", ") ||
    "Failed to create quote";

  return (
    <section className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold tracking-tight text-slate-900">
          New Quote
        </h1>
        <p className="mt-1 text-slate-600">Add a new quote to your collection.</p>
      </div>

      <QuoteForm
        onSubmit={handleSubmit}
        isSubmitting={createMutation.isPending}
        submitLabel="Create Quote"
        formError={createMutation.isError ? formError : ""}
      />
    </section>
  );
}