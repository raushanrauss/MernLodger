import {  useState } from 'react';
import axios from 'axios';
import { generatePdfData } from '../utils/ApiRequest';

const GenerateReportButton = ({transactions}) => {
  console.log(transactions);
  const [pdfUrl, setPdfUrl] = useState('');
  

  const generatePDF = async () => {
   

    // Generate HTML content with dynamic data
    const htmlContent = `
            <!DOCTYPE html>
            <html>
            <head>
              <meta charset="utf-8">
              <title>Transactions Report</title>
              <style>
                body { font-family: Arial, sans-serif; }
                table { width: 100%; border-collapse: collapse; }
                th, td { border: 1px solid black; padding: 8px; text-align: left; }
                th { background-color: #f2f2f2; }
              </style>
            </head>
            <body>
              <h1>Transactions Report</h1>
              <table>
                <thead>
                  <tr>
                    <th>Title</th>
                    <th>Amount</th>
                    <th>Category</th>
                    <th>Description</th>
                    <th>Date</th>
                    <th>Transaction Type</th>
                  </tr>
                </thead>
                <tbody>
                  ${transactions!=undefined && transactions.map(expense => `
                    <tr>
                      <td>${expense.title}</td>
                      <td>${expense.amount}</td>
                      <td>${expense.category}</td>
                      <td>${expense.description}</td>
                      <td>${expense.date}</td>
                      <td>${expense.transactionType}</td>
                    </tr>
                  `).join('')}
                </tbody>
              </table>
            </body>
            </html>
        `;

    try {
      const response = await axios.post(generatePdfData, { htmlContent }, {
        headers: {
          'Content-Type': 'application/json'
        },
        responseType: 'arraybuffer', // Ensure the response is treated as binary data
      });

      if (response.status === 200) {
        const blob = new Blob([response.data], { type: 'application/pdf' });
        const url = window.URL.createObjectURL(blob);
        setPdfUrl(url);

        // Create a temporary link to download the PDF
        const link = document.createElement('a');
        link.href = url;
        link.download = 'report.pdf';
        link.click();

        // Clean up URL object
        window.URL.revokeObjectURL(url);
      } else {
        console.error('Unexpected response status:', response.status);
      }
    } catch (error) {
      console.error('Error generating PDF:', error);
    }
  };

  return (
    <div>
      <button onClick={generatePDF}>Generate and Download PDF</button>
     
       
    </div>
  );
};

export default GenerateReportButton;
