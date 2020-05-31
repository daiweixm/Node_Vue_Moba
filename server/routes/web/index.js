module.exports = app => {
  const router = require('express').Router();
  const mongoose = require('mongoose')
  // const News = require('../../models/Article')
  const Article = mongoose.model('Article')
  const Category = mongoose.model('Category')

  router.get('/news/init', async (req, res) => {
    const parent = await Category.findOne({
      name: '新闻分类'
    })
    const cats = await Category.find().where({
      parent: parent
    }).lean()
    const newsTitles  =  ["5月28日外挂专项打击公告", "5月27日体验服停机更新公告", "5月26日全服不停机更新公告", "应援KPL得好礼，福利清单就绪", "【520情侣皮肤】所有等待，只为重逢", "520情侣皮肤公布：所有等待，只为重逢", "UI改造日志第四期：背包系统优化在即，局内快捷消息更智能！", "《五虎上将交响曲》揭秘，一起来看看你的音乐公开课随堂笔记吧！", "0元免流畅玩包，轻轻松松上王者", "王者荣耀联合乘车码送豪华大礼，五五开黑不氪金！", "五虎有灵，音乐发声，王者荣耀音乐公开课来啦！", "中国电信同城线上开黑活动开启", "新皮肤爆料丨老将在此，谁能挡我？黄忠-烈魂新装登场！", "5月31日体验服停机更新公告", "总会给各位召唤师们畅所欲言对于9月7日q版本的比赛果预测及看法", "5月29日体验服停机更新公告", "5月28日体验服异常修复公告", "5月28日净化游戏环境声明及处罚公告", "5月28日“演员”惩罚名单", "5月28日外挂专项打击公告", "5月27日体验服停机更新公告", "5月26日服务器优化升级公告", "应援KPL得好礼，福利清单就绪", "", "DIY告白信 520陪您花式告白", "爱在峡谷 甜蜜520", "峡谷迎初夏，好礼领不停", "黄忠-烈魂五虎上将限定皮肤即将上架，缤纷好礼齐降临", "“五五打卡游”活动开启", "与我为伍，彼此守护，活动专属皮肤&amp;五五局内表现获取全攻略", "五五开黑节，赵云-龙胆即将上架，多重福利来袭", "虎牙明星主播踢馆名校战队，峡谷高材生与学霸的荣耀对决", "虎牙明星主播踢馆名校战队，谁将更胜一筹？", "2020年KPL春季赛常规赛最佳阵容及最佳选手评选方式公布", "2020年KPL春季赛季后赛赛程赛制公布，5月28日16:00热血开战", "【原创内容大赛音乐比赛】优秀作品合集（二）", "大众赛事合作赛道全面开启，携手合作伙伴共建王者电竞生态", "【KPL今日预报】南京Hero久竞 vs DYG，DYG.久诚迎战老东家能否取胜", "关于责成TS俱乐部就欠薪问题进行说明的通知", "《一招即浪》第二期：逆天牛魔王最浪打法，城市赛教你一招制敌", "【KPL今日预报】败者组第三轮，生死对决谁能晋级四强？", "请各位召唤师们畅所欲言对于5月31日广州TTG.XQ vs 杭州LGD大鹅、TS vs RNG.M两场比赛的赛果预测及看法", "你是赛评师：TS零封VG踏入败者组第三轮，奇迹少年们还能走多远？", "【简讯】VG惨遭TS零封,遗憾止步季后赛败者组第二轮", "春季赛快讯：TS强势零封VG挺进下一轮，VG遗憾止步世冠选拔赛再见", "你是赛评师：广州TTG.XQ4：2西安WE，最后一局选择诸葛亮算奇招吗？", "【简讯】西安WE2:4不敌广州TTG.XQ遗憾止步败者组第二轮", "春季赛快讯：广州TTG.XQ险胜西安WE进军下一轮，钎城伽罗、九尾诸葛亮秀出自我"]

    const newsList = newsTitles.map( title => {
      const randomCats = cats.slice(0).sort((a,b) => Math.random() - 0.5)
      return {
        categories: randomCats.slice(0,2),
        title: title
      }
    })
    await Article.insertMany(newsList)
    res.send(newsList)
  })

  router.get('/news/list', async (req, res) => {
    // const parent = await Category.findOne({
    //   name: '新闻分类'
    // }).populate({
    //   path: 'children',
    //   populate: {
    //     path: 'newsList'
    //   }
    // }).lean()
    const parent = await Category.findOne({
      name: '新闻分类'
    })
    const cats = await Category.aggregate([
      { $match: { parent: parent._id }},
      { $lookup: {
        from: 'articles',
        localField: '_id',
        foreignField: 'categories',
        as: 'newsList'
      }},
      {
        $addFields: {
          'newsList': {
            $slice: ['$newsList', 5]
          }
        }
      }
    ])
    const subCats = cats.map(v => v._id)
    cats.unshift({
      name: '热门',
      newsList: await Article.find().where({
        categories: { $in: subCats }
      }).populate('categories').limit(5).lean()
    })

    cats.map(cat => {
      cat.newsList.map(news => {
        news.categoryName = cat.name === '热门' ? news.categories[0].name : cat.name
        return news
      })
    })
    res.send(cats)
  })

  // router.get('/heroes/list', async (req, res) => {
  //   const
  // })
  app.use('/web/api', router)
}