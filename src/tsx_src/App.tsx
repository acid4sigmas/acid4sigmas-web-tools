import "../App.css";

import { Container } from "./ui_components/Container.tsx";
import TopBar from "./TopBar.tsx";

function App() {
  return (
    <Container>
      <TopBar />
      <h2 className="text-2xl font-bold">Welcome to Acid4Sigmas images</h2>
      <p>this is a simple image editor</p>
      <hr />
      <h3 className="text-xl font-bold">How does it work?</h3>
      <p>
        Acid4sigmas images uses WebAssembly as its core for editing pictures :)
      </p>
      <p>it's written in rust and to 100% OpenSource</p>
      <hr />
      <h3 className="text-xl font-bold">Get started</h3>
      <div className="flex justify-center">
        <ol className="list-decimal pl-6 w-fit">
          <li>Open the navbar</li>
          <li>click on editor</li>
          <li>enjoy!</li>
        </ol>
      </div>

      <p className="font-light text-xs">
        please note that the editor is not quite finished yet, and the source
        code is not publicly available yet because i still need to clean up the
        repo :)
        <a href="https://github.com/acid4sigmas/acid4sigmas-web-tools">
          GitHub Repo
        </a>
      </p>
    </Container>
  );
}

export default App;
