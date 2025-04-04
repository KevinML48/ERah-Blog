import React, { useState } from "react";
import { Inertia } from "@inertiajs/inertia";

const CreateBlog = () => {
  const [formData, setFormData] = useState({
      title: "",
      description: "",
      published_at: "",
      image: null,
      video_url: "",
  });

  const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
      setFormData({ ...formData, image: e.target.files[0] });
  };

  const handleSubmit = (e) => {
      e.preventDefault();

      const data = new FormData();
      data.append("title", formData.title);
      data.append("description", formData.description);
      data.append("published_at", formData.published_at);
      if (formData.image) data.append("image", formData.image);
      data.append("video_url", formData.video_url);

      Inertia.post("/blogs", data);
  };

  return (
      <form onSubmit={handleSubmit}>
          <div>
              <label>Titre</label>
              <input type="text" name="title" value={formData.title} onChange={handleChange} required />
          </div>

          <div>
              <label>Description</label>
              <textarea name="description" value={formData.description} onChange={handleChange} required></textarea>
          </div>

          <div>
              <label>Date de publication</label>
              <input type="date" name="published_at" value={formData.published_at} onChange={handleChange} />
          </div>

          <div>
              <label>Image</label>
              <input type="file" name="image" accept="image/*" onChange={handleFileChange} />
          </div>

          <div>
              <label>URL YouTube</label>
              <input type="url" name="video_url" value={formData.video_url} onChange={handleChange} />
          </div>

          <button type="submit">Créer le Blog</button>
      </form>
  );
};

export default CreateBlog;
