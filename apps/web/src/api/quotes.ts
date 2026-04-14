import { api } from "./axios";
import type { Quote } from "../types/quote";

export type QuotePayload = {
  quote: {
    content: string;
    author?: string;
    book_title?: string;
    notes?: string;
    is_public?: boolean;
    tag_names?: string[];
  };
};

export async function getQuotes(): Promise<Quote[]> {
  const res = await api.get<Quote[]>("/quotes");
  return res.data;
}

export async function getPublicQuotes(): Promise<Quote[]> {
  const res = await api.get<Quote[]>("/public/quotes");
  return res.data;
}

export async function getQuoteById(id: number): Promise<Quote> {
  const res = await api.get<Quote>(`/quotes/${id}`);
  return res.data;
}

export async function createQuote(payload: QuotePayload): Promise<Quote> {
  const res = await api.post<Quote>("/quotes", payload);
  return res.data;
}

export async function updateQuote(id: number, payload: QuotePayload): Promise<Quote> {
  const res = await api.patch<Quote>(`/quotes/${id}`, payload);
  return res.data;
}

export async function deleteQuote(id: number): Promise<{ message: string }> {
  const res = await api.delete(`/quotes/${id}`);
  return res.data;
}