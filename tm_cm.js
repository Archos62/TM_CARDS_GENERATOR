var aLayers = {};

let selectedLayers = [];

var userImageList = [];
var otherBgList = {};
var type2FuncList = {};
// var groupList = [];
var fontList = {
  Prototype: "",
  Pagella: "",
  times: ""
};

var layerToDrag;
var dragOffsetX;
var dragOffsetY;
var keyFocusLayer;

var blockList = [
  {putUnder: "templates", text: "Green Card", src:"green_normal", default:"Vertical Card"}, //0
  {putUnder: "templates", text: "Green Small Bottom", src:"green_small_bottom", default:"Vertical Card"}, //1
  {putUnder: "templates", text: "Green Big Bottom", src:"green_big_bottom", default:"Vertical Card"}, //2
  {putUnder: "templates", text: "Blue Card", src:"blue_normal", default:"Vertical Card"},
  {putUnder: "templates", text: "Blue Big Bottom", src:"blue_big_bottom", default:"Vertical Card"},
  {putUnder: "templates", text: "Blue Big Top", src:"blue_big_top", default:"Vertical Card"},
  {putUnder: "templates", text: "Blue Very Big Top", src:"blue_very_big_top", default:"Vertical Card"},  
  {putUnder: "templates", text: "Red Card", src:"red_normal", default:"Vertical Card"},
  {putUnder: "templates", text: "Red Small Bottom", src:"red_small_bottom", default:"Vertical Card"},
  {putUnder: "globalparameters", text: "", src:"oxygen", default:"Oxygen"}, //9
  {putUnder: "globalparameters", text: "", src:"temperature", default:"Temp"}, //10
  {putUnder: "globalparameters", text: "", src:"venus", default:"Venus"},  //11
  {putUnder: "misc", text: "", src:"megacredit", otherbg:"mc_otherbg", default:"MC"}, //12
  {putUnder: "misc", text: "mc_otherbg", src:"other_player_background", hidden:true},
  {putUnder: "misc", text: "", src:"arrow", default:"Arrow"},
  {putUnder: "misc", text: "Asterisk", src:"asterisc", default:"Asterisk"},
  {putUnder: "misc", text: "Slash", src:"bar",default:"Slash"},
  {putUnder: "misc", text: "", src:"chairman", default:"Delegate"},
  {putUnder: "misc", text: "", src:"colon", default:"Colon"},
  {putUnder: "misc", text: "", src:"delegate", default:"Delegate"},
  {putUnder: "misc", text: "", src:"influence", default:"Influence"},
  {putUnder: "parties", text: "", src:"bureacrats", default:"Party"},
  {putUnder: "parties", text: "", src:"centrists", default:"Party"},
  {putUnder: "parties", text: "", src:"empower", default:"Party"},
  {putUnder: "parties", text: "", src:"greens", default:"Party"},
  {putUnder: "parties", text: "", src:"kelvinists", default:"Party"},
  {putUnder: "parties", text: "", src:"mars_first", default:"Party"},
  {putUnder: "parties", text: "", src:"populists", default:"Party"},
  {putUnder: "parties", text: "", src:"reds", default:"Party"},
  {putUnder: "parties", text: "", src:"scientists", default:"Party"},
  {putUnder: "parties", text: "", src:"spome", default:"Party"},
  {putUnder: "parties", text: "", src:"transhumanists", default:"Party"},
  {putUnder: "parties", text: "", src:"unity", default:"Party"},
  {putUnder: "productionboxes", text: "prod_nxn", src:"nxn", hidden: true},
  // {putUnder: "productionboxes", text: "prod_otherbg", src:"other_player_background", hidden:true},
  {putUnder: "requisites", text: "Max Requirement", src:"max_big", default:"Max"},
  {putUnder: "requisites", text: "Min Requirement (big)", src:"min_big", default:"Min Large"},
  {putUnder: "requisites", text: "Min Requirement", src:"min_medium", default:"Min Medium"},
  {putUnder: "requisites", text: "Min Requirement (small)", src:"min_small", default:"Min Small"},
  {putUnder: "requisites", text: "No Requirement", src:"normal", default:"No Req"},
  {putUnder: "resources", text: "", src:"animal", otherbg:"res_otherbg", default:"Standard"},
  {putUnder: "resources", text: "", src:"card", otherbg:"res_otherbg", default:"Card (Vertical)"},
  {putUnder: "resources", text: "", src:"data", otherbg:"res_otherbg", default:"Standard"},
  {putUnder: "resources", text: "", src:"fighter", otherbg:"res_otherbg", default:"Standard"},
  {putUnder: "resources", text: "", src:"floater", otherbg:"res_otherbg", default:"Standard"},
  {putUnder: "resources", text: "", src:"heat", otherbg:"res_otherbg", default:"Standard"},
  {putUnder: "resources", text: "", src:"microbe", otherbg:"res_otherbg", default:"Standard"},
  {putUnder: "resources", text: "res_otherbg", src:"other_player_background", hidden:true},
  {putUnder: "resources", text: "", src:"plant", otherbg:"res_otherbg", default:"Standard"},
  {putUnder: "resources", text: "", src:"power", otherbg:"res_otherbg", default:"Standard"},
  {putUnder: "resources", text: "", src:"radiation", otherbg:"res_otherbg", default:"Standard"},
  {putUnder: "resources", text: "", src:"science", otherbg:"res_otherbg", default:"Standard"},
  {putUnder: "resources", text: "", src:"steel", otherbg:"res_otherbg", default:"Standard"},
  {putUnder: "resources", text: "", src:"titanium", otherbg:"res_otherbg", default:"Standard"},
  {putUnder: "resources", text: "", src:"TR", otherbg:"res_otherbg", default:"TR"},
  {putUnder: "resources", text: "", src:"wild", otherbg:"res_otherbg", default:"Standard"},
  {putUnder: "tags", text: "", src:"animal", otherbg:"tag_otherbg"},
  {putUnder: "tags", text: "", src:"building", otherbg:"tag_otherbg"},
  {putUnder: "tags", text: "", src:"city", otherbg:"tag_otherbg"},
  {putUnder: "tags", text: "", src:"earth", otherbg:"tag_otherbg"},
  {putUnder: "tags", text: "", src:"event", otherbg:"tag_otherbg"},
  {putUnder: "tags", text: "", src:"galactic", otherbg:"tag_otherbg"},
  {putUnder: "tags", text: "", src:"infrastructure", otherbg:"tag_otherbg"},
  {putUnder: "tags", text: "", src:"jovian", otherbg:"tag_otherbg"},
  {putUnder: "tags", text: "", src:"mars", otherbg:"tag_otherbg"},
  {putUnder: "tags", text: "", src:"microbe", otherbg:"tag_otherbg"},
  {putUnder: "tags", text: "", src:"moon", otherbg:"tag_otherbg"},
  {putUnder: "tags", text: "tag_otherbg", src:"other_player_background", hidden:true},
  {putUnder: "tags", text: "", src:"planetary", otherbg:"tag_otherbg"},
  {putUnder: "tags", text: "", src:"plant", otherbg:"tag_otherbg"},
  {putUnder: "tags", text: "", src:"power", otherbg:"tag_otherbg"},
  {putUnder: "tags", text: "", src:"radioactive", otherbg:"tag_otherbg"},
  {putUnder: "tags", text: "", src:"science", otherbg:"tag_otherbg"},
  {putUnder: "tags", text: "", src:"space", otherbg:"tag_otherbg"},
  {putUnder: "tags", text: "", src:"venus", otherbg:"tag_otherbg"},
  {putUnder: "tags", text: "", src:"wild", otherbg:"tag_otherbg"},
  {putUnder: "tiles", text: "", src:"city", otherbg:"tiles_otherbg"},
  {putUnder: "tiles", text: "", src:"colony", otherbg:"trade_otherbg"},
  {putUnder: "tiles", text: "", src:"empty", otherbg:"tiles_otherbg"},
  {putUnder: "tiles", text: "", src:"greenery_no_O2", otherbg:"tiles_otherbg"},
  {putUnder: "tiles", text: "", src:"greenery", otherbg:"tiles_otherbg"},
  {putUnder: "tiles", text: "", src:"ocean", otherbg:"tiles_otherbg"},
  {putUnder: "tiles", text: "", src:"off-world_city", otherbg:"tiles_otherbg"},
  {putUnder: "tiles", text: "", src:"special", otherbg:"tiles_otherbg"},
  {putUnder: "tiles", text: "", src:"trade", otherbg:"trade_otherbg"},
  {putUnder: "VPs", text: "VP 1/", src:"1_for", default:"VP Standard"},
  {putUnder: "VPs", text: "1 VP", src:"1", default:"VP Standard"},
  {putUnder: "VPs", text: "VP 2/", src:"2_for", default:"VP Standard"},
  {putUnder: "VPs", text: "2 VP", src:"2", default:"VP Standard"},
  {putUnder: "VPs", text: "3 VP", src:"3", default:"VP Standard"},
  {putUnder: "VPs", text: "4 VP", src:"4", default:"VP Standard"},
  {putUnder: "VPs", text: "5 VP", src:"5", default:"VP Standard"},
  {putUnder: "VPs", text: "VP background", src:"blank", default:"VP Standard"},
  {putUnder: "VPs", text: "-VP", src:"VPnegative", default:"VP Negative"},
  {putUnder: "VPs", text: "/ VP", src:"n_for", default:"VP Standard"},
  {putUnder: "misc", text: "", src:"party_leader", default:"Delegate"},
  {putUnder: "templates", text: "", src:"prelude", default:"Horizontal Card"},
  {putUnder: "templates", text: "", src:"corporation", default:"Horizontal Card"},
  {putUnder: "misc", text: "Tag Holder", src:"corp_tag_holder"},
  {putUnder: "misc", text: "Effect (bg)", src:"effect"},
  {putUnder: "tags", text: "", src:"multitag", otherbg:"tag_otherbg"},
  {putUnder: "tiles", text: "tiles_otherbg", src:"other_player_background", hidden:true},
  {putUnder: "tags", text: "", src:"tourism", otherbg:"tag_otherbg"},
  {putUnder: "tags", text: "", src:"mercury", otherbg:"tag_otherbg"},
  {putUnder: "resources", text: "", src:"asteroid", otherbg:"res_otherbg", default:"Standard"},
  {putUnder: "resources", text: "", src:"ore", otherbg:"res_otherbg", default:"Standard"},
  {putUnder: "misc", text: "", src:"asset"},
  {putUnder: "misc", text: "Colony Tile", src:"colonytile"},
  {putUnder: "misc", text: "", src:"population"},
  {putUnder: "extensions", text: "Promo", src:"ext_promo"},
  {putUnder: "extensions", text: "Colonie", src:"ext_colonie"},	
  {putUnder: "extensions", text: "Venus", src:"ext_venus"},
  {putUnder: "extensions", text: "Turmoil", src:"ext_turmoil"},
  {putUnder: "extensions", text: "Prelude", src:"ext_prelude"},
  {putUnder: "extensions", text: "ETSY", src:"ext_etsy"},
  {putUnder: "tiles", text: "trade_otherbg", src:"triangle_other_player_background", hidden:true},
  {putUnder: "resources", text: "Prelude", src:"card_prelude", otherbg:"res_otherbg", default:"Card (Horizontal)"},
  {putUnder: "resources", text: "Corpo", src:"card_corpo", otherbg:"res_otherbg", default:"Card (Horizontal)"},
  {putUnder: "tiles", text: "", src:"colony_plate", default:"Colony tile"},
  {putUnder: "tiles", text: "Standard project", src:"Standard_tile", default:"Standard project"},
  {putUnder: "resources", text: "", src:"bronze", otherbg:"res_otherbg", default:"Standard"},
  {putUnder: "resources", text: "", src:"silver", otherbg:"res_otherbg", default:"Standard"},
  {putUnder: "resources", text: "", src:"gold", otherbg:"res_otherbg", default:"Standard"},
  {putUnder: "resources", text: "", src:"blank", otherbg:"res_otherbg", default:"Standard"},
  {putUnder: "resources", text: "", src:"desease", otherbg:"res_otherbg", default:"Standard"}
];

