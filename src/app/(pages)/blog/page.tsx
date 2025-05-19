import React from "react";
import Data from "../../../../data.json";
import AllBlogs from "@/app/Components/__Molecules/AllBlogs/AllBlogs";
function Blog() {
  return (
    <>
      <div>
        <AllBlogs data={Data} />
      </div>
    </>
  );
}

export default Blog;
