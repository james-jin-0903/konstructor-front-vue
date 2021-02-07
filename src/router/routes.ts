import { DOMAIN_TITLE } from '@/config';

import skillsPage from '../pages/Skills.vue';
import interestPage from '../pages/Interest.vue';
import passwordPage from '../pages/Password.vue';

import communicationsAdd from '../pages/CommunicationsAdd.vue';
import communicationsEdit from '../pages/CommunicationsEdit.vue';
import communicationsPage from '../pages/Communications.vue';

import addressPage from '../pages/Address.vue';
import addressAdd from '../pages/AddressAdd.vue';
import addressEdit from '../pages/AddressEdit.vue';

import socialPage from '../pages/Social.vue';
import socialAdd from '../pages/SocialAdd.vue';
import socialEdit from '../pages/SocialEdit.vue';

import paymentPage from '../pages/Payment.vue';

import emailsPage from '../pages/Emails.vue';
import emailsAdd from '../pages/EmailsAdd.vue';
import emailsEdit from '../pages/EmailsEdit.vue';

import ideasPage from '../pages/Ideas/Index.vue';
import ideasArchive from '../pages/Ideas/Archive.vue';
import ideasDraft from '../pages/Ideas/Draft.vue';
import ideasDetail from '../pages/Ideas/Detail.vue';
import ideasNew from '../pages/Ideas/New.vue';

import archivePage from '../pages/Archive.vue';
import projectsPage from '../pages/Projects.vue';
import projectPage from '../pages/ProjectPage.vue';
import subprojectPage from '../pages/SubprojectPage.vue';
import newProjectPage from '../pages/NewProject.vue';
import newTask from '../pages/NewTask.vue';

//
import groupsPage from '../pages/Groups.vue';

// Services
import servicesPage from '@/pages/services/index.vue';
import servicesDraft from '@/pages/services/Draft.vue';
import servicesArchive from '@/pages/services/Archive.vue';
import servicesHistory from '@/pages/services/History.vue';
import serviceDetailPage from '@/pages/services/ServiceDetail.vue';
import taskDetailPage from '@/pages/services/TaskDetail.vue';
import taskMilestonesPage from '@/pages/services/TaskMilestones.vue';
import newServicePage from '@/pages/services/NewService.vue';
import newTasksPage from '@/pages/services/NewTask.vue';

// Files
import filesPage from '@/pages/files/index.vue';
import filesHistory from '@/pages/files/History.vue';

// Other
import locationPage from '../pages/Location.vue';
import userPage from '../pages/User.vue';
import chatPage from '../pages/Chat.vue';
import conferencePage from '../pages/Conference.vue';
import attachmentsPage from '../pages/Attachments.vue';
import dreamPage from '../pages/Dream.vue';
import financesPage from '../pages/finance/Finances.vue';
import accountPage from '../pages/Account.vue';
import settingsPage from '../pages/Settings.vue';
import notFoundPage from '../pages/NotFound.vue';
import styleguidePage from '../pages/Styleguide.vue';
import Charts from '../pages/Charts.vue';
import SingleLineChart from '@/components/Charts/LineChart/SingleLineChart.vue';
import MultiLineChart from '@/components/Charts/LineChart/MultiLineChart.vue';
import SingleBarChart from '@/components/Charts/BarChart/SingleBarChart.vue';
import MultiBarChart from '@/components/Charts/BarChart/MultiBarChart.vue';

import AnalyzeChart from '../pages/AnalyzeChart.vue';
import { authRoutes } from '@/router/auth';
import { checkAuth } from '@/router/middlewares';

import CapitalDataTable from '@/pages/CapitalDataTable.vue';
import BudgetDataTable from '@/pages/BudgetDataTable.vue';

import MapMode from '@/components/finances-page/MapMode.vue';
import AnalyticsMode from '@/components/finances-page/AnalyticsMode.vue';
import CapitalLineGraph from '@/components/finances-page/CapitalLineGraph.vue';
import CapitalStructure from '@/components/finances-page/CapitalStructure.vue';
import BudgetBarGraph from '@/components/finances-page/BudgetBarGraph.vue';