var blockDefaults = {
  tags: [
    {label:"First Tag", x:639, y:67, width:110, height:110},
    {label:"Second Tag", x:524, y:67, width:110, height:110},
    {label:"Third Tag", x:410, y:67, width:110, height:110},
    {label:"Small Tag", x:330, y:536, width:82, height:82},
    {label:"First Tag (Requirement)", x:195, y:95, width:55, height:55},
    {label:"Second Tag (Requirement)", x:252, y:95, width:55, height:55},
    {label:"Third Tag (Requirement)", x:309, y:95, width:55, height:55},
    {label:"First (Prel)", x:937, y:67, width:110, height:110},
    {label:"Second (Prel)", x:822, y:67, width:110, height:110},
    {label:"Third (Prel)", x:708, y:67, width:110, height:110},
    {label:"First (Corp)", x:937, y:90, width:110, height:110},
    {label:"Second (Corp)", x:822, y:90, width:110, height:110}
  ],
  templates: [
    {label:"Vertical Card", x:0, y:0, width:826, height:1126},
    {label:"Horizontal Card", x:0, y:0, width:1126, height:826}
  ],
  text: [
    {label:"Card Cost", x:118, y:147, height:66, color:"#000000", font:"Prototype", style:"normal", weight:"normal", justify:"center"},
    {label:"Card Name (Vertical)", x:413, y:214, height:46, color:"#000000", font:"Prototype", style:"normal", weight:"normal", justify:"center"},
    {label:"Card Name (Horizontal)", x:563, y:218, height:48, color:"#000000", font:"Prototype", style:"normal", weight:"normal", justify:"center"},	
    {label:"Description", x:413, y:643, width: 600, height:29, lineSpace:4, color:"#000000", font:"Pagella", style:"normal", weight:"normal", justify:"center"},
    {label:"Flavor Text (Vertical)", x:413, y:1035, width: 650, height:29, lineSpace:4, color:"#000000", font:"Pagella", style:"italic", weight:"bold", justify:"center"},
	{label:"Flavor Text (Horizontal)", x:563, y:725, height:29, lineSpace:4, color:"#000000", font:"Pagella", style:"italic", weight:"bold", justify:"center"},
    {label:"ID (Green)", x:413, y:611, height:29, color:"#24770d", font:"Prototype", style:"normal", weight:"normal", justify:"center"},
    {label:"ID (Blue)", x:413,y:798,width:826,height:29,color:"#0c5e84",font:"Prototype",style:"normal",weight:"normal", justify:"center"},
    {label:"ID (Red)", x:413,y:685,width:826,height:29,color:"#c36a17",font:"Prototype",style:"normal",weight:"normal", justify:"center"},
	{label:"ID (Pink)",x:563,y:500,width:826,height:29,color:"#ce809f",font:"Prototype",style:"normal",weight:"normal",justify:"center"},
	{label:"X-ID", x:715, y:668, height:21, color:"#000000", font:"Prototype", style:"normal", weight:"normal", justify:"center"},
    {label:"M€", x:420, y:700, height:45, color:"#000000", font:"Prototype", style:"normal", weight:"normal", justify:"center"},
    {label:"PRELUDE", data:"P R E L U D E", x:563, y:99, height:22, color:"#000000", font:"Prototype", style:"normal", weight:"normal", justify:"center"},
    {label:"CORPORATION", data:"C O R P O R A T I O N", x:563, y:109, height:24, color:"#000000", font:"Prototype", style:"normal", weight:"normal", justify:"center"},
    {label:"EFFECT", data:"E F F E T", x:800, y:333, height:22, color:"#000000", font:"Prototype", style:"normal", weight:"normal", justify:"center"},
	{label:"ACTION", data:"A C T I O N", x:800, y:333, height:22, color:"#000000", font:"Prototype", style:"normal", weight:"normal", justify:"center"}
  ],
  resources: [
    {label:"Standard", width:92, height:92},
	{label:"Card (Vertical)", width:88, height:122},
	{label:"Card (Horizontal)", width:122, height:88},	
	{label:"TR", width:151, height:112}
  ],
  VPs: [
    {label:"VP Standard", x:542, y:836, width:223, height:223},
    {label:"VP Negative", x:652, y:836, width:223, height:223}
  ],
  tiles: [
    {label:"Standard tile", height:142},
	{label:"In description", height:92},
	{label:"Colony tile", width:122, height:88},
	{label:"Standard project", width:122, height:88}
  ],
  requisites: [
    {label:"Max", x:180, y:92, width:200, height:60},
    {label:"Min Large", x:180, y:92, width:176, height:60},
    {label:"Min Medium", x:180, y:92, width:147, height:60},
    {label:"Min Small", x:180, y:92, width:130, height:60},
    {label:"No Req", x:180, y:92, width:21, height:60}
  ],
  globalparameters: [
    {label:"Oxygen", width:118, height:118},
    {label:"Temp", width:35, height:118},
    {label:"Venus", width:125, height:71}
  ],
  misc: [
    {label:"MC", width:92, height:92},
    {label:"Arrow", width:116, height:55},
    {label:"Asterisk", width:55, height:55},
    {label:"Slash", width:55, height:146},
    {label:"Colon", width:11, height:55},
    {label:"Delegate", width:77, height:99},
    {label:"Effect (bg)", x:631, y:307, width:346, height:36},
    {label:"Influence", width:117, height:122},
    {label:"Tag Holder 0", x:969, y:103, width:257, height:89},
    {label:"Tag Holder 1", x:898, y:103, width:257, height:89},
    {label:"Tag Holder 2", x:794, y:103, width:257, height:89}
  ],
  parties: [
    {label:"Party", width:169, height:122}
  ],
  production: [
    {label:"1x height", height:143},
    {label:"2x height", height:235},
    {label:"1x width", width:143},
    {label:"1.5x width", width:188},
    {label:"2x width", width:235},
    {label:"2.5x width", width:279},
    {label:"3x width", width:325}
  ],
  extensions: [
	  {label:"1st (Vertical)", x:61, y:850, width:25, height:25},
	  {label:"2nd (Vertical)", x:61, y:890, width:25, height:25},
	  {label:"3rd (Vertical)", x:61, y:930, width:25, height:25},
	  {label:"4th (Vertical)", x:61, y:970, width:25, height:25},
	  {label:"1st (Horizontal)", x:71, y:530, width:25, height:25},
	  {label:"2nd (Horizontal)", x:71, y:570, width:25, height:25},
	  {label:"3rd (Horizontal)", x:71, y:610, width:25, height:25},
	  {label:"4th (Horizontal)", x:71, y:650, width:25, height:25}
],
	line: [
	{label:"Flavor line (Horizontal)", x:263, y: 695, len: 600},
	{label:"Flavor line (Vertical)", x:263, y: 695, len: 600}
]
	//{\"type\":\"line\",\"x\":263,\"y\":695,\"width\":2,\"angle\":0,\"len\":600,\"color\":\"#000000\",\"opacity\":1,\"params\":\"allangle alllen allpreset allcolor\"}]"

};

