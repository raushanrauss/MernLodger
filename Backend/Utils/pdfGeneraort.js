// const puppeteer = require('puppeteer');

// const generatePDF = async (htmlContent, filePath) => {
//     const browser = await puppeteer.launch();
//   const page = await browser.newPage();
  

//     await page.setContent(htmlContent);
//     await page.pdf({ path: filePath, format: 'A4' });

//     await browser.close();
// };

// const generateTransactionPDF = async (transactions, filePath) => {
 
//     let htmlContent = `
//     <!DOCTYPE html>
//     <html>
//     <head>
//       <meta charset="utf-8">
//       <title>Transactions Report</title>
//       <style>
//         body { font-family: Arial, sans-serif; }
//         table { width: 100%; border-collapse: collapse; }
//         th, td { border: 1px solid black; padding: 8px; text-align: left; }
//         th { background-color: #f2f2f2; }
//       </style>
//     </head>
//     <body>
//       <h1>Transactions Report</h1>
//       <table>
//         <thead>
//           <tr>
//             <th>Title</th>
//             <th>Amount</th>
//             <th>Category</th>
//             <th>Description</th>
//             <th>Date</th>
//             <th>Transaction Type</th>
//           </tr>
//         </thead>
//         <tbody>
//   `;

//     transactions.forEach(transaction => {
//         htmlContent += `
//       <tr>
//         <td>${transaction.title}</td>
//         <td>${transaction.amount}</td>
//         <td>${transaction.category}</td>
//         <td>${transaction.description}</td>
//         <td>${transaction.date.toDateString()}</td>
//         <td>${transaction.transactionType}</td>
//       </tr>
//     `;
//     });

//     htmlContent += `
//         </tbody>
//       </table>
//     </body>
//     </html>
//   `;

//   await generatePDF(htmlContent, filePath).then(() => console.log("Pdf generated Successfully"))
//     .catch(err=>console.error("Error generating PDF,", err));
// };

// module.exports = { generateTransactionPDF };
