import React from 'react';
import { useHistory } from 'react-router-dom';
import { useStyles } from './styles';
import { listBankSoal, deleteBankSoal } from 'services/bank-soal';
import { useGlobalDispatch } from 'contexts/global';
import Table from 'components/table';

export default function List() {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useGlobalDispatch();

  const [data, setData] = React.useState([]);

  function fetchData() {
    dispatch({ tableLoading: true });
    listBankSoal()
      .then((res) => {
        setData(res.data);
      })
      .finally(() => {
        dispatch({ tableLoading: false });
      });
  }

  React.useEffect(() => {
    fetchData();
    // eslint-disable-next-line
  }, []);

  function handleDelete(e, data) {
    const confirmation = window.confirm(
      'Apakah kamu yakin ingin menghapus data ini?'
    );
    if (confirmation) {
      dispatch({ tableLoading: true });
      deleteBankSoal(data.id)
        .then(() => {
          fetchData();
        })
        .finally(() => {
          dispatch({ tableLoading: false });
        });
    }
  }

  return (
    <>
      <Table
        title="Bank Soal"
        columns={[
          { title: 'Judul', field: 'judul' },
          { title: 'Jenis Soal', field: 'jenis_soal' },
          { title: 'Jumlah Soal', field: 'jumlah_soal' },
          { title: 'Pelajaran', field: 'pelajaran' },
        ]}
        data={data}
        actions={[
          {
            tooltip: 'Detail',
            icon: 'visibility',
            onClick: (_, data) =>
              history.push(`/dashboard/bank-soal/detail/${data.id}`),
          },
          {
            tooltip: 'Edit',
            icon: 'edit',
            onClick: (_, data) =>
              history.push(`/dashboard/bank-soal/edit/${data.id}`),
          },
          {
            tooltip: 'Hapus',
            icon: 'delete',
            onClick: handleDelete,
          },
          {
            tooltip: 'Tambah',
            icon: 'add',
            isFreeAction: true,
            onClick: () => history.push(`/dashboard/bank-soal/create`),
          },
          {
            tooltip: 'Refresh',
            icon: 'refresh',
            isFreeAction: true,
            onClick: fetchData,
          },
        ]}
      />
    </>
  );
}
