import { redirect } from "next/navigation";

/** Legacy route — redirects to Антисписание experiment */
export default function MenuRedirectPage() {
  redirect("/discounts");
}
