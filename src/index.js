/* 
1st Deliverable:
- See the doplhin image recieved from the server, including its name, likes and comments
- Load the content from the server using a fetch request 
- add the content to the page using the name image number of likes comments
- Name of the dolphin (h2 with class of "name")
- Image of the dolphin (img tag with the class of "dolphin")
- The number of likes (span tag with the class of "likes")
- the comments (ul tag with a class of "comments")
*/

document.addEventListener("DOMContentLoaded", () => {
    const dolphinName = document.querySelector("h2.name")
    const dolphinImage = document.querySelector("img.dolphin")
    const dolphinLikes = document.querySelector("span.likes")
    const dolphinComments = document.querySelector("ul.comments")

    const dolphinUrl = "http://localhost:3000/dolphins/1"

    fetch(dolphinUrl)
    .then(resp => resp.json())
    .then(data => {
        dolphinName.innerHTML = data.name
        dolphinImage.src = data.image
        dolphinLikes.innerText = `${data.likes} likes`
        dolphinComments.innerHTML = ""

        data.comments.forEach(comment => {
            const listItem = document.createElement("li")
            listItem.innerHTML = comment.content
            dolphinComments.append(listItem)
        })
    })

    /*
     Second Deliverable:
    - Click on the heart icon to increase the dolphin image's likes and still see them when I reload the page
    - set an event listener to listen to a CLICK on the like BUTTON (button has a class of "like-button")
    - after the click occurs:
        - find how many likes are currently displayed (span tag with the class of "likes")
        - calculate the new number of likes (current llikes + 1)
        - then fetch (patch) to tell the server what the new number of likes is going to be 
        - return the new value of likes to the page and display it for our users ()
    */ 

    const likeButton = document.querySelector("button.like-button")
    likeButton.addEventListener("click", () => {
        let numberOfLikes = parseInt(dolphinLikes.innerText)
        numberOfLikes++

        const formData = {
            likes: numberOfLikes
        }
        
        const configurationObject = {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(formData)
        }
        fetch(dolphinUrl, configurationObject)
        .then(response => response.json())
        .then(data => {
            dolphinLikes.innerText = `${data.likes} likes`
        })
    })
/*
3rd Deliverable:
- Add a comment (no persistance needed) (has class "comment-button")
- After the submit occurs
- grab the text out of the comment box
- display the comment to the DOM in the comment section 
*/

const commentButton = document.querySelector("button.comment-button")
commentButton.addEventListener("click", (event) => {
    event.preventDefault()

    const commentInput = document.querySelector("input.comment-input")
    const newComment = commentInput.value
    const newCommentListItem = document.createElement("li")
    newCommentListItem.innerText = newComment

    dolphinComments.append(newCommentListItem)
    commentInput.value = ""
    
    })
})