var megaTemplates = {
  green_normal: {
    layers: [
      {type: "base", color: "#ffffff", height: 1126, width: 826, params: "color"},
      {type:"block", iNum:0,x:0,y:0,width:826,height:1126,params:"allimages"},
      {type:"text",data:"Cost",x:118,y:147,width:826,height:66,color:"#000000",font:"Prototype",style:"normal",weight:"normal",lineSpace:4,justify:"center",params:"allimages color alltext allpreset"},
      {type:"block",iNum:38,x:179,y:97,width:22,height:59,params:"allimages allpreset"},
      {type:"text",data:"CARD NAME",x:413,y:214,width:826,height:46,color:"#000000",font:"Prototype",style:"normal",weight:"normal",lineSpace:4,justify:"center",params:"allimages color alltext allpreset"},
      {type:"text",data:"ID",x:413,y:612,width:826,height:29,color:"#24770d",font:"Prototype",style:"normal",weight:"normal",lineSpace:4,justify:"center",params:"allimages color alltext allpreset"},
      {type:"text",data:"X-ID",x:715,y:668,width:826,height:21,color:"#000000",font:"Prototype",style:"normal",weight:"normal",lineSpace:4,justify:"center",params:"allimages color alltext allpreset"},
      {type:"text",data:"Card description",x:110,y:770,width:600,height:29,color:"#000000",font:"Pagella",style:"normal",weight:"normal",lineSpace:4,justify:"left",params:"allimages color alltext allpreset"},
	  {type:"line",data:"ligne",x:213,y:1005,width:2,angle:0,length:1400,color:"#000000"},
	  {type:"text",data:"Flavor text!",x:413,y:1035,width:600,height:29,color:"#000000",font:"Pagella",style:"italic",weight:"bold",lineSpace:4,justify:"center",params:"allimages color alltext allpreset"}
    ]
  },
  green_big_bottom: {
    layers: [
      {type: "base", color: "#ffffff", height: 1126, width: 826, params: "color"},
      {type:"block", iNum:2,x:0,y:0,width:826,height:1126,params:"allimages"},
      {type:"text",data:"Cost",x:118,y:147,width:826,height:66,color:"#000000",font:"Prototype",style:"normal",weight:"normal",lineSpace:4,justify:"center",params:"allimages color alltext allpreset"},
      {type:"block", iNum:38,x:179,y:97,width:22,height:59,params:"allimages allpreset"},
      {type:"text",data:"CARD NAME",x:413,y:214,width:826,height:46,color:"#000000",font:"Prototype",style:"normal",weight:"normal",lineSpace:4,justify:"center",params:"allimages color alltext allpreset"},
      {type:"text",data:"ID",x:413,y:562,width:826,height:29,color:"#24770d",font:"Prototype",style:"normal",weight:"normal",lineSpace:4,justify:"center",params:"allimages color alltext allpreset"},
	  {type:"text",data:"X-ID",x:715,y:618,width:826,height:21,color:"#000000",font:"Prototype",style:"normal",weight:"normal",lineSpace:4,justify:"center",params:"allimages color alltext allpreset"},
      {type:"text",data:"Card description",x:110,y:770,width:600,height:29,color:"#000000",font:"Pagella",style:"normal",weight:"normal",lineSpace:4,justify:"left",params:"allimages color alltext allpreset"},
      {type:"line",data:"ligne",x:213,y:1005,width:2,angle:0,length:1400,color:"#000000"},
	  {type:"text",data:"Flavor text!",x:413,y:1035,width:600,height:29,color:"#000000",font:"Pagella",style:"italic",weight:"bold",lineSpace:4,justify:"center",params:"allimages color alltext allpreset"}
    ]
  },
  green_small_bottom: {
    layers: [
	  {type: "base", color: "#ffffff", height: 1126, width: 826, params: "color"},
	  {type:"block", iNum:1,x:0,y:0,width:826,height:1126,params:"allimages"},
	  {type:"text",data:"Cost",x:118,y:147,width:826,height:66,color:"#000000",font:"Prototype",style:"normal",weight:"normal",lineSpace:4,justify:"center",params:"allimages color alltext allpreset"},
	  {type:"block", iNum:38,x:179,y:97,width:22,height:59,params:"allimages allpreset"},
	  {type:"text",data:"CARD NAME",x:413,y:214,width:826,height:46,color:"#000000",font:"Prototype",style:"normal",weight:"normal",lineSpace:4,justify:"center",params:"allimages color alltext allpreset"},
	  {type:"text",data:"ID",x:413,y:664,width:826,height:29,color:"#24770d",font:"Prototype",style:"normal",weight:"normal",lineSpace:4,justify:"center",params:"allimages color alltext allpreset"},
	  {type:"text",data:"X-ID",x:715,y:721,width:826,height:21,color:"#000000",font:"Prototype",style:"normal",weight:"normal",lineSpace:4,justify:"center",params:"allimages color alltext allpreset"}, 
	  {type:"text",data:"Card description",x:110,y:770,width:600,height:29,color:"#000000",font:"Pagella",style:"normal",weight:"normal",lineSpace:4,justify:"left",params:"allimages color alltext allpreset"},
      {type:"line",data:"ligne",x:213,y:1005,width:2,angle:0,length:1400,color:"#000000"},
	  {type:"text",data:"Flavor text!",x:413,y:1035,width:600,height:29,color:"#000000",font:"Pagella",style:"italic",weight:"bold",lineSpace:4,justify:"center",params:"allimages color alltext allpreset"}
    ]
  },
  blue_normal: {
    layers: [
      {type: "base", color: "#ffffff", height: 1126, width: 826, params: "color"},
      {type:"block", iNum:3,x:0,y:0,width:826,height:1126,params:"allimages"},
      {type:"text",data:"Cost",x:118,y:147,width:826,height:66,color:"#000000",font:"Prototype",style:"normal",weight:"normal",lineSpace:4,justify:"center",params:"allimages color alltext allpreset"},
      {type:"block", iNum:38,x:179,y:97,width:22,height:59,params:"allimages allpreset"},
      {type:"text",data:"CARD NAME",x:413,y:214,width:826,height:46,color:"#000000",font:"Prototype",style:"normal",weight:"normal",lineSpace:4,justify:"center",params:"allimages color alltext allpreset"},
      {type:"text",data:"ID",x:413,y:798,width:826,height:29,color:"#0c5e84",font:"Prototype",style:"normal",weight:"normal",lineSpace:4,justify:"center",params:"allimages color alltext allpreset"},
      {type:"text",data:"X-ID",x:715,y:806,width:826,height:21,color:"#000000",font:"Prototype",style:"normal",weight:"normal",lineSpace:4,justify:"center",params:"allimages color alltext allpreset"}, 
	  {type:"text",data:"Card description",x:100,y:860,width:600,height:29,color:"#000000",font:"Pagella",style:"normal",weight:"normal",lineSpace:4,justify:"left",params:"allimages color alltext allpreset"},
      {type:"text",data:"Flavor text!",x:413,y:1035,width:600,height:29,color:"#000000",font:"Pagella",style:"italic",weight:"bold",lineSpace:4,justify:"center",params:"allimages color alltext allpreset"},
      {type:"block", iNum:14,x:355,y:265,width:116,height:55,params:"allimages allpreset"},
      {type:"line",data:"ligne",x:213,y:1005,width:2,angle:0,length:1400,color:"#000000"},
	  {type:"text",data:"Effect or Action text!",x:413,y:360,width:600,height:29,color:"#000000",font:"Pagella",style:"normal",weight:"normal",lineSpace:4,justify:"center",params:"allimages color alltext allpreset"}
    ]
  },
  blue_big_bottom: {
    layers: [
      {type: "base", color: "#ffffff", height: 1126, width: 826, params: "color"},
      {type:"block", iNum:4,x:0,y:0,width:826,height:1126,params:"allimages"},
      {type:"text",data:"Cost",x:118,y:147,width:826,height:66,color:"#000000",font:"Prototype",style:"normal",weight:"normal",lineSpace:4,justify:"center",params:"allimages color alltext allpreset"},
      {type:"block", iNum:38,x:179,y:97,width:22,height:59,params:"allimages allpreset"},
      {type:"text",data:"CARD NAME",x:413,y:214,width:826,height:46,color:"#000000",font:"Prototype",style:"normal",weight:"normal",lineSpace:4,justify:"center",params:"allimages color alltext allpreset"},
      {type:"text",data:"ID",x:413,y:753,width:702,height:29,color:"#0c5e84",font:"Prototype",style:"normal",weight:"normal",lineSpace:4,justify:"center",params:"allimages color alltext allpreset"},
      {type:"text",data:"X-ID",x:715,y:760,width:826,height:21,color:"#000000",font:"Prototype",style:"normal",weight:"normal",lineSpace:4,justify:"center",params:"allimages color alltext allpreset"}, 
	  {type:"text",data:"Card description",x:100,y:860,width:600,height:29,color:"#000000",font:"Pagella",style:"normal",weight:"normal",lineSpace:4,justify:"left",params:"allimages color alltext allpreset"},
      {type:"text",data:"Flavor text!",x:413,y:1035,width:600,height:29,color:"#000000",font:"Pagella",style:"italic",weight:"bold",lineSpace:4,justify:"center",params:"allimages color alltext allpreset"},
      {type:"block", iNum:14,x:355,y:265,width:116,height:55,params:"allimages allpreset"},
      {type:"line",data:"ligne",x:213,y:1005,width:2,angle:0,length:1400,color:"#000000"},
	  {type:"text",data:"Effect or Action text!",x:413,y:360,width:600,height:29,color:"#000000",font:"Pagella",style:"normal",weight:"normal",lineSpace:4,justify:"center",params:"allimages color alltext allpreset"}
    ]
  },
  blue_big_top: {
    layers: [
      {type: "base", color: "#ffffff", height: 1126, width: 826, params: "color"},
      {type:"block", iNum:5,x:0,y:0,width:826,height:1126,params:"allimages"},
      {type:"text",data:"Cost",x:118,y:147,width:826,height:66,color:"#000000",font:"Prototype",style:"normal",weight:"normal",lineSpace:4,justify:"center",params:"allimages color alltext allpreset"},
      {type:"block", iNum:38,x:179,y:97,width:22,height:59,params:"allimages allpreset"},
      {type:"text",data:"CARD NAME",x:413,y:214,width:826,height:46,color:"#000000",font:"Prototype",style:"normal",weight:"normal",lineSpace:4,justify:"center",params:"allimages color alltext allpreset"},
      {type:"text",data:"ID",x:413,y:849,width:702,height:29,color:"#0c5e84",font:"Prototype",style:"normal",weight:"normal",lineSpace:4,justify:"center",params:"allimages color alltext allpreset"},
      {type:"text",data:"X-ID",x:715,y:857,width:826,height:21,color:"#000000",font:"Prototype",style:"normal",weight:"normal",lineSpace:4,justify:"center",params:"allimages color alltext allpreset"}, 
      {type:"text",data:"Card description",x:100,y:891,width:600,height:29,color:"#000000",font:"Pagella",style:"normal",weight:"normal",lineSpace:4,justify:"left",params:"allimages color alltext allpreset"},
      {type:"text",data:"Flavor text!",x:413,y:1035,width:600,height:29,color:"#000000",font:"Pagella",style:"italic",weight:"bold",lineSpace:4,justify:"center",params:"allimages color alltext allpreset"},
      {type:"block", iNum:14,x:355,y:265,width:116,height:55,params:"allimages allpreset"},
      {type:"line",data:"ligne",x:213,y:1005,width:2,angle:0,length:1400,color:"#000000"},
	  {type:"text",data:"Effect or Action text!",x:413,y:360,width:600,height:29,color:"#000000",font:"Pagella",style:"normal",weight:"normal",lineSpace:4,justify:"center",params:"allimages color alltext allpreset"}
    ]
  },
  
    blue_very_big_top: {
    layers: [
      {type: "base", color: "#ffffff", height: 1126, width: 826, params: "color"},
      {type:"block", iNum:6,x:0,y:0,width:826,height:1126,params:"allimages"},
      {type:"text",data:"Cost",x:118,y:147,width:826,height:66,color:"#000000",font:"Prototype",style:"normal",weight:"normal",lineSpace:4,justify:"center",params:"allimages color alltext allpreset"},
      {type:"block", iNum:38,x:179,y:97,width:22,height:59,params:"allimages allpreset"},
      {type:"text",data:"CARD NAME",x:413,y:214,width:826,height:46,color:"#000000",font:"Prototype",style:"normal",weight:"normal",lineSpace:4,justify:"center",params:"allimages color alltext allpreset"},
      {type:"text",data:"ID",x:413,y:915,width:702,height:29,color:"#0c5e84",font:"Prototype",style:"normal",weight:"normal",lineSpace:4,justify:"center",params:"allimages color alltext allpreset"},
      {type:"text",data:"X-ID",x:715,y:923,width:826,height:21,color:"#000000",font:"Prototype",style:"normal",weight:"normal",lineSpace:4,justify:"center",params:"allimages color alltext allpreset"}, 
      {type:"text",data:"Flavor text!",x:413,y:1035,width:600,height:29,color:"#000000",font:"Pagella",style:"italic",weight:"bold",lineSpace:4,justify:"center",params:"allimages color alltext allpreset"},
      {type:"block", iNum:14,x:355,y:265,width:116,height:55,params:"allimages allpreset"},
      {type:"line",data:"ligne",x:213,y:1005,width:2,angle:0,length:1400,color:"#000000"},
	  {type:"text",data:"Effect or Action text!",x:413,y:360,width:600,height:29,color:"#000000",font:"Pagella",style:"normal",weight:"normal",lineSpace:4,justify:"center",params:"allimages color alltext allpreset"}
    ]
  },
  
  red_normal: {
    layers: [
      {type: "base", color: "#ffffff", height: 1126, width: 826, params: "color"},
      {type:"block", iNum:7,x:0,y:0,width:826,height:1126,params:"allimages"},
      {type:"text",data:"Cost",x:118,y:147,width:826,height:66,color:"#000000",font:"Prototype",style:"normal",weight:"normal",lineSpace:4,justify:"center",params:"allimages color alltext allpreset"},
      {type:"block", iNum:38, x:179,y:97,width:22,height:59,params:"allimages allpreset"},
      {type:"block", iNum:59, x:639, y:67, width:110, height:110,params:"allimages allpreset"},
	  {type:"text",data:"CARD NAME",x:413,y:214,width:826,height:46,color:"#000000",font:"Prototype",style:"normal",weight:"normal",lineSpace:4,justify:"center",params:"allimages color alltext allpreset"},
      {type:"text",data:"ID",x:413,y:685,width:826,height:29,color:"#c36a17",font:"Prototype",style:"normal",weight:"normal",lineSpace:4,justify:"center",params:"allimages color alltext allpreset"},
      {type:"text",data:"X-ID",x:715,y:713,width:826,height:21,color:"#000000",font:"Prototype",style:"normal",weight:"normal",lineSpace:4,justify:"center",params:"allimages color alltext allpreset"}, 
      {type:"text",data:"Card description",x:100,y:810,width:600,height:29,color:"#000000",font:"Pagella",style:"normal",weight:"normal",lineSpace:4,justify:"left",params:"allimages color alltext allpreset"},
      {type:"line",data:"ligne",x:213,y:1005,width:2,angle:0,length:1400,color:"#000000"},
	  {type:"text",data:"Flavor text!",x:413,y:1035,width:600,height:29,color:"#000000",font:"Pagella",style:"italic",weight:"bold",lineSpace:4,justify:"center",params:"allimages color alltext allpreset"}
    ]
  },
  red_small_bottom: {
    layers: [
      {type: "base", color: "#ffffff", height: 1126, width: 826, params: "color"},
      {type:"block", iNum:8,x:0,y:0,width:826,height:1126,params:"allimages"},
      {type:"text",data:"Cost",x:118,y:147,width:826,height:66,color:"#000000",font:"Prototype",style:"normal",weight:"normal",lineSpace:4,justify:"center",params:"allimages color alltext allpreset"},
      {type:"block", iNum:38,x:179,y:97,width:22,height:59,params:"allimages allpreset"},
      {type:"block", iNum:59, x:639, y:67, width:110, height:110,params:"allimages allpreset"},
	  {type:"text",data:"CARD NAME",x:413,y:214,width:826,height:46,color:"#000000",font:"Prototype",style:"normal",weight:"normal",lineSpace:4,justify:"center",params:"allimages color alltext allpreset"},
      {type:"text",data:"ID",x:413,y:718,width:826,height:29,color:"#c36a17",font:"Prototype",style:"normal",weight:"normal",lineSpace:4,justify:"center",params:"allimages color alltext allpreset"},
      {type:"text",data:"X-ID",x:715,y:746,width:826,height:21,color:"#000000",font:"Prototype",style:"normal",weight:"normal",lineSpace:4,justify:"center",params:"allimages color alltext allpreset"}, 
      {type:"text",data:"Card description",x:100,y:810,width:600,height:29,color:"#000000",font:"Pagella",style:"normal",weight:"normal",lineSpace:4,justify:"left",params:"allimages color alltext allpreset"},
      {type:"line",data:"ligne",x:213,y:1005,width:2,angle:0,length:1400,color:"#000000"},
	  {type:"text",data:"Flavor text!",x:413,y:1035,width:600,height:29,color:"#000000",font:"Pagella",style:"italic",weight:"bold",lineSpace:4,justify:"center",params:"allimages color alltext allpreset"}
    ]
  },
  prelude: {
    layers: [
      {type: "base", color: "#ffffff", height: 826, width: 1126, params: "color"},
      {type:"block", iNum:95,x:0,y:0,width:1126,height:826,params:"allimages"},
      {type:"text",data:"CARD NAME",x:563,y:218,width:826,height:48,color:"#000000",font:"Prototype",style:"normal",weight:"normal",lineSpace:4,justify:"center",params:"allimages color alltext allpreset"},
      {type:"text",data:"ID",x:563,y:500,width:826,height:29,color:"#ce809f",font:"Prototype",style:"normal",weight:"normal",lineSpace:4,justify:"center",params:"allimages color alltext allpreset"},
      {type:"text",data:"X-ID",x:1002,y:520,width:826,height:21,color:"#000000",font:"Prototype",style:"normal",weight:"normal",lineSpace:4,justify:"center",params:"allimages color alltext allpreset"}, 
      {type:"text",data:"P R E L U D E",x:563,y:99,width:826,height:24,color:"#000000",font:"Prototype",style:"normal",weight:"normal",lineSpace:4,justify:"center",params:"allimages color alltext allpreset"},
      {type:"text",data:"Card description",x:110,y:560,width:600,height:29,color:"#000000",font:"Pagella",style:"normal",weight:"normal",lineSpace:4,justify:"left",params:"allimages color alltext allpreset"},
	  {type:"text",data:"Flavor text!",x:563,y:723,width:600,height:29,color:"#000000",font:"Pagella",style:"italic",weight:"bold",lineSpace:4,justify:"center",params:"allimages color alltext allpreset"}
    ]
  },
  corporation: {
    layers: [
      {type:"base", color: "#ffffff", height: 826, width: 1126, params: "color"},
      {type:"block","iNum":97,x:969,y:103,width:257,height:89,params:"allimages"},
      {type:"block","iNum":96,x:0,y:0,width:1126,height:826,params:"allimages"},
      {type:"effect", x: 600, y: 300, width: 400, height: 300, params: "allimages allpreset"},
      {type:"block", name: "", iNum: 98, x: 631, y: 307, width: 345.79, height: 36,params:"allimages"},
      {type:"text", data: "E F F E T", x: 800, y: 333, width: 1126, height: 22, color: "#000000",font:"Prototype",style:"normal",weight:"normal",lineSpace:4,justify:"center",params:"allimages color alltext allpreset"},
      {type:"text","data":"ID",x:198,y:736,width:826,height:29,color:"#c3c3c3",font:"Prototype",style:"normal",weight:"normal",lineSpace:4,justify:"center",params:"allimages color alltext allpreset"},
      {type:"text","data":"C O R P O R A T I O N",x:563,y:109,width:826,height:24,color:"#000000",font:"Prototype",style:"normal",weight:"normal",lineSpace:4,justify:"center",params:"allimages color alltext allpreset"},
      {type:"text","data":"Card description",x:110,y:560,width:600,height:29,color:"#000000",font:"Pagella",style:"normal",weight:"normal",lineSpace:4,justify:"left",params:"allimages color alltext allpreset"},
      {type:"text","data":"Flavor text!",x:563,y:723,width:600,height:29,color:"#000000",font:"Pagella",style:"italic",weight:"bold",lineSpace:4,justify:"center",params:"allimages color alltext allpreset"}
    ]
  }
};

var ddcount = 0;
var maxToLoad;
var numLoaded;

var hiddenImage = {};

var domInputfont = document.getElementById("inputfont");
var domParams = document.getElementById("params").parentNode.removeChild(document.getElementById("params"));
domParams.classList.remove("w3-hide");

function resetProject(loadautosave) {
  document.getElementById("layerlist").innerHTML = "";
  ddcount = 0;
  aLayers = {};
  document.getElementById("xcanvases").innerHTML = "";
  aCanvases = [];
  addLayer("Base",{type:"base", color:"#ffffff", height:1126, width:826, params:"color"});

  maxToLoad = 0;
  for (let i=0; i < blockList.length; i++) {
    if (!blockList[i].obj) {
      maxToLoad++;
      addBlockMenuItem(i);
    }
  }
  // if (maxToLoad) {
  //   numLoaded = 0;
  //   document.getElementById("files").max = maxToLoad;
  //   document.getElementById("files").value = numLoaded;
  //   document.getElementById("loadprogress").style.display = "block";
  //   document.getElementById("cmcanvas").style.display = "none";
  // } else {
    allLoadingDone(loadautosave);
  // }
}

function fetchBlock(num) {
  let imageObj = new Image();
  imageObj.onload = onBlockLoad;
  imageObj.src = blockList[num].putUnder + "/" + blockList[num].src + ".png";
  imageObj.dataindex = num;
  blockList[num].obj = imageObj;
  if (blockList[num].text.indexOf("otherbg") != -1) {
    // if this image is an 'other people background', save its name
    otherBgList[blockList[num].text] = imageObj;
  }
}

function addBlockMenuItem(num) {

  if (blockList[num].hidden) {
    // hidden images don't get menu items
    hiddenImage[blockList[num].text] = num;
  } else {
    let tmpText = blockList[num].text;
    if (!tmpText) {
      tmpText = blockList[num].src;
      tmpText = tmpText.replace(/_/g, ' ');
      tmpText = tmpText.replace(tmpText.charAt(0), tmpText.charAt(0).toUpperCase());
      blockList[num].text = tmpText;
    }
    // add menu item for image
    // <a onclick="addBlock('template:green')" href="#" class="w3-bar-item w3-button">Green Card</a>
    if (!document.getElementById("image" + num)) {
      let toAdd = document.createElement("a");
      toAdd.onclick = addBlock;
	  //Ajout d'une image d'aperçu
	  const icon = document.createElement("img");
		icon.src = `${blockList[num].putUnder}/${blockList[num].src}.png`;
		icon.style.height = "20px";
		icon.style.verticalAlign = "middle";
		icon.style.marginRight = "6px";

	  toAdd.appendChild(icon);
	  toAdd.appendChild(document.createTextNode(tmpText));
      toAdd.classList.add("w3-bar-item");
      toAdd.classList.add("w3-button");
      toAdd.href = "#";
      toAdd.id = "image" + num;
      document.getElementById(blockList[num].putUnder).appendChild(toAdd);
      if (blockList[num].putUnder == "templates") {
        // add Super Templates
        toAdd = document.createElement("a");
        toAdd.onclick = addMegaTemplate;
        toAdd.innerText = tmpText;
        toAdd.classList.add("w3-bar-item");
        toAdd.classList.add("w3-button");
        toAdd.href = "#";
        toAdd.id = "mega" + blockList[num].src;
        document.getElementById("fromTemplate").appendChild(toAdd);
      }
    }
  }
}

