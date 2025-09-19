app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "../views"));

document.addEventListener("DOMContentLoaded", async () => {
  try {
    const res = await fetch("/api/categorias");
    const data = await res.json();

    const tabla = document.getElementById("tablaCategorias");
    tabla.innerHTML = data
      .map(
        (c) => `
      <tr>
        <td>${c.nombre}</td>
        <td>${c.descripcion}</td>
        <td>
          <button class="btn btn-warning btn-sm">✏️ Editar</button>
          <button class="btn btn-danger btn-sm">🗑️ Eliminar</button>
        </td>
      </tr>
    `
      )
      .join("");
  } catch (err) {
    console.error("Error cargando categorías:", err);
  }
});
