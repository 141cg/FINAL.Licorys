<!-- .github/copilot-instructions.md -->
# Copilot / AI agent instructions for Licorys (FINAL.Licorys)

Project snapshot
- Small static website (HTML/CSS/Vanilla JS + Bootstrap) serving a storefront-like UI.
- Data persistence is client-side using `localStorage` (no Node build or bundler).

Big picture & architecture
- Entry point: `index.html` — loads `styles.css` and `script.js`.
- UI: Bootstrap modals and components, plus custom CSS in `styles.css`.
- Data model: `script.js` contains the canonical default arrays:
  - `productosDefecto` (default products)
  - `comentariosDefecto` (default comments)
  These are serialized to `localStorage` keys: `productos`, `comentarios`, `mensajesContacto`.
- Authentication/registration UI is in `ingreso.html` and handled by `controlador.js` (SweetAlert notifications).
- API client helper: `consumo.js` exports `consumirAPI` for backend calls — currently points to `localhost:8080/registro`.

Important patterns & conventions (project-specific)
- Spanish identifiers: IDs and variables use Spanish names (e.g., `productoNombre`, `cajacontraseña`). Expect non-ASCII characters in IDs — prefer matching exact strings from the files.
- DOM-first wiring: Event listeners are registered by `id` and many functions rely on being global (e.g., `abrirEditarProducto`, `eliminarProducto`). Keep changes global-compatible or update all call sites.
- Default data is re-written on load: `inicializarDatos()` in `script.js` calls `localStorage.setItem('productos', JSON.stringify(productosDefecto))`. Be careful: modifying `productosDefecto` will change the initial dataset and the app will overwrite any existing `productos` when this function runs.
- UI state via `data-*` attributes: product edit mode is stored on `#formProducto.dataset.editando`.
- Notifications: `mostrarNotificacion()` appends Bootstrap alerts to `document.body` (auto-dismiss after 4s).

Integration points & external dependencies
- No JS build step: open `index.html` in browser or serve the folder as static files.
- `consumo.js` expects a backend at `localhost:8080`. The current implementation lacks `http://` and CORS/headers — when implementing backend calls, use `fetch('http://localhost:8080/registro', { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify(...) })` and ensure CORS enabled on server side.
- Third-party libs used in the UI:
  - Bootstrap 5 (CSS + bundle JS)
  - SweetAlert2 (used in `controlador.js`)

Developer workflows (how to run / test / debug)
- Quick local preview: open `index.html` in a browser.
- Prefer serving files via a static server to avoid CORS/file issues:
```powershell
python -m http.server 8000
```
- Inspect and edit `localStorage` in DevTools (Console):
```js
// view
JSON.parse(localStorage.getItem('productos'))
// clear
localStorage.clear()
```
- To update the backend client in `consumo.js` ensure the URL includes protocol and add JSON headers. Example replacement:
```js
export async function consumirAPI(datos) {
  const url = 'http://localhost:8080/registro'
  const peticion = { method: 'POST', headers: {'Content-Type':'application/json'}, body: JSON.stringify(datos) }
  const respuesta = await fetch(url, peticion)
  return respuesta.json()
}
```

Files to inspect first (highest signal)
- `index.html` — main UI and markup (modals, IDs used by `script.js`).
- `script.js` — app logic, storage patterns, events, and defaults. (Primary file to change app behavior.)
- `ingreso.html` + `controlador.js` — registration/login flow and SweetAlert usage.
- `consumo.js` — example API client; update when integrating a real backend.
- `styles.css` and `img/` — visual assets and variables.

Safe-to-change vs. be-careful
- Safe: CSS adjustments, small UI tweaks, adding new helper functions in separate files, adding tests/tools outside runtime.
- Be careful: renaming IDs or function names (many call sites assume globals), changing `inicializarDatos()` behavior (it overwrites stored products), and changing storage keys (will break persisted data across sessions).

Examples (concrete edits an agent might do)
- To change initial products: edit `productosDefecto` in `script.js`.
- To make `consumirAPI` send proper JSON: update `consumo.js` as shown above.
- To avoid overwriting user data on load: modify `inicializarDatos()` — only set `productos` if the key is missing.

When opening PRs
- Include a short description referencing affected IDs (e.g., "updates `#btnGuardarProducto` wiring and preserves `localStorage.productos`").
- If you change an ID or a global function, update all HTML references and any inline `onclick` attributes in `script.js`/HTML.

Questions for the maintainer
- Should `inicializarDatos()` keep existing `productos` if present? (It currently always replaces them.)
- Is there an intended backend API contract for `consumo.js` (headers, response shape)?

If anything above is unclear or you'd like more examples (e.g., a suggested patch to preserve localStorage), tell me which area to expand.
