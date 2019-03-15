const Menu =  [
  { header: 'Admin area' },
  {
    title: 'Users',
    group: 'admin',
    icon: 'people',
    name: 'Users',
  },
  {
    title: 'Projects',
    group: 'admin',
    icon: 'people',
    name: 'Projects',
  },
];
// reorder menu
Menu.forEach((item) => {
  if (item.items) {
    item.items.sort((x, y) => {
      let textA = x.title.toUpperCase();
      let textB = y.title.toUpperCase();
      return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
    });
  }
});

export default Menu;