// Capital subsection pages

import MyAccount from '@/pages/finance/capital/MyAccount.vue';
import Debitors from '@/pages/finance/capital/Debitors.vue';
import Lenders from '@/pages/finance/capital/Lenders.vue';
import ShareCommunities from '@/pages/finance/capital/ShareCommunities.vue';
import Investors from '@/pages/finance/capital/Investors.vue';
import AccountsHistory from '@/pages/finance/histories/AccountsHistory.vue';
import DebitorsHistory from '@/pages/finance/histories/DebitorsHistory.vue';
import LendersHistory from '@/pages/finance/histories/LendersHistory.vue';
import SharesHistory from '@/pages/finance/histories/SharesHistory.vue';
import Savers from '@/pages/finance/capital/Savers.vue';
import SaversHistory from '@/pages/finance/histories/SaversHistory.vue';
import MyAccountAnalytics from '@/pages/finance/capital/MyAccountsAnalytics.vue';
import DebitorsAnalytics from '@/pages/finance/capital/DebitorsAnalytics.vue';
import LendersAnalytics from '@/pages/finance/capital/LendersAnalytics.vue';
import CommunitySharesAnalytics from '@/pages/finance/capital/CommunitySharesAnalytics.vue';
import SaversAnalytics from '@/pages/finance/capital/SaversAnalytics.vue';

// Budget section pages
import Budget from '@/pages/finance/budget/Budget.vue';
import BudgetArchive from '@/pages/finance/budget/BudgetArchive.vue';
import BudgetAnalytics from '@/pages/finance/budget/BudgetAnalytics.vue';
import BudgetHistory from '@/pages/finance/histories/BudgetHistory.vue';
import BudgetNewItem from '@/pages/finance/budget/BudgetNewItem.vue';

import FinancesRefill from '@/pages/finance/refill/FinancesRefill.vue';

