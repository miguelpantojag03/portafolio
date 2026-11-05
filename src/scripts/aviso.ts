/** Avisos breves ("Email copiado") anunciados a lectores de pantalla por una región viva. */
let temporizador: number | undefined;

export function mostrarAviso(texto: string, tipo: 'exito' | 'error' | 'info' = 'info', duracion = 3200) {
  const aviso = document.querySelector<HTMLElement>('[data-aviso]');
  if (!aviso) return;
  aviso.textContent = texto;
  aviso.dataset.tipo = tipo;
  aviso.dataset.visible = '';
  window.clearTimeout(temporizador);
  temporizador = window.setTimeout(() => {
    delete aviso.dataset.visible;
  }, duracion);
}
