const pdfController = async (req, res) => {
    const { htmlContent } = req.body;
    console.log(htmlContent);

    if (!htmlContent) {
        return res.status(400).json({ error: 'HTML content is required' });
    }

    try {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.setContent(htmlContent);
        const pdfBuffer = await page.pdf({ format: 'A4' });
        await browser.close();

        res.setHeader('Content-Type', 'application/pdf');
        res.send(pdfBuffer);
    } catch (err) {
        res.status(500).json({ error: 'Error generating PDF' });
    }
}
module.exports = pdfController;
