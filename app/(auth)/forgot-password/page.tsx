import type { Metadata } from "next";
import ForgotPasswordForm from "@/features/auth/components/ForgotPasswordForm";

export const metadata: Metadata = { title: "Reset password | Season Marketing" };

export default function ForgotPasswordPage() {
  return <ForgotPasswordForm />;
}