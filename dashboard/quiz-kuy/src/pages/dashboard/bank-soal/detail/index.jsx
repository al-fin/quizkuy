import React from 'react';
import { Grid, Typography, Paper, Tooltip } from '@material-ui/core';
import { Input, Select, CheckRadio } from 'components/controls';
import { useForm } from 'hooks/use-form';
import { useStyles } from './styles';
import { detailBankSoal } from 'services/bank-soal';
import { useParams } from 'react-router-dom';
import WithBack from 'components/with-back';
import { useGlobalDispatch } from 'contexts/global';
import axios from 'axios';
import { listPelajaran } from 'services/pelajaran';
import { green, orange } from '@material-ui/core/colors';
import { uuid } from 'utils';
import Grow from '@material-ui/core/Grow';
import UploadImage from 'components/upload-image';

const initialData = {
  judul: '',
  jumlah_soal: 1,
  pelajaran_id: '',
  jenis_soal: 'PILIHAN GANDA',
};

export default function Detail() {
  const { values, setValues, errors, handleInputChange } = useForm(initialData);

  const classes = useStyles();
  const dispatch = useGlobalDispatch();

  const [soal, setSoal] = React.useState([]);
  const { id } = useParams();

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

  const [options, setOptions] = React.useState({
    pelajaran: [],
    jenis_soal: [{ nama: 'PILIHAN GANDA' }, { nama: 'ESSAY' }],
  });

  React.useEffect(() => {
    dispatch({ loading: true });

    axios
      .all([listPelajaran(), detailBankSoal(id)])
      .then((res) => {
        setOptions({
          ...options,
          pelajaran: res[0].data,
        });

        setValues({
          ...values,
          judul: res[1].data.judul,
          pelajaran_id: res[1].data.pelajaran_id,
          jumlah_soal: res[1].data.jumlah_soal,
          jenis_soal: res[1].data.jenis_soal,
        });

        setSoal([
          ...res[1].data.soal.map((item) => ({
            ...item,
            key: uuid(),
            with_image: item.image != null,
          })),
        ]);
      })
      .finally(() => {
        dispatch({ loading: false });
      });
  }, []);

  return (
    <>
      <Grid container spacing={4} className={classes.container}>
        <Grid item xs={5}>
          <Paper className="paper-dense">
            <Grid item container spacing={2}>
              <Grid item xs={12}>
                <WithBack>
                  <Typography variant="h5" className={classes.title}>
                    Detail Bank Soal
                  </Typography>
                </WithBack>
              </Grid>

              <Grid item xs={12}>
                <Input
                  disabled
                  name="judul"
                  label="judul"
                  onChange={handleInputChange}
                  error={errors?.judul}
                  type="text"
                  value={values.judul}
                />
              </Grid>

              <Grid item xs={12}>
                <Select
                  disabled
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
                  disabled
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
                  disabled
                  value={values.jumlah_soal}
                  name="jumlah_soal"
                  label="Jumlah Soal"
                  type="number"
                  error={errors?.jumlah_soal}
                  onBlur={handleInputChange}
                />
              </Grid>
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
                      disabled
                      name={`image${item.key}`}
                      image={item.image}
                      onImageUploaded={(url) => onImageUploaded(url, index)}
                    />
                  )}

                  <Input
                    disabled
                    label="Pertanyaan :"
                    placeholder="Tulis pertanyaan di sini..."
                    defaultValue={item.pertanyaan}
                    onBlur={(e) => handleChangeSoal(e, index, 'pertanyaan')}
                    multiline
                    rows={4}
                    style={{ marginBottom: 10 }}
                  />

                  {values.jenis_soal == 'PILIHAN GANDA' && (
                    <>
                      {['a', 'b', 'c', 'd', 'e'].map((option) => (
                        <Input
                          disabled
                          key={`${item.key}${option}`}
                          startAdornment={
                            <CheckRadio
                              disabled
                              value={option}
                              checked={item.kunci_jawaban == option}
                              onChange={(e) =>
                                handleChangeSoal(e, index, 'kunci_jawaban')
                              }
                            />
                          }
                          defaultValue={item[option]}
                          onBlur={(e) => handleChangeSoal(e, index, option)}
                          placeholder={option.toUpperCase()}
                        />
                      ))}
                    </>
                  )}

                  {values.jenis_soal == 'ESSAY' && (
                    <Input
                      disabled
                      label="Kunci Jawaban :"
                      placeholder="Tulis kunci jawaban di sini..."
                      defaultValue={item.kunci_jawaban}
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
