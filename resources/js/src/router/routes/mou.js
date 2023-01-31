export default [
    {
      path: '/list',
      name: 'lists',
      component: () => import('@/views/mou/MouList.vue'),
    },
    {
      path: '/add',
      name: 'mou-add',
      component: () => import('@/views/mou/add/MouAdd.vue'),
    },
    {
      path: '/view/:id',
      name: 'mou-view',
      component: () => import('@/views/mou/view/MouView.vue'),
    },
    {
      path: '/edit/:id',
      name: 'mou-edit',
      component: () => import('@/views/mou/edit/MouEdit.vue'),
    },
    // {
    //   path: '/report-pi',
    //   name: 'report-pi',
    //   component: () => import('@/views/project/report/ReportPi.vue'),
    // },
  ]
  