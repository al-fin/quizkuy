import React from 'react';
import { Grid, Typography, Paper } from '@material-ui/core';
import { Input, Button, Select } from 'components/controls';
import { useForm } from 'hooks/use-form';
import { useStyles } from './styles';
import { detailSiswa, updateStatusSiswa } from 'services/siswa';
import { listKelas } from 'services/kelas';
import WithBack from 'components/with-back';
import { useGlobalDispatch } from 'contexts/global';
import axios from 'axios';
import { useParams } from 'react-router-dom';

export default function Detail() {
  const { values, setValues, errors, handleInputChange } = useForm({
    nama: '',
    nisn: '',
    email: '',
    kelas_id: '',
    password: '',
  });

  const { id } = useParams();
  const dispatch = useGlobalDispatch();

  const classes = useStyles();

  const [options, setOptions] = React.useState({
    kelas: [],
  });

  React.useEffect(() => {
    dispatch({ loading: true });

    axios.all([listKelas()]).then((res) => {
      setOptions({
        ...options,
        kelas: res[0].data,
      });
    });

    detailSiswa(id)
      .then(({ data }) => {
        setValues({
          ...values,
          nama: data.nama,
          nisn: data.nisn,
          status: data.status,
          email: data.email,
          kelas_id: data.kelas_id,
        });
      })
      .finally(() => {
        dispatch({ loading: false });
      });
  }, []);

  function handleApprove() {
    const new_values = values;
    new_values.status = 'TERVERIFIKASI';
    setValues({ ...new_values });
    updateStatusSiswa(id, {
      status: 'TERVERIFIKASI',
    });
  }

  function handleReject() {
    const new_values = values;
    new_values.status = 'DITOLAK';
    setValues({ ...new_values });
    updateStatusSiswa(id, {
      status: 'DITOLAK',
    });
  }

  return (
    <>
      <Paper className="paper-dense">
        <Grid container spacing={2} className={classes.container}>
          <Grid item xs={12} container>
            <Grid item xs={6}>
              <WithBack>
                <Typography variant="h5" className={classes.title}>
                  Detail Siswa
                </Typography>
              </WithBack>
            </Grid>

            <Grid item xs={6} container alignItems="center" justify="flex-end">
              <span
                className={
                  values.status == 'DITOLAK'
                    ? 'STATUS_RED'
                    : values.status == 'TERVERIFIKASI'
                    ? 'STATUS_GREEN'
                    : 'STATUS_GREY'
                }
              >
                {values.status}
              </span>
            </Grid>
          </Grid>

          <Grid item xs={12}>
            <Input
              disabled
              name="nama"
              label="nama"
              value={values.nama}
              onChange={handleInputChange}
              error={errors?.nama}
              type="text"
            />
          </Grid>

          <Grid item xs={6}>
            <Input
              disabled
              name="nisn"
              label="NISN"
              value={values.nisn}
              onChange={handleInputChange}
              error={errors?.nisn}
              type="number"
            />
          </Grid>

          <Grid item xs={6}>
            <Select
              disabled
              options={options.kelas}
              labelKey="nama"
              valueKey="id"
              name="kelas_id"
              label="Kelas"
              value={values.kelas_id}
              onChange={handleInputChange}
              error={errors?.kelas_id}
              type="text"
            />
          </Grid>

          <Grid item xs={12}>
            <Input
              disabled
              name="email"
              label="email"
              value={values.email}
              onChange={handleInputChange}
              error={errors?.email}
              type="email"
            />
          </Grid>

          {values.status == 'MENUNGGU VERIFIKASI' && (
            <>
              <Grid item xs={6}>
                <Button
                  color="red"
                  onClick={handleReject}
                  fullWidth
                  text="TOLAK"
                />
              </Grid>
              <Grid item xs={6}>
                <Button
                  color="green"
                  onClick={handleApprove}
                  fullWidth
                  text="SETUJUI"
                />
              </Grid>
            </>
          )}
        </Grid>
      </Paper>
    </>
  );
}
