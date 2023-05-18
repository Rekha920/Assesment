const getCustomersList = (req, res) => {
    try {
        /**
         * logic here...
         */
        return res.status(200).send({
            error: false,
            message: '',
            response: []
        });
    } catch (error) {
        console.error(error);
    }
}

module.exports = getCustomersList