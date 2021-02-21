import DashboardOutlinedIcon from '@material-ui/icons/DashboardOutlined';
import AssignmentIndOutlinedIcon from '@material-ui/icons/AssignmentIndOutlined';
import SchoolOutlinedIcon from '@material-ui/icons/SchoolOutlined';
import CollectionsBookmarkOutlinedIcon from '@material-ui/icons/CollectionsBookmarkOutlined';
import EqualizerOutlinedIcon from '@material-ui/icons/EqualizerOutlined';
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';
import AssignmentTurnedInOutlinedIcon from '@material-ui/icons/AssignmentTurnedInOutlined';

export const sidebar_navigation = [
  // ADMIN
  {
    icon: DashboardOutlinedIcon,
    label: 'Dashboard',
    path: '/dashboard',
  },
  {
    icon: AssignmentTurnedInOutlinedIcon,
    label: 'Quiz',
    path: '/dashboard/quiz',
  },
  {
    icon: AccountBalanceIcon,
    label: 'Bank Soal',
    path: '/dashboard/bank-soal',
  },
  {
    icon: CollectionsBookmarkOutlinedIcon,
    label: 'Pelajaran',
    path: '/dashboard/pelajaran',
  },
  {
    icon: SchoolOutlinedIcon,
    label: 'Siswa',
    path: '/dashboard/siswa',
  },
  {
    icon: AssignmentIndOutlinedIcon,
    label: 'Guru',
    path: '/dashboard/guru',
  },
  {
    icon: EqualizerOutlinedIcon,
    label: 'Kelas',
    path: '/dashboard/kelas',
  },
];
