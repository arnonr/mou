export default [
  {
    header: "Menus",
    resource: "Auth",
    action: "read",
  },
  {
    title: "ความร่วมมือ/Mou",
    route: "mou-list",
    icon: "FileTextIcon",
    resource: "Auth",
    action: "read",
  },

  {
    title: "รายงาน/Report",
    route: "report",
    icon: "FileTextIcon",
    resource: "Auth",
    action: "read",
  },
  {
    title: "จัดการผู้ใช้งาน/User",
    route: "user-list",
    icon: "UsersIcon",
    resource: "AdminUser",
    action: "manage",
  },
];