function addLayer(title, layer) {
  // <div id='div1' class='divRec'><div class='inside'>item 1</div></div>
  let toAdd = document.createElement("div");
  // toAdd.appendChild(downButton());
  if (!ddcount && (ddcount != 0)) ddcount = 0;
  toAdd.id = "dragdropdiv" + ddcount;
  toAdd.classList.add("divRec");
  if (ddcount) toAdd.appendChild(createGroupCheckbox());
  let childAdd = document.createElement("div");
  childAdd.classList.add("inside");
  //childAdd.innerHTML = title;
  childAdd.appendChild(createTextbox(title));
  childAdd.onclick = selectLayer;
  // skip delete button for base layer
  if (ddcount) childAdd.appendChild(deleteButton());
  toAdd.appendChild(childAdd);
  document.getElementById("layerlist").appendChild(toAdd);
  aLayers[toAdd.id] = layer;
  ddcount++;

  sortable( document.getElementById('layerlist'), function (item){
    /* console.log(item); */
  });
  return layer;
}

function createGroupCheckbox() {
  let toAdd = document.createElement("input");
  toAdd.type = "checkbox";
  toAdd.classList.add("groupcheck");
  toAdd.classList.add("w3-hide");
  toAdd.checked = false;
  //toAdd.style.display = "none";
  return toAdd;
}

function createTextbox(txt) {
  let toAdd = document.createElement("input");
  toAdd.type = "text";
  toAdd.id = "layername" + ddcount;
  toAdd.maxLength = 20;
  toAdd.size = 15;
  toAdd.value = txt;
  toAdd.onchange = function () {updateLayerName(event, this)};
  return toAdd;
}

function updateLayerName(e, th) {
  let layerName = th.parentNode.parentNode.id;
  aLayers[layerName].name = th.value;
  drawProject();
}

function deleteButton() {
  let toAdd = document.createElement("button");
  toAdd.innerHTML = "X";
  toAdd.style.float = "right";
  toAdd.onclick = function () {deleteListItem(event, this)};
  return toAdd;
}

function genSpan(txt) {
  let toAdd = document.createElement("span");
  toAdd.innerText = txt;
}

function deleteListItem(e,th) {
  e.stopPropagation();
  // delete item from aLayers and from layerlist (DOM)
  let toDelete = th.parentNode.parentNode;
  // let deleteNum = Number(toDelete.id.slice(11));
  // // for every list numbered > than the one being deleted, subtract 1
  // let allLayerNodes = toDelete.parentNode.children;
  // for (let ch=0; ch < allLayerNodes.length; ch++) {
  //   let thisNum = Number(allLayerNodes[ch].id.slice(11));
  //   if (thisNum > deleteNum)   {
  //     thisNum--;
  //     allLayerNodes[ch].id = "dragdropdiv" + thisNum;
  //   }

  // }
  delete aLayers[toDelete.id];
  toDelete.parentNode.removeChild(toDelete);
  drawProject();
}

function selectLayer() {
  removeKeyInputFocus()
  let allLayerNodes = document.getElementById("layerlist").children;
  for (let ch=0; ch < allLayerNodes.length; ch++) {
    if (allLayerNodes[ch].classList.contains("selected")) {
      if (domParams.parentNode == allLayerNodes[ch]) {
        allLayerNodes[ch].removeChild(domParams);
      }
      allLayerNodes[ch].classList.remove("selected");
      // show delete button
      let buttons = allLayerNodes[ch].getElementsByTagName("button");
      if (buttons.length) {
        buttons[0].style.display = "block";
      }
    } else if (allLayerNodes[ch] == this.parentNode) {
      // hide delete button
      let buttons = allLayerNodes[ch].getElementsByTagName("button");
      if (buttons.length) {
        buttons[0].style.display = "none";
      }
      allLayerNodes[ch].classList.add("selected");
      // hide/unhide correct params for this layer
      let thisLayer = aLayers[allLayerNodes[ch].id];
      let thisLayerParams = thisLayer.params;
      if (this.parentNode.id != "dragdropdiv0") {
        thisLayerParams += " allall";
      }

      for (let pch=0; pch < domParams.children.length; pch++) {
        let thispch = domParams.children[pch];
        if (thisLayerParams.indexOf(thispch.id) == -1) {
          // not in params, hide it
          thispch.classList.add("w3-hide");
        } else {
          // in params list, show it
          // thispch is DOM elements such as allpreset allimages etc
          thispch.classList.remove("w3-hide");
          for (let intype of ["input", "textarea", "select"]) {
            let chInputs = thispch.getElementsByTagName(intype);
            for (let subch of chInputs) {
              if (subch.id.indexOf("input") == 0) {
                if (subch.type == "checkbox") {
                  subch.checked = thisLayer[subch.id.slice(5)];
                } else {
                  subch.value = thisLayer[subch.id.slice(5)];
                }
              } else if ((subch.id == "lar") || (subch.id == "slar")) {
                subch.checked = true;
              } else if (subch.id == "presets") {
                // set default selections for this layer
                // Note: we already checked above that we should do this
                let opts = subch.getElementsByTagName("option");
                let defType = "";
                if (thisLayer.type == "block") {
                  defType = blockList[thisLayer.iNum].putUnder;
                } else if (thisLayer.type == "text") {
                  defType = "text";
                } else if (thisLayer.type == "production") {
                  defType = "production";
                }
                if (defType) {
                  subch.value = "";
                  while (opts.length < blockDefaults[defType].length + 1) {
                    let cNode = opts[1].cloneNode(false);
                    cNode.value = "defselect" + (opts.length - 1);
                    subch.appendChild(cNode);
                  }
                  for (let i=1; i < opts.length; i++) {
                    // for each usable <option> under presets
                    if (i <= blockDefaults[defType].length) {
                      opts[i].innerText = blockDefaults[defType][i-1].label;
                      opts[i].classList.remove("w3-hide");
                    } else {
                      opts[i].classList.add("w3-hide");
                    }
                  }
                }
              }
            }

          }
        }
      }
      allLayerNodes[ch].appendChild(domParams);
    }
  }
}

function drawProject() {
  if (reloading) return;
  let c = document.getElementById("cmcanvas");
  let ctx = c.getContext("2d");
  let layerDivs = document.getElementsByClassName("divRec");
  let imagesForSaving = [];
  for (let i=0; i < layerDivs.length; i++) {
    let layer = aLayers[layerDivs[i].id];
    imagesForSaving.push(layer);
    switch (layer.type) {
		case "block":
		  if (i == 0) {
			c.height = layer.height;
			c.width = layer.width;
		  }

        // layer = {type:"block", obj:{}, x:0, y:0, width:0, height:0, params:"allimages"};
        if (layer.obg) { // draw others background?
          let brdr = 3;
          if (!otherBgList[blockList[layer.iNum].otherbg]) {
            for (let j=0; j < blockList.length; j++) {
              if (blockList[j].text == blockList[layer.iNum].otherbg) {
                fetchBlock(j);
                break;
              }
            }
          } else if (otherBgList[blockList[layer.iNum].otherbg].complete) {
            ctx.drawImage(otherBgList[blockList[layer.iNum].otherbg],layer.x-brdr,layer.y-brdr,layer.width+2*brdr,layer.height+2*brdr);
          }
        }

		  if (!blockList[layer.iNum].obj) {
			fetchBlock(layer.iNum);
		  } else if (blockList[layer.iNum].obj.complete) {
			ctx.drawImage(blockList[layer.iNum].obj, layer.x, layer.y, layer.width, layer.height);

			// 🔁 Si c'est un bloc M€ avec valeur textuelle, on l'affiche centré
			if (blockList[layer.iNum]?.src === "megacredit" && layer.data) {
			  ctx.textAlign = "center";
			  ctx.font = `normal normal 45px Prototype`;
			  ctx.fillStyle = "#000000";
			  ctx.fillText(layer.data, layer.x + layer.width / 2, layer.y + layer.height / 2 + 17);
			}
		  }
		  break;
		
      case "text":

        // layer = {type:"text", data:"", x:0, y:0, width:0, height:0,
        // color:"#000000",
        // font:"Prototype", lineSpace:4, justify:"center",
        // params:""};
        ctx.textAlign = layer.justify;
        if (!layer.style) layer.style = "normal";
        ctx.font = layer.style + " " + layer.weight + " " + layer.height + "px " + layer.font;
        ctx.fillStyle = layer.color;
        // TBD break up long text into mutiple parts
        // Note that this algorithm is copied in clickIsWithinText()
        let lines = layer.data.split("\n");
        let cnt = 0;
        for (var ln=0; ln < lines.length; ln++) {
          let spl = lines[ln].split(" ");
          let o = "";
          while (spl.length) {
            o = spl.shift();
            while (spl.length && (ctx.measureText(o + " " + spl[0]).width < layer.width)) {
              o += " " + spl.shift();
            }
            ctx.fillText(o, layer.x, 0 + layer.y + (layer.height + layer.lineSpace) * cnt);
            cnt++;
          }
        }

        break;
      case "production":

        {
          let sz = 20;
          let border = 3;
          let xpos = Number(layer.x);
          let ypos = Number(layer.y);
          let width = Number(layer.width);
          let height = Number(layer.height);
          let img = blockList[hiddenImage["prod_nxn"]].obj ;
          let x=xpos;
          let w=width % sz;
          // if (!w) w += sz;
          let h=height % sz;
          // if (!h) h += sz;
          for (x=xpos; x <= xpos+width; x += sz) {
            let y=ypos;
            for (y=ypos; y <= ypos+height; y += sz) {
              if ((x <= xpos+width-sz) && (y <= ypos+height-sz)) {
                ctx.drawImage(img,x,y,sz,sz);
              } else {
                if (x > xpos+width-sz) {
                  if (y > ypos+height-sz) {
                    ctx.drawImage(img,0,0,w,h,x,y,w,h);
                  } else {
                    ctx.drawImage(img,0,0,w,sz,x,y,w,sz);
                  }
                } else {
                  if (y > ypos+height-sz) {
                    ctx.drawImage(img,0,0,sz,h,x,y,sz,h);
                  } else {
                    window.alert("What?");
                    ctx.drawImage(img,0,0,sz,sz,x,y,sz,sz);
                  }
                }
              }

            }
          }
          // inner gradient
          let my_gradient = ctx.createLinearGradient(0, ypos, 0, ypos + height);
          my_gradient.addColorStop(0, "#9d6c43");
          my_gradient.addColorStop(1, "#5a412c");
          ctx.fillStyle = my_gradient;
          ctx.fillRect(xpos, ypos+border, width, border); // top
          ctx.fillRect(xpos, ypos+height-border*2, width, border); // bottom
          ctx.fillRect(xpos+border, ypos, border, height); // left
          ctx.fillRect(xpos+width-border*2, ypos, border, height); // right

          // outer gradient
          my_gradient = ctx.createLinearGradient(0, ypos, 0, ypos + height);
          my_gradient.addColorStop(0, "#505050");
          my_gradient.addColorStop(1, "#c0c0c0");
          ctx.fillStyle = my_gradient;
          ctx.fillRect(xpos, ypos, width, border);// top
          ctx.fillRect(xpos, ypos+height-border, width, border); // bottom
          ctx.fillRect(xpos, ypos, border, height); // left
          ctx.fillRect(xpos+width-border, ypos, border, height); // right
        }

        break;
      case "effect":

        {
          let border = 5;
          let xpos = Number(layer.x);
          let ypos = Number(layer.y);
          let width = Number(layer.width);
          let height = Number(layer.height);
          // draw border (actually draws whole rectange but we overwrite below)
          let grd = ctx.createLinearGradient(xpos, ypos, xpos+width, ypos);
          let stops = [0, 0.1, 0.2, 0.3, 0.4, 0.6, 0.68, 0.76, 0.84, 0.92];
          let stopColors = ["#333333", "#999999"];
          for (let s=0; s < stops.length; s++) {
            grd.addColorStop(stops[s], stopColors[s % 2]);
          }
          grd.addColorStop(1, "#777777");
          ctx.fillStyle = grd;
          ctx.fillRect(xpos, ypos, layer.width, layer.height);
          // draw center
          grd = ctx.createLinearGradient(xpos+border, ypos+border, xpos+layer.width-border, ypos+layer.height-border);
          stops = [0, 0.07, 0.25, 0.6, 0.85, 1.0];
          stopColors = ["#ffffff", "#999999"];
          for (let s=0; s < stops.length; s++) {
            grd.addColorStop(stops[s], stopColors[s % 2]);
          }
          ctx.fillStyle = grd;
          ctx.fillRect(xpos+border, ypos+border, layer.width-2*border, layer.height-2*border);
        }
        break;
      case "userFile":
      case "embedded":
      case "webFile":
        if (layer.iNum != -1) {
          if (layer.alpha == undefined) layer.alpha = 100;
          ctx.globalAlpha = Number(layer.alpha) / 100;
          ctx.drawImage(userImageList[layer.iNum],layer.sx,layer.sy,layer.swidth,layer.sheight,layer.x,layer.y,layer.width,layer.height);
          ctx.globalAlpha = 1;
        }

        break;
      case "line":

        ctx.lineWidth = layer.width;
        ctx.strokeStyle = layer.color;
        ctx.translate(layer.x, layer.y);
        ctx.rotate(Math.PI * layer.angle / 180);
        ctx.moveTo(0,0);
        ctx.lineTo(layer.len,0);
        ctx.stroke();
        ctx.setTransform();
        ctx.lineWidth = 1;
        break;
      // case "group":
      //   break;
      case "base":

        // set height/width
        c.height = layer.height;
        c.width = layer.width;
        // clear to background color
        ctx.fillStyle = layer.color;
        // ctx.fillStyle = "rgb(" + layer.red + "," + layer.blue + "," + layer.green + ")";
        ctx.fillRect(0,0,layer.width, layer.height);
        break;

      default:
        window.alert("Invalid layer type:" + layer.type);
        break;
    }
  }
  autoSave(imagesForSaving);
}

var lastAutoSave = "";
function autoSave(layers) {
  lastAutoSave = projectDataToJson(layers);
  try {
    if (typeof(Storage) !== "undefined") {
      localStorage.setItem("autosave", lastAutoSave);
    }

  } catch (error) {
    window.alert("Error with autosave");
  }
}

const arAlt = {
  width: ["height", "lar"],
  height: ["width", "lar"],
  swidth: ["sheight", "slar"],
  sheight: ["swidth", "slar"]
};

