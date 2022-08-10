const router = require('express')

router.route('/', (req, res))
    .get()
    .post()
router.route('/:id')
    .get()
    .put()
    .delete()
router.route("/:id/friend/:friendId")
    .put()
    .delete()






module.exports = router;