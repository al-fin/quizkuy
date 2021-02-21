import React from 'react';
import { Grid, Typography, Paper } from '@material-ui/core';
import { Input, Button, Select, CheckRadio } from 'components/controls';
import { useForm } from 'hooks/use-form';
import { useStyles } from './styles';
import * as yup from 'yup';
import { extractErrors } from 'utils';
import { createBankSoal } from 'services/bank-soal';
import { useHistory } from 'react-router-dom';
import useNotification from 'hooks/use-notification';
import WithBack from 'components/with-back';
import { useGlobalDispatch } from 'contexts/global';
import axios from 'axios';
import { listPelajaran } from 'services/pelajaran';
import Tooltip from '@material-ui/core/Tooltip';
import { green, orange } from '@material-ui/core/colors';
import { uuid } from 'utils';
import Grow from '@material-ui/core/Grow';
import UploadImage from 'components/upload-image';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';

const validationSchema = yup.object().shape({
  judul: yup.string().label('Judul').required(),
  pelajaran_id: yup.string().label('Pelajaran').required(),
  jenis_soal: yup.string().label('Jenis Soal').required(),
  jumlah_soal: yup.number().label('Jumlah Soal').required(),
});

const initialData = {
  judul: '',
  jumlah_soal: 1,
  pelajaran_id: '',
  jenis_soal: 'PILIHAN GANDA',
};

const initialDataSoal = {
  pertanyaan: '',
  a: '',
  b: '',
  c: '',
  d: '',
  e: '',
  kunci_jawaban: null,
  image: null,
  with_image: false,
};

