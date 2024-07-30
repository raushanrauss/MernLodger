const ledgeModel = require("../Schema/ledgeSchema");

const addLedge = async (req, res) => {
    try {
        const { name, date, amount, type } = req.body;

        // Validate input data
        if (!name || !date || !amount || !type) {
            return res.status(400).send({ msg: "All fields are required" });
        }

        const ledge = new ledgeModel({ name, date, amount, type });
        await ledge.save(); // Await the save operation
        res.status(201).send({ msg: "Added Successfully", ledge });
    }
    catch (error) {
        console.error(error); // Log error details for debugging
        res.status(500).send({ msg: "Internal Server Error" });
    }
}

const readLedge = async (req, res) => {
    try {
        // You might want to handle filtering based on query parameters
        const { name, date, type, amount } = req.query; // Use query parameters for filtering
        let query = {};

        if (name) query.name = name;
        if (date) query.date = date;
        if (type) query.type = type;
        if (amount) query.amount = amount;

        const ledge = await ledgeModel.find(query); // Apply query filters if provided
        console.log(ledge)
        res.status(200).send({ msg: "Getting all Data", ledge });
    }
    catch (error) {
        console.error(error); 
        res.status(500).send({ msg: "Internal Server Error" });
    }
}

module.exports = { addLedge, readLedge };
