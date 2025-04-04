import React from "react";

const BlogsIndex = ({ blogs }) => {
  return (
      <div>
          <h1>Liste des Blogs</h1>
          {blogs.map((blog) => (
              <div key={blog.id} style={{ marginBottom: "20px" }}>
                  <h2>{blog.title}</h2>
                  <p>{blog.description}</p>

                  {/* Afficher l'image si elle existe */}
                  {blog.image && (
                      <img src={`/storage/${blog.image}`} alt={blog.title} style={{ maxWidth: "100%" }} />
                  )}

                  {/* Afficher la vidéo YouTube si l'URL est présente */}
                  {blog.video_url && (
                      <iframe
                          width="560"
                          height="315"
                          src={blog.video_url} // Utilisation dynamique de l'URL depuis la base de données
                          title="YouTube video player"
                          frameBorder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                          referrerPolicy="strict-origin-when-cross-origin"
                          allowFullScreen
                      ></iframe>
                  )}
              </div>
          ))}
      </div>
  );
};

export default BlogsIndex;
