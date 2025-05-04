import { Mountain } from '@/types/mountain';

export const mountains: Mountain[] = [
  {
    id: 1,
    name: '泰山',
    region: '山东',
    elevation: 1545,
    coordinates: {
      latitude: 36.2654,
      longitude: 117.1191,
    },
    difficulty: '低',
    description: '泰山，又名岱宗、岱山，位于山东省泰安市中部，是中国"五岳"之首，古来有"五岳独尊"的美誉。泰山自古以来就是政治和宗教的中心，是中国最重要的名山之一。泰山是儒家、道家和佛教的圣地，也是中国古代帝王举行封禅大典的重要场所。',
    routes: [
      {
        name: '红门路',
        difficulty: '低',
        duration: '3-4小时',
        description: '红门路是泰山最经典的登山路线，沿途经过十八盘、南天门等景点，适合大多数游客。这条路线设施完善，台阶路为主，路况较好。'
      },
      {
        name: '天烛峰路',
        difficulty: '中',
        duration: '4-5小时',
        description: '天烛峰路是一条较为原始的登山路线，途经天烛峰、后石坞等地，人迹相对较少，可以欣赏更多自然风光，适合有一定登山经验的游客。'
      }
    ],
    images: [
      'https://images.pexels.com/photos/4119471/pexels-photo-4119471.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/5342916/pexels-photo-5342916.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/5342929/pexels-photo-5342929.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    ],
    bestSeason: '4月至10月，其中春秋两季最佳。冬季有雪景，但温度较低，需注意保暖。',
    safetyTips: '泰山台阶较多，建议穿舒适防滑的鞋子，携带雨具和饮用水。山顶温度比山下低，请准备保暖衣物。旺季人流量大，请注意安全并避开高峰期。'
  },
  {
    id: 2,
    name: '华山',
    region: '陕西',
    elevation: 2154,
    coordinates: {
      latitude: 34.4898,
      longitude: 110.0896,
    },
    difficulty: '高',
    description: '华山是中国五大名山之一，以"奇、险、陡"著称，位于陕西省华阴市。华山有东、西、南、北、中五个主峰，其中南峰最高，海拔2154.9米。华山不仅是道教名山，还是中国古代文人墨客向往的地方，被誉为"天下第一险山"。',
    routes: [
      {
        name: '西峰路',
        difficulty: '高',
        duration: '5-6小时',
        description: '西峰路是华山主要登山路线之一，从华山游客中心出发，沿途经过五里关、腰阁、北峰等景点，最后可以到达西峰。这条路线台阶较陡，需要较好的体力。'
      },
      {
        name: '智取华山路（索道+步行）',
        difficulty: '中',
        duration: '3-4小时',
        description: '先搭乘索道到北峰，然后步行游览各个峰顶。这条路线节省体力，适合时间有限或体力一般的游客，但错过了华山部分险峻景观。'
      },
      {
        name: '长空栈道',
        difficulty: '极高',
        duration: '1小时',
        description: '长空栈道是华山最惊险的路段之一，是一条凿在绝壁上的窄小山路，宽仅0.3米，长约40米，由木板铺设而成，下临数千尺深渊，需要极大的勇气和良好的心理素质。'
      }
    ],
    images: [
      'https://images.pexels.com/photos/6650614/pexels-photo-6650614.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/11042542/pexels-photo-11042542.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/7173906/pexels-photo-7173906.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    ],
    bestSeason: '4月至10月，其中9月至10月最佳。冬季山上积雪，部分路段可能封闭，不建议前往。',
    safetyTips: '华山以险峻著称，请务必遵守安全规定，听从工作人员指挥。山上气候多变，请带足保暖衣物和雨具。长空栈道等险要路段请量力而行，如有恐高症或身体不适，请勿尝试。'
  },
  {
    id: 3,
    name: '黄山',
    region: '安徽',
    elevation: 1864,
    coordinates: {
      latitude: 30.1330,
      longitude: 118.1650,
    },
    difficulty: '中',
    description: '黄山位于安徽省南部，是中国著名的风景区和避暑胜地，以奇松、怪石、云海、温泉"四绝"著称。黄山有72峰，主峰莲花峰海拔1864米。黄山的美景集中国名山之大成，自古就有"五岳归来不看山，黄山归来不看岳"的说法。',
    routes: [
      {
        name: '前山路线（云谷寺-白鹅岭-北海-排云亭-光明顶）',
        difficulty: '中',
        duration: '6-7小时',
        description: '从云谷寺出发，经过白鹅岭，可以欣赏到黄山最著名的松树之一"迎客松"，然后到达北海景区，经排云亭到达黄山主峰光明顶。这条路线景色丰富，但台阶较多。'
      },
      {
        name: '西海大峡谷路线',
        difficulty: '高',
        duration: '4-5小时',
        description: '西海大峡谷是黄山风景区的精华所在，这条路线需要从排云亭出发，沿着峡谷内的栈道前行，可以欣赏到壮观的峡谷风光和奇特的岩石景观。路线难度较大，有部分陡峭路段。'
      },
      {
        name: '索道+步行路线',
        difficulty: '低',
        duration: '3-4小时',
        description: '可以选择乘坐云谷索道或者玉屏索道上山，然后步行游览山上景点。这条路线适合体力一般或时间有限的游客，可以节省大量体力。'
      }
    ],
    images: [
      'https://images.pexels.com/photos/1424239/pexels-photo-1424239.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/3879071/pexels-photo-3879071.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/3347244/pexels-photo-3347244.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    ],
    bestSeason: '4月至11月，其中9月至11月最佳。冬季黄山的雪景也很美，但温度低，部分路段可能封闭。',
    safetyTips: '黄山天气变化多端，请带足保暖衣物和雨具。山上台阶较多，建议穿舒适防滑的鞋子。黄山日出、晚霞和云海是著名景观，可以提前了解最佳观赏时间和地点。'
  },
  {
    id: 4,
    name: '峨眉山',
    region: '四川',
    elevation: 3099,
    coordinates: {
      latitude: 29.5997,
      longitude: 103.3300,
    },
    difficulty: '中',
    description: '峨眉山位于四川省乐山市峨眉山市境内，是中国四大佛教名山之一，同时也是世界文化与自然双遗产。主峰金顶海拔3099米，山上有超过30座寺庙。峨眉山气候垂直分布明显，植被丰富，有"植物王国"之称。',
    routes: [
      {
        name: '金顶路线（报国寺-万年寺-五显岗-接引殿-金顶）',
        difficulty: '高',
        duration: '1-2天',
        description: '从峨眉山脚下的报国寺出发，经过万年寺、五显岗、接引殿等景点，最终到达金顶。这是一条经典的朝圣路线，全程约30公里，台阶众多，通常需要1-2天时间，也可以分段完成。'
      },
      {
        name: '索道+步行路线',
        difficulty: '中',
        duration: '4-6小时',
        description: '乘坐金顶索道或者万年寺索道上山，然后步行游览周边景点。这条路线适合时间有限或体力一般的游客，可以节省大量体力，但会错过一些沿途风景。'
      }
    ],
    images: [
      'https://images.pexels.com/photos/5342880/pexels-photo-5342880.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/2832145/pexels-photo-2832145.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/5342915/pexels-photo-5342915.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    ],
    bestSeason: '3月至11月，其中秋季最佳。冬季山上积雪，金顶会形成壮观的雾凇景观，但气温低，需要充分准备。',
    safetyTips: '峨眉山有野生猴群，请勿投食或刺激猴子，保持安全距离。高海拔地区氧气稀薄，应避免剧烈运动。山上气温比山下低10℃左右，请带足保暖衣物。'
  },
  {
    id: 5,
    name: '武当山',
    region: '湖北',
    elevation: 1612,
    coordinates: {
      latitude: 32.4111,
      longitude: 111.0023,
    },
    difficulty: '中',
    description: '武当山位于湖北省十堰市丹江口市境内，是道教名山，以"四大名山皆拱揖，五方仙岳共朝宗"的盛誉享誉中外。武当山是道教的发源地之一，道教创始人张三丰曾在此修炼。主峰天柱峰海拔1612米，山上有古建筑群39处，是中国重要的道教宫观建筑群。',
    routes: [
      {
        name: '金顶路线',
        difficulty: '中',
        duration: '4-5小时',
        description: '从太子坡出发，途经紫霄宫、南岩宫等景点，最终到达金顶。这条路线可以欣赏到武当山主要的道教宫观和自然风光，全程台阶路，需要一定的体力。'
      },
      {
        name: '索道+步行路线',
        difficulty: '低',
        duration: '2-3小时',
        description: '乘坐金顶索道上山，然后游览金顶周边景点。这条路线适合体力一般或时间有限的游客，可以节省大量体力。'
      }
    ],
    images: [
      'https://images.pexels.com/photos/4456532/pexels-photo-4456532.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/4456535/pexels-photo-4456535.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/1424240/pexels-photo-1424240.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    ],
    bestSeason: '4月至10月，其中春秋两季最佳。冬季武当山积雪，形成雪景，但温度较低，需注意保暖。',
    safetyTips: '武当山台阶较多，建议穿舒适防滑的鞋子。山上气温较低，请带足保暖衣物。道教建筑有着悠久的历史和文化价值，请尊重宗教习俗并保护古建筑。'
  },
  {
    id: 6,
    name: '长白山',
    region: '吉林',
    elevation: 2744,
    coordinates: {
      latitude: 42.1375,
      longitude: 128.1147,
    },
    difficulty: '中',
    description: '长白山位于吉林省东南部，是中朝边境的界山，主峰白头山海拔2744米，山顶有著名的天池。长白山是松花江、鸭绿江、图们江三江之源，是中国东北地区最高的山脉，也是满族、朝鲜族的圣山。长白山自然保护区是中国面积最大、保存最完好的自然保护区之一。',
    routes: [
      {
        name: '北坡天池路线',
        difficulty: '中',
        duration: '1天',
        description: '从长白山北坡保护区入口出发，乘坐环保车到达半山腰，然后徒步登顶或乘坐索道到达天池附近。这条路线是最受欢迎的路线，设施完善，可以近距离观赏天池。'
      },
      {
        name: '西坡观天池路线',
        difficulty: '低',
        duration: '半天',
        description: '从西坡入口进入，可以直接乘坐观光车到达观景台，欣赏天池全景。这条路线相对轻松，适合体力一般的游客，但观景视角有限。'
      },
      {
        name: '绿渊潭-锦江大峡谷路线',
        difficulty: '中',
        duration: '4-5小时',
        description: '这条路线位于长白山北坡，从绿渊潭出发，沿着峡谷步道前行，可以欣赏到原始森林、瀑布和峡谷风光。这是一条探险性质的路线，适合喜欢自然风光的游客。'
      }
    ],
    images: [
      'https://images.pexels.com/photos/8100784/pexels-photo-8100784.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/2754200/pexels-photo-2754200.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/754122/pexels-photo-754122.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    ],
    bestSeason: '6月至9月，其中7月至8月最佳。冬季景色壮丽但极度寒冷，需要专业装备和向导。',
    safetyTips: '长白山海拔较高，气候多变，请带足保暖衣物和雨具。高海拔地区氧气稀薄，应避免剧烈运动。天池区域风大，注意保暖和安全。'
  }
];