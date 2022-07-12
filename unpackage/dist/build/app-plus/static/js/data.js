let countryList = [
	{
		"short": "CN",
		"text": "中国",
		"en": "China",
		"tel": "86",
		"pinyin": "zg",
		"value": "中国"
	}, {
		"short": "HK",
		"text": "香港(中国)",
		"en": "Hongkong",
		"tel": "852",
		"pinyin": "xgzg",
		"value": "香港(中国)"
	}, {
		"short": "MO",
		"text": "澳门(中国)",
		"en": "Macao",
		"tel": "853",
		"pinyin": "am zg",
		"value": "澳门(中国)"
	}, {
		"short": "TW",
		"text": "台湾(中国)",
		"en": "Taiwan",
		"tel": "886",
		"pinyin": "twzg",
		"value": "台湾(中国)"
	}, {
		"short": "AD",
		"text": "安道尔共和国",
		"en": "Andorra",
		"tel": "376",
		"pinyin": "adeghg",
		"value": "安道尔共和国"
	},
	{
		"short": "AE",
		"text": "阿拉伯联合酋长国",
		"en": "UnitedArabEmirates",
		"tel": "971",
		"pinyin": "alblhqzg",
		"value": "阿拉伯联合酋长国"
	},
	{
		"short": "AF",
		"text": "阿富汗",
		"en": "Afghanistan",
		"tel": "93",
		"pinyin": "afh",
		"value": "阿富汗"
	},
	{
		"short": "AG",
		"text": "安提瓜和巴布达",
		"en": "AntiguaandBarbuda",
		"tel": "1268",
		"pinyin": "atghbbd",
		"value": "安提瓜和巴布达"
	},
	{
		"short": "AI",
		"text": "安圭拉岛",
		"en": "Anguilla",
		"tel": "1264",
		"pinyin": "agld",
		"value": "安圭拉岛"
	},
	{
		"short": "AL",
		"text": "阿尔巴尼亚",
		"en": "Albania",
		"tel": "355",
		"pinyin": "aebny",
		"value": "阿尔巴尼亚"
	},
	{
		"short": "AM",
		"text": "阿美尼亚",
		"en": "Armenia",
		"tel": "374",
		"pinyin": "amny",
		"value": "阿美尼亚"
	},
	{
		"short": "",
		"text": "阿森松",
		"en": "Ascension",
		"tel": "247",
		"pinyin": "als",
		"value": "阿森松"
	},
	{
		"short": "AO",
		"text": "安哥拉",
		"en": "Angola",
		"tel": "244",
		"pinyin": "agl",
		"value": "安哥拉"
	},
	{
		"short": "AR",
		"text": "阿根廷",
		"en": "Argentina",
		"tel": "54",
		"pinyin": "agt",
		"value": "阿根廷"
	},
	{
		"short": "AT",
		"text": "奥地利",
		"en": "Austria",
		"tel": "43",
		"pinyin": "adl",
		"value": "奥地利"
	},
	{
		"short": "AU",
		"text": "澳大利亚",
		"en": "Australia",
		"tel": "61",
		"pinyin": "adly",
		"value": "澳大利亚"
	},
	{
		"short": "AZ",
		"text": "阿塞拜疆",
		"en": "Azerbaijan",
		"tel": "994",
		"pinyin": "asbj",
		"value": "阿塞拜疆"
	},
	{
		"short": "BB",
		"text": "巴巴多斯",
		"en": "Barbados",
		"tel": "1246",
		"pinyin": "bbds",
		"value": "巴巴多斯"
	},
	{
		"short": "BD",
		"text": "孟加拉国",
		"en": "Bangladesh",
		"tel": "880",
		"pinyin": "mjlg",
		"value": "孟加拉国"
	},
	{
		"short": "BE",
		"text": "比利时",
		"en": "Belgium",
		"tel": "32",
		"pinyin": "bls",
		"value": "比利时"
	},
	{
		"short": "BF",
		"text": "布基纳法索",
		"en": "Burkina-faso",
		"tel": "226",
		"pinyin": "bjnfs",
		"value": "布基纳法索"
	},
	{
		"short": "BG",
		"text": "保加利亚",
		"en": "Bulgaria",
		"tel": "359",
		"pinyin": "bjly",
		"value": "保加利亚"
	},
	{
		"short": "BH",
		"text": "巴林",
		"en": "Bahrain",
		"tel": "973",
		"pinyin": "bl",
		"value": "巴林"
	},
	{
		"short": "BI",
		"text": "布隆迪",
		"en": "Burundi",
		"tel": "257",
		"pinyin": "bld",
		"value": "布隆迪"
	},
	{
		"short": "BJ",
		"text": "贝宁",
		"en": "Benin",
		"tel": "229",
		"pinyin": "bl",
		"value": "贝宁"
	},
	{
		"short": "BL",
		"text": "巴勒斯坦",
		"en": "Palestine",
		"tel": "970",
		"pinyin": "blst",
		"value": "巴勒斯坦"
	},
	{
		"short": "BM",
		"text": "百慕大群岛",
		"en": "BermudaIs.",
		"tel": "1441",
		"pinyin": "bmdqd",
		"value": "百慕大群岛"
	},
	{
		"short": "BN",
		"text": "文莱",
		"en": "Brunei",
		"tel": "673",
		"pinyin": "wl",
		"value": "文莱"
	},
	{
		"short": "BO",
		"text": "玻利维亚",
		"en": "Bolivia",
		"tel": "591",
		"pinyin": "blwy",
		"value": "玻利维亚"
	},
	{
		"short": "BR",
		"text": "巴西",
		"en": "Brazil",
		"tel": "55",
		"pinyin": "bx",
		"value": "巴西"
	},
	{
		"short": "BS",
		"text": "巴哈马",
		"en": "Bahamas",
		"tel": "1242",
		"pinyin": "bhm",
		"value": "巴哈马"
	},
	{
		"short": "BW",
		"text": "博茨瓦纳",
		"en": "Botswana",
		"tel": "267",
		"pinyin": "bcwn",
		"value": "博茨瓦纳"
	},
	{
		"short": "BY",
		"text": "白俄罗斯",
		"en": "Belarus",
		"tel": "375",
		"pinyin": "bels",
		"value": "白俄罗斯"
	},
	{
		"short": "BZ",
		"text": "伯利兹",
		"en": "Belize",
		"tel": "501",
		"pinyin": "blz",
		"value": "伯利兹"
	},
	{
		"short": "CA",
		"text": "加拿大",
		"en": "Canada",
		"tel": "1",
		"pinyin": "jnd",
		"value": "加拿大"
	},
	{
		"short": "",
		"text": "开曼群岛",
		"en": "CaymanIs.",
		"tel": "1345",
		"pinyin": "kmqd",
		"value": "开曼群岛"
	},
	{
		"short": "CF",
		"text": "中非共和国",
		"en": "CentralAfricanRepublic",
		"tel": "236",
		"pinyin": "zfghg",
		"value": "中非共和国"
	},
	{
		"short": "CG",
		"text": "刚果",
		"en": "Congo",
		"tel": "242",
		"pinyin": "gg",
		"value": "刚果"
	},
	{
		"short": "CH",
		"text": "瑞士",
		"en": "Switzerland",
		"tel": "41",
		"pinyin": "rs",
		"value": "瑞士"
	},
	{
		"short": "CK",
		"text": "库克群岛",
		"en": "CookIs.",
		"tel": "682",
		"pinyin": "kkqd",
		"value": "库克群岛"
	},
	{
		"short": "CL",
		"text": "智利",
		"en": "Chile",
		"tel": "56",
		"pinyin": "zl",
		"value": "智利"
	},
	{
		"short": "CM",
		"text": "喀麦隆",
		"en": "Cameroon",
		"tel": "237",
		"pinyin": "kml",
		"value": "喀麦隆"
	},
	{
		"short": "CO",
		"text": "哥伦比亚",
		"en": "Colombia",
		"tel": "57",
		"pinyin": "glby",
		"value": "哥伦比亚"
	},
	{
		"short": "CR",
		"text": "哥斯达黎加",
		"en": "CostaRica",
		"tel": "506",
		"pinyin": "gsdlj",
		"value": "哥斯达黎加"
	},
	{
		"short": "CS",
		"text": "捷克",
		"en": "Czech",
		"tel": "420",
		"pinyin": "jk",
		"value": "捷克"
	},
	{
		"short": "CU",
		"text": "古巴",
		"en": "Cuba",
		"tel": "53",
		"pinyin": "gb",
		"value": "古巴"
	},
	{
		"short": "CY",
		"text": "塞浦路斯",
		"en": "Cyprus",
		"tel": "357",
		"pinyin": "spls",
		"value": "塞浦路斯"
	},
	{
		"short": "CZ",
		"text": "捷克",
		"en": "CzechRepublic",
		"tel": "420",
		"pinyin": "jk",
		"value": "捷克"
	},
	{
		"short": "DE",
		"text": "德国",
		"en": "Germany",
		"tel": "49",
		"pinyin": "dg",
		"value": "德国"
	},
	{
		"short": "DJ",
		"text": "吉布提",
		"en": "Djibouti",
		"tel": "253",
		"pinyin": "jbt",
		"value": "吉布提"
	},
	{
		"short": "DK",
		"text": "丹麦",
		"en": "Denmark",
		"tel": "45",
		"pinyin": "dm",
		"value": "丹麦"
	},
	{
		"short": "DO",
		"text": "多米尼加共和国",
		"en": "DominicaRep.",
		"tel": "1890",
		"pinyin": "dmnjghg",
		"value": "多米尼加共和国"
	},
	{
		"short": "DZ",
		"text": "阿尔及利亚",
		"en": "Algeria",
		"tel": "213",
		"pinyin": "aejly",
		"value": "阿尔及利亚"
	},
	{
		"short": "EC",
		"text": "厄瓜多尔",
		"en": "Ecuador",
		"tel": "593",
		"pinyin": "egde",
		"value": "厄瓜多尔"
	},
	{
		"short": "EE",
		"text": "爱沙尼亚",
		"en": "Estonia",
		"tel": "372",
		"pinyin": "asny",
		"value": "爱沙尼亚"
	},
	{
		"short": "EG",
		"text": "埃及",
		"en": "Egypt",
		"tel": "20",
		"pinyin": "ej",
		"value": "埃及"
	},
	{
		"short": "ES",
		"text": "西班牙",
		"en": "Spain",
		"tel": "34",
		"pinyin": "xby",
		"value": "西班牙"
	},
	{
		"short": "ET",
		"text": "埃塞俄比亚",
		"en": "Ethiopia",
		"tel": "251",
		"pinyin": "aseby",
		"value": "埃塞俄比亚"
	},
	{
		"short": "FI",
		"text": "芬兰",
		"en": "Finland",
		"tel": "358",
		"pinyin": "fl",
		"value": "芬兰"
	},
	{
		"short": "FJ",
		"text": "斐济",
		"en": "Fiji",
		"tel": "679",
		"pinyin": "fj",
		"value": "斐济"
	},
	{
		"short": "FR",
		"text": "法国",
		"en": "France",
		"tel": "33",
		"pinyin": "fg",
		"value": "法国"
	},
	{
		"short": "GA",
		"text": "加蓬",
		"en": "Gabon",
		"tel": "241",
		"pinyin": "jp",
		"value": "加蓬"
	},
	{
		"short": "GB",
		"text": "英国",
		"en": "UnitedKiongdom",
		"tel": "44",
		"pinyin": "yg",
		"value": "英国"
	},
	{
		"short": "GD",
		"text": "格林纳达",
		"en": "Grenada",
		"tel": "1809",
		"pinyin": "glnd",
		"value": "格林纳达"
	},
	{
		"short": "GE",
		"text": "格鲁吉亚",
		"en": "Georgia",
		"tel": "995",
		"pinyin": "gljy",
		"value": "格鲁吉亚"
	},
	{
		"short": "GF",
		"text": "法属圭亚那",
		"en": "FrenchGuiana",
		"tel": "594",
		"pinyin": "fsgyn",
		"value": "法属圭亚那"
	},
	{
		"short": "GH",
		"text": "加纳",
		"en": "Ghana",
		"tel": "233",
		"pinyin": "jn",
		"value": "加纳"
	},
	{
		"short": "GI",
		"text": "直布罗陀",
		"en": "Gibraltar",
		"tel": "350",
		"pinyin": "zblt",
		"value": "直布罗陀"
	},
	{
		"short": "GM",
		"text": "冈比亚",
		"en": "Gambia",
		"tel": "220",
		"pinyin": "gby",
		"value": "冈比亚"
	},
	{
		"short": "GN",
		"text": "几内亚",
		"en": "Guinea",
		"tel": "224",
		"pinyin": "jny",
		"value": "几内亚"
	},
	{
		"short": "GR",
		"text": "希腊",
		"en": "Greece",
		"tel": "30",
		"pinyin": "xl",
		"value": "希腊"
	},
	{
		"short": "GT",
		"text": "危地马拉",
		"en": "Guatemala",
		"tel": "502",
		"pinyin": "wdml",
		"value": "危地马拉"
	},
	{
		"short": "GU",
		"text": "关岛",
		"en": "Guam",
		"tel": "1671",
		"pinyin": "gd",
		"value": "关岛"
	},
	{
		"short": "GY",
		"text": "圭亚那",
		"en": "Guyana",
		"tel": "592",
		"pinyin": "gyn",
		"value": "圭亚那"
	},

	{
		"short": "HN",
		"text": "洪都拉斯",
		"en": "Honduras",
		"tel": "504",
		"pinyin": "hdls",
		"value": "洪都拉斯"
	},
	{
		"short": "HT",
		"text": "海地",
		"en": "Haiti",
		"tel": "509",
		"pinyin": "hd",
		"value": "海地"
	},
	{
		"short": "HU",
		"text": "匈牙利",
		"en": "Hungary",
		"tel": "36",
		"pinyin": "xyl",
		"value": "匈牙利"
	},
	{
		"short": "ID",
		"text": "印度尼西亚",
		"en": "Indonesia",
		"tel": "62",
		"pinyin": "ydnxy",
		"value": "印度尼西亚"
	},
	{
		"short": "IE",
		"text": "爱尔兰",
		"en": "Ireland",
		"tel": "353",
		"pinyin": "ael",
		"value": "爱尔兰"
	},
	{
		"short": "IL",
		"text": "以色列",
		"en": "Israel",
		"tel": "972",
		"pinyin": "ysl",
		"value": "以色列"
	},
	{
		"short": "IN",
		"text": "印度",
		"en": "India",
		"tel": "91",
		"pinyin": "yd",
		"value": "印度"
	},
	{
		"short": "IQ",
		"text": "伊拉克",
		"en": "Iraq",
		"tel": "964",
		"pinyin": "ylk",
		"value": "伊拉克"
	},
	{
		"short": "IR",
		"text": "伊朗",
		"en": "Iran",
		"tel": "98",
		"pinyin": "yl",
		"value": "伊朗"
	},
	{
		"short": "IS",
		"text": "冰岛",
		"en": "Iceland",
		"tel": "354",
		"pinyin": "bd",
		"value": "冰岛"
	},
	{
		"short": "IT",
		"text": "意大利",
		"en": "Italy",
		"tel": "39",
		"pinyin": "ydl",
		"value": "意大利"
	},
	{
		"short": "",
		"text": "科特迪瓦",
		"en": "IvoryCoast",
		"tel": "225",
		"pinyin": "ktdw",
		"value": "科特迪瓦"
	},
	{
		"short": "JM",
		"text": "牙买加",
		"en": "Jamaica",
		"tel": "1876",
		"pinyin": "ymj",
		"value": "牙买加"
	},
	{
		"short": "JO",
		"text": "约旦",
		"en": "Jordan",
		"tel": "962",
		"pinyin": "yd",
		"value": "约旦"
	},
	{
		"short": "JP",
		"text": "日本",
		"en": "Japan",
		"tel": "81",
		"pinyin": "rb",
		"value": "日本"
	},
	{
		"short": "KE",
		"text": "肯尼亚",
		"en": "Kenya",
		"tel": "254",
		"pinyin": "kny",
		"value": "肯尼亚"
	},
	{
		"short": "KG",
		"text": "吉尔吉斯坦",
		"en": "Kyrgyzstan",
		"tel": "331",
		"pinyin": "jejst",
		"value": "吉尔吉斯坦"
	},
	{
		"short": "KH",
		"text": "柬埔寨",
		"en": "Kampuchea(Cambodia)",
		"tel": "855",
		"pinyin": "jpz",
		"value": "柬埔寨"
	},
	{
		"short": "KP",
		"text": "朝鲜",
		"en": "NorthKorea",
		"tel": "850",
		"pinyin": "cx",
		"value": "朝鲜"
	},
	{
		"short": "KR",
		"text": "韩国",
		"en": "Korea",
		"tel": "82",
		"pinyin": "hg",
		"value": "韩国"
	},
	{
		"short": "KT",
		"text": "科特迪瓦共和国",
		"en": "RepublicofIvoryCoast",
		"tel": "225",
		"pinyin": "ktdwghg",
		"value": "科特迪瓦共和国"
	},
	{
		"short": "KW",
		"text": "科威特",
		"en": "Kuwait",
		"tel": "965",
		"pinyin": "kwt",
		"value": "科威特"
	},
	{
		"short": "KZ",
		"text": "哈萨克斯坦",
		"en": "Kazakstan",
		"tel": "327",
		"pinyin": "hskst",
		"value": "哈萨克斯坦"
	},
	{
		"short": "LA",
		"text": "老挝",
		"en": "Laos",
		"tel": "856",
		"pinyin": "lw",
		"value": "老挝"
	},
	{
		"short": "LB",
		"text": "黎巴嫩",
		"en": "Lebanon",
		"tel": "961",
		"pinyin": "lbn",
		"value": "黎巴嫩"
	},
	{
		"short": "LC",
		"text": "圣卢西亚",
		"en": "St.Lucia",
		"tel": "1758",
		"pinyin": "slxy",
		"value": "圣卢西亚"
	},
	{
		"short": "LI",
		"text": "列支敦士登",
		"en": "Liechtenstein",
		"tel": "423",
		"pinyin": "lzdsd",
		"value": "列支敦士登"
	},
	{
		"short": "LK",
		"text": "斯里兰卡",
		"en": "SriLanka",
		"tel": "94",
		"pinyin": "sllk",
		"value": "斯里兰卡"
	},
	{
		"short": "LR",
		"text": "利比里亚",
		"en": "Liberia",
		"tel": "231",
		"pinyin": "lbly",
		"value": "利比里亚"
	},
	{
		"short": "LS",
		"text": "莱索托",
		"en": "Lesotho",
		"tel": "266",
		"pinyin": "lst",
		"value": "莱索托"
	},
	{
		"short": "LT",
		"text": "立陶宛",
		"en": "Lithuania",
		"tel": "370",
		"pinyin": "ltw",
		"value": "立陶宛"
	},
	{
		"short": "LU",
		"text": "卢森堡",
		"en": "Luxembourg",
		"tel": "352",
		"pinyin": "lsb",
		"value": "卢森堡"
	},
	{
		"short": "LV",
		"text": "拉脱维亚",
		"en": "Latvia",
		"tel": "371",
		"pinyin": "ltwy",
		"value": "拉脱维亚"
	},
	{
		"short": "LY",
		"text": "利比亚",
		"en": "Libya",
		"tel": "218",
		"pinyin": "lby",
		"value": "利比亚"
	},
	{
		"short": "MA",
		"text": "摩洛哥",
		"en": "Morocco",
		"tel": "212",
		"pinyin": "mlg",
		"value": "摩洛哥"
	},
	{
		"short": "MC",
		"text": "摩纳哥",
		"en": "Monaco",
		"tel": "377",
		"pinyin": "mng",
		"value": "摩纳哥"
	},
	{
		"short": "MD",
		"text": "摩尔多瓦",
		"en": "Moldova,Republicof",
		"tel": "373",
		"pinyin": "medw",
		"value": "摩尔多瓦"
	},
	{
		"short": "MG",
		"text": "马达加斯加",
		"en": "Madagascar",
		"tel": "261",
		"pinyin": "mdjsj",
		"value": "马达加斯加"
	},
	{
		"short": "ML",
		"text": "马里",
		"en": "Mali",
		"tel": "223",
		"pinyin": "ml",
		"value": "马里"
	},
	{
		"short": "MM",
		"text": "缅甸",
		"en": "Burma",
		"tel": "95",
		"pinyin": "md",
		"value": "缅甸"
	},
	{
		"short": "MN",
		"text": "蒙古",
		"en": "Mongolia",
		"tel": "976",
		"pinyin": "mg",
		"value": "蒙古"
	},

	{
		"short": "MS",
		"text": "蒙特塞拉特岛",
		"en": "MontserratIs",
		"tel": "1664",
		"pinyin": "mtsstd",
		"value": "蒙特塞拉特岛"
	},
	{
		"short": "MT",
		"text": "马耳他",
		"en": "Malta",
		"tel": "356",
		"pinyin": "met",
		"value": "马耳他"
	},
	{
		"short": "",
		"text": "马里亚那群岛",
		"en": "MarianaIs",
		"tel": "1670",
		"pinyin": "mlynqd",
		"value": "马里亚那群岛"
	},
	{
		"short": "",
		"text": "马提尼克",
		"en": "Martinique",
		"tel": "596",
		"pinyin": "mtnk",
		"value": "马提尼克"
	},
	{
		"short": "MU",
		"text": "毛里求斯",
		"en": "Mauritius",
		"tel": "230",
		"pinyin": "mlqs",
		"value": "毛里求斯"
	},
	{
		"short": "MV",
		"text": "马尔代夫",
		"en": "Maldives",
		"tel": "960",
		"pinyin": "medf",
		"value": "马尔代夫"
	},
	{
		"short": "MW",
		"text": "马拉维",
		"en": "Malawi",
		"tel": "265",
		"pinyin": "mlw",
		"value": "马拉维"
	},
	{
		"short": "MX",
		"text": "墨西哥",
		"en": "Mexico",
		"tel": "52",
		"pinyin": "mxg",
		"value": "墨西哥"
	},
	{
		"short": "MY",
		"text": "马来西亚",
		"en": "Malaysia",
		"tel": "60",
		"pinyin": "mlxy",
		"value": "马来西亚"
	},
	{
		"short": "MZ",
		"text": "莫桑比克",
		"en": "Mozambique",
		"tel": "258",
		"pinyin": "msbk",
		"value": "莫桑比克"
	},
	{
		"short": "NA",
		"text": "纳米比亚",
		"en": "Namibia",
		"tel": "264",
		"pinyin": "nmby",
		"value": "纳米比亚"
	},
	{
		"short": "NE",
		"text": "尼日尔",
		"en": "Niger",
		"tel": "977",
		"pinyin": "nre",
		"value": "尼日尔"
	},
	{
		"short": "NG",
		"text": "尼日利亚",
		"en": "Nigeria",
		"tel": "234",
		"pinyin": "nrly",
		"value": "尼日利亚"
	},
	{
		"short": "NI",
		"text": "尼加拉瓜",
		"en": "Nicaragua",
		"tel": "505",
		"pinyin": "njlg",
		"value": "尼加拉瓜"
	},
	{
		"short": "NL",
		"text": "荷兰",
		"en": "Netherlands",
		"tel": "31",
		"pinyin": "hl",
		"value": "荷兰"
	},
	{
		"short": "NO",
		"text": "挪威",
		"en": "Norway",
		"tel": "47",
		"pinyin": "nw",
		"value": "挪威"
	},
	{
		"short": "NP",
		"text": "尼泊尔",
		"en": "Nepal",
		"tel": "977",
		"pinyin": "nbe",
		"value": "尼泊尔"
	},
	{
		"short": "",
		"text": "荷属安的列斯",
		"en": "NetheriandsAntilles",
		"tel": "599",
		"pinyin": "hsadls",
		"value": "荷属安的列斯"
	},
	{
		"short": "NR",
		"text": "瑙鲁",
		"en": "Nauru",
		"tel": "674",
		"pinyin": "nl",
		"value": "瑙鲁"
	},
	{
		"short": "NZ",
		"text": "新西兰",
		"en": "NewZealand",
		"tel": "64",
		"pinyin": "xxl",
		"value": "新西兰"
	},
	{
		"short": "OM",
		"text": "阿曼",
		"en": "Oman",
		"tel": "968",
		"pinyin": "am",
		"value": "阿曼"
	},
	{
		"short": "PA",
		"text": "巴拿马",
		"en": "Panama",
		"tel": "507",
		"pinyin": "bnm",
		"value": "巴拿马"
	},
	{
		"short": "PE",
		"text": "秘鲁",
		"en": "Peru",
		"tel": "51",
		"pinyin": "bl",
		"value": "秘鲁"
	},
	{
		"short": "PF",
		"text": "法属玻利尼西亚",
		"en": "FrenchPolynesia",
		"tel": "689",
		"pinyin": "fsblnxy",
		"value": "法属玻利尼西亚"
	},
	{
		"short": "PG",
		"text": "巴布亚新几内亚",
		"en": "PapuaNewCuinea",
		"tel": "675",
		"pinyin": "bbyxjny",
		"value": "巴布亚新几内亚"
	},
	{
		"short": "PH",
		"text": "菲律宾",
		"en": "Philippines",
		"tel": "63",
		"pinyin": "flb",
		"value": "菲律宾"
	},
	{
		"short": "PK",
		"text": "巴基斯坦",
		"en": "Pakistan",
		"tel": "92",
		"pinyin": "bjst",
		"value": "巴基斯坦"
	},
	{
		"short": "PL",
		"text": "波兰",
		"en": "Poland",
		"tel": "48",
		"pinyin": "bl",
		"value": "波兰"
	},
	{
		"short": "PR",
		"text": "波多黎各",
		"en": "PuertoRico",
		"tel": "1787",
		"pinyin": "bdlg",
		"value": "波多黎各"
	},
	{
		"short": "PT",
		"text": "葡萄牙",
		"en": "Portugal",
		"tel": "351",
		"pinyin": "pty",
		"value": "葡萄牙"
	},
	{
		"short": "PY",
		"text": "巴拉圭",
		"en": "Paraguay",
		"tel": "595",
		"pinyin": "blg",
		"value": "巴拉圭"
	},
	{
		"short": "QA",
		"text": "卡塔尔",
		"en": "Qatar",
		"tel": "974",
		"pinyin": "kte",
		"value": "卡塔尔"
	},
	{
		"short": "",
		"text": "留尼旺",
		"en": "Reunion",
		"tel": "262",
		"pinyin": "lnw",
		"value": "留尼旺"
	},
	{
		"short": "RO",
		"text": "罗马尼亚",
		"en": "Romania",
		"tel": "40",
		"pinyin": "lmny",
		"value": "罗马尼亚"
	},
	{
		"short": "RU",
		"text": "俄罗斯",
		"en": "Russia",
		"tel": "7",
		"pinyin": "els",
		"value": "俄罗斯"
	},
	{
		"short": "SA",
		"text": "沙特阿拉伯",
		"en": "SaudiArabia",
		"tel": "966",
		"pinyin": "stalb",
		"value": "沙特阿拉伯"
	},
	{
		"short": "SB",
		"text": "所罗门群岛",
		"en": "SolomonIs",
		"tel": "677",
		"pinyin": "slmqd",
		"value": "所罗门群岛"
	},
	{
		"short": "SC",
		"text": "塞舌尔",
		"en": "Seychelles",
		"tel": "248",
		"pinyin": "sse",
		"value": "塞舌尔"
	},
	{
		"short": "SD",
		"text": "苏丹",
		"en": "Sudan",
		"tel": "249",
		"pinyin": "sd",
		"value": "苏丹"
	},
	{
		"short": "SE",
		"text": "瑞典",
		"en": "Sweden",
		"tel": "46",
		"pinyin": "rd",
		"value": "瑞典"
	},
	{
		"short": "SG",
		"text": "新加坡",
		"en": "Singapore",
		"tel": "65",
		"pinyin": "xjp",
		"value": "新加坡"
	},
	{
		"short": "SI",
		"text": "斯洛文尼亚",
		"en": "Slovenia",
		"tel": "386",
		"pinyin": "slwny",
		"value": "斯洛文尼亚"
	},
	{
		"short": "SK",
		"text": "斯洛伐克",
		"en": "Slovakia",
		"tel": "421",
		"pinyin": "slfk",
		"value": "斯洛伐克"
	},
	{
		"short": "SL",
		"text": "塞拉利昂",
		"en": "SierraLeone",
		"tel": "232",
		"pinyin": "slla",
		"value": "塞拉利昂"
	},
	{
		"short": "SM",
		"text": "圣马力诺",
		"en": "SanMarino",
		"tel": "378",
		"pinyin": "smln",
		"value": "圣马力诺"
	},
	{
		"short": "",
		"text": "东萨摩亚(美)",
		"en": "SamoaEastern",
		"tel": "684",
		"pinyin": "dsmym",
		"value": "东萨摩亚(美)"
	},
	{
		"short": "",
		"text": "西萨摩亚",
		"en": "SanMarino",
		"tel": "685",
		"pinyin": "xsmy",
		"value": "西萨摩亚"
	},
	{
		"short": "SN",
		"text": "塞内加尔",
		"en": "Senegal",
		"tel": "221",
		"pinyin": "snje",
		"value": "塞内加尔"
	},
	{
		"short": "SO",
		"text": "索马里",
		"en": "Somali",
		"tel": "252",
		"pinyin": "sml",
		"value": "索马里"
	},
	{
		"short": "SR",
		"text": "苏里南",
		"en": "Suritext",
		"tel": "597",
		"pinyin": "sln",
		"value": "苏里南"
	},
	{
		"short": "ST",
		"text": "圣多美和普林西比",
		"en": "SaoTomeandPrincipe",
		"tel": "239",
		"pinyin": "sdmhplxb",
		"value": "圣多美和普林西比"
	},
	{
		"short": "SV",
		"text": "萨尔瓦多",
		"en": "EISalvador",
		"tel": "503",
		"pinyin": "sewd",
		"value": "萨尔瓦多"
	},
	{
		"short": "SY",
		"text": "叙利亚",
		"en": "Syria",
		"tel": "963",
		"pinyin": "xly",
		"value": "叙利亚"
	},
	{
		"short": "SZ",
		"text": "斯威士兰",
		"en": "Swaziland",
		"tel": "268",
		"pinyin": "swsl",
		"value": "斯威士兰"
	},
	{
		"short": "TD",
		"text": "乍得",
		"en": "Chad",
		"tel": "235",
		"pinyin": "zd",
		"value": "乍得"
	},
	{
		"short": "TG",
		"text": "多哥",
		"en": "Togo",
		"tel": "228",
		"pinyin": "dg",
		"value": "多哥"
	},
	{
		"short": "TH",
		"text": "泰国",
		"en": "Thailand",
		"tel": "66",
		"pinyin": "tg",
		"value": "泰国"
	},
	{
		"short": "TJ",
		"text": "塔吉克斯坦",
		"en": "Tajikstan",
		"tel": "992",
		"pinyin": "tjkst",
		"value": "塔吉克斯坦"
	},
	{
		"short": "TM",
		"text": "土库曼斯坦",
		"en": "Turkmenistan",
		"tel": "993",
		"pinyin": "tkmst",
		"value": "土库曼斯坦"
	},
	{
		"short": "TN",
		"text": "突尼斯",
		"en": "Tunisia",
		"tel": "216",
		"pinyin": "tns",
		"value": "突尼斯"
	},
	{
		"short": "TO",
		"text": "汤加",
		"en": "Tonga",
		"tel": "676",
		"pinyin": "tj",
		"value": "汤加"
	},
	{
		"short": "TR",
		"text": "土耳其",
		"en": "Turkey",
		"tel": "90",
		"pinyin": "teq",
		"value": "土耳其"
	},
	{
		"short": "TT",
		"text": "特立尼达和多巴哥",
		"en": "TrinidadandTobago",
		"tel": "1809",
		"pinyin": "tlndhdbg",
		"value": "特立尼达和多巴哥"
	},
	{
		"short": "TZ",
		"text": "坦桑尼亚",
		"en": "Tanzania",
		"tel": "255",
		"pinyin": "tsny",
		"value": "坦桑尼亚"
	},
	{
		"short": "UA",
		"text": "乌克兰",
		"en": "Ukraine",
		"tel": "380",
		"pinyin": "wkl",
		"value": "乌克兰"
	},
	{
		"short": "UG",
		"text": "乌干达",
		"en": "Uganda",
		"tel": "256",
		"pinyin": "wgd",
		"value": "乌干达"
	},
	{
		"short": "US",
		"text": "美国",
		"en": "UnitedStatesofAmerica",
		"tel": "1",
		"pinyin": "mg",
		"value": "美国"
	},
	{
		"short": "UY",
		"text": "乌拉圭",
		"en": "Uruguay",
		"tel": "598",
		"pinyin": "wlg",
		"value": "乌拉圭"
	},
	{
		"short": "UZ",
		"text": "乌兹别克斯坦",
		"en": "Uzbekistan",
		"tel": "233",
		"pinyin": "wzbkst",
		"value": "乌兹别克斯坦"
	},
	{
		"short": "VC",
		"text": "圣文森特岛",
		"en": "SaintVincent",
		"tel": "1784",
		"pinyin": "swstd",
		"value": "圣文森特岛"
	},
	{
		"short": "VE",
		"text": "委内瑞拉",
		"en": "Venezuela",
		"tel": "58",
		"pinyin": "wnrl",
		"value": "委内瑞拉"
	},
	{
		"short": "VN",
		"text": "越南",
		"en": "Vietnam",
		"tel": "84",
		"pinyin": "yn",
		"value": "越南"
	},
	{
		"short": "YE",
		"text": "也门",
		"en": "Yemen",
		"tel": "967",
		"pinyin": "ym",
		"value": "也门"
	},
	{
		"short": "YU",
		"text": "南斯拉夫",
		"en": "Yugoslavia",
		"tel": "381",
		"pinyin": "nslf",
		"value": "南斯拉夫"
	},
	{
		"short": "ZA",
		"text": "南非",
		"en": "SouthAfrica",
		"tel": "27",
		"pinyin": "nf",
		"value": "南非"
	},
	{
		"short": "ZM",
		"text": "赞比亚",
		"en": "Zambia",
		"tel": "260",
		"pinyin": "zby",
		"value": "赞比亚"
	},
	{
		"short": "ZR",
		"text": "扎伊尔",
		"en": "Zaire",
		"tel": "243",
		"pinyin": "zye",
		"value": "扎伊尔"
	},
	{
		"short": "ZW",
		"text": "津巴布韦",
		"en": "Zimbabwe",
		"tel": "263",
		"pinyin": "jbbw",
		"value": "津巴布韦"
	}
];

export default {
	countryList
}
