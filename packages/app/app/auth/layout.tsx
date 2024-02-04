import LoginGuard from "@/components/atoms/LoginGuard";
import "react-toastify/dist/ReactToastify.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <LoginGuard />
      {children}
    </>
  );
}
