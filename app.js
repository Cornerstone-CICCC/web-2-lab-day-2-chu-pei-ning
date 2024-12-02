$(function() {
  
  // your code here
  let userId = 1

  $('header button:first-child').on('click', () => {
    userId = userId - 1
    fetchUserById(userId)
  })

  $('header button:last-child').on('click', () => {
    userId = userId + 1
    fetchUserById(userId)
  })

  $('.posts h3').on('click', function() {
    $(this).next().slideToggle()
  })

  $('.todos h3').on('click', function() {
    $(this).next().slideToggle()
  })

  const fetchUserById = (id) => {
    $.ajax({
      url: `https://dummyjson.com/users/${id}`,
      type: 'GET',
      success: function (user) {
        $('.info__image').empty()
        $('.info__image').append(`
          <img src="${user.image}"></img>
          `)
        $('.info__content').empty()
        $('.info__content').append(`
          <h1> ${user.firstName} ${user.lastName} </h1>
          <p> Age: ${user.age} </p>
          <p> Email: ${user.email} </p>
          <p> Phone: ${user.phone}</p>
          `)
        $('.posts h3').empty()
        $('.posts h3').append(`
          ${user.firstName}'s Posts 
        `)
        $('.todos h3').empty()
        $('.todos h3').append(`
          ${user.firstName}'s To Dos 
        `)

        $.ajax({
          url: `https://dummyjson.com/users/${id}/posts`,
          type: 'GET',
          success: function(response) {
            const posts = response.posts
            $('.posts ul').empty()
            if (posts.length !== 0 ) {
              posts.forEach(post => {
                $('.posts ul').append(`
                  <li> 
                    <h4> ${post.title} </h4>
                    <p> ${post.body} </p>
                  </li>
                `)  
              })  
            } else {
              $('.posts ul').append(`
                <li>User has no posts</li>
                `)
            }

            // const postid = posts.id
            // $.ajax({
            //   url: `https://dummyjson.com/posts/${postid}`,
            //   type: 'GET',
            //   success: function() {

            //   }
            // })
          },
          error: function(err) {
            console.log(err)
          }
        })

        $.ajax({
          url: `https://dummyjson.com/users/${id}/todos`,
          type: 'GET',
          success: function(response) {
            const todos = response.todos
            $('.todos ul').empty()
            if (todos.length !== 0 ) {
              todos.forEach(todo => {
                $('.todos ul').append(`
                  <li> ${todo.todo} </li>
                `)  
              })  
            } else {
              $('.todos ul').append(`
                <li> User has no todos </li>
                `)
            }
          },
          error: function(err) {
            console.log(err)
          }
        })
      },
      error: function(err) {
        console.log(err)
      }
    })
  }

  fetchUserById(userId)
})