const dashModel = require("../Models/dashModel.js");


const createGraphic1 = async (req, res) => {
    try {
        const weapons = await dashModel.get10Weapons();

        // Verifica se encontrou dados
        if (weapons && weapons.length > 0) {
            res.status(200).json({
                success: true,
                message: "Top 10 weapons retrieved successfully",
                data: weapons
            });
        } else {
            res.status(404).json({
                success: false,
                message: "No weapons found"
            });
        }
    } catch (error) {
        // Trata o erro adequadamente
        console.error("Error fetching weapons:", error);
        res.status(500).json({
            success: false,
            message: "An error occurred while retrieving weapons",
            error: error.message
        });
    }
};


const createGraphic2 = async (req, res) => {
    try {
        // Chama a função para buscar as classes
        const classes = await dashModel.getClasses();

        // Verifica se encontrou dados
        if (classes && classes.length > 0) {
            res.status(200).json({
                success: true,
                message: "Classes data retrieved successfully",
                data: classes
            });
        } else {
            res.status(404).json({
                success: false,
                message: "No class data found"
            });
        }
    } catch (error) {
        // Trata o erro adequadamente
        console.error("Error fetching classes:", error);
        res.status(500).json({
            success: false,
            message: "An error occurred while retrieving class data",
            error: error.message
        });
    }
};


module.exports = {
    createGraphic1,
    createGraphic2
}