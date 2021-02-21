import React from 'react';
import { useHistory } from 'react-router-dom';
import { useStyles } from './styles';
import { listPelajaran, deletePelajaran } from 'services/pelajaran';
import { useGlobalDispatch } from 'contexts/global';
import Table from 'components/table';

export default function List() {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useGlobalDispatch();

  const [data, setData] = React.useState([]);

  function fetchData() {
    dispatch({ tableLoading: true });
    listPelajaran()
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
      deletePelajaran(data.id)
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
        title="Pelajaran"
        columns={[{ title: 'Nama', field: 'nama' }]}
        data={data}
        actions={[
          {
            tooltip: 'Edit',
            icon: 'edit',
            onClick: (_, data) =>
              history.push(`/dashboard/pelajaran/edit/${data.id}`),
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
            onClick: () => history.push(`/dashboard/pelajaran/create`),
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