function updateValue(th) {
  // called after user updates a value
  // OR after user select preset (reloading==true, in this case)
  let layer = th.parentNode.parentNode.parentNode.parentNode;
  let layerName = layer.id;
  let fieldName = th.id.slice(5);
  if (th.type == "number") {
    let newValue =  Number(th.value);
    // deal with group moves
    if ((fieldName == "x") || (fieldName == "y")) {
      // check if part of group
      if (layer.getElementsByClassName("groupcheck")[0].checked) {
        // adjust all other members of group by same amount
        let thisgroup = document.getElementsByClassName("groupcheck");
        let diff = newValue - aLayers[layerName][fieldName];
        for (let x=0; x < thisgroup.length; x++) {
          if (!thisgroup[x].checked) continue;
          let groupLayerId = thisgroup[x].parentNode.id;
          aLayers[groupLayerId][fieldName] += diff;
        }
      }
    }
    if (arAlt[fieldName] && !reloading && (aLayers[layerName].type != "text")) {
      // it is width/height/swidth/sheight field
      if (document.getElementById(arAlt[fieldName][1]).checked) {
        // lar or slar (as appropriate) is checked
        // compute otherValue (e.g. if fieldname = width, otherValue = newValue * height/width)
        let otherValue = newValue * aLayers[layerName][arAlt[fieldName][0]] / aLayers[layerName][fieldName];
        otherValue = Math.round(otherValue * 1000) / 1000;
        if ((otherValue) && (Math.abs(otherValue - Math.round(otherValue)) < 0.01)) otherValue = Math.round(otherValue);
        aLayers[layerName][arAlt[fieldName][0]] = otherValue;
        document.getElementById("input" + arAlt[fieldName][0]).value = otherValue;
      }
    }
    aLayers[layerName][fieldName] = newValue;
  } else if (th.type == "checkbox") {
    aLayers[layerName][fieldName] = th.checked;
  } else {
    if (th.id == "inputfont") {
      aLayers[layerName].filename = fontList[th.value];
    }
    aLayers[layerName][fieldName] = th.value;
  }
  drawProject();
}


function setPresets(th){
  let selVal = document.getElementById("presets").value;
  if (!selVal) return;
  let sel = Number(selVal.slice(9));
  let layerDom = th.parentNode.parentNode.parentNode.parentNode;
  let layer = aLayers[layerDom.id];

  let dName = "";
  if (layer.type == "block") {
    let a = layer.iNum;
    let b = blockList[a];
    dName = b.putUnder;
  } else if (layer.type == "text") {
    dName = "text";
  } else if (layer.type == "production") {
    dName = "production";
  }

  if (dName) {
    reloading = true;
    for (let v in blockDefaults[dName][sel]) {
      // fill in presets
      if (v == "label") continue;
      document.getElementById("input" + v).value = blockDefaults[dName][sel][v];
      if (dName == "tiles") {
        reloading = false;
      }
      updateValue(document.getElementById("input" + v));
    }
    if (dName == "templates") {
      aLayers["dragdropdiv0"].height = blockDefaults[dName][sel].height;
      aLayers["dragdropdiv0"].width = blockDefaults[dName][sel].width;
    }
    reloading = false;
  }
  drawProject();
}

function onBlockLoad() {
  if (blockList[this.dataindex].hidden) {
    // hidden images don't get menu items
    hiddenImage[blockList[this.dataindex].text] = this.dataindex;
  } else {
    let tmpText = blockList[this.dataindex].text;
    if (!tmpText) {
      tmpText = blockList[this.dataindex].src;
      tmpText = tmpText.replace(/_/g, ' ');
      tmpText = tmpText.replace(tmpText.charAt(0), tmpText.charAt(0).toUpperCase());
      blockList[this.dataindex].text = tmpText;
    }
    // add menu item for image
    // <a onclick="addBlock('template:green')" href="#" class="w3-bar-item w3-button">Green Card</a>
    if (!document.getElementById("image" + this.dataindex)) {
      let toAdd = document.createElement("a");
      toAdd.onclick = addBlock;
      toAdd.innerText = tmpText;
      toAdd.classList.add("w3-bar-item");
      toAdd.classList.add("w3-button");
      toAdd.href = "#";
      toAdd.id = "image" + this.dataindex;
      document.getElementById(blockList[this.dataindex].putUnder).appendChild(toAdd);
      if (blockList[this.dataindex].putUnder == "templates") {
        // add Super Templates
        toAdd = document.createElement("a");
        toAdd.onclick = addMegaTemplate;
        toAdd.innerText = tmpText;
        toAdd.classList.add("w3-bar-item");
        toAdd.classList.add("w3-button");
        toAdd.href = "#";
        toAdd.id = "mega" + blockList[this.dataindex].src;
        document.getElementById("fromTemplate").appendChild(toAdd);
      }
    }
  }
  // numLoaded++;
  // document.getElementById("files").value = numLoaded;
  // if (numLoaded == maxToLoad) {
  //   allLoadingDone();
  // }
  for (let l in aLayers) {
    if ((aLayers[l].type == "block") && (aLayers[l].iNum == this.dataindex)) {
      if (!aLayers[l].width) aLayers[l].width = blockList[this.dataindex].obj.width;
      if (!aLayers[l].height) aLayers[l].height = blockList[this.dataindex].obj.height;
    }
  }
  drawProject();
}

var reloading = false;

function allLoadingDone(loadautosave) {
  document.getElementById("loadprogress").style.display = "none";
  document.getElementById("cmcanvas").style.display = "block";
  try {
    if (loadautosave) {
      loadFrom(JSON.parse(localStorage.getItem("autosave")), true);
    } else {
      drawProject();
    }
  } catch (error) {
    // no autosave file
  }
}

function loadFrom(saved, autoload) {
  // load autosave file
  reloading = true;
  unreloadable = false;
  let resize = false;
  let scale = {x:1, y:1, width:1, height:1};
  try {
    for (let layer of saved) {
      let ignore = ["type", "params"];
      let newLayer = {};
      switch (layer.type) {
        case "block":
        case "text":
        case "production":
        case "effect":
        case "line":
          if (layer.type == "block") {
            newLayer = addBlock(layer.iNum);
            ignore.push("iNum");
          } else if (layer.type == "text") {
            if (layer.filename  && !fontList[layer.font]) {
              // this font has not been reloaded
              loadFont(layer.filename);
            }
            newLayer = addTextBox(layer.data);
          // } else if (layer.type == "effect") {
          //   newLayer = addEffectBox();
          // } else if (layer.type == "line") {
          //   newLayer = addLine();
          } else {
            newLayer = type2FuncList[layer.type]();
          //   newLayer = addProduction();
          }

          for (let key in layer) {
            if (ignore.indexOf(key) != -1) continue;
            if (scale[key]) {
              newLayer[key] = scale[key] * layer[key];
            } else {
              newLayer[key] = layer[key];
            }
          }
          break;
        // case "group":
        //   addLayer(layer.name, layer);
        //   break;
        case "embedded":
          if (autoload) {unreloadable=true; break};
          if (layer.name) {
            addLayer(layer.name, layer);
          } else {
            addLayer("embed" + layer.iNum, layer);
          }
          break;

        case "webFile":
          reloadWebImage(layer.filename);
          layer.iNum = -1;
          addLayer("Web:" + layer.filename, layer);
          break;
        case "userFile":
          if (autoload) {unreloadable=true; break};
          layer.iNum = -1;
          addLayer("Local:" + layer.filename, layer);
          //newLayer = addUserFile(layer);
          break;
        case "base":
          newLayer = aLayers.dragdropdiv0;
          for (let key in layer) {
            if (ignore.indexOf(key) != -1) continue;
            newLayer[key] = layer[key];
            if (layer[key] == 1050) {
              if (confirm("Looks like data saved at old size. Do you want to automatically resize?")) {
                resize = true;
                newLayer.height = 1126;
                newLayer.width = 826;
                scale.x = 826 / 750;
                scale.width = scale.x;
                scale.y = 1126 / 1050;
                scale.height = scale.y;
                break;
              }
            }
          }
          break;

        default:
          window.alert("Invalid layer type:" + layer.type);
          break;
      }
      if (layer.name) {
        document.getElementById("layername" + (ddcount-1)).value = layer.name;
      }
    }
  } catch (error) {
  }
  if (unreloadable) window.alert("User local files not reloaded. You must do this manually.");
  reloading = false;
  drawProject();

}

type2FuncList.block = addBlock;

function addBlock(th) {
  let layer = {type:"block", name:"", iNum:0, x:0, y:0, width:0, height:0, params:"allimages"};
  let myIndex = 0;
  if ((typeof th == "string") || (typeof th == "number")) {
    myIndex = th;
  } else {
    myIndex = this.id.slice(5);
  }
  layer.iNum = Number(myIndex);
  let thisBlock = blockList[layer.iNum];
  if (thisBlock.otherbg) {
    layer.params += " " + thisBlock.otherbg;
    layer.obg = false;
  }
  if (blockDefaults[thisBlock.putUnder]) {
    layer.params += " allpreset";
  }
  
    // 🔁 Si c'est un bloc M€ (megacredit), ajouter une valeur par défaut
  if (thisBlock.src === "megacredit") {
    layer.data = "1"; // valeur visible
    layer.params += " value alltext"; // active champ data dans l'UI
  }
  
  
  // layer.width = thisBlock.obj.width;
  // layer.height = thisBlock.obj.height;
  let newLayer = addLayer(thisBlock.text, layer);
  
	// ✅ Applique le preset par défaut si défini (ex: "TR")
	if (thisBlock.default && thisBlock.putUnder && Array.isArray(blockDefaults[thisBlock.putUnder])) {
	  const presetList = blockDefaults[thisBlock.putUnder];
	  const match = presetList.find(p => p.label === thisBlock.default);
	  if (match) {
		for (let key in match) {
		  if (key !== "label") newLayer[key] = match[key];
		}
	  } else {
		console.warn(`Preset '${thisBlock.default}' non trouvé dans blockDefaults['${thisBlock.putUnder}']`);
	  }
	}
  
  
  if (thisBlock.obj) {

    if (!newLayer.width) newLayer.width = thisBlock.obj.width;
    if (!newLayer.height) newLayer.height = thisBlock.obj.height;
    drawProject();
  } else {
    fetchBlock(layer.iNum);
  }

  return newLayer;
}

function addMegaTemplate() {
  if (!confirm("All current data will be discarded. Continue?")) return;
  if (this.id.slice(0,4) != "mega") return;
  let mega = this.id.slice(4);
  if (!megaTemplates[mega]) return;
  document.getElementById("layerlist").innerHTML = "";
  ddcount = 0;
  aLayers = {};
  addLayer("Base",{type:"base", color:"#ffffff", height:1126, width:826, params:"color"});
  loadFrom(megaTemplates[mega].layers);
}

type2FuncList.text = addTextBox;

function addTextBox(th) {
  let layer = {type:"text", data:"", x:0, y:0, width:110, height:21,
              color: "#000000",
              font:"Prototype", style:"normal", weight:"normal", lineSpace:4, justify:"center",
              params:"allimages color alltext allpreset"};
  if ((typeof th == "string") || (typeof th == "number")) {
    layer.data = th;
  } else {
    layer.data = "Replace this text!";
  }
  let c = document.getElementById("cmcanvas");
  layer.x = Math.round(c.width/2);
  layer.y = Math.round(c.height/2);
  layer.width = c.width;
  let newLayer = addLayer("Text:" + layer.data.substr(0,10), layer);
  drawProject();
  return newLayer;
}

var mostRecentFile = {};
function addUserFile(th) {
  if (!th.value) return;
  try {
    let file = th.files[0];
    // Check if the file is an image.
    if (file.type && file.type.indexOf('image') === -1) {
      window.alert('File is not an image.');
      return;
    }
      // load a local file
      mostRecentFile = file;
      const reader = new FileReader();
      reader.addEventListener('load', function() {
        let newI = new Image();
        newI.onload = userImageLoaded;
        newI.src = reader.result;
        newI.crossOrigin = "Anonymous";
      });
      reader.readAsDataURL(file);

  } catch (error) {
    projectLoad = false;
    window.alert("Something went wrong loading file.")
  }
  th.value = "";
}

function getImageFromUrl(url, callback) {
  var img = new Image();
  img.setAttribute('crossOrigin', 'anonymous');
  img.onload = function (a) {
  var canvas = document.createElement("canvas");
  canvas.width = this.width;
  canvas.height = this.height;
  var ctx = canvas.getContext("2d");
  ctx.drawImage(this, 0, 0);

  var dataURI = canvas.toDataURL("image/jpg");

  // convert base64/URLEncoded data component to raw binary data held in a string
  var byteString;
  if (dataURI.split(',')[0].indexOf('base64') >= 0)
    byteString = atob(dataURI.split(',')[1]);
  else
    byteString = unescape(dataURI.split(',')[1]);

  // separate out the mime component
  var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

  // write the bytes of the string to a typed array
  var ia = new Uint8Array(byteString.length);
  for (var i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }

  return callback(new Blob([ia], { type: mimeString }));
  }

  img.src = url;
}

function loadInitialProject(url) {
  projectLoad = true;
  try {
      getImageFromUrl(url, function (blobImage) {
        const reader = new FileReader();
        reader.addEventListener('load', function() {
          let newI = new Image();
          newI.onload = userImageLoaded;
          newI.src = reader.result;
          newI.crossOrigin = "Anonymous";
        });
        reader.readAsDataURL(blobImage);
      });
  } catch (error) {
    projectLoad = false;
    window.alert("Something went wrong loading initial project." + error)
  }
}

var oLoadedProject;

