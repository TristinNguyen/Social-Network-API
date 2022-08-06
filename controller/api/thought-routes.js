const router = require('express').Router();


//gets all answers//
router.get('/', (req, res) => {
    Answer.findAll()
        .then(dbAnswerData => res.json(dbAnswerData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        })
})
router.route('/api/thought/:id')
.get ((req, res) => {

})
.post((req, res) => {

})
.put((req, res) => {

})
.delete((req,res) => {
    
})





module.exports = router;