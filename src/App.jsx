


import React, { useState, useEffect } from "react";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {


  
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState({ title: "", content: "" });
  const [isUpdating, setIsUpdating] = useState(false);
  const [currentPostId, setCurrentPostId] = useState(null);

 

  const showError = (message) => {
    toast.error(message, {
      position: "top-right",  // Use string literals instead of accessing constants
    });
  };

  const showSuccess = (message) => {
    toast.success(message, {
      position: "top-right",  // Use string literals instead of accessing constants
    });
  };


  // GET request to fetch posts
  useEffect(() => {
    axios
      .get("http://localhost:3001/posts")
      .then((response) => setPosts(response.data))
      .catch((error) => showError("There was an error fetching the posts!"));
  }, []);

  // POST request to add a new post
  const addPost = () => {
    axios
      .post("http://localhost:3001/posts", newPost)
      .then((response) => {
        setPosts([...posts, response.data]);
        setNewPost({ title: "", content: "" }); // Clear form after adding
        showSuccess("Post added successfully!");
      })
      .catch((error) => showError("There was an error adding the post!"));
  };

  // PUT request to update an existing post
  const updatePost = () => {
    axios
      .put(`http://localhost:3001/posts/${currentPostId}`, newPost)
      .then((response) => {
        setPosts(posts.map((post) => (post.id === currentPostId ? response.data : null)));
        setNewPost({ title: "", content: "" }); // Clear form after updating
        setIsUpdating(false);
        setCurrentPostId(null);
        showSuccess("Post updated successfully!");
      })
      .catch((error) => showError("There was an error updating the post!"));
  };
  

  // Handle form submit
  const handleSubmit = () => {
    if (isUpdating) {
      updatePost();
    } else {
      addPost();
    }
  };

  // DELETE request to delete a post
  const deletePost = (id) => {
    axios
      .delete(`http://localhost:3001/posts/${id}`)
      .then(() => {
        setPosts(posts.filter((post) => post.id !== id));
        showSuccess("Post deleted successfully!");
      })
      .catch((error) => showError("There was an error deleting the post!"));
  };

  // Fill form with post data when clicking "Update"
  const handleEditClick = (post) => {
    setNewPost({ title: post.title, content: post.content });
    setIsUpdating(true);
    setCurrentPostId(post.id);
  };



  return (
    <>
    <nav class="navbar navbar-expand-lg navbar-light bg-success px-5">
          <a class="navbar-brand" href="#">
             <h2 className="text-white">CRUD Posts Manager</h2>  
          </a>    
    </nav>

    <div className="container my-4">
      <ToastContainer />
      
      <div className="mb-5">
        <input
          type="text"
          className="form-control mb-2"
          placeholder="Title"
          value={newPost.title}
          onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
        />
        <input
          type="text"
          className="form-control mb-2"
          placeholder="Content"
          value={newPost.content}
          onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
        />
        <button className="btn btn-success" onClick={handleSubmit}>
          {isUpdating ? "Update Post" : "Add Post"}
        </button>
      </div>

      { posts.length === 0 ? <h2> No post added yet </h2> : null }

      <ul className="list-group mb-4">
        {posts.map((post) => (
          <li key={post.id} className="list-group-item">
            <h2>{post.title}</h2>
            <p>{post.content}</p>
            <div className="d-flex gap-3">
              <button 
                className="btn btn-primary"
                onClick={() => handleEditClick(post)}
              >
                <i className="fas fa-edit"></i> 
              </button>
              <button 
                className="btn btn-danger"
                onClick={() => deletePost(post.id)}
              >
                 <i className="fas fa-trash-alt"></i>
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
    
    </>
   
  );
};

export default App;
