import type { Metadata } from "next";
import SignInForm from "@/features/auth/components/SignInForm";

export const metadata: Metadata = { title: "Sign in | Season Marketing" };

export default function SignInPage() {
  return <SignInForm />;
}