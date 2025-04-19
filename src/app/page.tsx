import { LoginForm } from "./login/LoginForm";
import Pagelanding from "./components/pagelanding"; // Jika kamu ingin menggunakan komponen ini
import Dasshhboard from "./components/dasshhboard"; // Pastikan untuk mengimpor Dashboard dengan benar

export default function Home() {
  return (
    <main>
      {/* Pilih komponen yang ingin ditampilkan, bisa LoginForm atau Dashboard */}
      <Dasshhboard />
      {/* Atau jika ingin langsung ke dashboard */}
      {/* <Dashboard /> */}
    </main>
  );
}

import Page from "./dashboard/page";