const dashModel = require("../Models/dashModel.js");


const createGraphic1 = async (req, res) => {
    try {
        const weapons = await dashModel.get10Weapons();

        
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
        
        const classes = await dashModel.getClasses();

        
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
        
        console.error("Error fetching classes:", error);
        res.status(500).json({
            success: false,
            message: "An error occurred while retrieving class data",
            error: error.message
        });
    }
};

const createGraphic3 = async (req, res) => {
    try {
        
        const rings = await dashModel.getRings();

        
        if (rings && rings.length > 0) {
            res.status(200).json({
                success: true,
                message: "rings data retrieved successfully",
                data: rings
            });
        } else {
            res.status(404).json({
                success: false,
                message: "No ring data found"
            });
        }
    } catch (error) {
        
        console.error("Error fetching rings:", error);
        res.status(500).json({
            success: false,
            message: "An error occurred while retrieving ring data",
            error: error.message
        });
    }
};

const createKPIs = async (req, res) => {
    try {
        
        const { MostWeapon, MostRing, MostClass } = await dashModel.getKPIs();

        
        if (!MostWeapon || !MostRing || !MostClass) {
            return res.status(404).json({
                success: false,
                message: 'Não foi possível recuperar os KPIs.'
            });
        }

        
        return res.status(200).json({
            success: true,
            data: {
                mostUsedWeapon: MostWeapon,
                mostUsedRing: MostRing,
                mostUsedClass: MostClass
            }
        });
    } catch (error) {
        console.error('Erro ao obter KPIs:', error);

        
        return res.status(500).json({
            success: false,
            message: 'Ocorreu um erro ao buscar os KPIs.',
            error: error.message
        });
    }
};


module.exports = {
    createGraphic1,
    createGraphic2,
    createGraphic3,
    createKPIs
}