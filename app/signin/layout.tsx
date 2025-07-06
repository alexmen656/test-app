import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign In - Beta Bay",
  description: "Sign in to Beta Bay to start testing amazing apps",
};

export default function SignInLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen">
      {children}
    </div>
  );
}
