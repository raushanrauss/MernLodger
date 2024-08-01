import  { useState } from 'react';
import axios from 'axios';

const GenerateReportButton = () => {
    const [loading, setLoading] = useState(false);

    const generatePDF = async () => {
        setLoading(true);
        try {
            const userId = 'YOUR_USER_ID'; // Replace with the actual user ID
            const startDate = '2024-01-01'; // Replace with your start date
            const endDate = '2024-01-31'; // Replace with your end date

            const response = await axios({
                url: `/api/transactions/generateReport?userId=${userId}&startDate=${startDate}&endDate=${endDate}`,
                method: 'GET',
                responseType: 'blob', // Important for handling binary data
            });

            // Create a link element, set its href to the object URL, and click it to download
            const url = window.URL.createObjectURL(new Blob([response.data]));
            console.log(url);
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'transactions_report.pdf');
            document.body.appendChild(link);
            link.click();
            link.remove();
        } catch (error) {
            console.error('Error generating PDF:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <button onClick={generatePDF} disabled={loading}>
            {loading ? 'Generating...' : 'Generate PDF Report'}
        </button>
    );
};

export default GenerateReportButton;
