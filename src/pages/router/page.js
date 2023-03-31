export default [{
  path: '/subScreen',
  name: 'subScreen',
  component: () => import('/src/subScreen/index'),
  meta: {
    title: '拓展屏'
  }
}]
