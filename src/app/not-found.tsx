import EmptyState from "@/components/EmptyState";

export default function NotFound() {
  return (
    <EmptyState
      code="৪০৪"
      title="পেজটি খুঁজে পাওয়া যায়নি"
      message="আপনি যে ঠিকানাটি খুঁজছেন সেটি নেই বা সরিয়ে নেওয়া হয়েছে।"
    />
  );
}