"use client";

import { useState, useEffect } from "react";

import PromptCard from "./PromptCard";

const PromptCardList = ({ data, handleTagClick }) => {
  return (
    <div className='mt-16 prompt_layout'>
      {data.map((post) => (
        <PromptCard
          key={post._id}
          post={post}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  );
};

const Feed = () => {
  const [allPosts, setAllPosts] = useState([]);
  //const [posts, setPosts] = useState([]);

  const [searchText, setSearchText] = useState("");
  
  const handleSearchChange = (e) => {

  }


  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch("/api/prompt");
      const data = await response.json();

      setAllPosts(data);
    }

    console.log(allPosts);

    fetchPosts();
  }, []);

  const handleTagClick = (tagName) => {
    setSearchText(tagName);
  }
  
  return (
    <section className='feed'>
      <form className='relative w-full flex-center'>
        <input
          type='text'
          placeholder='Search for a tag or a username'
          value={searchText}
          onChange={handleSearchChange}
          required
          className='search_input peer'
        />
      </form>

      <PromptCardList
          data={allPosts}
          handleTagClick={handleTagClick}
      />
    </section>
  )
}

export default Feed;