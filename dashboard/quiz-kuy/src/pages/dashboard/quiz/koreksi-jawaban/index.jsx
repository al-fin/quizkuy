import React from 'react';
import { Grid, Typography, Paper } from '@material-ui/core';
import { Input, CheckRadio, Button } from 'components/controls';
import { useForm } from 'hooks/use-form';
import { useStyles } from './styles';
import { koreksiJawabanQuiz, detailJawabanQuiz } from 'services/quiz';
import { useParams } from 'react-router-dom';
import WithBack from 'components/with-back';
import { useGlobalDispatch } from 'contexts/global';
import axios from 'axios';
import { listPelajaran } from 'services/pelajaran';
import { uuid } from 'utils';
import Grow from '@material-ui/core/Grow';
import UploadImage from 'components/upload-image';
import moment from 'config/moment';
import useNotification from 'hooks/use-notification';
import { useHistory } from 'react-router-dom';

const initialData = {
  nama_siswa: '',
  nisn: '',
  kelas: '',
  nilai: '',
  salah: '',
  benar: '',
  rank: '',
  timestamp: '',

  nama_quiz: '',
  kode_quiz: '',
  tanggal: null,
  bank_soal: '',
  pelajaran: '',
};

export default function KoreksiJawaban() {
  const { values, setValues } = useForm(initialData);

  const classes = useStyles();
  const dispatch = useGlobalDispatch();
  const history = useHistory();

  const [soal, setSoal] = React.useState([]);
  const { quiz_id, siswa_id } = useParams();

  const { sendSuccess } = useNotification();

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
      .all([listPelajaran(), detailJawabanQuiz(quiz_id, siswa_id)])
      .then((res) => {
        setOptions({
          ...options,
          pelajaran: res[0].data,
        });

        setValues({
          nama_siswa: res[1].data.siswa.nama,
          nisn: res[1].data.siswa.nisn,
          kelas: res[1].data.siswa.kelas,
          nilai: res[1].data.siswa.nilai,
          salah: res[1].data.siswa.salah || 0,
          benar: res[1].data.siswa.benar || 0,
          rank: res[1].data.siswa.rank,
          timestamp: moment(res[1].data.timestamp).format('hh:mm'),

          nama_quiz: res[1].data.nama,
          kode_quiz: res[1].data.kode,
          tanggal: res[1].data.tanggal,
          bank_soal: res[1].data.bank_soal.judul,
          jenis_soal: res[1].data.bank_soal.jenis_soal,
          pelajaran: res[1].data.bank_soal.pelajaran.nama,
        });

        setSoal([
          ...res[1].data.bank_soal.soal.map((item) => ({
            ...item,
            key: uuid(),
            with_image: item.image != null,
            nilai: '',
          })),
        ]);
      })
      .finally(() => {
        dispatch({ loading: false });
      });
  }, []);

  function koreksiJawaban() {
    console.log(soal);
    dispatch({ loading: true });
    koreksiJawabanQuiz({
      quiz_id: quiz_id,
      siswa_id: siswa_id,
      koreksi: soal.map((item) => ({
        no: Number(item.no),
        nilai: Number(item.nilai),
      })),
    })
      .then(() => {
        history.goBack();
        sendSuccess('Berhasil mengoreksi Jawaban Siswa!');
      })
      .finally(() => {
        dispatch({ loading: false });
      });
  }

  return (
    <>
      <Grid container spacing={4} className={classes.container}>
        <Grid item xs={5} className={classes.paperContainer}>
          <Paper className="paper-dense">
            <Grid item container spacing={2}>
              <Grid item xs={12}>
                <WithBack>
                  <Typography variant="h5" className={classes.title}>
                    Detail Siswa
                  </Typography>
                </WithBack>
              </Grid>

              <Grid item xs={12}>
                <Input disabled label="Nama Siswa" value={values.nama_siswa} />
              </Grid>

              <Grid item xs={6}>
                <Input disabled label="NISN" value={values.nisn} />
              </Grid>

              <Grid item xs={6}>
                <Input disabled label="kelas" value={values.kelas} />
              </Grid>

              <Grid item xs={12}>
                <Button
                  text="KOREKSI JAWABAN"
                  fullWidth
                  onClick={koreksiJawaban}
                  disabled={soal.filter((item) => item.nilai == '').length > 0}
                />
              </Grid>
            </Grid>
          </Paper>

          <Paper className="paper-dense" style={{ marginTop: 20 }}>
            <Grid item container spacing={2}>
              <Grid item xs={12}>
                <Typography variant="h5" className={classes.title}>
                  Detail Jawaban Quiz
                </Typography>
              </Grid>

              <Grid item xs={12}>
                <Input disabled label="Nama Quiz" value={values.nama_quiz} />
              </Grid>

              <Grid item xs={6}>
                <Input disabled label="Kode Quiz" value={values.kode_quiz} />
              </Grid>

              <Grid item xs={6}>
                <Input
                  disabled
                  label="tanggal"
                  value={moment(values.tanggal).format('DD MMMM YYYY')}
                />
              </Grid>

              <Grid item xs={12}>
                <Input disabled label="Bank Soal" value={values.bank_soal} />
              </Grid>

              <Grid item xs={12}>
                <Input disabled label="pelajaran" value={values.pelajaran} />
              </Grid>

              <Grid item xs={6}>
                <Input disabled label="Jam Selesai" value={values.timestamp} />
              </Grid>

              <Grid item xs={6}>
                <Input
                  disabled
                  label="nilai"
                  value={soal.reduce(
                    (curr, item) => Number(curr) + Number(item.nilai),
                    0
                  )}
                />
              </Grid>
            </Grid>
          </Paper>
        </Grid>

        <Grid item xs={7} className={classes.paperContainer}>
          {soal.map((item, index) => (
            <Grow in {...(index > 0 ? { timeout: 1000 } : {})} key={item.key}>
              <Paper className={classes.soal}>
                <div
                  className={
                    Number(item?.nilai?.length) == 0
                      ? classes.soalHeaderGrey
                      : classes.soalHeader
                  }
                >
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
                    <Input
                      placeholder="Nilai"
                      onBlur={(e) => handleChangeSoal(e, index, 'nilai')}
                      style={{
                        width: 75,
                        background: '#FFF',
                        border: 'none',
                        color: 'black',
                      }}
                    />
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
                              checked={item.jawaban_siswa == option}
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
                    <Grid container spacing={2}>
                      <Grid item xs={6}>
                        <Input
                          disabled
                          label="Jawaban Siswa :"
                          defaultValue={item.jawaban_siswa}
                          onBlur={(e) =>
                            handleChangeSoal(e, index, 'jawaban_siswa')
                          }
                          multiline
                          rows={4}
                          style={{ marginBottom: 10 }}
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <Input
                          disabled
                          label="Kunci Jawaban :"
                          defaultValue={item.kunci_jawaban}
                          onBlur={(e) =>
                            handleChangeSoal(e, index, 'kunci_jawaban')
                          }
                          multiline
                          rows={4}
                          style={{ marginBottom: 10 }}
                        />
                      </Grid>
                    </Grid>
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
