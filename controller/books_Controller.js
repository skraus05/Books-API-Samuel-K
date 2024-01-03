//books controller file (controller/books_Controllers.js)
const express = require('express');

const router = express.Router();
const Book = require('../model/book.js');

router.get('/seed', (req, res) => {
    Book.insertMany([
        {
            "title": "The Shinobi Initiative",
            "description": "The reality-bending adventures of a clandestine service agency in the year 2166",
            "year": 2014,
            "quantity": 10,
            "imageURL": "https://imgur.com/LEqsHy5.jpeg"
        },
        {
            "title": "Tess the Wonder Dog",
            "description": "The tale of a dog who gets super powers",
            "year": 2007,
            "quantity": 3,
            "imageURL": "https://imgur.com/cEJmGKV.jpg"
        },
        {
            "title": "The Annals of Arathrae",
            "description": "This anthology tells the intertwined narratives of six fairy tales.",
            "year": 2016,
            "quantity": 8,
            "imageURL": "https://imgur.com/VGyUtrr.jpeg"
        },
        {
            "title": "Wâˆ€RP",
            "description": "A time-space anomaly folds matter from different points in earth's history in on itself, sending six unlikely heroes on a race against time as worlds literally collide.",
            "year": 2010,
            "quantity": 4,
            "imageURL": "https://imgur.com/qYLKtPH.jpeg"
        }
    ])
    .then(() => {
        res.status(200).json({
            message: 'Seed successful'
        });
    })
    .catch(() => {
        res.status(400).json({
            message: 'Seed unsuccessful'
        });
    });
});



router.get('/', (req, res) => {
    Book.find()
    .then(foundBooks => {
        res.status(200).json(foundBooks)
    })
    .catch(err => {
        res.status(400).json({
            message: 'An error has occurred, cannot get all the books'
        })
    })
});

router.get('/:id', (req, res) => {
    Book.findById(req.params.id)
        .then(foundBooks => {
            res.status(200).json(foundBooks)
        })
        .catch(err => {
            res.status(400).json({
                message: 'There was an error, could not find the book'
            })
        })
});

router.put('/:id', (req, res) => {
    Book.findOneAndUpdate({_id: req.params.id}, req.body, { new: true })
        .then(updatedBook => {
            res.status(200).json(updatedBook);
        })
        .catch(err => {
            res.status(400).json({
                message: 'There was an error, could not edit book'
            })
        });
});

router.post('/', (req, res) => {
    Book.create(req.body)
    .then(createdBook => {
        res.status(200).json(createdBook)
    })
    .catch(err => {
        res.status(400).json({
            message: 'There was an error, could not delete the book'
        })
    })
})

router.delete('/:id', (req, res) => {
    Book.findByIdAndDelete(req.params.id )
    .then(deletedBook => {
        res.status(200).json({
            message: 'Delete is Successful'
        })
    })
    .catch(err => {
        res.status(400).json({
            message: 'There was an error, could not delete book'
        })
    });
});

module.exports = router;