function userImageLoaded() {
  // this = image object
  if (projectLoad) {
    // verify image is a project (we support)
    try {
      let c = document.getElementById("cmcanvas");
      let ctx = c.getContext("2d");
      // set canvas size to hold image
      c.width = this.width;
      c.height = this.height;
      // put image on canvas
      ctx.drawImage(this, 0, 0);
      oLoadedProject = this;

      // need to wait until canvas drawn
      setTimeout(function(){
        // now we can access the image
        let c = document.getElementById("cmcanvas");
        let ctx = c.getContext("2d");
        let imgData = ctx.getImageData(0,0,c.width,c.height);
        let tmp = "tm_cmV01";
        let p = 0;

        let ob = array2string(imgData.data, p, 8);
        if (ob.str != tmp) throw "project";
        p = ob.pos;

        // get image pos data
        ob = array2string(imgData.data, p, 0);
        let posStr = ob.str;
        p = ob.pos;

        // get layer data
        ob = array2string(imgData.data, p, 0);
        let layerStr = ob.str;
        //p = ob.pos;

        // parse pos data and extract images
        let pos=JSON.parse(posStr);
        // if (pos.length) window.alert("User files not yet supported. :(");
        let aCanvases = [];
        for (let i=0; i<pos.length; i++) {
          // draw images on new canvases, use canvas{i} for each
          // later we could retrieve 'i' if needed
          let cvs = document.createElement("CANVAS");
          cvs.id = "canvas" + i;
          cvs.width = pos[i].width;
          cvs.height = pos[i].height;
          let nctx = cvs.getContext("2d");
          nctx.drawImage(oLoadedProject, pos[i].x, pos[i].y, pos[i].width, pos[i].height, 0, 0, pos[i].width, pos[i].height);
          // add cvs to DOM (needed, I think, or they won't draw)
          //document.getElementById("xcanvases").appendChild(cvs);
          aCanvases.push(cvs);

          // TBD put canvases into a temporary array
          // when we first try to draw them, we will pull them out in the order they went in.

          // // use setTimeout to ensure image is drawn before we extract it
          // setTimeout(function (oCvs, num) {
          //   // oCvs is canvas object
          //   // num should match up with iNum of save layer
          //   userImageList[num] = oCvs.toDataURL("image/png");
          //   // disappear this canvas
          //   oCvs.style.display = "none";
          // },0,cvs, i);
          // TBD
        }

        // parse layer data
        let newLayers = JSON.parse(layerStr);
        for (let i=0; i < newLayers.length; i++) {
          // update dragdropdiv0 and remove that newLayer (if it existed)
          let layer;
          if ((newLayers[0].type == "base") && (aLayers["dragdropdiv0"])) {
            layer = aLayers["dragdropdiv0"];
            layer.width = newLayers[0].width;
            layer.height = newLayers[0].height;
            layer.color = newLayers[0].color;
            newLayers.shift();
          }
          // normally userFile cannot reload but here we have userFile data embedded
          // so change from userFile to embedded if needed
          if ((newLayers[i].type == "userFile") || (newLayers[i].type == "embedded")) {
            newLayers[i].iNum = userImageList.length;
            // set iNum above to point to canvas we add to userImageList below
            userImageList.push(aCanvases.shift());
            newLayers[i].type = "embedded";
          }
        }
        // load the rest of newLayers using loadFrom
        loadFrom(newLayers);
        projectLoad = false;
        // redraw project
        setTimeout(drawProject, 100);
      }, 50);


    } catch (error) {
      // end up here for a variety of reasons
      projectLoad = false;
      if (error == "project") {
        // doesn't look like a project file, or one we support
      } else {
        // probably a JSON parse error, just call it parse error
      }

    }


    // TBD
  } else {
    let layer = {type:"userFile", iNum:0,
      x:0, y:0, width:1, height:1,
      alpha:100,
      sx:0, sy:0, swidth:0, sheight:0, params:"allimages clipimages"};
    layer.iNum = userImageList.length;
    layer.filename = mostRecentFile.name;
    layer.width = this.width;
    layer.height = this.height;
    layer.swidth = this.width;
    layer.sheight = this.height;

    userImageList.push(this);
    let newLayer = addLayer("Local:" + layer.filename, layer);
    drawProject();
  }
}

function array2string(arr, aPos, len) {
  // convert part of array to string of length len(if len is 0, it is a zero terminated string)
  // start at array position pos
  let str = "";
  let pos = aPos;
  do {
    let n = 0;
    for (let j=0; j < 8; j++) {
      if (pos % 4 == 3) pos++;
      let v = arr[pos];
      if (v > 127) {
        n |= 1 << j;
      }
      pos++;
    }
    if (!n) break;
    str += String.fromCharCode(n);
  } while (str.length != len);
  return {str:str, pos:pos};
}

function string2array(str, arr, aPos, zeroTerminate) {
  // assume array is a image data array
  let pos=aPos;
  for (let i=0; i < str.length; i++) {
    for (let j=0; j < 8; j++) {
      if (pos % 4 == 3) pos++;
      arr[pos] = (str.charCodeAt(i) & (1 << j)) ? 0xff : 0;
      pos++;
    }
  }
  if (pos % 4 == 3) pos++;
  if (zeroTerminate) {
    for (let j=0; j < 8; j++) {
      if (pos % 4 == 3) pos++;
      arr[pos] = 0;
      pos++;
    }
  }
  return pos;
}

type2FuncList.production = addProduction;

function addProduction() {
  let layer = {type:"production", x:200, y:643, width:130, height:130,
              params:"allimages allpreset"};
  let newLayer = addLayer("Production", layer);
  let thisBlock = blockList[hiddenImage["prod_nxn"]];
  if (thisBlock.obj) {
    drawProject();
  } else {
    fetchBlock(hiddenImage["prod_nxn"]);
  }
  return newLayer;
}

type2FuncList.effect = addEffectBox;

function addEffectBox() {
  let layer = {type:"effect", x:600, y:300, width:400, height:300,
              params:"allimages allpreset"};
  let newLayer = addLayer("Effect Box", layer);
  drawProject();
  return newLayer;
}

function addEmbed() {
  let layer = {type:"embedded", iNum:-1,
    x:0, y:0, width:1, height:1,
    alpha:100,
    sx:0, sy:0, swidth:0, sheight:0, params:"allimages clipimages"};
  layer.iNum = userImageList.length;
  layer.filename = th.src;
  layer.width = th.width;
  layer.height = th.height;
  layer.swidth = th.width;
  layer.sheight = th.height;

  userImageList.push(th);
  let newLayer = addLayer("Web image", layer);

}

type2FuncList.line = addLine;

function addLine() {
  let layer = {type:"line", x:213, y:1005, width:2, angle:0, len:400, color:"#000000",
              opacity:1, params:"allangle alllen allpreset allcolor"};
  let newLayer = addLayer("Line", layer);
  drawProject();
  return newLayer;
}

function copyToClipboard() {
  let str = localStorage.getItem("autosave");
  const el = document.createElement('textarea');
  el.value = str;
  el.setAttribute('readonly', '');
  el.style.position = 'absolute';
  el.style.left = '-9999px';
  document.body.appendChild(el);
  el.select();
  document.execCommand('copy');
  document.body.removeChild(el);
};

function clickLoadFont() {
  let o = document.getElementById("fontoverlay");
  if (o.classList.contains("w3-nodisplay")) {
    o.classList.remove("w3-nodisplay");
    o.classList.add("w3-display");
  } else {
    o.classList.remove("w3-display");
    o.classList.add("w3-nodisplay");
  }
}

function loadSpecifiedFont() {
  let url = document.getElementById("fonturl2load").value;

  let o = document.getElementById("fontoverlay");
  o.classList.remove("w3-display");
  o.classList.add("w3-nodisplay");

  loadFont(url);
}

