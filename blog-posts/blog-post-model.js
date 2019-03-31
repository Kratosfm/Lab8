const uuidv4 = require('uuid/v4')

let posts = [
    {
        id: uuidv4(),
        title: "Post_1",
        content: "Post 1 of 2",
        author: "Francisco Simon",
        publishDate: new Date("23 Marzo 2019")
    },
    {
        id: uuidv4(),
        title: "Post_2",
        content: "Post 2 of 2",
        author: "Francisco Simon",
        publishDate: new Date("24 Marzo 2019")
    }
]

const ListaPosts = {

    get: function() {
        return posts
    },
    getByAuthor: function (author) {
        var match = []
        posts.forEach(function(item,index) {
            if (item.author == author) {
                match.push(item)
            }
        })
        return match
    },
    post: function(title, content, author, pDate) {
        let newPost = {
            id: uuidv4(),
            title: title,
            content: content,
            author: author,
            publishDate: new Date(pDate)
        }
        posts.push(newPost)
        return newPost
    },
    delete: function(id) {
        post = null
        posts.forEach(function(item,index) {
            if (id == item.id) {
                post = item
                posts.splice(index,1)
            }
        })
        return post
    },
    put: function (id, newPost) {
        post = null
        posts.forEach(item => {
            if (item.id == id) {
                post = item
                if (newPost.title) post.title = newPost.title
                if (newPost.content) post.content = newPost.content
                if (newPost.author) post.author = newPost.author
                if (newPost.publishDate) post.publishDate = new Date(newPost.publishDate)
            }
        })
        return post
    }
}

module.exports = { ListaPosts }
