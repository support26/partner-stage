import React, { useState } from 'react';
import Compressor from 'compressorjs';
import UserRepository from '../../api/UsersRepository';
import useAdmin from '../../hooks/useAdmin';

const styles = {
  form: {
    width: '100%',
    margin: '0 auto',
    padding: '20px',
    border: '1px solid #eee',
    borderRadius: '5px',
  },
  input: {
    width: '100%',
    padding: '10px',
    border: '1px solid gray',
    borderRadius: '5px',
    marginBottom: '8px',
  },
  button: {
    width: '100%',
    padding: '10px',
    margin: '10px 0 0 0',
    border: 'none',
    borderRadius: '10px',
    backgroundColor: '#33a2b5',
    color: '#fff',
    cursor: 'pointer',
  },
};

const Form = ({ addImage, handleClose }) => {
  const { AddSliderImage } = useAdmin();
  const [values, setValues] = useState({
    image: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    var data = {
      image: values.image,
    };
    var addSliderImage = AddSliderImage(data);
    addSliderImage
      .then((res) => {
        addImage(); // Call the addImage function passed as prop
        handleClose();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const onUploadImage = (e) => {
    let file = e.target.files[0];
    new Compressor(file, {
      quality: 0.8,
      success(result) {
        file = result;
        let form_data = new FormData();
        form_data.append('file', file);
        UserRepository.UploadImageFile(form_data)
          .then((response) => {
            setValues({ ...values, image: response.data.data.fileUrl });
          })
          .catch((e) => {
            console.log(e);
          });
      },
      error(err) {
        console.log(err.message);
      },
    });
  };

  return (
    <div className="xyz">
      <form onSubmit={handleSubmit}>
        <label style={{ fontSize: '14px' }}>Image</label>
        <input
          type="file"
          name="title_image"
          onChange={onUploadImage}
          placeholder="Upload image"
          style={styles.input}
          accept="image/*"
          required
        />
        <button type="submit" style={styles.button}>
          Add
        </button>
      </form>
    </div>
  );
};

export default Form;
