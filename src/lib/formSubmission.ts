export type StructuredFormType = "careers" | "investor-sourcing";

export type StructuredFormSubmission<TPayload> = {
  formType: StructuredFormType;
  inquiryType: string;
  sourcePage: string;
  startedAt: string;
  payload: TPayload;
};

export class FormSubmissionError extends Error {
  status: number;

  constructor(status: number) {
    super("Form submission failed.");
    this.name = "FormSubmissionError";
    this.status = status;
  }
}

export const buildStructuredFormSubmission = <TPayload>(
  formType: StructuredFormType,
  inquiryType: string,
  payload: TPayload,
  sourcePage: string,
  startedAt: string,
): StructuredFormSubmission<TPayload> => ({
  formType,
  inquiryType,
  sourcePage,
  startedAt,
  payload,
});

export const submitStructuredForm = async <TPayload>(
  submission: StructuredFormSubmission<TPayload>,
) => {
  const response = await fetch("/api/forms", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(submission),
  });

  if (!response.ok) throw new FormSubmissionError(response.status);
  return response.json() as Promise<{ ok: true }>;
};
