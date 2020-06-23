module.exports = {

  title: '成睿软件',

  /**
   * @type {boolean} true | false
   * @description Whether fix the header
   */
  fixedHeader: false,

  /**
   * @type {boolean} true | false
   * @description Whether show the logo in sidebar
   */
  sidebarLogo: false,
  store: {
    // infinite: 无限下拉, page: 分页, data: 普通数据, 自定义函数 ({ state, rootState }, data) => { return data; }
    commitType: 'page',
    // 默认分页数据结构
    defaultPaginationData: {
      data: [],
      count: 0,
      limit: 15,
      pageindex: 0,
      next_page_url: null,
      prev_page_url: null,
      has_next_page: true
    }
  }
}
