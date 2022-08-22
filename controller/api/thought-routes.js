const {Thought, User} = require('../../Models')
const router = require('express').Router();


//gets all answers//
router.get('/', (req, res) => {
    Thought.find({})
        .populate({
            path: 'reactions',
            select: '-__v'
        })
        .select('-__v')
        .then(dbThoughtData => res.json(dbThoughtData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        })
})
router.route('/:id')
    .get(({params}, res) => {
        Thought.findOne(
            {_id: params.id}
            )
            .populate({
                path: 'reactions',
                select: '-__v'
            })
            .select('-__v')
            .then(dbThoughtData => {
                if (!dbThoughtData) {
                    res.status(500).json({
                        message: 'No thoughts with this ID!'
                    });
                    return;
                }
                res.json(dbThoughtData)
            })
            .catch(err => {
                console.log(err);
                res.sendStatus(400);
            })
    })
    .post(({params, body}, res) => {
        console.log(User)
        console.log(Thought)
        Thought.create(body)
        .then (({_id})=> {
            console.log(params)
            User.findOneAndUpdate(
                {_id:  params.id},
                {$push: {thought: _id}},
                {new: true})
                .then (dbThoughtData => {
                    console.log("testing121")
                    console.log(dbThoughtData)
                    if(!dbThoughtData) {
                        res.status(404).json({ message: 'No thoughts with this particular ID!' });
                        return;
                    }
                    res.json(dbThoughtData)
                })
                .catch(err => res.json(err))
        })
    })
    .put(({params, body}, res) => {
        Thought.findOneAndUpdate({
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
            .then(dbThoughtData => {
                if (!dbThoughtData) {
                    res.status(404).json({
                        message: 'No thoughts with this specific ID'
                    });
                    return;
                }
                res.json(dbThoughtData);
            })
            .catch(err => res.json(err));
    })
    .delete(({params}, res) => {
        Thought.findOneandDelete({_id: params.id})
        .then(dbThoughtData => {
            if (!dbThoughtData) {
                res.status(404).json({message: 'No thoughts with this specific ID'});
                return;
        }
        res.json(dbThoughtData);
    })
    .catch(err => res.json(err));
    }),

router.route('/:thoughtId/reactions')
    .post(({params, body}, res) => {
    Thought.findOneAndUpdate({
        _id: params.thoughtId
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
    .then(dbThoughtData => {
        if (!dbThoughtData) {
            res.status(500).json({
                message: 'No thoughts with this ID!'
            });
            return;
        }
        res.json(dbThoughtData)
    })
    .catch(err => {
        console.log(err);
        res.sendStatus(400);
    })
})

router.route('/:thoughtId/reactions/:reactionID')
    .delete((req, res) => {
        Thought.findOneAndUpdate(
            {_id:params.thoughtId},
            {$pull: {reactions: {reactionId: params.reactionId}}},
            {new: true}
        )
        .then(dbThoughtData => {
            if (!dbThoughtData) {
                res.status(404).json({ message: 'No reactions with this ID!'});
                return;
            }
            res.json(dbThoughtData);
        })
        .catch(err => res.status(400).json(err));
    })




module.exports = router;