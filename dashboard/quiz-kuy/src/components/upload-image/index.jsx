import React from 'react';
import { useStyles } from './styles';
import axios from 'axios';
import NoImage from 'images/pilih-gambar.png';
import Button from '@material-ui/core/Button';
import EditIcon from '@material-ui/icons/Edit';
import PhotoCameraOutlinedIcon from '@material-ui/icons/PhotoCameraOutlined';

export default function UploadImage({
  name,
  image = null,
  onImageUploaded = null,
  disabled = false,
}) {
  const classes = useStyles();
  const [isLoading, setLoading] = React.useState(false);

  const handleChangeImage = async (event) => {
    console.log('s');
    event.persist();
    setLoading(true);
    const url = `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}/image/upload`;

    let formData = new FormData();
    formData.append('api_key', process.env.REACT_APP_CLOUDINARY_API_KEY);
    formData.append('file', event.target.files[0]);
    formData.append('upload_preset', 'rd0acrj6');

    axios
      .post(url, formData)
      .then((result) => {
        console.log(result);
        onImageUploaded(result.data.url);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <React.Fragment>
      <div
        className={classes.upload}
        style={{
          border: image === null ? '2px dashed #DDD' : 'none',
        }}
      >
        <input
          required
          accept="image/*"
          className={classes.hide}
          id={name}
          name={name}
          onChange={handleChangeImage}
          type="file"
        />
        <img src={image || NoImage} alt="image" className={classes.img} />
        {!disabled && (
          <label htmlFor={name}>
            <Button
              color="default"
              className={
                image ? classes.uploadButton : classes.uploadButtonText
              }
              component="span"
              startIcon={image ? <EditIcon /> : <PhotoCameraOutlinedIcon />}
              style={{
                transform: image ? 'translate(0,0)' : 'translate(5px,75px)',
              }}
            >
              {isLoading
                ? 'Loading...'
                : image
                ? 'Ganti Gambar'
                : 'Pilih Gambar'}
            </Button>
          </label>
        )}
      </div>
    </React.Fragment>
  );
}
