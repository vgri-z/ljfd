export const userMenus = [
  // 系统管理
  {
    displayName: '系统管理',
    hasUrl: false,
    icon: 'Setting',
    id: '953ae96f-286e-494a-92bd-3a015e608e43',
    isEnabled: true,
    isLeaf: false,
    name: 'Administration',
    order: 1000,
    parentId: null,
    permission: null,
    url: null,
    children: [
      {
        displayName: '用户管理',
        hasUrl: true,
        icon: null,
        id: '3d93d3fa-cae7-4004-ad74-3a015e608e43',
        isEnabled: true,
        isLeaf: true,
        name: 'UserManagement',
        order: 100,
        parentId: '953ae96f-286e-494a-92bd-3a015e608e43',
        permission: 'User.Manage',
        url: '/main/system-manage/user'
      },
      {
        displayName: '内容管理',
        hasUrl: true,
        icon: null,
        id: '3d93d3fa-cae7-4204-ad74-3a015e608e43',
        isEnabled: true,
        isLeaf: true,
        name: 'ContentManagement',
        order: 108,
        parentId: '953ae96f-286e-494a-92bd-3a015e608e43',
        permission: 'Content.Manage',
        url: '/main/system-manage/content'
      },
      {
        displayName: '角色管理',
        hasUrl: true,
        icon: null,
        id: '3d93d3fa-cae7-4004-ad74-3a015e698e43',
        isEnabled: true,
        isLeaf: true,
        name: 'RoleManagement',
        order: 101,
        parentId: '953ae96f-286e-494a-92bd-3a015e608e43',
        permission: 'Role.Manage',
        url: '/main/system-manage/role'
      },
      {
        displayName: '部门管理',
        hasUrl: true,
        icon: null,
        id: '3d93d3fa-cae7-4004-ad74-3a011e608e43',
        isEnabled: true,
        isLeaf: true,
        name: 'DepartmentManagement',
        order: 102,
        parentId: '953ae96f-286e-494a-92bd-3a015e608e43',
        permission: 'Department.Manage',
        url: '/main/system-manage/department'
      }
    ]
  }
]
