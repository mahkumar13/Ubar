const captainModel = require("../Models/captain.model")
const captainService = require("../services/captain.service")

const { validationResult } = require("express-validator")


module.exports.RegisterCaptain = async (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }
    try {

        const { fullName, email, password, vehicle } = req.body
        const color = req.body.vehicle.color
        console.log(color)
        const isCaptainExist = await captainModel.findOne({ email })
        if (isCaptainExist) {
            return res.status(400).json({ message: "Captain already exists" })
        }
        const hashedPassword = await captainModel.hashpassword(password)

        const captain = await captainService.createCaptain({
            FirstName: fullName.FirstName,
            LastName: fullName.LastName,
            email,
            password: hashedPassword,
            color: vehicle.color,
            plate: vehicle.plate,
            capacity: vehicle.capacity,
            vehicletype: vehicle.vehicletype
        })

        const token = captain.generateAuthToken();
        res.status(201).json({ token, captain })
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: "Server Error" })
    }
}