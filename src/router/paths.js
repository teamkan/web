export default [

  {
    path: '*',
    meta: {
      public: true,
    },
    redirect: {
      path: '/404'
    }
  },  
  {
    path: '/404',
    meta: {
      public: true,
    },
    name: 'NotFound',
    component: () => import(
      /* webpackChunkName: "routes" */
      `@/views/NotFound.vue`
    )
  },
  {
    path: '/403',
    meta: {
      public: true,
    },
    name: 'AccessDenied',
    component: () => import(
      /* webpackChunkName: "routes" */
      `@/views/Deny.vue`
    )
  },
  {
    path: '/500',
    meta: {
      public: true,
    },
    name: 'ServerError',
    component: () => import(
      /* webpackChunkName: "routes" */
      `@/views/Error.vue`
    )
  },
  {
    path: '/login',
    meta: {
      public: true,
    },
    name: 'Login',
    component: () => import(
      /* webpackChunkName: "routes" */
      `@/views/Login.vue`
    )
  },
  {
    path: '/',
    meta: { },
    name: 'Root',
    redirect: {
      name: 'Dashboard'
    }
  },
  {
    path: '/dashboard',
    meta: { 
      breadcrumb: true,
      requiresAuth: true 
    },
    name: 'Dashboard',
    component: () => import(
      /* webpackChunkName: "routes" */
      `@/views/Dashboard.vue`
    )
  },
  {
    path: '/projects',
    meta: { 
      breadcrumb: true,
      requiresAuth: true 
    },
    name: 'Projects',
    component: () => import(
      /* webpackChunkName: "routes" */
      `@/views/Project/Projects.vue`
    )
    },
  {
    path: '/sprints',
    meta: { 
      breadcrumb: true,
      requiresAuth: true 
    },
    name: 'Sprints',
    component: () => import(
      /* webpackChunkName: "routes" */
      `@/views/Sprint/Sprints.vue`
    )
  },
  {
    path: '/projects/:id',
    meta: { 
      breadcrumb: false,
      requiresAuth: true
    },
    name: 'Project',
    component: () => import(
      /* webpackChunkName: "routes" */
      `@/views/Project/Project.vue`
    )
  },

  {
    path: '/admin/users',
    meta: { 
      breadcrumb: true,
      requiresAuth: true 
    },
    name: 'Users',
    component: () => import(
      /* webpackChunkName: "routes" */
      `@/views/Admin/Users.vue`
    )
  },
  {
    path: '/admin/projects',
    meta: { 
      breadcrumb: true,
      requiresAuth: true 
    },
    name: 'AdminProjects',
    component: () => import(
      /* webpackChunkName: "routes" */
      `@/views/Admin/Projects.vue`
    )
    },
  {
    path: '/admin/sprints',
    meta: { 
      breadcrumb: true,
      requiresAuth: true 
    },
    name: 'AdminSprints',
    component: () => import(
      /* webpackChunkName: "routes" */
      `@/views/Admin/Sprints.vue`
    )
  },
];
