import React, { useState } from "react";
import { Inertia } from "@inertiajs/inertia";

const EditBlog = ({ blog }) => {
  const [formData, setFormData] = useState(blog);

  const handleSubmit = (e) => {
      e.preventDefault();
      Inertia.patch(`/blogs/${blog.id}`, formData);
  };

  const handleChange = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
      <form onSubmit={handleSubmit}>
          <div>
              <label>Titre</label>
              <input type="text" name="title" value={formData.title} onChange={handleChange} />
          </div>

          <div>
              <label>Description</label>
              <textarea name="description" value={formData.description} onChange={handleChange}></textarea>
          </div>

          <div>
              <label>Date de publication</label>
              <input type="date" name="published_at" value={formData.published_at} onChange={handleChange} />
          </div>

          <div>
              <label>Media (URL)</label>
              <input type="text" name="media" value={formData.media} onChange={handleChange} />
          </div>

          <button type="submit">Modifier le blog</button>
      </form>
  );
};

export default EditBlog;
