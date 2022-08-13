const {Thoughts, User} = require('../../Models')
const router = require('express').Router();


//gets all answers//
router.get('/', (req, res) => {
    Answer.find({})
        .populate({
            path: 'reactions',
            select: '-__v'
        })
        .select('-__v')
        .then(dbAnswerData => res.json(dbAnswerData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        })
})
router.route('/api/thought/:id')
    .get((req, res) => {
        Thoughts.findOne({
                _id: params.id
            })
            .populate({
                path: 'reactions',
                select: '-__v'
            })
            .select('-__v')
            .then(dbThoughtsData => {
                if (!dbThoughtsData) {
                    res.status(500).json({
                        message: 'No thoughts with this ID!'
                    });
                    return;
                }
                res.json(dbThoughtsData)
            })
            .catch(err => {
                console.log(err);
                res.sendStatus(400);
            })
    })

    .post(({params, body}, res) => {
        Thoughts.create(body)
        .then (({_id})=> {
            return User.findOneandUpdate(
                {_id:  params.userId},
                {$push: {thoughts: _id}},
                {new: true});
        })
        .then (dbThoughtsData => {
            if(!dbThoughtsData) {
                res.status(404).json({ message: 'No thoughts with this particular ID!' });
                return;
            }
            res.json(dbThoughtsData)
        })
        .catch(err => res.json(err))
    })
    .put((req, res) => {
        Thoughts.findOneAndUpdate({
                _id: params.id
            }, body, {
                new: true,
                runValidators: true
            })
            .populate({
                path: 'reactions',
                select: '-__v'
            })
            .select('-__v')
            .then(dbThoughtsData => {
                if (!dbThoughtsData) {
                    res.status(404).json({
                        message: 'No thoughts with this specific ID'
                    });
                    return;
                }
                res.json(dbThoughtsData);
            })
            .catch(err => res.json(err));
    })
    .delete(({params}, res) => {
        Thoughts.findOneandDelete({_id: params.id})
        .then(dbThoughtsData => {
            if (!dbThoughtsData) {
                res.status(404).json({message: 'No thoughts with this specific ID'});
                return;
        }
        res.json(dbThoughtsData);
    })
    .catch(err => res.json(err));
    }),

router.route('/:thoughtID/reactions')
    .post((req, res) => {
    Thoughts.findOneAndUpdate({
        _id: params.thoughtID
    }, {$push: {reactions: body}}, 
    {
        new: true,
        runValidators: true
    })
    .populate({
        path: 'reactions',
        select: '-__v'
    })
    .select('-__v')
    .then(dbThoughtsData => {
        if (!dbThoughtsData) {
            res.status(500).json({
                message: 'No thoughts with this ID!'
            });
            return;
        }
        res.json(dbThoughtsData)
    })
    .catch(err => {
        console.log(err);
        res.sendStatus(400);
    })
})

router.route('/:thoughtID/reactions/:reactionID')
    .delete((req, res) => {
        Thoughts.findOneAndUpdate(
            {_id:params.thoughtID},
            {$pull: {reactions: {reactionId: params.reactionId}}},
            {new: true}
        )
        .then(dbThoughtsData => {
            if (!dbThoughtsData) {
                res.status(404).json({ message: 'No reactions with this ID!'});
                return;
            }
            res.json(dbThoughtsData);
        })
        .catch(err => res.status(400).json(err));
    })




module.exports = router;