export default function Create() {
  const { values, errors, setErrors, handleInputChange } = useForm(initialData);

  const history = useHistory();
  const classes = useStyles();
  const dispatch = useGlobalDispatch();
  const { sendSuccess } = useNotification();

  const [soal, setSoal] = React.useState([]);
  const [isSubmitted, setSubmitted] = React.useState(false);

  function handleChangeSoal(e, index, field, inputType) {
    const _soal = soal;
    if (inputType == 'checkbox') {
      _soal[index][field] = e.target.checked;
    } else {
      _soal[index][field] = e.target.value;
    }
    setSoal([..._soal]);
  }

  function onImageUploaded(url, index) {
    const _soal = soal;
    _soal[index]['image'] = url;
    setSoal([..._soal]);
  }

  function resetSoal() {
    setSubmitted(false);
    setSoal([]);
  }

  function tulisSoal() {
    setSubmitted(true);
    const _soal = [];
    for (let i = 1; i <= values.jumlah_soal; i++) {
      _soal.push({
        ...initialDataSoal,
        key: uuid(),
      });
    }
    setSoal([..._soal]);
  }

  const [options, setOptions] = React.useState({
    pelajaran: [],
    jenis_soal: [{ nama: 'PILIHAN GANDA' }, { nama: 'ESSAY' }],
  });

  React.useEffect(() => {
    dispatch({ loading: true });

    axios
      .all([listPelajaran()])
      .then((res) => {
        setOptions({
          ...options,
          pelajaran: res[0].data,
        });
      })
      .finally(() => {
        dispatch({ loading: false });
      });
  }, []);

  const handleTambah = () => {
    validationSchema
      .validate(values, { abortEarly: false })
      .then(() => {
        setErrors({});
        const body = {
          judul: values.judul,
          jumlah_soal: values.jumlah_soal,
          pelajaran_id: values.pelajaran_id,
          jenis_soal: values.jenis_soal,
          soal: soal.map((item) => ({
            image: item.with_image && item.image ? item.image : null,
            pertanyaan: item.pertanyaan,
            a: values.jenis_soal == 'PILIHAN GANDA' ? item.a : null,
            b: values.jenis_soal == 'PILIHAN GANDA' ? item.b : null,
            c: values.jenis_soal == 'PILIHAN GANDA' ? item.c : null,
            d: values.jenis_soal == 'PILIHAN GANDA' ? item.d : null,
            e: values.jenis_soal == 'PILIHAN GANDA' ? item.e : null,
            kunci_jawaban: item.kunci_jawaban,
          })),
        };

        dispatch({ loading: true });
        createBankSoal(body)
          .then((res) => {
            console.log(res);
            history.push('/dashboard/bank-soal');
            sendSuccess('Berhasil menambahkan Bank Soal!');
          })
          .finally(() => {
            dispatch({ loading: false });
          });
      })
      .catch((err) => {
        console.log(err);
        setErrors(extractErrors(err));
      });
  };

  return (
    <>
      <Grid container spacing={4} className={classes.container}>
        <Grid item xs={5}>
          <Paper className="paper-dense">
            <Grid item container spacing={2}>
              <Grid item xs={12}>
                <WithBack>
                  <Typography variant="h5" className={classes.title}>
                    Tambah Bank Soal
                  </Typography>
                </WithBack>
              </Grid>

              <Grid item xs={12}>
                <Input
                  name="judul"
                  label="judul"
                  onBlur={handleInputChange}
                  error={errors?.judul}
                  type="text"
                />
              </Grid>

              <Grid item xs={12}>
                <Select
                  options={options.pelajaran}
                  labelKey="nama"
                  valueKey="id"
                  name="pelajaran_id"
                  label="Pelajaran"
                  value={values.pelajaran_id}
                  onChange={handleInputChange}
                  error={errors?.pelajaran_id}
                  type="text"
                />
              </Grid>

              <Grid item xs={12}>
                <Select
                  disabled={isSubmitted}
                  options={options.jenis_soal}
                  labelKey="nama"
                  valueKey="nama"
                  name="jenis_soal"
                  label="Jenis Soal"
                  value={values.jenis_soal}
                  onChange={handleInputChange}
                  error={errors?.jenis_soal}
                  type="text"
                />
              </Grid>

              <Grid item xs={12}>
                <Input
                  defaultValue={values.jumlah_soal}
                  disabled={isSubmitted}
                  name="jumlah_soal"
                  label="Jumlah Soal"
                  type="number"
                  error={errors?.jumlah_soal}
                  onBlur={handleInputChange}
                />
              </Grid>

              {!isSubmitted && (
                <Tooltip arrow title="Pastikan input Jumlah Soal sudah benar!">
                  <Grid item xs={12}>
                    <Button
                      fullWidth
                      type="button"
                      text="TULIS SOAL"
                      onClick={tulisSoal}
                      endIcon={<ArrowForwardIcon />}
                    />
                  </Grid>
                </Tooltip>
              )}
              {isSubmitted && (
                <>
                  <Grid item xs={6}>
                    <Button
                      fullWidth
                      variant="outlined"
                      type="button"
                      text="RESET SOAL"
                      onClick={resetSoal}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <Button
                      fullWidth
                      type="button"
                      text="SIMPAN"
                      onClick={handleTambah}
                    />
                  </Grid>
                </>
              )}
            </Grid>
          </Paper>
        </Grid>

        <Grid item xs={7} className={classes.soalContainer}>
          {soal.map((item, index) => (
            <Grow in {...(index > 0 ? { timeout: 1000 } : {})} key={item.key}>
              <Paper className={classes.soal}>
                <div className={classes.soalHeader}>
                  <Typography variant="h6" className={classes.soalHeaderText}>
                    No. {index + 1}
                  </Typography>

                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'flex-end',
                      alignItems: 'center',
                    }}
                  >
                    <FormControlLabel
                      checked={item.with_image}
                      onChange={(e) =>
                        handleChangeSoal(e, index, 'with_image', 'checkbox')
                      }
                      control={<Checkbox style={{ color: '#FFF' }} />}
                      label="Dengan gambar?"
                      labelPlacement="start"
                      style={{
                        color: '#FFF',
                        marginRight: 15,
                        fontWeight: 300,
                      }}
                    />
                    {values.jenis_soal == 'PILIHAN GANDA' && (
                      <Tooltip arrow title="Kunci Jawaban">
                        <span
                          className={classes.soalHeaderBadge}
                          style={{
                            background: item.kunci_jawaban
                              ? green[400]
                              : orange[400],
                          }}
                        >
                          {item.kunci_jawaban || '?'}
                        </span>
                      </Tooltip>
                    )}
                  </div>
                </div>

                <div className={classes.soalBody}>
                  {item.with_image && (
                    <UploadImage
                      name={`image${item.key}`}
                      image={item.image}
                      onImageUploaded={(url) => onImageUploaded(url, index)}
                    />
                  )}

                  <Input
                    label="Pertanyaan :"
                    placeholder="Tulis pertanyaan di sini..."
                    onBlur={(e) => handleChangeSoal(e, index, 'pertanyaan')}
                    multiline
                    rows={4}
                    style={{ marginBottom: 10 }}
                  />

                  {values.jenis_soal == 'PILIHAN GANDA' && (
                    <>
                      {['a', 'b', 'c', 'd', 'e'].map((option) => (
                        <Input
                          key={`${item.key}${option}`}
                          startAdornment={
                            <CheckRadio
                              value={option}
                              checked={item.kunci_jawaban == option}
                              onChange={(e) =>
                                handleChangeSoal(e, index, 'kunci_jawaban')
                              }
                            />
                          }
                          onBlur={(e) => handleChangeSoal(e, index, option)}
                          placeholder={option.toUpperCase()}
                        />
                      ))}
                    </>
                  )}

                  {values.jenis_soal == 'ESSAY' && (
                    <Input
                      label="Kunci Jawaban :"
                      placeholder="Tulis kunci jawaban di sini..."
                      onBlur={(e) =>
                        handleChangeSoal(e, index, 'kunci_jawaban')
                      }
                      multiline
                      rows={4}
                      style={{ marginBottom: 10 }}
                    />
                  )}
                </div>
              </Paper>
            </Grow>
          ))}
        </Grid>
      </Grid>
    </>
  );
}