export const routes = [
  ...authRoutes,
  {
    path: '/',
    name: 'index',
    component: settingsPage,
    meta: { requiresAuth: true, title: `${DOMAIN_TITLE} | Settings page` },
    beforeEnter: checkAuth,
  },
  {
    path: '/settings',
    name: 'settings',
    component: settingsPage,
    meta: { requiresAuth: true, title: `${DOMAIN_TITLE} | Settings page` },
    beforeEnter: checkAuth,
  },
  {
    path: '/account',
    name: 'account',
    component: accountPage,
    meta: { requiresAuth: true, title: `${DOMAIN_TITLE} | Account page` },
    beforeEnter: checkAuth,
  },
  {
    path: '/address/add',
    name: 'addressAdd',
    component: addressAdd,
    meta: { requiresAuth: true, title: `${DOMAIN_TITLE} | Address add` },
    beforeEnter: checkAuth,
  },
  {
    path: '/address/:id',
    name: 'addressEdit',
    component: addressEdit,
    meta: { requiresAuth: true, title: `${DOMAIN_TITLE} | Address edit` },
    beforeEnter: checkAuth,
  },
  {
    path: '/address',
    name: 'address',
    component: addressPage,
    meta: { requiresAuth: true, title: `${DOMAIN_TITLE} | Address page` },
    beforeEnter: checkAuth,
  },
  {
    path: '/communications/add',
    name: 'communicationsAdd',
    component: communicationsAdd,
    meta: { requiresAuth: true, title: `${DOMAIN_TITLE} | Communications add` },
    beforeEnter: checkAuth,
  },
  {
    path: '/communications/:id',
    name: 'communicationsEdit',
    component: communicationsEdit,
    meta: { requiresAuth: true, title: `${DOMAIN_TITLE} | Communications edit` },
    beforeEnter: checkAuth,
  },
  {
    path: '/communications',
    name: 'communications',
    component: communicationsPage,
    meta: { requiresAuth: true, title: `${DOMAIN_TITLE} | Communications page` },
    beforeEnter: checkAuth,
  },
  {
    path: '/emails/add',
    name: 'emailsAdd',
    component: emailsAdd,
    meta: { requiresAuth: true, title: `${DOMAIN_TITLE} | Emails add` },
    beforeEnter: checkAuth,
  },
  {
    path: '/emails/:id',
    name: 'emailsEdit',
    component: emailsEdit,
    meta: { requiresAuth: true, title: `${DOMAIN_TITLE} | Emails edit` },
    beforeEnter: checkAuth,
  },
  {
    path: '/emails',
    name: 'emails',
    component: emailsPage,
    meta: { requiresAuth: true, title: `${DOMAIN_TITLE} | Emails page` },
    beforeEnter: checkAuth,
  },
  {
    path: '/interest',
    name: 'interest',
    component: interestPage,
    meta: { requiresAuth: true, title: `${DOMAIN_TITLE} | Interest page` },
    beforeEnter: checkAuth,
  },
  {
    path: '/location',
    name: 'location',
    component: locationPage,
    meta: { requiresAuth: true, title: `${DOMAIN_TITLE} | Location page` },
    beforeEnter: checkAuth,
  },
  {
    path: '/password',
    name: 'password',
    component: passwordPage,
    meta: { requiresAuth: true, title: `${DOMAIN_TITLE} | Password page` },
    beforeEnter: checkAuth,
  },
  {
    path: '/payment',
    name: 'payment',
    component: paymentPage,
    meta: { requiresAuth: true, title: `${DOMAIN_TITLE} | Payment page` },
    beforeEnter: checkAuth,
  },
  {
    path: '/skills',
    name: 'skills',
    component: skillsPage,
    meta: { requiresAuth: true, title: `${DOMAIN_TITLE} | Skills page` },
    beforeEnter: checkAuth,
  },
  {
    path: '/ideas/new',
    name: 'ideasNew',
    component: ideasNew,
    meta: { requiresAuth: true, title: `${DOMAIN_TITLE} | New idea` },
    beforeEnter: checkAuth,
  },
  {
    path: '/ideas/draft',
    name: 'ideasDraft',
    component: ideasDraft,
    meta: { requiresAuth: true, title: `${DOMAIN_TITLE} | Ideas draft` },
    beforeEnter: checkAuth,
  },
  {
    path: '/ideas/archive',
    name: 'ideasArchive',
    component: ideasArchive,
    meta: { requiresAuth: true, title: `${DOMAIN_TITLE} | Ideas archive` },
    beforeEnter: checkAuth,
  },
  {
    path: '/ideas/:id',
    name: 'ideasDetail',
    component: ideasDetail,
    meta: { requiresAuth: true, title: `${DOMAIN_TITLE} | Idea detail` },
    beforeEnter: checkAuth,
  },
  {
    path: '/ideas',
    name: 'ideas',
    component: ideasPage,
    meta: { requiresAuth: true, title: `${DOMAIN_TITLE} | Social page` },
    beforeEnter: checkAuth,
  },
  {
    path: '/services',
    name: 'services',
    component: servicesPage,
    meta: { requiresAuth: true, title: `${DOMAIN_TITLE} | Services` },
    beforeEnter: checkAuth,
  },
  {
    path: '/services/draft',
    name: 'servicesDraft',
    component: servicesDraft,
    meta: { requiresAuth: true, title: `${DOMAIN_TITLE} | Services draft` },
    beforeEnter: checkAuth,
  },
  {
    path: '/services/archive',
    name: 'servicesArchive',
    component: servicesArchive,
    meta: { requiresAuth: true, title: `${DOMAIN_TITLE} | Services archive` },
    beforeEnter: checkAuth,
  },
  {
    path: '/services/history',
    name: 'servicesHistory',
    component: servicesHistory,
    meta: { requiresAuth: true, title: `${DOMAIN_TITLE} | Services history` },
    beforeEnter: checkAuth,
  },
  {
    path: '/services/service/new',
    name: 'newService',
    component: newServicePage,
    meta: { requiresAuth: true, title: `${DOMAIN_TITLE} | Services add` },
    beforeEnter: checkAuth,
  },
  {
    path: '/services/task/new',
    name: 'newTask',
    component: newTasksPage,
    meta: { requiresAuth: true, title: `${DOMAIN_TITLE} | Tasks add` },
    beforeEnter: checkAuth,
  },
  {
    path: '/services/task/:id',
    name: 'taskDetail',
    component: taskDetailPage,
    meta: { requiresAuth: true, title: `${DOMAIN_TITLE} | Task detail` },
    beforeEnter: checkAuth,
  },
  {
    path: '/services/service/:id',
    name: 'serviceDetail',
    component: serviceDetailPage,
    meta: { requiresAuth: true, title: `${DOMAIN_TITLE} | Service detail` },
    beforeEnter: checkAuth,
  },
  {
    path: '/services/task/:id/milestones',
    name: 'taskMilestones',
    component: taskMilestonesPage,
    meta: { requiresAuth: true, title: `${DOMAIN_TITLE} | Task milestones` },
    beforeEnter: checkAuth,
  },
  {
    path: '/files',
    name: 'filesPage',
    component: filesPage,
    meta: { requiresAuth: true, title: `${DOMAIN_TITLE} | Files Page` },
    beforeEnter: checkAuth,
  },
  {
    path: '/files/:fileName/history',
    name: 'fileHistory',
    component: filesHistory,
    meta: { requiresAuth: true, title: `${DOMAIN_TITLE} | File History` },
    beforeEnter: checkAuth,
  },
  {
    path: '/social/add',
    name: 'socialAdd',
    component: socialAdd,
    meta: { requiresAuth: true, title: `${DOMAIN_TITLE} | Social add` },
    beforeEnter: checkAuth,
  },
  {
    path: '/social/:id',
    name: 'socialEdit',
    component: socialEdit,
    meta: { requiresAuth: true, title: `${DOMAIN_TITLE} | Social edit` },
    beforeEnter: checkAuth,
  },
  {
    path: '/social',
    name: 'social',
    component: socialPage,
    meta: { requiresAuth: true, title: `${DOMAIN_TITLE} | Social page` },
    beforeEnter: checkAuth,
  },
  {
    path: '/user',
    name: 'user',
    component: userPage,
    meta: { requiresAuth: true, title: `${DOMAIN_TITLE} | User page` },
    beforeEnter: checkAuth,
  },
  {
    path: '/chat',
    name: 'chat',
    component: chatPage,
    meta: { requiresAuth: true, title: `${DOMAIN_TITLE} | Chat page` },
    beforeEnter: checkAuth,
  },
  {
    path: '/conference',
    name: 'conference',
    component: conferencePage,
    meta: { requiresAuth: true, title: `${DOMAIN_TITLE} | Conference settings page` },
    beforeEnter: checkAuth,
  },
  {
    path: '/attachments',
    name: 'attachments',
    component: attachmentsPage,
    meta: { requiresAuth: true, title: `${DOMAIN_TITLE} | Attachments page` },
    beforeEnter: checkAuth,
  },
  {
    path: '/dream',
    name: 'dream',
    component: dreamPage,
    meta: { requiresAuth: true, title: `${DOMAIN_TITLE} | Dream page` },
    beforeEnter: checkAuth,
  },
  {
    path: '/finances',
    name: 'finances',
    component: financesPage,
    meta: { requiresAuth: true, title: `${DOMAIN_TITLE} | Finances page` },
    beforeEnter: checkAuth,
  },
  {
    path: '/styleguide',
    name: 'styleguide',
    component: styleguidePage,
    meta: { requiresAuth: true, title: `${DOMAIN_TITLE} | Social page` },
    beforeEnter: checkAuth,
  },
  {
    path: '/archive',
    name: 'archive',
    component: archivePage,
    meta: { requiresAuth: true, title: `${DOMAIN_TITLE} | Archive page` },
    beforeEnter: checkAuth,
  },
  // {
  //   path: '/projects',
  //   name: 'projects',
  //   component: projectsPage,
  //   meta: { requiresAuth: true, title: `${DOMAIN_TITLE} | Projects page` },
  //   beforeEnter: checkAuth,
  // },
  {
    path: '/project/:id',
    name: 'projectPage',
    component: projectPage,
    meta: { requiresAuth: true, title: `${DOMAIN_TITLE} | Project page` },
    beforeEnter: checkAuth,
  },
  {
    path: '/subproject/:id',
    name: 'subprojectPage',
    component: subprojectPage,
    meta: { requiresAuth: true, title: `${DOMAIN_TITLE} | Subproject page` },
    beforeEnter: checkAuth,
  },
  {
    path: '/newProject',
    name: 'newProject',
    component: newProjectPage,
    meta: { requiresAuth: true, title: `${DOMAIN_TITLE} | New project` },
    props: { isSub: false },
    beforeEnter: checkAuth,
  },
  {
    path: '/newSubproject',
    name: 'newSubproject',
    component: newProjectPage,
    meta: { requiresAuth: true, title: `${DOMAIN_TITLE} | New project` },
    props: { isSub: true },
    beforeEnter: checkAuth,
  },
  {
    path: '/newTask',
    name: 'newTaskPage',
    component: newTask,
    meta: { requiresAuth: true, title: `${DOMAIN_TITLE} | New task` },
    beforeEnter: checkAuth,
  },
  {
    path: '/analyze',
    name: 'analyze',
    component: AnalyzeChart,
    meta: { requiresAuth: true, title: `${DOMAIN_TITLE} | Analyze page` },
    beforeEnter: checkAuth,
  },
  {
    path: '/charts',
    name: 'charts',
    component: Charts,
    meta: { requiresAuth: true, title: `${DOMAIN_TITLE} | Charts page` },
    beforeEnter: checkAuth,
  },
  {
    path: '/charts/single-line-chart',
    name: 'Single line chart',
    component: SingleLineChart,
    meta: { requiresAuth: true, title: `${DOMAIN_TITLE} | Single Line page` },
    beforeEnter: checkAuth,
  },
  {
    path: '/charts/multi-line-chart',
    name: 'Multi line page',
    component: MultiLineChart,
    meta: { requiresAuth: true, title: `${DOMAIN_TITLE} | Multi Line page` },
    beforeEnter: checkAuth,
  },
  {
    path: '/charts/single-bar-chart',
    name: 'Single bar chart',
    component: SingleBarChart,
    meta: { requiresAuth: true, title: `${DOMAIN_TITLE} | Single bar page` },
    beforeEnter: checkAuth,
  },
  {
    path: '/charts/multi-bar-chart',
    name: 'Multi bar chart',
    component: MultiBarChart,
    meta: { requiresAuth: true, title: `${DOMAIN_TITLE} | Multi bar page` },
    beforeEnter: checkAuth,
  },
  {
    path: '/finances/capital-data-table',
    name: 'Capital Data table',
    component: CapitalDataTable,
    meta: { title: `${DOMAIN_TITLE} | Capital Data-table` },
  },
  {
    path: '/finances/budget-data-table',
    name: 'Budget Data table',
    component: BudgetDataTable,
    meta: { title: `${DOMAIN_TITLE} | Budget Data-table` },
  },
  {
    path: '/finances/map-mode',
    name: 'Map mode',
    component: MapMode,
    meta: { title: `${DOMAIN_TITLE} | Map Mode` },
  },
  {
    path: '/finances/analytics-mode',
    name: 'Analytics',
    component: AnalyticsMode,
    meta: { title: `${DOMAIN_TITLE} | Ananlytics Mode` },
  },
  {
    path: '/finances/analytics-mode/capital-line-graph',
    name: 'Capital Line graph',
    component: CapitalLineGraph,
    meta: { title: `${DOMAIN_TITLE} | Capital Line Graph` },
  },
  {
    path: '/finances/analytics-mode/capital-structure',
    name: 'capital structure',
    component: CapitalStructure,
    meta: { title: `${DOMAIN_TITLE} | Capital Structure Pie Chart` },
  },
  {
    path: '/finances/analytics-mode/budget-bar-graph',
    name: 'Budget bar graph',
    component: BudgetBarGraph,
    meta: { title: `${DOMAIN_TITLE} | Budget Bar Graph` },
  },
  {
    path: '/finances/capital/my-account',
    name: 'My account',
    component: MyAccount,
    meta: { title: `${DOMAIN_TITLE} | My Account` },
  },
  {
    path: '/finances/capital/debitors',
    name: 'Debitors',
    component: Debitors,
    meta: { title: `${DOMAIN_TITLE} | Debitors` },
  },
  {
    path: '/finances/capital/lenders',
    name: 'Lenders',
    component: Lenders,
    meta: { title: `${DOMAIN_TITLE} | Lenders` },
  },
  {
    path: '/finances/capital/share-communities',
    name: 'Share communities',
    component: ShareCommunities,
    meta: { title: `${DOMAIN_TITLE} | Community Shares` },
  },
  {
    path: '/finances/capital/investors',
    name: 'Investors',
    component: Investors,
    meta: { title: `${DOMAIN_TITLE} | Investors` },
  },
  {
    path: '/finances/capital/my-account/history',
    name: 'my-account History',
    component: AccountsHistory,
    meta: { title: `${DOMAIN_TITLE} | Accounts History` },
  },
  {
    path: '/finances/capital/debitors/history',
    name: 'Debitors History',
    component: DebitorsHistory,
    meta: { title: `${DOMAIN_TITLE} | Debitors History` },
  },
  {
    path: '/finances/capital/lenders/history',
    name: 'Lenders History',
    component: LendersHistory,
    meta: { title: `${DOMAIN_TITLE} | Lenders History` },
  },
  {
    path: '/finances/capital/share-communities/history',
    name: 'Share-communities History',
    component: SharesHistory,
    meta: { title: `${DOMAIN_TITLE} | Community Shares History` },
  },
  {
    path: '/finances/capital/savers',
    name: 'savers',
    component: Savers,
    meta: { title: `${DOMAIN_TITLE} | Savers` },
  },
  {
    path: '/finances/capital/savers/history',
    name: 'Savers History',
    component: SaversHistory,
    meta: { title: `${DOMAIN_TITLE} | Savers History` },
  },
  {
    path: '/finances/capital/my-account/analytics',
    name: 'My account analytics',
    component: MyAccountAnalytics,
    meta: { title: `${DOMAIN_TITLE} | My Account Analytics` },
  },
  {
    path: '/finances/capital/debitors/analytics',
    name: 'Debitors Analytics',
    component: DebitorsAnalytics,
    meta: { title: `${DOMAIN_TITLE} | Debitors Analytics` }
  },
  {
    path: '/finances/capital/lenders/analytics',
    name: 'Lenders Analytics',
    component: LendersAnalytics,
    meta: { title: `${DOMAIN_TITLE} | Lenders Analytics` }
  },
  {
    path: '/finances/capital/share-communities/analytics',
    name: 'Community-Shares Analytics',
    component: CommunitySharesAnalytics,
    meta: { title: `${DOMAIN_TITLE} | Community Shares Analytics` }
  },
  {
    path: '/finances/capital/savers/analytics',
    name: 'Savers Analytics',
    component: SaversAnalytics,
    meta: { title: `${DOMAIN_TITLE} | Savers Analytics` }
  },
  {
    path: '/finances/budget',
    name: 'Budget',
    component: Budget,
    meta: { title: `${DOMAIN_TITLE} | Finances Budget` }
  },
  {
    path: '/finances/budget/analytics',
    name: 'Budget-Analytics',
    component: BudgetAnalytics,
    meta: { title: `${DOMAIN_TITLE} | Finances Budget Analytics` }
  },
  {
    path: '/finances/budget/archive',
    name: 'Budget-Archive',
    component: BudgetArchive,
    meta: { title: `${DOMAIN_TITLE} | Finances Budget Analytics` }
  },
  {
    path: '/finances/budget/history',
    name: 'Budget-history',
    component: BudgetHistory,
    meta: { title: `${DOMAIN_TITLE} | Finances Budget History` }
  },
  {
    path: '/finances/budget/new-item',
    name: 'Budget-new-item',
    component: BudgetNewItem,
    meta: { title: `${DOMAIN_TITLE} | Finances Budget New Item` }
  },
  {
    path: '/finances/refill',
    name: 'Finances Refill',
    component: FinancesRefill,
    meta: { title: `${DOMAIN_TITLE} | Finances Refill` }
  },
  {
    path: '/finances/recommendations',
    name: 'Recommendations',
    component: () => import('@/pages/Recommendations.vue'),
    meta: { title: `${DOMAIN_TITLE} | Recommendations` }
  },
  {
    path: '/finances/withdraw-funds',
    name: 'Withdraw Funds',
    component: () => import('@/pages/finance/withdraw/FinanceWithdrawFunds.vue'),
    meta: { title: `${DOMAIN_TITLE} | Withdraw Funds` }
  },
  {
    path: '/groups',
    name: 'groups',
    component: () => import('@/pages/Groups.vue'),
    meta: {title: `${DOMAIN_TITLE} | Groups`}
  },
  {
    path: '/investments',
    name: 'investments',
    component: () => import('@/pages/Investments.vue'),
    meta: {title: `${DOMAIN_TITLE} | Investments`}
  },
  {
    path: '/goods',
    name: 'goods',
    component: () => import('@/pages/Goods.vue'),
    meta: {title: `${DOMAIN_TITLE} | Goods`}
  },
  // {
  //   path: '/settings',
  //   name: 'settings',
  //   component: () => import('@/pages/Settings.vue'),
  //   meta: {title: `${DOMAIN_TITLE} | Settings`}
  // },
  {
    path: '/jobs',
    name: 'jobs',
    component: () => import('@/pages/Jobs.vue'),
    meta: {title: `${DOMAIN_TITLE} | Jobs`}
  },
  {
      path: '/all-services',
      name: 'all-services',
      component: () => import('@/pages/services/All.vue'),
      meta: {title: `${DOMAIN_TITLE} | All Services`}
  },
  {
    path: '/marketing',
    name: 'marketing',
    component: () => import('@/pages/Marketing.vue'),
    meta: {title: `${DOMAIN_TITLE} | Marketing`}
  },
  {
    path: '/t-management',
    name: 't-management',
    component: () => import('@/pages/TimeManagement.vue'),
    meta: {title: `${DOMAIN_TITLE} | Time Management`}
  },
  {
    path: '/projects',
    name: 'projects',
    component: () => import('@/pages/Projects.vue'),
    meta: {title: `${DOMAIN_TITLE} | Projects`}
  },
  {
    path: '/contact',
    name: 'contact',
    component: () => import('@/pages/Contact.vue'),
    meta: {title: `${DOMAIN_TITLE} | Contact`}
  },
  {
    path: '/stats',
    name: 'stats',
    component: () => import('@/pages/Stats.vue'),
    meta: {title: `${DOMAIN_TITLE} | Statistics`}
  },
  {
    path: '/wish',
    name: 'wish',
    component: () => import('@/pages/Wish.vue'),
    meta: {title: `${DOMAIN_TITLE} | Wish List`}
  },
  {
    path: '/bookmarks',
    name: 'bookmarks',
    component: () => import('@/pages/Bookmarks.vue'),
    meta: {title: `${DOMAIN_TITLE} | Bookmarks`}
  },
  {
    path: '/support',
    name: 'support',
    component: () => import('@/pages/Support.vue'),
    meta: {title: `${DOMAIN_TITLE} | Support`}
  },
  {
    path: '*',
    component: notFoundPage,
    meta: { requiresAuth: true, title: `${DOMAIN_TITLE} | not found` },
    beforeEnter: checkAuth,
  },
];
