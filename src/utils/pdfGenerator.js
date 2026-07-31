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
        // html2canvas no soporta la función de color "oklch" de Tailwind CSS v4.
        // Sanitizamos los bloques <style> del documento clonado reemplazando oklch por colores seguros.
        const styleElements = clonedDoc.querySelectorAll('style');
        styleElements.forEach((style) => {
          if (style.textContent && style.textContent.includes('oklch')) {
            style.textContent = style.textContent.replace(/oklch\([^)]+\)/gi, '#000000');
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
