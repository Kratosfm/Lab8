const express = require('express')
const router = express.Router()
const {ListaPosts} = require ('./blog-post-model')


router.get('/blog-posts', (req,res,next) => {
  let posts = ListaPosts.get()
  if (posts) {
        res.status(200).json({
        message: "All Post sent",
        status: 200,
        posts: posts
    })
  }
  else {
        res.status(500).json({
			message : `Internal server error.`,
			status : 500
		})
        next()
    }
})

router.get('/blog-posts/:author', (req,res,next) => {
  let author = req.params.author
  if (!(req.params.author)) {
        res.status(406).json({
            message: `Missing field author in params.`,
            status: 406
        })
        next()
    }

    let match = ListaPosts.getByAuthor(author)
    if (match == undefined || match.length == 0) {
        res.status(404).json({
            message: `Author not found`,
            status: 404
        })
        next()
    }
    else {
        res.status(200).json({
            message: `Successfully blog post found`,
            posts: match
        })
    }
})
router.post('/blog-posts', (req,res, next) => {
    let requiredFields = ["title", "content", "author", "publishDate"]
    for (rf of requiredFields) {
        if (!(rf in req.body)) {
            res.status(406).json({
                message: `Missing field in body`,
                status: 406
            })
        }
    }
        title = req.body.title,
        content = req.body.content,
        author = req.body.author,
        publishDate = new Date(req.body.publishDate)

        let nuevoPost = ListaPosts.post(title, content, author, publishDate)

        res.status(201).json({
        message: `Successfully added post.`,
        status: 201,
        postAdded: nuevoPost
    })
})

router.delete('/blog-posts/:id', (req,res, next) => {
    if (!(req.params.id)) {
        res.status(406).json({
            message: `Missing field in params.`,
            status: 406
        })
        next()
    }
    if (!("id" in req.body)) {
        res.status(406).json({
            message: `Missing field in body.`,
            status: 406
        })
        next()
    }

    if (req.params.id != req.body.id) {
        return res.status(409).json({
            message: `ID '${req.body.id}' in body different than ID '${req.params.id}' in params.`,
            status: 409
        })
        next()
    }

    let elimpost = ListaPosts.delete(id)
        if (elimpost) {
            return res.status(200).json({
                message: `successfully deleted`,
                status: 200
            })
        }
        else{
          res.status(404).json({
            message: `Post not exist`,
            status: 404
          })
        }
})

router.put('/blog-posts/:id', (req,res,next) => {
  let id = req.params.id
    if (!id) {
        res.status(406).json({
            message: `Missing field id`,
            status: 406
        })
    }

    if (req.body.length == 0) {
        res.status(404).json({
            message: `Empty body`,
            status: 404
        })
        next()
    }
    let updposts = ListaPosts.put(id, newPost);

    if (updposts) {
      res.status(204).json({
          message: `Empty body`,
          status: 204
      })
    }
      else {
        res.status(404).json({
            message: `Empty body`,
            status: 404
        })
      next()
    }
})

module.exports = router;
