export const userMenus = [
  // 系统管理
  {
    id: 1,
    name: '系统管理',
    type: 1,
    url: '/main/system-manage',
    icon: 'Setting',
    children: [
      {
        id: 2,
        name: '用户管理',
        type: 2,
        url: '/main/system-manage/user',
        children: []
      },
      {
        id: 3,
        name: '系统日志',
        type: 2,
        url: '/main/system-manage/systemLog',
        children: []
      }
    ]
  },
  // 船舶管理
  {
    id: 4,
    name: '船舶管理',
    type: 1,
    url: '/main/ship-manage',
    icon: 'ship',
    children: [
      {
        id: 5,
        name: '船舶登记管理',
        type: 2,
        url: '/main/ship-manage/shipRegister',
        children: []
      },
      {
        id: 6,
        name: '船舶所有权、国籍登记',
        type: 2,
        url: '/main/ship-manage/rightRegister',
        children: []
      },
      {
        id: 7,
        name: '光船租赁登记',
        type: 2,
        url: '/main/ship-manage/leaseRegister',
        children: []
      },
      {
        id: 30,
        name: '船舶抵押登记',
        type: 2,
        url: '/main/ship-manage/mortgageRegister',
        children: []
      },
      {
        id: 8,
        name: '船舶变更登记（项目、船籍港、船名）',
        type: 2,
        url: '/main/ship-manage/changeRegister',
        children: []
      },
      {
        id: 9,
        name: '船舶所有权、国籍注销登记',
        type: 2,
        url: '/main/ship-manage/rightCancel',
        children: []
      },
      {
        id: 10,
        name: '船舶抵押注销登记',
        type: 2,
        url: '/main/ship-manage/mortgageCancel',
        children: []
      },
      {
        id: 11,
        name: '光船租赁注销登记',
        type: 2,
        url: '/main/ship-manage/leaseCancel',
        children: []
      },
      {
        id: 12,
        name: '船舶烟囱标志、公司旗登记',
        type: 2,
        url: '/main/ship-manage/companyFlag',
        children: []
      },
      {
        id: 13,
        name: '废钢船登记',
        type: 2,
        url: '/main/ship-manage/discardShip',
        children: []
      },
      {
        id: 14,
        name: '最低安全配员证书签发',
        type: 2,
        url: '/main/ship-manage/safeBook',
        children: []
      },
      {
        id: 15,
        name: '船舶名称核准',
        type: 2,
        url: '/main/ship-manage/nameApprove',
        children: []
      },
      {
        id: 16,
        name: '船舶签证薄核发',
        type: 2,
        url: '/main/ship-manage/sendVisa',
        children: []
      },
      {
        id: 17,
        name: '《船上油污应急计划》审核',
        type: 2,
        url: '/main/ship-manage/planCheck',
        children: []
      }
    ]
  },
  // 船员管理
  {
    id: 18,
    name: '船员管理',
    type: 1,
    url: '/main/sailor-manage',
    icon: 'User',
    children: [
      {
        id: 19,
        name: '船员发证登记',
        type: 2,
        url: '/main/sailor-manage/certificateRegister',
        children: []
      },
      {
        id: 20,
        name: '船员发证管理',
        type: 2,
        url: '/main/sailor-manage/certificateManage',
        children: []
      }
    ]
  },
  // 船舶营运证管理
  {
    id: 21,
    name: '船舶营运证管理',
    type: 1,
    url: '/main/operation-manage',
    icon: 'Notebook',
    children: [
      {
        id: 22,
        name: '船舶营运证登记',
        type: 2,
        url: '/main/operation-manage/operationRegister',
        children: []
      },
      {
        id: 23,
        name: '船舶营运证管理',
        type: 2,
        url: '/main/operation-manage/operateManage',
        children: []
      }
    ]
  },
  // 船检管理
  {
    id: 24,
    name: '船检管理',
    type: 1,
    url: '/main/inspect-manage',
    icon: 'CircleCheck',
    children: [
      {
        id: 25,
        name: '船检登记',
        type: 2,
        url: '/main/inspect-manage/inspectRegister',
        children: []
      },
      {
        id: 26,
        name: '船检管理',
        type: 2,
        url: '/main/inspect-manage/inspectManage',
        children: []
      }
    ]
  },
  // 港口企业
  {
    id: 27,
    name: '港口企业',
    type: 1,
    url: '/main/port-manage',
    icon: 'Location',
    children: [
      {
        id: 28,
        name: '企业咨询登记',
        type: 2,
        url: '/main/port-manage/consultRegister',
        children: []
      },
      {
        id: 29,
        name: '企业咨询管理',
        type: 2,
        url: '/main/port-manage/consultManage',
        children: []
      }
    ]
  }
]
