const {User} = require('../../Models');
const router = require('express').Router();

router.route('/')
    .get((req, res) => {
        User.find({})
        // .populate({path: 'thoughts', select: '-__v'})
        // .populate({path: 'friends', select: '-__v'})
        .select('-__v')
        .then(dbUserData => res.json(dbUserData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
    })
    .post(({body}, res) => {
            User.create(body)
            .then(dbUserData => res.json(dbUserData))
            .catch(err => {console.log(err)
                res.status(400).json(err)});
    
      
    }),
        
router.route('/:id')
    .get(({params}, res) => {
        User.findOne({_id:params.id})
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({message: "It appears there is no user with that id!"});
                return;
            }
            res.status(200).json(dbUserData);
        })
        .catch(err => res.status(400).json(err))
    })
    
    .put(({params, body}, res) => {
        User.findOneAndUpdate(
            {_id: params.id}, body,
            {new: true, runValidators: true}
        )
        .then(dbUserData => {
            if(!dbUserData) {
                res.status(404).json({message: 'No User found with this ID!'});
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => res.json(err))
    })
    .delete(({params}, res) => {
        User.findOneAndDelete(
            {_id:params.id})
        .then(dbUserData => {
            if(!dbUserData) {
                res.status(404).json({message: 'No user found with this Id!'})
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => res.status(400).json(err));
    })
router.route("/:id/friend/:friendId")
    .post(({params}, res) => {
        User.findOneAndUpdate(
            {_id: params.userId},
            {$push: {friends: params.friendId}},
            {new: true}
        )
        .then(dbUserData => {
            if(!dbUserData) {
                res.status(404).json({message: "No user found with this id"});
                return;
            }
            res.json(dbUserData);
        })
        .catch ((err) => res.status(400).json(err));
    })
    .delete(({params}, res) => {
        User.findOneAndUpdate(
            {_id: params.userId},
            { $pull: {friends: params.friendId}},
            {new: true}
        )
            .then((dbUserData) => {
                if(!dbUserData) {
                    res.status(404).json({message: 'No user found with this id'});
                    return;
                }
                res.json(dbUserData);
            })
            .catch((err) => res.status(400).json(err))
    })




module.exports = router;