import PopulateUserState from "@/components/atoms/PopulateUserState";
import "react-toastify/dist/ReactToastify.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      {children}
      <PopulateUserState />
    </>
  );
}
