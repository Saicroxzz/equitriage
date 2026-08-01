import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

/**
 * Genera y descarga un archivo PDF del reporte de triaje clínico equino.
 * @param {HTMLElement} element - Elemento DOM que contiene la plantilla visual del reporte.
 * @param {string} patientName - Nombre del paciente para nombrar el archivo.
 */
export async function generatePDF(element, patientName = 'Equino') {
  if (!element) {
    throw new Error('No se encontró el elemento para generar el PDF.');
  }

  const parent = element.parentElement;
  const parentWasHidden = parent && (parent.style.display === 'none' || parent.classList.contains('hidden'));
  if (parentWasHidden) {
    parent.style.display = 'block';
  }
  const originalStyle = element.style.display;
  element.style.display = 'block';

  try {
    const canvas = await html2canvas(element, {
      scale: 2, // Mayor resolución para texto clínico nítido
      useCORS: true,
      logging: false,
      backgroundColor: '#ffffff',
      windowWidth: 800,
      onclone: (clonedDoc) => {
        // html2canvas no soporta las funciones de color modernas como "oklch" de Tailwind CSS v4.
        // En producción, los estilos están en archivos <link rel="stylesheet"> o document.styleSheets.

        // 1. Sanitizar todos los bloques <style> inline en el documento clonado
        const styleElements = clonedDoc.querySelectorAll('style');
        styleElements.forEach((style) => {
          if (style.textContent) {
            style.textContent = style.textContent
              .replace(/oklch\([^;}]*\)/gi, '#000000')
              .replace(/oklab\([^;}]*\)/gi, '#000000');
          }
        });

        // 2. Extraer y sanitizar todas las reglas CSS cargadas en document.styleSheets
        // e inyectarlas como un bloque <style> sanitizado, para que html2canvas no dependa de <link> con oklch
        try {
          let aggregatedCss = '';
          const sheets = Array.from(document.styleSheets || []);
          sheets.forEach((sheet) => {
            try {
              const rules = sheet.cssRules || sheet.rules;
              if (rules) {
                Array.from(rules).forEach((rule) => {
                  aggregatedCss += rule.cssText + '\n';
                });
              }
            } catch (e) {
              // Manejo de posibles restricciones CORS al leer stylesheets
            }
          });

          if (aggregatedCss) {
            const sanitizedStyle = clonedDoc.createElement('style');
            sanitizedStyle.textContent = aggregatedCss
              .replace(/oklch\([^;}]*\)/gi, '#000000')
              .replace(/oklab\([^;}]*\)/gi, '#000000');
            clonedDoc.head.appendChild(sanitizedStyle);
          }
        } catch (e) {
          console.warn('Error al sanitizar styleSheets para PDF:', e);
        }

        // 3. Eliminar los tags <link rel="stylesheet"> del documento clonado para evitar que html2canvas los vuelva a parsear con oklch sin sanitizar
        const linkElements = clonedDoc.querySelectorAll('link[rel="stylesheet"]');
        linkElements.forEach((link) => {
          link.remove();
        });

        // 4. Sanitizar atributos style inline en elementos del DOM si contuvieran oklch
        const elementsWithStyle = clonedDoc.querySelectorAll('[style*="oklch"], [style*="oklab"]');
        elementsWithStyle.forEach((el) => {
          const styleAttr = el.getAttribute('style');
          if (styleAttr) {
            el.setAttribute(
              'style',
              styleAttr
                .replace(/oklch\([^;}]*\)/gi, '#000000')
                .replace(/oklab\([^;}]*\)/gi, '#000000')
            );
          }
        });
      },
    });

    if (!canvas.width || !canvas.height) {
      throw new Error('No se pudo calcular el tamaño del reporte para la generación del PDF.');
    }

    const imgData = canvas.toDataURL('image/jpeg', 0.95);
    const pdf = new jsPDF('p', 'mm', 'a4');

    const pdfWidth = pdf.internal.pageSize.getWidth(); // 210mm
    const pdfHeight = pdf.internal.pageSize.getHeight(); // 297mm

    // Margenes de impresion (mm)
    const marginX = 8;
    const marginY = 8;
    const printableWidth = pdfWidth - (marginX * 2);   // 194mm
    const printableHeight = pdfHeight - (marginY * 2); // 281mm

    const elementWidth = canvas.width / 2;
    const elementHeight = canvas.height / 2;

    // Calcular escala uniforme que ajuste alto y ancho sin deformar ni dividir la pagina
    const scaleX = printableWidth / elementWidth;
    const scaleY = printableHeight / elementHeight;
    const scale = Math.min(scaleX, scaleY, 1);

    const finalWidth = elementWidth * scale;
    const finalHeight = elementHeight * scale;

    // Centrar en la hoja A4
    const xOffset = (pdfWidth - finalWidth) / 2;
    const yOffset = (pdfHeight - finalHeight) / 2;

    pdf.addImage(imgData, 'JPEG', xOffset, yOffset, finalWidth, finalHeight);

    const sanitizedName = patientName.replace(/[^a-zA-Z0-9]/g, '_') || 'Paciente';
    const dateStr = new Date().toISOString().slice(0, 10);
    pdf.save(`Reporte_Triaje_${sanitizedName}_${dateStr}.pdf`);
  } catch (error) {
    console.error('Error al generar el PDF:', error);
    alert('Ocurrió un error al generar el PDF. Intente nuevamente.');
  } finally {
    element.style.display = originalStyle;
    if (parentWasHidden && parent) {
      parent.style.display = '';
    }
  }
}
