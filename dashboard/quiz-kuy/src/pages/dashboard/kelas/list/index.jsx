import React from 'react';
import { useHistory } from 'react-router-dom';
import { useStyles } from './styles';
import { listKelas, deleteKelas } from 'services/kelas';
import { useGlobalDispatch } from 'contexts/global';
import Table from 'components/table';

export default function List() {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useGlobalDispatch();

  const [data, setData] = React.useState([]);

  function fetchData() {
    dispatch({ tableLoading: true });
    listKelas()
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
      deleteKelas(data.id)
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
        title="Kelas"
        columns={[{ title: 'Nama', field: 'nama' }]}
        data={data}
        actions={[
          {
            tooltip: 'Edit',
            icon: 'edit',
            onClick: (_, data) =>
              history.push(`/dashboard/kelas/edit/${data.id}`),
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
            onClick: () => history.push(`/dashboard/kelas/create`),
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
