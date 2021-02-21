import React from 'react';
import { useStyles } from './styles';
import Avatar from '@material-ui/core/Avatar';
import AddPhotoIcon from "icons/add-photo";
import Badge from "@material-ui/core/Badge";
import LoadingPhoto from "images/loading.gif";
import useNotification from 'hooks/use-notification';
import { uploadImage } from 'services/images';

export default function UploadAvatar({
  name,
  photo,
  setPhoto,
  error = null,
}) {
  const classes = useStyles();
  const { sendWarning } = useNotification();
  const [isLoading, setLoading] = React.useState(false);

  const handleChangePhoto = async (event) => {
    event.persist();
    setLoading(true);
    try {
      const photo_size = event.target.files[0].size / 1024;
      if (photo_size > 5120) {
        sendWarning('Ukuran foto harus dibawah 5MB !');
      } else {
        const res = await uploadImage(name, event.target.files[0]);
        const photo_url = res[0].data.signedUrl;
        setPhoto(name, photo_url);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };
  return (
    <React.Fragment>
      <div>
        <input
          accept="image/*"
          className={classes.input}
          id={name}
          type="file"
          onChange={handleChangePhoto}
        />
        <label htmlFor={name}>
          <Badge
            overlap="circle"
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
            badgeContent={
              <div style={{ transform: "translateY(-12px)" }}>
                <AddPhotoIcon />
              </div>
            }
            style={{ cursor: "pointer" }}
          >
            <Avatar src={isLoading ? LoadingPhoto : photo} className={classes.avatar} style={{
              border: error ? `3px solid red` : `3px solid rgba(0,0,0,0)`,
            }} />
          </Badge>
        </label>
      </div>
    </React.Fragment>
  );
}
