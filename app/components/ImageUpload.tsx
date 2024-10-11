import { FormEvent, useState } from 'react';

function ImageUpload() {
  // Create state to store file
  const [file, setFile] = useState<File>();
  const [image, setImage] = useState("");

  const handleSubmit = async (e:FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!file) {
      alert('Please select a file to upload.');
      return;
    }
    const formData = new FormData();
    formData.append('image', file as Blob);
    const resp = await fetch(`http://localhost:3000/api/upload`, {
      method: "POST",
      body: file,
    })
}

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFile(file);
  };

  return (
      <div>
        <form onSubmit={(e) =>handleSubmit(e)}>
          <input type="file" onChange={handleFileChange} />
          <button type="submit">Upload</button>
        </form>
        <img src={image} alt="" />
      </div>
  );
}

function ImageUploadWrapped() {
  return (
      <ImageUpload />
  );
}

export default ImageUploadWrapped;