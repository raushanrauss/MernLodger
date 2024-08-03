import React from 'react';
import html2pdf from 'html2pdf.js';

const GenerateReportButton = ({ transactions }) => {
  // Function to format dates as "DD MMM YYYY"
  const formatDate = (dateString) => {
    const options = { day: '2-digit', month: 'short', year: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const generatePDF = () => {
    // Generate HTML content with dynamic data
    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>Transactions Report</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
            background: #f4f4f4;
          }
          .container {
            width: 80%;
            margin: 20px auto;
            padding: 20px;
            background: #fff;
            border-radius: 8px;
            box-shadow: 0 0 10px rgba(0,0,0,0.1);
          }
          h1 {
            text-align: center;
            color: #333;
            margin-bottom: 20px;
            font-size: 24px;
            border-bottom: 2px solid #4CAF50;
            padding-bottom: 10px;
          }
          .table-wrapper {
            overflow-x: auto;
          }
          table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 20px;
          }
          th, td {
            border: 1px solid #ddd;
            padding: 12px;
            text-align: left;
            vertical-align: middle;
          }
          th {
            background-color: #4CAF50;
            color: white;
            font-weight: bold;
            border-bottom: 2px solid #333;
          }
          tr:nth-child(even) {
            background-color: #f9f9f9;
          }
          tr:nth-child(odd) {
            background-color: #fff;
          }
          tr:hover {
            background-color: #f1f1f1;
          }
          .summary {
            margin-top: 20px;
            border-top: 2px solid #4CAF50;
            padding-top: 10px;
            font-size: 1.1em;
            color: #333;
            display: flex;
            justify-content: space-between;
          }
          .summary div {
            font-weight: bold;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>Transactions Report</h1>
          <div class="table-wrapper">
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
                ${transactions != undefined && transactions.map(expense => `
                  <tr>
                    <td>${expense.title}</td>
                    <td>${expense.amount}</td>
                    <td>${expense.category}</td>
                    <td>${expense.description}</td>
                    <td>${formatDate(expense.date)}</td>
                    <td>${expense.transactionType}</td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
          <div class="summary">
            <div>Total Transactions: ${transactions.length}</div>
            <div>Total Amount: ${transactions.reduce((total, item) => total + parseFloat(item.amount), 0).toFixed(2)}</div>
          </div>
        </div>
      </body>
      </html>
    `;

    // Create a new window to load the HTML content
    const pdfWindow = window.open('', '', 'height=600,width=800');
    pdfWindow.document.write(htmlContent);
    pdfWindow.document.close();

    // Use html2pdf to generate the PDF
    html2pdf()
      .from(pdfWindow.document.body)
      .toPdf()
      .get('pdf')
      .then(pdf => {
        pdf.save('transactions_report.pdf');
        pdfWindow.close(); // Close the window after generating the PDF
      })
      .catch(error => {
        console.error('Error generating PDF:', error);
      });
  };

  return (
    <div>
      <button onClick={generatePDF}>Generate and Download PDF</button>
    </div>
  );
};

export default GenerateReportButton;
