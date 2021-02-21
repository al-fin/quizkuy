import React, { lazy } from 'react';
import { Switch, Route } from 'react-router-dom';

const Dashboard = lazy(() => import('pages/dashboard/dashboard'));

const ListBankSoal = lazy(() => import('pages/dashboard/bank-soal/list'));
const CreateBankSoal = lazy(() => import('pages/dashboard/bank-soal/create'));
const EditBankSoal = lazy(() => import('pages/dashboard/bank-soal/edit'));
const DetailBankSoal = lazy(() => import('pages/dashboard/bank-soal/detail'));

const ListQuiz = lazy(() => import('pages/dashboard/quiz/list'));
const CreateQuiz = lazy(() => import('pages/dashboard/quiz/create'));
const EditQuiz = lazy(() => import('pages/dashboard/quiz/edit'));
const DetailQuiz = lazy(() => import('pages/dashboard/quiz/detail'));
const DetailJawabanQuiz = lazy(() =>
  import('pages/dashboard/quiz/detail-jawaban')
);
const KoreksiJawabanQuiz = lazy(() =>
  import('pages/dashboard/quiz/koreksi-jawaban')
);

const ListGuru = lazy(() => import('pages/dashboard/guru/list'));
const CreateGuru = lazy(() => import('pages/dashboard/guru/create'));
const EditGuru = lazy(() => import('pages/dashboard/guru/edit'));

const ListSiswa = lazy(() => import('pages/dashboard/siswa/list'));
const CreateSiswa = lazy(() => import('pages/dashboard/siswa/create'));
const EditSiswa = lazy(() => import('pages/dashboard/siswa/edit'));
const DetailSiswa = lazy(() => import('pages/dashboard/siswa/detail'));

const ListKelas = lazy(() => import('pages/dashboard/kelas/list'));
const CreateKelas = lazy(() => import('pages/dashboard/kelas/create'));
const EditKelas = lazy(() => import('pages/dashboard/kelas/edit'));

const ListPelajaran = lazy(() => import('pages/dashboard/pelajaran/list'));
const CreatePelajaran = lazy(() => import('pages/dashboard/pelajaran/create'));
const EditPelajaran = lazy(() => import('pages/dashboard/pelajaran/edit'));

const NotFound = lazy(() => import('pages/errors/not-found'));

export const routes = [
  {
    path: '/dashboard',
    component: Dashboard,
  },

  // QUIZ
  {
    path: '/dashboard/quiz',
    component: ListQuiz,
  },
  {
    path: '/dashboard/quiz/create',
    component: CreateQuiz,
  },
  {
    path: '/dashboard/quiz/edit/:id',
    component: EditQuiz,
  },
  {
    path: '/dashboard/quiz/detail/:id',
    component: DetailQuiz,
  },
  {
    path: '/dashboard/quiz/detail-jawaban/:quiz_id/:siswa_id',
    component: DetailJawabanQuiz,
  },
  {
    path: '/dashboard/quiz/koreksi-jawaban/:quiz_id/:siswa_id',
    component: KoreksiJawabanQuiz,
  },

  // BANK SOAL
  {
    path: '/dashboard/bank-soal',
    component: ListBankSoal,
  },
  {
    path: '/dashboard/bank-soal/create',
    component: CreateBankSoal,
  },
  {
    path: '/dashboard/bank-soal/edit/:id',
    component: EditBankSoal,
  },
  {
    path: '/dashboard/bank-soal/detail/:id',
    component: DetailBankSoal,
  },

  // GURU
  {
    path: '/dashboard/guru',
    component: ListGuru,
  },
  {
    path: '/dashboard/guru/create',
    component: CreateGuru,
  },
  {
    path: '/dashboard/guru/edit/:id',
    component: EditGuru,
  },

  // SISWA
  {
    path: '/dashboard/siswa',
    component: ListSiswa,
  },
  {
    path: '/dashboard/siswa/create',
    component: CreateSiswa,
  },
  {
    path: '/dashboard/siswa/edit/:id',
    component: EditSiswa,
  },
  {
    path: '/dashboard/siswa/detail/:id',
    component: DetailSiswa,
  },

  // KELAS
  {
    path: '/dashboard/kelas',
    component: ListKelas,
  },
  {
    path: '/dashboard/kelas/create',
    component: CreateKelas,
  },
  {
    path: '/dashboard/kelas/edit/:id',
    component: EditKelas,
  },

  // PELAJARAN
  {
    path: '/dashboard/pelajaran',
    component: ListPelajaran,
  },
  {
    path: '/dashboard/pelajaran/create',
    component: CreatePelajaran,
  },
  {
    path: '/dashboard/pelajaran/edit/:id',
    component: EditPelajaran,
  },
];

export default function DashboardRoutes() {
  return (
    <Switch>
      {routes.map((route, key) => (
        <Route key={key} exact path={route.path} component={route.component} />
      ))}
      <Route component={NotFound} />
    </Switch>
  );
}
