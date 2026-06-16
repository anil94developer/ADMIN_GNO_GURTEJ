import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import PhotoLibraryIcon from '@mui/icons-material/PhotoLibrary';
import EventIcon from '@mui/icons-material/Event';
import ArticleIcon from '@mui/icons-material/Article';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import NotificationsIcon from '@mui/icons-material/Notifications';
import CampaignIcon from '@mui/icons-material/Campaign';
import FormatQuoteIcon from '@mui/icons-material/FormatQuote';
import SettingsIcon from '@mui/icons-material/Settings';
import ContactPhoneIcon from '@mui/icons-material/ContactPhone';
import FlagIcon from '@mui/icons-material/Flag';
import GroupsIcon from '@mui/icons-material/Groups';
import InfoIcon from '@mui/icons-material/Info';
import TuneIcon from '@mui/icons-material/Tune';
import WebIcon from '@mui/icons-material/Web';

export const SIDEBAR_WIDTH = 272;

export const MENU = [
  { label: 'Dashboard', path: '/', icon: DashboardIcon },
  { label: 'Users', path: '/users', icon: PeopleIcon },
  { label: 'Donations', path: '/donations', icon: VolunteerActivismIcon },
  { label: 'Queries', path: '/queries', icon: QuestionAnswerIcon },
  { type: 'divider' },
  { label: 'Categories', path: '/categories', icon: AccountTreeIcon },
  { label: 'Gallery', path: '/gallery', icon: PhotoLibraryIcon },
  { label: 'Events', path: '/events', icon: EventIcon },
  { label: 'Blogs', path: '/blogs', icon: ArticleIcon },
  { label: 'Success Stories', path: '/stories', icon: AutoStoriesIcon },
  { label: 'FAQ', path: '/faqs', icon: HelpOutlineIcon },
  { label: 'Notifications', path: '/notifications', icon: NotificationsIcon },
  { label: 'Notices', path: '/notices', icon: CampaignIcon },
  { label: 'Voices of Hope', path: '/voices', icon: FormatQuoteIcon },
  { type: 'divider' },
  {
    label: 'Settings',
    icon: SettingsIcon,
    children: [
      { label: 'Contact Details', path: '/settings/contact', icon: ContactPhoneIcon },
      { label: 'Our Mission', path: '/settings/mission', icon: FlagIcon },
      { label: 'About Us', path: '/settings/about', icon: InfoIcon },
      { label: 'Team', path: '/settings/team', icon: GroupsIcon },
      { label: 'Website / General', path: '/settings/general', icon: TuneIcon },
      { label: 'Content Pages', path: '/settings/content', icon: WebIcon },
    ],
  },
];
