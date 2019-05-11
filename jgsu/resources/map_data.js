var polyline = [
  {
    points: [
      { latitude: 27.109299, longitude: 115.023395 },
      { latitude: 27.110087, longitude: 115.023261 },
      { latitude: 27.110631, longitude: 115.022725 },
      { latitude: 27.111195, longitude: 115.020139 },
      { latitude: 27.109887, longitude: 115.019796 },
      { latitude: 27.107996, longitude: 115.019710 },
      { latitude: 27.107050, longitude: 115.019807 },
      { latitude: 27.107021, longitude: 115.020118 },
      { latitude: 27.106420, longitude: 115.020483 },
      { latitude: 27.105350, longitude: 115.020375 },
      { latitude: 27.105341, longitude: 115.020880 }
    ],
    color: '#ff0000dd',
    width: 5,
    dottedLine: true,
    arrowLine: true
  }
]

var map = [
  {
    groupId: "10",
    groupName: "校门",
    data: [
      {
        "id": 1,
        "name": "北门(新校门)",
        "longitude": "115.030423",
        "latitude": "27.115550",
        "groupId": "10",
        "groupName": "校门"
      },
      {
        "id": 2,
        "name": "后门",
        "longitude": "115.027097",
        "latitude": "27.105961",
        "groupId": "10",
        "groupName": "校门"
      },
      {
        "id": 2,
        "name": "南门",
        "longitude": "115.023395",
        "latitude": "27.109294",
        "groupId": "10",
        "groupName": "校门"
      }
    ]
  },
  {
    groupId: "20",
    groupName: "教学楼",
    data: [
      {
        "id": 1,
        "name": "10栋教学楼",
        "longitude": "115.030973",
        "latitude": "27.111112",
        "groupId": "20",
        "groupName": "教学楼"
      },
      {
        "id": 2,
        "name": "5栋教学楼",
        "longitude": "115.025550",
        "latitude": "27.108410",
        "groupId": "20",
        "groupName": "教学楼"
      },
      {
        "id": 3,
        "name": "原11栋教学楼",
        "longitude": "115.035286",
        "latitude": "27.11549",
        "groupId": "20",
        "groupName": "教学楼"
      },
      {
        "id": 4,
        "name": "原13栋教学楼",
        "longitude": "115.037689",
        "latitude": "27.118355",
        "groupId": "20",
        "groupName": "教学楼"
      },
      {
        "id": 5,
        "name": "9栋教学楼",
        "longitude": "115.026855",
        "latitude": "27.107561",
        "groupId": "20",
        "groupName": "教学楼"
      },
      {
        "id": 6,
        "name": "4栋教学楼",
        "longitude": "115.027242",
        "latitude": "27.109691",
        "groupId": "20",
        "groupName": "教学楼"
      },
      {
        "id": 7,
        "name": "8栋教学楼",
        "longitude": "115.032949",
        "latitude": "27.108550",
        "groupId": "20",
        "groupName": "教学楼"
      }
    ]
  },
  {
    groupId: "30",
    groupName: "食堂",
    data: [
      {
        "id": 1,
        "name": "老食堂（三食堂）",
        "longitude": "115.028250",
        "latitude": "27.109963",
        "groupId": "30",
        "groupName": "食堂"
      },
      {
        "id": 2,
        "name": "一食堂",
        "longitude": "115.027765",
        "latitude": "27.107163",
        "groupId": "30",
        "groupName": "食堂"
      },
      {
        "id": 3,
        "name": "二食堂",
        "longitude": "115.038204",
        "latitude": "27.113055",
        "groupId": "30",
        "groupName": "食堂"
      }
    ]
  },
  {
    groupId: "40",
    groupName: "运动场",
    data: [
      {
        "id": 1,
        "name": "老田径场",
        "longitude": "115.029988",
        "latitude": "27.109743",
        "groupId": "40",
        "groupName": "运动场"
      },
      {
        "id": 2,
        "name": "北区田径场",
        "longitude": "115.036865",
        "latitude": "27.111500",
        "groupId": "40",
        "groupName": "运动场"
      },
      {
        "id": 3,
        "name": "不知名田径场",
        "longitude": "115.024248",
        "latitude": "27.108330",
        "groupId": "40",
        "groupName": "运动场"
      },
      {
        "id": 4,
        "name": "网球场",
        "longitude": "115.029806",
        "latitude": "27.107413",
        "groupId": "40",
        "groupName": "运动场"
      },
      {
        "id": 5,
        "name": "北区篮球场（灯光）",
        "longitude": "115.037681",
        "latitude": "27.112475,",
        "groupId": "40",
        "groupName": "运动场"
      },
      {
        "id": 6,
        "name": "五栋篮球场",
        "longitude": "115.024710",
        "latitude": "27.108492",
        "groupId": "40",
        "groupName": "运动场"
      },
      {
        "id": 7,
        "name": "老食堂篮球场",
        "longitude": "115.028953",
        "latitude": "27.108807",
        "groupId": "40",
        "groupName": "运动场"
      },
      {
        "id": 7,
        "name": "排球场",
        "longitude": "115.037236",
        "latitude": "27.112236",
        "groupId": "40",
        "groupName": "运动场"
      }
    ]
  },
  {
    groupId: "50",
    groupName: "场馆",
    data: [
      {
        "id": 1,
        "name": "学生会堂",
        "longitude": "115.031756",
        "latitude": "27.10977",
        "groupId": "50",
        "groupName": "场馆"
      },
      {
        "id": 2,
        "name": "体育馆",
        "longitude": "115.031305",
        "latitude": "27.109359",
        "groupId": "50",
        "groupName": "场馆"
      },
      {
        "id": 3,
        "name": "老图书馆",
        "longitude": "115.025010",
        "latitude": "27.109366",
        "groupId": "50",
        "groupName": "场馆"
      },
      {
        "id": 4,
        "name": "井冈山精神展览馆",
        "longitude": "115.025461",
        "latitude": "27.108741",
        "groupId": "50",
        "groupName": "场馆"
      },
      {
        "id": 5,
        "name": "新图书馆",
        "longitude": "115.031713",
        "latitude": "27.113886",
        "groupId": "50",
        "groupName": "场馆"
      },
      {
        "id": 6,
        "name": "新学术交流中心",
        "longitude": "115.032198",
        "latitude": "27.114728",
        "groupId": "50",
        "groupName": "场馆"
      },
      {
        "id": 7,
        "name": "学术交流中心",
        "longitude": "115.024440",
        "latitude": "27.109600",
        "groupId": "50",
        "groupName": "场馆"
      },
      {
        "id": 8,
        "name": "音乐厅",
        "longitude": "115.032844",
        "latitude": "27.108947",
        "groupId": "50",
        "groupName": "场馆"
      },
      {
        "id": 9,
        "name": "网球场",
        "longitude": "115.029806",
        "latitude": "27.107413",
        "groupId": "5",
        "groupName": "场馆"
      },
      {
        "id": 10,
        "name": "国防生训练场",
        "longitude": "115.037069",
        "latitude": "27.112704",
        "groupId": "50",
        "groupName": "场馆"
      },
      {
        "id": 11,
        "name": "6栋（团委学生会）",
        "longitude": "115.027944",
        "latitude": "27.108912",
        "groupId": "50",
        "groupName": "场馆"
      },
      {
        "id": 12,
        "name": "教职工活动中心",
        "longitude": "115.029189",
        "latitude": "27.110092",
        "groupId": "50",
        "groupName": "场馆"
      },
      {
        "id": 12,
        "name": "行政大楼",
        "longitude": "115.026303",
        "latitude": "27.110245",
        "groupId": "50",
        "groupName": "场馆"
      }
    ]
  },
  {
    groupId: "60",
    groupName: "公交站",
    data: [
      {
        "id": 1,
        "name": "12路公交起始站",
        "longitude": "115.029227",
        "latitude": "27.115149",
        "groupId": "60",
        "groupName": "公交站"
      },
      {
        "id": 2,
        "name": "12路公交",
        "longitude": "115.023739",
        "latitude": "27.110789",
        "groupId": "60",
        "groupName": "公交站"
      },
      {
        "id": 3,
        "name": "南区校车起始站",
        "longitude": "115.024613",
        "latitude": "27.109466",
        "groupId": "60",
        "groupName": "公交站"
      },
      {
        "id": 4,
        "name": "北区校车起始站",
        "longitude": "115.038223",
        "latitude": "27.113468",
        "groupId": "60",
        "groupName": "公交站"
      }
    ]
  },
  {
    groupId: "70",
    groupName: "宿舍",
    data: [
      {
        "id": 1,
        "name": "32栋宿舍",
        "longitude": "115.038716",
        "latitude": "27.113936",
        "groupId": "70",
        "groupName": "宿舍"
      },
      {
        "id": 1,
        "name": "33栋宿舍",
        "longitude": "115.038711",
        "latitude": "27.114146",
        "groupId": "70",
        "groupName": "宿舍"
      },
      {
        "id": 1,
        "name": "30栋宿舍",
        "longitude": "115.037729",
        "latitude": "27.113931",
        "groupId": "70",
        "groupName": "宿舍"
      },
      {
        "id": 1,
        "name": "31栋宿舍",
        "longitude": "115.037794",
        "latitude": "27.114194",
        "groupId": "70",
        "groupName": "宿舍"
      },
      {
        "id": 1,
        "name": "37栋宿舍",
        "longitude": "115.037804",
        "latitude": "27.114661",
        "groupId": "70",
        "groupName": "宿舍"
      },
      {
        "id": 1,
        "name": "36栋宿舍",
        "longitude": "115.037831",
        "latitude": "27.114848",
        "groupId": "70",
        "groupName": "宿舍"
      },
      {
        "id": 1,
        "name": "34栋宿舍",
        "longitude": "115.037944",
        "latitude": "27.115287",
        "groupId": "70",
        "groupName": "宿舍"
      },
      {
        "id": 1,
        "name": "35栋宿舍",
        "longitude": "115.037971",
        "latitude": "27.115607",
        "groupId": "70",
        "groupName": "宿舍"
      },
      {
        "id": 1,
        "name": "38栋宿舍",
        "longitude": "115.038646",
        "latitude": "27.115645",
        "groupId": "70",
        "groupName": "宿舍"
      },
      {
        "id": 1,
        "name": "15栋宿舍",
        "longitude": "115.029575",
        "latitude": "27.107069",
        "groupId": "70",
        "groupName": "宿舍"
      },
      {
        "id": 1,
        "name": "16栋宿舍",
        "longitude": "115.029522",
        "latitude": "27.106706",
        "groupId": "70",
        "groupName": "宿舍"
      },
      {
        "id": 1,
        "name": "17栋宿舍",
        "longitude": "115.029393",
        "latitude": "27.106315",
        "groupId": "70",
        "groupName": "宿舍"
      },
      {
        "id": 1,
        "name": "18栋宿舍",
        "longitude": "115.029210",
        "latitude": "27.105947",
        "groupId": "70",
        "groupName": "宿舍"
      },
      {
        "id": 1,
        "name": "19栋宿舍",
        "longitude": "115.028937",
        "latitude": "27.107041",
        "groupId": "70",
        "groupName": "宿舍"
      },
      {
        "id": 1,
        "name": "20栋宿舍",
        "longitude": "115.028835",
        "latitude": "27.106673",
        "groupId": "70",
        "groupName": "宿舍"
      },
      {
        "id": 1,
        "name": "21栋宿舍",
        "longitude": "115.028626",
        "latitude": "27.106339",
        "groupId": "70",
        "groupName": "宿舍"
      },
      {
        "id": 1,
        "name": "22栋宿舍",
        "longitude": "115.028540",
        "latitude": "27.105933",
        "groupId": "70",
        "groupName": "宿舍"
      },
      {
        "id": 1,
        "name": "23栋宿舍",
        "longitude": "115.026770",
        "latitude": "27.107193",
        "groupId": "70",
        "groupName": "宿舍"
      },
      {
        "id": 1,
        "name": "24栋宿舍",
        "longitude": "115.026045",
        "latitude": "27.107150",
        "groupId": "70",
        "groupName": "宿舍"
      },
      {
        "id": 1,
        "name": "25栋宿舍",
        "longitude": "115.025348",
        "latitude": "27.107189",
        "groupId": "70",
        "groupName": "宿舍"
      },
      {
        "id": 1,
        "name": "26栋宿舍",
        "longitude": "115.024651",
        "latitude": "27.107136",
        "groupId": "70",
        "groupName": "宿舍"
      },
      {
        "id": 1,
        "name": "27栋宿舍",
        "longitude": "115.025364",
        "latitude": "27.106850",
        "groupId": "70",
        "groupName": "宿舍"
      },
      {
        "id": 1,
        "name": "28栋宿舍",
        "longitude": "115.026045",
        "latitude": "27.106854",
        "groupId": "70",
        "groupName": "宿舍"
      },
      {
        "id": 1,
        "name": "29栋宿舍",
        "longitude": "115.026764",
        "latitude": "27.106358",
        "groupId": "70",
        "groupName": "宿舍"
      },
      {
        "id": 1,
        "name": "1栋宿舍",
        "longitude": "115.029232",
        "latitude": "27.109767",
        "groupId": "70",
        "groupName": "宿舍"
      },
      {
        "id": 1,
        "name": "3栋宿舍",
        "longitude": "115.029232",
        "latitude": "27.109519",
        "groupId": "70",
        "groupName": "宿舍"
      },
      {
        "id": 1,
        "name": "4栋宿舍",
        "longitude": "115.029210",
        "latitude": "27.109271",
        "groupId": "70",
        "groupName": "宿舍"
      },
      {
        "id": 1,
        "name": "5栋宿舍",
        "longitude": "115.029253",
        "latitude": "27.109003",
        "groupId": "70",
        "groupName": "宿舍"
      },
      {
        "id": 1,
        "name": "老食堂对面宿舍群",
        "longitude": "115.028358",
        "latitude": "27.109753",
        "groupId": "70",
        "groupName": "宿舍"
      }
    ]
  },
  {
    groupId: "80",
    groupName: "其他",
    data: [
      {
        "id": 1,
        "name": "北区人工湖",
        "longitude": "115.034342",
        "latitude": "27.116292",
        "groupId": "80",
        "groupName": "其他"
      },
      {
        "id": 2,
        "name": "校医务室",
        "longitude": "115.024270",
        "latitude": "27.109581",
        "groupId": "80",
        "groupName": "其他"
      },
      {
        "id": 3,
        "name": "北区药店",
        "longitude": "115.038770",
        "latitude": "27.113420",
        "groupId": "80",
        "groupName": "其他"
      },
      {
        "id": 4,
        "name": "井大附小",
        "longitude": "115.025107",
        "latitude": "27.11113",
        "groupId": "80",
        "groupName": "其他"
      },
      {
        "id": 5,
        "name": "超市",
        "longitude": "115.027215",
        "latitude": "27.107284",
        "groupId": "80",
        "groupName": "其他"
      },
      {
        "id": 6,
        "name": "超市",
        "longitude": "115.028014",
        "latitude": "27.109839",
        "groupId": "80",
        "groupName": "其他"
      },
      {
        "id": 7,
        "name": "情人坡",
        "longitude": "115.029146",
        "latitude": "27.110426",
        "groupId": "80",
        "groupName": "其他"
      },
      {
        "id": 8,
        "name": "建行校外",
        "longitude": "115.026190",
        "latitude": "27.113807",
        "groupId": "80",
        "groupName": "其他"
      },
      {
        "id": 9,
        "name": "北区菜鸟驿站",
        "longitude": "115.038673",
        "latitude": "27.114165",
        "groupId": "80",
        "groupName": "其他"
      }
    ]
  }
]
module.exports = {
  map: map,
  polyline: polyline
}