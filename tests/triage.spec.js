import { test, expect } from '@playwright/test';

test.describe('EQUITRIAGE - Web Application Tests', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('Módulo 1: Debe validar campos requeridos antes de avanzar', async ({ page }) => {
    // Intentar avanzar sin llenar el formulario
    const nextButton = page.getByRole('button', { name: /Siguiente: Evaluación Primaria ABCDE/i });
    await nextButton.click();

    // Verificar mensajes de error de validación
    await expect(page.getByText('El nombre del paciente es obligatorio')).toBeVisible();
    await expect(page.getByText('La edad es obligatoria')).toBeVisible();
    await expect(page.getByText('Ingrese un peso válido')).toBeVisible();
    await expect(page.getByText('La raza es obligatoria')).toBeVisible();
  });

  test('Flujo Completo: Evaluación Triaje Estable (VERDE)', async ({ page }) => {
    // Paso 1: Datos del Paciente
    await page.getByPlaceholder(/Ej. Tornado, Rayo/i).fill('Relámpago');
    await page.getByPlaceholder('Ej. 6').fill('5');
    await page.getByPlaceholder('Ej. 450').fill('480');
    await page.getByPlaceholder(/Ej. Pura Sangre Inglés/i).fill('Criollo Equino');
    await page.getByPlaceholder(/Ej. Juan Pérez/i).fill('Propietario Test');

    await page.getByRole('button', { name: /Siguiente: Evaluación Primaria ABCDE/i }).click();

    // Paso 2: ABCDE
    await expect(page.getByText(/Módulo 2: Evaluación Primaria ABCDE/i)).toBeVisible();
    await page.getByRole('button', { name: /Siguiente: Signos Vitales/i }).click();

    // Paso 3: Signos Vitales (Valores normales)
    await expect(page.getByText(/Módulo 3: Signos Vitales Equinos/i)).toBeVisible();
    await page.getByPlaceholder('Ej. 37.8').fill('37.8'); // Temp
    await page.getByPlaceholder('Ej. 36').fill('36');     // FC
    await page.getByPlaceholder('Ej. 12').fill('12');     // FR
    await page.getByPlaceholder('Ej. 1.5').fill('1.5');   // TRC

    await page.getByRole('button', { name: /Siguiente: Evaluación por Sistemas/i }).click();

    // Paso 4: Evaluación por Sistemas (Normal / No)
    await expect(page.getByText(/Módulo 4: Evaluación Clínica por Sistemas/i)).toBeVisible();
    await page.getByRole('button', { name: /Finalizar y Ver Resultado/i }).click();

    // Paso 5: Resultado Triaje VERDE (Heading visible)
    await expect(page.getByRole('heading', { name: /Prioridad Baja \(Paciente Estable\)/i })).toBeVisible();
  });

  test('Banderas Rojas: Alerta Inmediata de Triaje Rojo', async ({ page }) => {
    // Paso 1: Llenar datos básicos
    await page.getByPlaceholder(/Ej. Tornado, Rayo/i).fill('Furia');
    await page.getByPlaceholder('Ej. 6').fill('8');
    await page.getByPlaceholder('Ej. 450').fill('500');
    await page.getByPlaceholder(/Ej. Pura Sangre Inglés/i).fill('Paso Fino');
    await page.getByRole('button', { name: /Siguiente: Evaluación Primaria ABCDE/i }).click();

    // Paso 2: Marcar bandera roja (Inconsciente)
    await expect(page.getByText(/Módulo 2: Evaluación Primaria ABCDE/i)).toBeVisible();
    
    // Seleccionar Inconsciente
    await page.getByRole('button', { name: 'Inconsciente' }).click();

    // Verificar que aparece el banner de Alerta Crítica (Bandera Roja)
    await expect(page.getByText(/BANDERA ROJA - EMERGENCIA CRÍTICA DETECTADA/i)).toBeVisible();
  });

  test('Historial y Modal de Registros Guardados', async ({ page }) => {
    // Abrir modal de historial utilizando el botón por title
    const historyButton = page.getByTitle('Historial de Triajes');
    await historyButton.click();

    // Verificar que el modal de historial abre correctamente
    await expect(page.getByText('Historial de Evaluaciones Guardadas')).toBeVisible();
    await expect(page.getByText('No hay triajes guardados aún.')).toBeVisible();
  });

  test('Generación de PDF: Debe generar el PDF sin errores de color oklch', async ({ page }) => {
    let consoleError = null;
    page.on('console', msg => {
      if (msg.type() === 'error') {
        consoleError = msg.text();
      }
    });

    await page.getByPlaceholder(/Ej. Tornado, Rayo/i).fill('Relámpago');
    await page.getByPlaceholder('Ej. 6').fill('5');
    await page.getByPlaceholder('Ej. 450').fill('480');
    await page.getByPlaceholder(/Ej. Pura Sangre Inglés/i).fill('Criollo Equino');
    await page.getByRole('button', { name: /Siguiente: Evaluación Primaria ABCDE/i }).click();
    await page.getByRole('button', { name: /Siguiente: Signos Vitales/i }).click();
    await page.getByPlaceholder('Ej. 37.8').fill('37.8');
    await page.getByPlaceholder('Ej. 36').fill('36');
    await page.getByPlaceholder('Ej. 12').fill('12');
    await page.getByPlaceholder('Ej. 1.5').fill('1.5');
    await page.getByRole('button', { name: /Siguiente: Evaluación por Sistemas/i }).click();
    await page.getByRole('button', { name: /Finalizar y Ver Resultado/i }).click();

    // Trigger PDF download
    await page.getByRole('button', { name: /Generar Reporte PDF/i }).click();
    await page.waitForTimeout(1500);

    expect(consoleError).toBeNull();
  });

});
