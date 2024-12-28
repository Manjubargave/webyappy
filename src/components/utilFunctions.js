import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

/**
 * Copy visible table rows to the clipboard.
 * @param {HTMLElement} printRef - Reference to the table element.
 */
export const handleCopy = (printRef) => {
  const tableContent = printRef.current.innerText;
  navigator.clipboard.writeText(tableContent).then(() => {
    alert('Table content copied to clipboard!');
  }).catch(err => {
    console.error('Failed to copy: ', err);
  });
};

/**
 * Export the visible table content as an Excel file.
 * @param {HTMLElement} printRef - Reference to the table element.
 */
export const handleExcelExport = (printRef) => {
  const table = printRef.current;
  const ws = XLSX.utils.table_to_sheet(table); // Convert table HTML to worksheet
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'Users Data');
  XLSX.writeFile(wb, 'users_data.xlsx'); // Export to Excel
};

/**
 * Export the visible table content as a PDF file.
 * @param {HTMLElement} printRef - Reference to the table element.
 */
export const handlePDFExport = (printRef) => {
  const input = printRef.current;
  html2canvas(input).then((canvas) => {
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'mm', 'a4');
    const imgWidth = 210;
    const pageHeight = 295;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    let heightLeft = imgHeight;
    let position = 0;

    pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;

    while (heightLeft >= 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
    }

    pdf.save('users_data.pdf'); // Save the PDF
  });
};
export const handleExportCSV = (printRef) => {
    const rows = Array.from(printRef.current.querySelectorAll("tr")).map(row => {
      const cells = Array.from(row.querySelectorAll("th, td")).map(cell => cell.innerText);
      return cells.join(",");
    }).join("\n");
  
    const csvData = new Blob([rows], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(csvData);
    const a = document.createElement("a");
    a.href = url;
    a.download = "users_data.csv";
    a.click();
  };
  
 
  export const handlePrint = (printRef) => {
    const printContent = printRef.current.innerHTML;  // Get the content to print
  
    // Open a new window for the print view
    const printWindow = window.open("", "PrintWindow", "width=800,height=600");
  
    // Write the HTML content to the new window, including styles for printing
    printWindow.document.write(`
      <html>
        <head>
          <title>Print Table</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              margin: 20px;
            }
            table { 
              width: 100%; 
              border-collapse: collapse;
            }
            th, td { 
              padding: 8px; 
              border: 1px solid black; 
              text-align: left; 
            }
            th {
              background-color: #f2f2f2;
            }
            img { 
              max-width: 100px; 
              height: auto; 
            }
            @media print {
              body { margin: 0; }
              table { page-break-inside: auto; }
              tr { page-break-inside: avoid; page-break-after: auto; }
            }
          </style>
        </head>
        <body>
          <div>${printContent}</div>
        </body>
      </html>
    `);
  
    // Close the document stream for the new window
    printWindow.document.close();
  
    // Focus on the print window
    printWindow.focus();
  
    // Trigger the print dialog
    printWindow.print();
  
    // Close the print window after printing
    printWindow.close();
  };