function loadFont(url) {
  // <link href="https://fonts.googleapis.com/css2?family=Turret+Road:wght@400;700;800&display=swap" rel="stylesheet">
  // <link href="https://fonts.googleapis.com/css2?family=Turret+Road&display=swap" rel="stylesheet">

  if (!url.startsWith("http")) {
    let httpPos = url.indexOf('http');
    if (httpPos > 0) {
      // assume url enclosed on double or single quotes
      // extract url start from http, end at char before close quote
      url = url.slice(httpPos, url.indexOf(url.charAt(httpPos-1),httpPos));
    }
  }
  let domLink = document.createElement("link");
  domLink.href = url;
  domLink.rel = "stylesheet";
  document.body.appendChild(domLink);

  // <span style="float: right;">Font:<select id="inputfont" type="select" onchange="updateValue(this)">
  // <option value="Prototype" style="font-family: Prototype;" default>Prototype</option>
  let fontName = url.slice(url.indexOf('family=')+7);
  fontName = fontName.replace(/["&]/g,":"); // change " or & to :
  fontName = fontName.slice(0,fontName.indexOf(":")); // now use : to find end of name
  fontName = fontName.replace(/[+]/g, " ");
  let domOpt = document.createElement("option");
  domOpt.value = fontName;
  domOpt.style.fontFamily = fontName;
  domOpt.innerText = fontName;
  fontList[fontName] = url;

  domInputfont.appendChild(domOpt);

  return;
}

function clickLoadWebImage() {
  let o = document.getElementById("overlay");
  if (o.classList.contains("w3-nodisplay")) {
    o.classList.remove("w3-nodisplay");
    o.classList.add("w3-display");
  } else {
    o.classList.remove("w3-display");
    o.classList.add("w3-nodisplay");
  }
}

function loadWebImage() {
  let url = document.getElementById("url2load").value;
  let img = new Image();
  img.onload = function () {
      webImageLoaded(img);
  };
  img.src = url;
  img.crossOrigin = "Anonymous";
  let o = document.getElementById("overlay");
  o.classList.remove("w3-display");
  o.classList.add("w3-nodisplay");
}

function webImageLoaded(th) {
  // th = image object
  let layer = {type:"webFile", iNum:0,
    x:0, y:0, width:1, height:1,
    alpha:100,
    sx:0, sy:0, swidth:0, sheight:0, params:"allimages clipimages"};
  layer.iNum = userImageList.length;
  layer.filename = th.src;
  layer.width = th.width;
  layer.height = th.height;
  layer.swidth = th.width;
  layer.sheight = th.height;

  userImageList.push(th);
  let newLayer = addLayer("Web image", layer);
  drawProject();
}

function reloadWebImage(url) {
  let img = new Image();
  img.onload = function () {
      webImageReloaded(img);
  };
  img.src = url;
  img.crossOrigin = "Anonymous";
}

function webImageReloaded(th) {
  // th = image object
  let iNum = userImageList.length;
  userImageList.push(th);

  for (let l in aLayers) {
    let thisLayer = aLayers[l];
    if ((thisLayer.type == "webFile") && (thisLayer.filename == th.src)) {
      if (thisLayer.iNum == -1) {
        thisLayer.iNum = iNum;
      }
    }
  }

  drawProject();
}

function cancelOverlay() {
  let o = document.getElementById("overlay");
  o.classList.remove("w3-show");
  o.classList.add("w3-hide");
}

function cancelFontOverlay() {
  let o = document.getElementById("fontoverlay");
  o.classList.remove("w3-show");
  o.classList.add("w3-hide");
}

function clickNew() {
  if (confirm("Delete current work and start fresh?")) resetProject(false);
}

function clickLoadNewProject() {
  if (confirm("Delete current work and start fresh?")) {
    resetProject(false);
    clickLoadProject();
  }
}

var extraRows = 0;
var oldHeight = 0;

var projectLoad = false;

function clickLoadProject() {
  projectLoad = true;
  // following click eventually runs addUserFile()
  document.getElementById('fileselection').click();
}

function projectDataToJson(data) {
  let jsonStr = JSON.stringify(data)
  return jsonStr.replace(/[\u007F-\uFFFF]/g, function(chr) {
    return "\\u" + ("0000" + chr.charCodeAt(0).toString(16)).substr(-4)
  })
}

function clickSaveProject() {
  // make array of user images
  let layerDivs = document.getElementsByClassName("divRec");
  let imagesForSaving = [];
  for (let i=0; i < layerDivs.length; i++) {
    let layer = aLayers[layerDivs[i].id];
    if ((layer.type != "userFile") && (layer.type != "embedded")) continue;
    imagesForSaving.push(userImageList[layer.iNum]);
  }
  // if no images, assume canvas of 200x200
  let imgData = {container:{width:200,height:200}, pos:[]};
  // if 1+ image, run fitImages and assume canvas of max(height,200) x max(width,200);
  if (imagesForSaving.length) {
    imgData = fitImages(imagesForSaving, 200);
    if (imgData.container.width < 200) imgData.container.width=200;
    if (imgData.container.height < 200) imgData.container.height=200;
    for (let i=0; i < imagesForSaving.length; i++) {
      imgData.pos[i].width = imagesForSaving[i].width;
      imgData.pos[i].height = imagesForSaving[i].height;
    }
  }
  // determine number of extra rows, add this value to all pos.y values returned from fitImages
  // currently our storeage is 2 bytes per pixel (4 worked but BGG does something that ruins it)
  let posStr = projectDataToJson(imgData.pos);
  extraRows = Math.ceil(8 + (lastAutoSave.length + posStr.length + 10) / .375 / imgData.container.width);
  for (let i=0; i < imgData.pos.length; i++) {
    imgData.pos[i].y += extraRows;
  }
  posStr = projectDataToJson(imgData.pos);
  // NOTE: we are making the not so crazy judgement that changing the pos.y data will not increase
  //  posStr by much and certainly nothing near the minimum 600+ bytes
  //  (8 extra height * 200 (min) * .375 byte per pixel) we have available.
  // make canvas assumed.height+extrarows x assumed.width
  let c = document.getElementById("cmcanvas");
  let ctx = c.getContext("2d");
  c.height = imgData.container.height + extraRows;
  c.width = imgData.container.width;

  // insert JSON and other data
  let tmp = "tm_cmV01";
  let imgPlus = ctx.createImageData(imgData.container.width, extraRows);
  imgPlus.data.fill(255);
  let p = 0;
  // insert our 8 byte signature
  p = string2array(tmp,imgPlus.data,p,false);
  // insert image pos data
  p = string2array(posStr, imgPlus.data, p, true);
  // insert layer info
  p = string2array(lastAutoSave, imgPlus.data, p, true);
  // and put that onto the canvas
  ctx.putImageData(imgPlus, 0, 0);

  // insert images at their pos.x/y locations
  for (let i=0; i < imgData.pos.length; i++) {
    let layer = imagesForSaving[i];
    let pos = imgData.pos[i];
    ctx.drawImage(layer,pos.x,pos.y);
  }

  // allow time for drawing then prompt for save
  setTimeout(saveProjectCont,100, true) ;


  // figure out how much extra height we need (assume UTF-8)
  // oldHeight = h;
  // c.height = h+extraRows;
  // drawProject(true);
}

function saveProjectCont(need2wait) {
  let c = document.getElementById("cmcanvas");
  
  //nom automatique
  
  // Cherche l'ID alphanumérique dans les calques
	let id = Object.values(aLayers).find(l =>
	  l.type === "text" &&
	  l.data &&
	  l.data.match(/^([A-Z]\d{2}|\d{3})$/)
	)?.data || "card";

  // Génère le nom de fichier
  let filename = id + ".png";



  let projectlink = document.getElementById('projectlink');
  //projectlink.setAttribute('download', 'cardMaker.png');
  projectlink.setAttribute('download', filename);
  projectlink.setAttribute('href', c.toDataURL("image/png").replace("image/png", "image/octet-stream"));
  projectlink.click();
  if (need2wait) saveDone();
}

function saveDone() {
  let ans = confirm("Click when done.");
  if (ans || !ans) {
      let c = document.getElementById("cmcanvas");
    c.height = c.height-extraRows;
    extraRows = 0;
    drawProject();

  }
}

function groupModeToggle() {
  let c = document.getElementsByClassName("groupcheck");
  for (let l=0; l < c.length; l++) {
    if (document.getElementById("groupmode").checked) {
      // turn on group check box
      c[l].classList.add("w3-show-inline-block");
      c[l].classList.remove("w3-hide");
      // make sure they are all unchecked
      c[l].checked = false;
    } else {
      c[l].classList.remove("w3-show-inline-block");
      c[l].classList.add("w3-hide");
      // make sure they are all unchecked
      c[l].checked = false;
    }
  }
}

// function clickMakeGroup() {
//   let c = document.getElementsByClassName("groupcheck");
//   let ch = [];
//   let gap = false;
//   for (let l=0; l < c.length; l++) {
//     if (c[l].checked) {
//       if (gap) {
//         // only true is found checked box after unchecked box after checked box
//         window.alert("Error:Group layers must be contiguous.");
//         return;
//       } else {
//         ch.push(c[l].parentNode.id);
//       }
//     } else if (ch.length) {
//       gap = true; // found unchecked box after checked box
//     }
//   }
//   if (ch.length < 2) return;
//   // make ch into a group
//   let layer = {type:"group", name:"", groupNum:0, params:""};
//   layer.groupNum = groupList.length;
//   layer.name = "Group:" + layer.groupNum;
//   let newLayer = addLayer("Group:" + layer.groupNum, layer);
//   for (let l=0; l < ch.length; l++) {
//     aLayers[ch[l]].group = layer.groupNum;
//   }

//   return newLayer;
// }

// function clickUngroup() {

// }

// Accordion
function myAccFunc(acc) {
  removeKeyInputFocus()
  var x = document.getElementById(acc);
  if (x.classList.contains("w3-hide")) {
    x.classList.remove("w3-hide");
    // if any div siblings are showing, hide them
    let showDivs = x.parentNode.getElementsByClassName("w3-show");
    for (let x=showDivs.length-1; x >= 0; x--) {

      showDivs[x].classList.add("w3-hide");
      showDivs[x].classList.remove("w3-show");
    }
    x.classList.add("w3-show");
  } else {
    x.classList.add("w3-hide");
    x.classList.remove("w3-show");
  }
}

// Open and close sidebar
function w3_open() {
  document.getElementById("mySidebar").style.display = "block";
  document.getElementById("myOverlay").style.display = "block";
}

function w3_close() {
  document.getElementById("mySidebar").style.display = "none";
  document.getElementById("myOverlay").style.display = "none";
}

// drag/drop stuff
function sortable(section, onUpdate){
  var dragEl, nextEl, newPos;
  var dragRect;

  let oldPos = [...section.children].map(item => {
    if (item.id != "dragdropdiv0") item.draggable = true;
    let pos = document.getElementById(item.id).getBoundingClientRect();
    // let pos = item.getBoundingClientRect();
    return pos;
  });

  function _onDragOver(e){

      let selectedDoms = document.getElementsByClassName("selected");
      for (let i=selectedDoms.length-1; i >= 0; i--) {
        selectedDoms[i].removeChild(domParams);
        selectedDoms[i].classList.remove("selected");
      }
      e.preventDefault();
      e.dataTransfer.dropEffect = 'move';

      var target = e.target;
      if( target && target !== dragEl && target.nodeName == 'DIV' ){
        if(target.classList.contains('inside')) {
          e.stopPropagation();
        } else {
          //getBoundingClientRect contains location-info about the element (relative to the viewport)
          var targetPos = target.getBoundingClientRect();
          // if dragging higher, put element before target
          // if dragging lower, put element after target (i.e. before target.nextSibling)
          if (targetPos.top < dragRect.top) {
            if (target.id == "dragdropdiv0") return;
            section.insertBefore(dragEl, target);
          } else {
            section.insertBefore(dragEl, target.nextSibling);
          }

        }
      }
  }

  function _onDragEnd(evt){
      evt.preventDefault();
      newPos = [...section.children].map(child => {
           let pos = document.getElementById(child.id).getBoundingClientRect();
          //  let pos = child.getBoundingClientRect();
           return pos;
         });
      dragEl.classList.remove('ghost');
      section.removeEventListener('dragover', _onDragOver, false);
      section.removeEventListener('dragend', _onDragEnd, false);

      nextEl !== dragEl.nextSibling ? onUpdate(dragEl) : false;

      drawProject();
  }

    section.addEventListener('dragstart', function(e){
      dragEl = e.target;
      dragRect = dragEl.getBoundingClientRect();
      nextEl = dragEl.nextSibling;

      e.dataTransfer.effectAllowed = 'move';
      e.dataTransfer.setData('Text', dragEl.textContent);

      section.addEventListener('dragover', _onDragOver, false);
      section.addEventListener('dragend', _onDragEnd, false);

      setTimeout(function (){
          dragEl.classList.add('ghost');
      }, 0)

  });
}

function getMousePos(event) {
    let c = document.getElementById("cmcanvas");
    var rect = c.getBoundingClientRect();
    return {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top
    };
}

function dragStart(event) {
    var mouse = getMousePos(event);

    // Collision detection between clicked offset and element.
    let layerDivs = document.getElementsByClassName("divRec");
    for (let i=layerDivs.length - 1; i >= 0; i--) {
      let layer = aLayers[layerDivs[i].id];
      if (clickIsWithinLayer(layer, mouse.x, mouse.y)) {
        selectLayer();
        layerToDrag = layer;
        focusKeyInput(layer);
        dragOffsetX = layer.x - mouse.x;
        dragOffsetY = layer.y - mouse.y;
        return;
      }
    }
}

// Check to see if the given coordinates are within the specified layer
//
// Block objects are anchored at the upper left, and may contain
// transparent areas:
//
//    O-----------+
//    |     .     |
//    |   .....   |
//    | ......... |
//    | ......... |
//    | ......... |
//    |   .....   |
//    |     .     |
//    +-----------+
//
// For these sorts of layers, we can first check to see whether the
// point is within the bounding rectangle, and then check to see if
// the pixel under the point is transparent or not.
//
// Text layers do not lie within their bounding box. The width
// of the bounding box is used to determine where text should wrap,
// and the height of the bounding box controls the font size. The
// anchor is on the baseline of the text. Text layers therefore
// look something like this:
//
// Left-justified:
//
//                     THIS IS SOME TEXT
//                     O--------------------+
//                     +--------------------+
//
// Centered:
//
//             THIS IS SOME TEXT
//                     O--------------------+
//                     +--------------------+
//
// Right-justified:
//
//    THIS IS SOME TEXT
//                     O--------------------+
//                     +--------------------+
//
// Multi-line text layers will vertically overlap with the
// bounding box on the second line only, with the third and
// subsequent lines lying below the bounding box. To do hit
// testing on text, then, we replicate the word-wrapping
// algorithm and calculate a bounding rectangle for each line
// individually, checkin each one until a hit is found.
//
// For all other layer types, the bounding box is used as specified.
function clickIsWithinLayer(layer, x, y) {
  let c = document.getElementById("cmcanvas");
  let ctx = c.getContext("2d");

  // Check to see if we are inside the text bounding box of a text layer
  // n.b. Text is rendered just above the bounding box (bug?).
  if (layer.type == 'text') {
    return clickIsWithinText(layer, x - layer.x, (y - layer.y) + layer.height);
  }

  // If the x,y is not inside the bounding box, then it's definitely a miss
  if (y < layer.y || y > layer.y + layer.height
          || x < layer.x || x > layer.x + layer.width) {
    return false;
  }

  // If the click hits a transparent area, then count it as a miss
  if (clickIsWithinTransparentArea(layer, x - layer.x, y - layer.y)) {
    return false;
  }

  // If the click hasn't been found to be outside the area, then it is inside.
  return true;
}

function clickIsWithinTransparentArea(layer, x, y) {
  if ((layer.type != "block") || (!blockList[layer.iNum].obj.complete)) {
    console.log(layer);
    return false;
  }

  try {
    var ctx = document.createElement("canvas").getContext("2d");
    ctx.drawImage(blockList[layer.iNum].obj, 0, 0, layer.width, layer.height);
    alpha = ctx.getImageData(x, y, 1, 1).data[3]; // [0]R [1]G [2]B [3]A

    return alpha === 0;
  } catch (error) {
    // https://stackoverflow.com/questions/16217521/i-get-a-canvas-has-been-tainted-error-in-chrome-but-not-in-ff/16218015#16218015
    return false;
  }
}

// This function is a copy of the text-wrapping algorithm in drawProject()
function clickIsWithinText(layer, x, y) {
  if (y < 0) {
    return false;
  }
  text = layer.data
  let c = document.getElementById("cmcanvas");
  let ctx = c.getContext("2d");
  let lines = text.split("\n");
  let cnt = 0;
  for (var ln=0; ln < lines.length; ln++) {
    let spl = lines[ln].split(" ");
    let o = "";
    while (spl.length) {
      o = spl.shift();
      while (spl.length && (ctx.measureText(o + " " + spl[0]).width < layer.width)) {
        o += " " + spl.shift();
      }
      cnt++;
      lineWidth = ctx.measureText(o).width;
      if (y < ((layer.height + layer.lineSpace) * cnt)) {
        if (layer.justify == "center") {
          x = x + (lineWidth / 2);
        }
        if (layer.justify == "right") {
          x = x + lineWidth;
        }

        return (x > 0) && (x < lineWidth);
      }
    }
  }
}

function dragEnd(event) {
  layerToDrag = null;
}

function drag(event) {
  var mouse = getMousePos(event)
  var x = mouse.x + dragOffsetX,
      y = mouse.y + dragOffsetY;

  if (layerToDrag != null) {
      layerToDrag.x = x;
      layerToDrag.y = y;
      drawProject();
  }
}

function focusKeyInput(layer) {
  keyFocusLayer = layer;
  document.addEventListener("keydown", moveLayerWithKey, false);
}

function removeKeyInputFocus() {
  keyFocusLayer = null;
  document.removeEventListener("keydown", moveLayerWithKey, false);
}

function moveLayerWithKey(event) {
  if (keyFocusLayer != null) {
    aspectRatio = keyFocusLayer.height / keyFocusLayer.width;
    delta = getMoveDeltas(event, aspectRatio)
    if (delta.x || delta.y || delta.w || delta.h) {
      if (keyFocusLayer.type == "text") {
        if (event.altKey) {
          delta.x = 0;
          delta.y = 0;
          if ((event.key == "ArrowUp") || (event.key == "ArrowDown")) {
            // Do not adjust the width for alt up / down, only change the font size
            delta.w = 0;
            delta.h = 2 * Math.sign(delta.h);
            delta.y = delta.h
          } else {
            // Do not adjust the height for alt left / right, only change the width (wrap point)
            delta.h = 0;
          }
        }
      }
      newX = keyFocusLayer.x + delta.x;
      newY = keyFocusLayer.y + delta.y;
      newWidth = keyFocusLayer.width + delta.w;
      newHeight = keyFocusLayer.height + delta.h;
      if (((newWidth >= 8) && (newHeight >=8)) || (delta.w > 0)) {
        keyFocusLayer.x = newX;
        keyFocusLayer.y = newY;
        keyFocusLayer.width = newWidth;
        keyFocusLayer.height = newHeight;
        drawProject();
      }
      event.preventDefault();
    }
  }
}

function getMoveDeltas(event, aspectRatio) {
    var delta = {
      x: 0,
      y: 0,
      w: 0,
      h: 0
    };

    // One pixel if shift is up, 1/12" if shift is down
    magnitude = 1;
    if (event.shiftKey) {
      magnitude = 25;
    }

    // Set the directions based on the key
    switch (event.key) {
      case "ArrowRight":
        delta.x = magnitude;
        break;
      case "ArrowLeft":
        delta.x = -magnitude;
        break;
      case "ArrowUp":
        delta.y = -magnitude;
        break;
      case "ArrowDown":
        delta.y = magnitude;
        break;
    }

    // If alt is down, convert movement into resize
    if (event.altKey) {
      var centered = (delta.y != 0);
      delta.w = delta.x - (2 * delta.y);
      delta.h = delta.w * aspectRatio;
      delta.x = 0;
      delta.y = 0;
      if (centered) {
        delta.x = -delta.w / 2;
        delta.y = -delta.h / 2;
      }
    }
    return delta;
}

function getParameterByName(name, url = window.location.href) {
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

var projectUrl = getParameterByName('project')
let str = localStorage.getItem("loadedProjectUrl");
if (projectUrl && projectUrl != "") {
  localStorage.setItem("loadedProjectUrl", projectUrl);
  // Redirect without the query parameters now that they are stored in local
  // storage, so that they do not cause problems e.g. on reload or "new".
  window.location.assign(location.protocol + '//' + location.host + location.pathname);
} else if (str && str != "") {
  resetProject(false);
  loadInitialProject(str)
} else {
  resetProject(true);
}

var elem = document.getElementById('cmcanvas'),
    elemLeft = elem.offsetLeft + elem.clientLeft,
    elemTop = elem.offsetTop + elem.clientTop;

// Add event listener for `drag` events.
elem.addEventListener("mousedown", dragStart, false);
elem.addEventListener("mouseup", dragEnd, false);
elem.addEventListener("mousemove", drag, false);

// Active le menu contextuel personnalisé sur clic droit
elem.addEventListener("contextmenu", onCanvasRightClick, false);

function onCanvasRightClick(event) {
  event.preventDefault(); // empêche le menu contextuel du navigateur

  const mouse = getMousePos(event);
  const layerDivs = document.getElementsByClassName("divRec");

  for (let i = layerDivs.length - 1; i >= 0; i--) {
    const layer = aLayers[layerDivs[i].id];
    if (clickIsWithinLayer(layer, mouse.x, mouse.y)) {
      if (event.ctrlKey || event.metaKey) {
		  toggleLayerSelection(layerDivs[i].id);
		} else {
		  clearLayerSelection();
		  selectLayer.call(layerDivs[i].children[0]);
		  selectedLayers = [layerDivs[i].id];
		}
      // ✅ Si plusieurs calques sélectionnés → menu groupe
      if (selectedLayers.length > 1) {
        showGroupContextMenu(event.clientX, event.clientY);
      } else {
        showPresetDropdown(layer, event.clientX, event.clientY, layerDivs[i].id);
      }
      return;
    }
  }
}

function showPresetDropdown(layer, x, y, layerId) {
  removePresetDropdown();

  // 🔧 Crée le conteneur principal
  const container = document.createElement("div");
  container.id = "contextMenuContainer";
  container.style.position = "fixed";
  container.style.left = `${x}px`;
  container.style.top = `${y}px`;
  container.style.zIndex = 1000;
  container.style.background = "#fff";
  container.style.border = "1px solid #888";
  container.style.padding = "8px";
  container.style.boxShadow = "2px 2px 6px rgba(0,0,0,0.3)";
  container.style.fontSize = "14px";

  // 🔽 Dropdown des presets
  const dropdown = document.createElement("select");
  dropdown.style.width = "100%";
  dropdown.style.fontSize = "16px";

  let dName = "";
  if (layer.type === "block") {
    dName = blockList[layer.iNum]?.putUnder;
  } else if (layer.type === "text") {
    dName = "text";
  } else if (layer.type === "production") {
    dName = "production";
  }

  if (!blockDefaults[dName]) return;

  const defaultList = blockDefaults[dName];

  const defaultOption = document.createElement("option");
  defaultOption.text = "⮕ Choisir un preset";
  defaultOption.value = "";
  dropdown.appendChild(defaultOption);

  defaultList.forEach((preset, index) => {
    const option = document.createElement("option");
    option.text = preset.label;
    option.value = index;
    dropdown.appendChild(option);
  });

  dropdown.addEventListener("change", (e) => {
    if (e.target.value !== "") {
      const sel = Number(e.target.value);
      reloading = true;
      for (let key in defaultList[sel]) {
        if (key === "label") continue;
        const input = document.getElementById("input" + key);
        if (input) {
          input.value = defaultList[sel][key];
          updateValue(input);
        } else {
          aLayers[layerId][key] = defaultList[sel][key];
        }
      }
      reloading = false;
      drawProject();
      removePresetDropdown();
    }
  });

  container.appendChild(dropdown);

	// ✏️ Si c’est un texte OU un bloc avec champ texte (M€), afficher un champ de modification
	if (
	  (layer.type === "text") ||
	  (layer.type === "block" && typeof layer.data === "string" && layer.params?.includes("alltext"))
	) {
	  const textInput = document.createElement("input");
	  textInput.type = "text";
	  textInput.value = layer.data || "";
	  textInput.style.width = "100%";
	  textInput.style.marginBottom = "6px";
	  textInput.style.fontSize = "16px";

	  textInput.addEventListener("keydown", (e) => {
		if (e.key === "Enter") {
		  aLayers[layerId].data = textInput.value;
		  drawProject();
		  removePresetDropdown();
		}
	  });

	  textInput.addEventListener("blur", () => {
		aLayers[layerId].data = textInput.value;
		drawProject();
		removePresetDropdown();
	  });

	  container.appendChild(textInput);
	}


  // 🔁 Bouton "Dupliquer"
  const btnClone = document.createElement("button");
  btnClone.textContent = "Dupliquer";
  btnClone.style.display = "block";
  btnClone.style.marginTop = "6px";
  btnClone.onclick = () => {
    const newLayer = structuredClone(aLayers[layerId]);
    newLayer.x += 20;
    newLayer.y += 20;
    addLayer("Clone", newLayer);
    drawProject();
    removePresetDropdown();
  };
  container.appendChild(btnClone);

  // 🗑️ Bouton "Supprimer"
  const btnDelete = document.createElement("button");
  btnDelete.textContent = "Supprimer";
  btnDelete.style.display = "block";
  btnDelete.style.marginTop = "4px";
  btnDelete.style.color = "white";
  btnDelete.style.backgroundColor = "#c00";
  btnDelete.onclick = () => {
    document.getElementById(layerId)?.remove();
    delete aLayers[layerId];
    drawProject();
    removePresetDropdown();
  };
  container.appendChild(btnDelete);

  // 🔄 Bouton "Remplacer"
  const btnReplace = document.createElement("button");
  btnReplace.textContent = "Remplacer";
  btnReplace.style.display = "block";
  btnReplace.style.marginTop = "4px";
  btnReplace.onclick = () => {
	  
	// ⛔️ Suspend l'écoute temporairement
	document.removeEventListener("click", clickOutsidePresetDropdown);
    // 📦 Remplace le menu
	openReplacementMenu(aLayers[layerId], layerId, container);
	// ✅ Réactive après un cycle
	setTimeout(() => {
		document.addEventListener("click", clickOutsidePresetDropdown);
	  }, 0);
	};
  container.appendChild(btnReplace);

  document.body.appendChild(container);
	setTimeout(() => {
	document.addEventListener("click", clickOutsidePresetDropdown);
}, 0);
}

function removePresetDropdown() {
  const existing = document.getElementById("contextMenuContainer");
  if (existing) {
    existing.remove();
    document.removeEventListener("click", clickOutsidePresetDropdown);
  }
}

function clickOutsidePresetDropdown(e) {
  const container = document.getElementById("contextMenuContainer");
  if (container && !container.contains(e.target)) {
    removePresetDropdown();
  }
}

function openReplacementMenu(oldLayer, layerId, container) {
  if (!("iNum" in oldLayer) || ["userFile", "webFile", "embedded", "base"].includes(oldLayer.type)) {
    container.innerHTML = "<div style='color:#900;'>Ce type d’élément ne peut pas être remplacé.</div>";
    return;
  }

  container.innerHTML = "";

  const info = document.createElement("div");
  info.textContent = "Choisir un remplacement :";
  info.style.marginBottom = "6px";
  container.appendChild(info);

  const select = document.createElement("select");
  select.style.width = "100%";

  const currentType = blockList[oldLayer.iNum]?.putUnder || "Autres";

  // 1. Ajouter d’abord les éléments du même type sans optgroup
  const sameTypeOptions = blockList
    .map((block, i) => ({ ...block, iNum: i }))
    .filter(b => b.putUnder === currentType && !b.hidden);

  sameTypeOptions.forEach(b => {
    const opt = document.createElement("option");
    opt.value = b.iNum;
    opt.text = `🔁 ${b.text || b.src || `[iNum ${b.iNum}]`}`;
    select.appendChild(opt);
  });

  // 2. Ajouter les autres types regroupés par catégorie
  const categorized = {};

  blockList.forEach((block, i) => {
    if (block.hidden) return;
    if (block.putUnder === currentType) return; // déjà dans les premiers
    const cat = block.putUnder || "Autres";
    if (!categorized[cat]) categorized[cat] = [];
    categorized[cat].push({ ...block, iNum: i });
  });

  Object.keys(categorized).sort().forEach(cat => {
    const group = document.createElement("optgroup");
    group.label = cat;
    categorized[cat].forEach(b => {
      const opt = document.createElement("option");
      opt.value = b.iNum;
      opt.text = b.text || b.src || `[iNum ${b.iNum}]`;
      group.appendChild(opt);
    });
    select.appendChild(group);
  });

  container.appendChild(select);

  // ✅ Remplacement immédiat à la sélection
  select.value = oldLayer.iNum;
  select.addEventListener("change", () => {
    const newINum = parseInt(select.value);
    if (isNaN(newINum)) return;

    const index = Array.from(document.getElementById("layerlist").children)
      .findIndex(div => div.id === layerId);

    const newLayer = {
      ...structuredClone(oldLayer),
      iNum: newINum
    };

    delete aLayers[layerId];
    document.getElementById(layerId).remove();

    const newDiv = addLayer(blockList[newINum].text, newLayer);
    const list = document.getElementById("layerlist");
    list.insertBefore(list.lastChild, list.children[index + 1]);

    drawProject();
    removePresetDropdown();
  });
}


//Fermeture du echap
function handleEscapeClose(e) {
  if (e.key === "Escape") {
    removePresetDropdown();
  }
}

function handleGlobalShortcuts(e) {
  const isMac = navigator.platform.toUpperCase().indexOf("MAC") >= 0;
  const ctrlOrCmd = isMac ? e.metaKey : e.ctrlKey;

  // Ctrl + D (dupliquer calque sélectionné)
  if (ctrlOrCmd && e.key.toLowerCase() === "d") {
    e.preventDefault(); // empêche le favori du navigateur

    const selected = [...document.getElementsByClassName("divRec")]
      .find(div => div.classList.contains("selected"));

    if (!selected) return;

    const id = selected.id;
    const layer = aLayers[id];
    if (!layer) return;

    const newLayer = structuredClone(layer);
    newLayer.x += 0;
    newLayer.y += 20;

    const newDiv = addLayer("Clone", newLayer);
    drawProject();
  }
}

function toggleLayerSelection(id) {
  const div = document.getElementById(id);
  if (selectedLayers.includes(id)) {
    selectedLayers = selectedLayers.filter(l => l !== id);
    div.classList.remove("selected");
  } else {
    selectedLayers.push(id);
    div.classList.add("selected");
  }
}

function clearLayerSelection() {
  selectedLayers.forEach(id => {
    document.getElementById(id)?.classList.remove("selected");
  });
  selectedLayers = [];
}

function showGroupContextMenu(x, y) {
  removePresetDropdown(); // Réutilise le système existant

  const container = document.createElement("div");
  container.id = "contextMenuContainer";
  container.style.position = "fixed";
  container.style.left = `${x}px`;
  container.style.top = `${y}px`;
  container.style.zIndex = 1000;
  container.style.background = "#fff";
  container.style.border = "1px solid #888";
  container.style.padding = "8px";
  container.style.boxShadow = "2px 2px 6px rgba(0,0,0,0.3)";
  container.style.fontSize = "14px";

  const title = document.createElement("div");
  title.textContent = "Aligner les éléments :";
  title.style.marginBottom = "6px";
  container.appendChild(title);

  const alignments = [
    { label: "Gauche", fn: alignLeft },
    { label: "Centre horizontal", fn: alignCenterX },
    { label: "Droite", fn: alignRight },
    { label: "Haut", fn: alignTop },
    { label: "Milieu vertical", fn: alignCenterY },
    { label: "Bas", fn: alignBottom }
  ];

  alignments.forEach(a => {
    const btn = document.createElement("button");
    btn.textContent = a.label;
    btn.style.display = "block";
    btn.style.marginBottom = "4px";
    btn.onclick = () => {
      a.fn();
      drawProject();
      removePresetDropdown();
    };
    container.appendChild(btn);
  });
  
	const distLabel = document.createElement("div");
	distLabel.textContent = "Distribuer les éléments :";
	distLabel.style.marginTop = "10px";
	distLabel.style.marginBottom = "6px";
	container.appendChild(distLabel);

	const btnDistH = document.createElement("button");
	btnDistH.textContent = "Distribuer horizontalement";
	btnDistH.style.display = "block";
	btnDistH.style.marginBottom = "4px";
	btnDistH.onclick = () => {
	  distributeHorizontally();
	  drawProject();
	  removePresetDropdown();
	};
	container.appendChild(btnDistH);

	const btnDistV = document.createElement("button");
	btnDistV.textContent = "Distribuer verticalement";
	btnDistV.style.display = "block";
	btnDistV.onclick = () => {
	  distributeVertically();
	  drawProject();
	  removePresetDropdown();
	};
	container.appendChild(btnDistV);


  document.body.appendChild(container);
  setTimeout(() => {
    document.addEventListener("click", clickOutsidePresetDropdown);
  }, 0);
}

function alignLeft() {
  const xMin = Math.min(...selectedLayers.map(id => aLayers[id].x));
  selectedLayers.forEach(id => aLayers[id].x = xMin);
}

function alignCenterX() {
  const centers = selectedLayers.map(id => aLayers[id].x + aLayers[id].width / 2);
  const target = centers.reduce((a, b) => a + b) / centers.length;
  selectedLayers.forEach(id => aLayers[id].x = target - aLayers[id].width / 2);
}

function alignRight() {
  const xMax = Math.max(...selectedLayers.map(id => aLayers[id].x + aLayers[id].width));
  selectedLayers.forEach(id => aLayers[id].x = xMax - aLayers[id].width);
}

function alignTop() {
  const yMin = Math.min(...selectedLayers.map(id => aLayers[id].y));
  selectedLayers.forEach(id => aLayers[id].y = yMin);
}

function alignCenterY() {
  const centers = selectedLayers.map(id => aLayers[id].y + aLayers[id].height / 2);
  const target = centers.reduce((a, b) => a + b) / centers.length;
  selectedLayers.forEach(id => aLayers[id].y = target - aLayers[id].height / 2);
}

function alignBottom() {
  const yMax = Math.max(...selectedLayers.map(id => aLayers[id].y + aLayers[id].height));
  selectedLayers.forEach(id => aLayers[id].y = yMax - aLayers[id].height);
}

function distributeHorizontally() {
  if (selectedLayers.length < 3) return;

  const layers = selectedLayers.map(id => aLayers[id]);
  layers.sort((a, b) => a.x - b.x);

  const left = layers[0].x;
  const right = Math.max(...layers.map(l => l.x + l.width));
  const totalWidth = layers.reduce((acc, l) => acc + l.width, 0);
  const space = (right - left - totalWidth) / (layers.length - 1);

  let currentX = left;
  for (let i = 0; i < layers.length; i++) {
    layers[i].x = Math.round(currentX);
    currentX += layers[i].width + space;
  }
}

function distributeVertically() {
  if (selectedLayers.length < 3) return;

  const layers = selectedLayers.map(id => aLayers[id]);
  layers.sort((a, b) => a.y - b.y);

  const top = layers[0].y;
  const bottom = Math.max(...layers.map(l => l.y + l.height));
  const totalHeight = layers.reduce((acc, l) => acc + l.height, 0);
  const space = (bottom - top - totalHeight) / (layers.length - 1);

  let currentY = top;
  for (let i = 0; i < layers.length; i++) {
    layers[i].y = Math.round(currentY);
    currentY += layers[i].height + space;
  }
}


document.addEventListener("keydown", handleGlobalShortcuts);
document.addEventListener("keydown", handleEscapeClose);