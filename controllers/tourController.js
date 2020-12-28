const Tour = require('./../models/tourModel');

exports.getAllTours = (req, res) => {
    res.status(200).json({
        status: 'success',
        requestedAt: req.requestTime,
        // results: tours.length,
        // data: {
        //     tours,
        // },
    });
};

exports.createTour = async (req, res) => {
    try {
        const newTour = await Tour.create(req.body);

        res.status(201).json({
            status: 'success',
            data: {
                tour: newTour,
            },
        });
    } catch (err) {
        res.status(400).json({
            status: 'failed',
            message: 'Invalid data sent!',
        });
    }
};

exports.getTour = (req, res) => {
    const id = req.params.id * 1;
    const tour = tours.find((e) => e.id === id);

    res.status(200).json({
        status: 'success',
        // results: tours.length,
        // data: {
        //     tour,
        // },
    });
};

exports.updateTour = (req, res) => {
    res.status(200).json({
        status: 'success',
        data: {
            tour: '<updated tour here...>',
        },
    });
};

exports.deleteTour = (req, res) => {
    res.status(204).json({
        status: 'success',
        data: {
            tour: null,
        },
    });
};
