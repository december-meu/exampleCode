/*****************************************************************************
 说明：参数设置
 *****************************************************************************/
proj4.defs("EPSG:2360","+proj=tmerc +lat_0=0 +lon_0=108 +k=1 +x_0=36500000 +y_0=0 +a=6378140 +b=6356755.288157528 +units=m +no_defs");
//CGCS2000坐标系
//proj4.defs("EPSG:4512","+proj=tmerc +lat_0=0 +lon_0=135 +k=1 +x_0=500000 +y_0=0 +ellps=GRS80 +units=m +no_defs");
var myBasemapUrl = "http://192.168.128.161:8080/geoserver/gwc/service/wms";
var myProjection = 'EPSG:2360';
var myCenter = [36504884.604183,3793877.5836932];
var myTileSize = 256;
var myResolutions = [16.933367200067735, 8.466683600033868, 4.233341800016934, 2.116670900008467, 1.0583354500042335, 0.5291677250021167, 0.26458386250105836, 0.13229193125052918];
var myResolution = 4.233341800016934;
var myExtent = [30876800,3785793.1673863,36512224.604183,10002100.0];
var myOrigin = [30876800, 10002100];
var wgs84Sphere = new ol.Sphere(6378137);

/*****************************************************************************
说明：地图场景
 *****************************************************************************/
var source = new ol.source.Vector();
var vector = new ol.layer.Vector({
    source: source,
    style: new ol.style.Style({
        fill: new ol.style.Fill({
            color: 'rgba(255, 255, 255, 0.2)'
        }),
        stroke: new ol.style.Stroke({
            color: '#121eff',
            width: 2
        }),
        image: new ol.style.Circle({
            radius: 7,
            fill: new ol.style.Fill({
                color: '#121eff'
            })
        })
    })
});
var sketch;
var helpTooltipElement;
var helpTooltip;
var measureTooltipElement;
var measureTooltip;
var continuePolygonMsg = '点击继续画多边形~双击结束';
var continueLineMsg = '点击继续画线~双击结束';
var pointerMoveHandler = function(evt) {
    if(typeSelect==''){return;}
    if (evt.dragging) {
        return;
    }
    var helpMsg = '点击开始绘制';

    if (sketch) {
        var geom = (sketch.getGeometry());
        if (geom instanceof ol.geom.Polygon) {
            helpMsg = continuePolygonMsg;
        } else if (geom instanceof ol.geom.LineString) {
            helpMsg = continueLineMsg;
        }
    }

    helpTooltipElement.innerHTML = helpMsg;
    helpTooltip.setPosition(evt.coordinate);

    helpTooltipElement.classList.remove('hidden');
};


var map = new ol.Map({
    target: 'map',
    layers: [],
    view: new ol.View({
        center: myCenter,
        resolutions: myResolutions,
        resolution: myResolution,
        projection: myProjection,
        extent: myExtent,
    })
});

map.on('pointermove', pointerMoveHandler);
map.getViewport().addEventListener('mouseout', function() {
    helpTooltipElement.classList.add('hidden');
});
var typeSelect = '';
var geodesicCheckbox = false;
var draw;

var formatLength = function(line) {
    var length;
    if (geodesicCheckbox) {
        var coordinates = line.getCoordinates();
        length = 0;
        var sourceProj = map.getView().getProjection();
        for (var i = 0, ii = coordinates.length - 1; i < ii; ++i) {
            var c1 = ol.proj.transform(coordinates[i], sourceProj, 'EPSG:4326');
            var c2 = ol.proj.transform(coordinates[i + 1], sourceProj, 'EPSG:4326');
            length += wgs84Sphere.haversineDistance(c1, c2);
        }
    } else {
        length = Math.round(line.getLength() * 100) / 100;
    }
    var output;
    if (length > 100) {
        output = (Math.round(length / 1000 * 100) / 100) +
            ' ' + 'km';
    } else {
        output = (Math.round(length * 100) / 100) +
            ' ' + 'm';
    }
    return output;
};

var formatArea = function(polygon) {
    var area;
    if (geodesicCheckbox) {
        var sourceProj = map.getView().getProjection();
        var geom = /** @type {ol.geom.Polygon} */(polygon.clone().transform(
            sourceProj, 'EPSG:4326'));
        var coordinates = geom.getLinearRing(0).getCoordinates();
        area = Math.abs(wgs84Sphere.geodesicArea(coordinates));
    } else {
        area = polygon.getArea();
    }
    var output;
    if (area > 10000) {
        output = (Math.round(area / 1000000 * 100) / 100) +
            ' ' + 'km<sup>2</sup>';
    } else {
        output = (Math.round(area * 100) / 100) +
            ' ' + 'm<sup>2</sup>';
    }
    return output;
};

createMeasureTooltip();
createHelpTooltip();

function addInteraction() {
    if (typeSelect == ''){
        return;
    }
    var type = (typeSelect == 'marea' ? 'Polygon' : 'LineString');
    draw = new ol.interaction.Draw({
        source: source,
        type: /** @type {ol.geom.GeometryType} */ (type),
        style: new ol.style.Style({
            fill: new ol.style.Fill({
                color: 'rgba(255, 255, 255, 0.2)'
            }),
            stroke: new ol.style.Stroke({
                color: 'rgba(0, 0, 0, 0.5)',
                lineDash: [10, 10],
                width: 2
            }),
            image: new ol.style.Circle({
                radius: 5,
                stroke: new ol.style.Stroke({
                    color: 'rgba(0, 0, 0, 0.7)'
                }),
                fill: new ol.style.Fill({
                    color: 'rgba(255, 255, 255, 0.2)'
                })
            })
        })
    });
    map.addInteraction(draw);

    var listener;
    draw.on('drawstart',
        function(evt) {
            // set sketch
            sketch = evt.feature;

            /** @type {ol.Coordinate|undefined} */
            var tooltipCoord = evt.coordinate;

            listener = sketch.getGeometry().on('change', function(evt) {
                var geom = evt.target;
                var output;
                if (geom instanceof ol.geom.Polygon) {
                    output = formatArea(geom);
                    tooltipCoord = geom.getInteriorPoint().getCoordinates();
                } else if (geom instanceof ol.geom.LineString) {
                    output = formatLength(geom);
                    tooltipCoord = geom.getLastCoordinate();
                }
                measureTooltipElement.innerHTML = output;
                measureTooltip.setPosition(tooltipCoord);
            });
        }, this);

    draw.on('drawend',
        function() {
            measureTooltipElement.className = 'tooltip tooltip-static';
            measureTooltip.setOffset([0, -7]);
            sketch = null;
            measureTooltipElement = null;
            createMeasureTooltip();
            ol.Observable.unByKey(listener);
        }, this);
}

function createHelpTooltip() {
    if (helpTooltipElement) {
        helpTooltipElement.parentNode.removeChild(helpTooltipElement);
    }
    helpTooltipElement = document.createElement('div');
    helpTooltipElement.className = 'tooltip hidden';
    helpTooltip = new ol.Overlay({
        element: helpTooltipElement,
        offset: [15, 0],
        positioning: 'center-left'
    });
    map.addOverlay(helpTooltip);
}

function createMeasureTooltip() {
    if (measureTooltipElement) {
        measureTooltipElement.parentNode.removeChild(measureTooltipElement);
    }
    measureTooltipElement = document.createElement('div');
    measureTooltipElement.className = 'tooltip tooltip-measure';
    measureTooltip = new ol.Overlay({
        element: measureTooltipElement,
        offset: [0, -15],
        positioning: 'bottom-center'
    });
    map.addOverlay(measureTooltip);
}

/*****************************************************************************
 说明：添加底图图层（1-杨凌规划图；2-杨凌现状图）
 *****************************************************************************/
var myTileGrid = new ol.tilegrid.TileGrid({
    tileSize: myTileSize,
    origin: myOrigin,
    extent: myExtent,
    resolutions: myResolutions
});
var ylxztImageLayer=null;

function addYLBaseLayer() {
    var ylghtTileLayer = new ol.layer.Tile({
        title:"杨凌规划图",
        source:new ol.source.TileWMS({
            url: myBasemapUrl,
            projection: myProjection,
            params: {'LAYERS': 'YLTDGH80', 'FORMAT': 'image/png','SRS':myProjection},
            tileGrid: myTileGrid
        }),
        visible:true
    	
    });
    map.addLayer(ylghtTileLayer);

    var ylxztTileLayer = new ol.layer.Tile({
        title:"杨凌现状图",
        source:new ol.source.TileWMS({
            url: myBasemapUrl,
            projection: myProjection,
            params: {'LAYERS': 'YLTDXZ80', 'FORMAT': 'image/png','SRS':myProjection},
            tileGrid: myTileGrid
        }),
        visible:false
    });
    map.addLayer(ylxztTileLayer);

    ylxztImageLayer =  new ol.layer.Image({
        title:"杨凌项目用地图",
        source:new ol.source.ImageWMS({
            url:'http://192.168.128.161:8080/geoserver/wms',
            projection: myProjection,
            params:{
                //'LAYERS':'YLTEST:ylkjxx',
            	'LAYERS':'YLBA:prj_boundary',
                'VERSION':'1.1.0'
            }
        })
    });
    map.addLayer(ylxztImageLayer);
}
addYLBaseLayer();

map.addLayer(vector);


/*****************************************************************************
说明：地图测量工具
*****************************************************************************/
$("#mt_goback").click(function(){
   map.removeInteraction(draw);
   typeSelect='';
   var view = map.getView();
   view.setCenter(myCenter);
   view.setZoom(0);
});

$("#mt_zoomin").click(function(){
   map.removeInteraction(draw);
   typeSelect='';
   var view = map.getView();
   var zoom = view.getZoom();
   view.setZoom(zoom + 1);
});

$("#mt_zoomout").click(function(){
   map.removeInteraction(draw);
   typeSelect='';
   var view = map.getView();
   var zoom = view.getZoom();
   view.setZoom(zoom - 1);
});

$("#mt_length").click(function(){
   map.removeInteraction(draw);
   typeSelect="mlength";
   //map.getOverlays().clear();
   //vector.getSource().clear();
   createMeasureTooltip();
   createHelpTooltip();
   addInteraction();
});

$("#mt_area").click(function(){
   map.removeInteraction(draw);
   typeSelect="marea";
   //map.getOverlays().clear();
   //vector.getSource().clear();
   createMeasureTooltip();
   createHelpTooltip();
   addInteraction();
});

$("#mt_clear").click(function(){
   map.removeInteraction(draw);
   typeSelect='';
   map.getOverlays().clear();
   vector.getSource().clear();
});

$("#mt_query").click(function(){
   map.removeInteraction(draw);
   typeSelect='';
   map.getOverlays().clear();
   vector.getSource().clear();
   createQueryElement();
});

$("#mt_locate").click(function(){
	var curProjBoundary = $("#xmydlocate").val();
	if(curProjBoundary){
		var wktConvert = new ol.format.WKT();
        var curGeometry = wktConvert.readGeometry(curProjBoundary,{dataProjection: 'EPSG:2360', featureProjection: 'EPSG:2360'});
        var polygonextent = curGeometry.getExtent();
        var polygoncenter = ol.extent.getCenter(polygonextent);
        //map.getView().setCenter(polygoncenter);
        flyTo(polygoncenter,function() {});
	}else{
		var tempBoundaryID = $("#attachids").val();
		if(tempBoundaryID){
			console.info(tempBoundaryID);
			$.ajax({
	            url: webPath+"nyd/prjBoundary/selectLands?landIds="+tempBoundaryID,
	            async: false,
	            type:"post",
				success:function(info){
					console.info(info);
					for(var i=0;i<info.data.length;i++){
						if(info.data[i].typename=="当前项目用地界址点"){
							var tcurProjBoundary = info.data[i].geom;
							var twktConvert = new ol.format.WKT();
					        var tcurGeometry = twktConvert.readGeometry(tcurProjBoundary,{dataProjection: 'EPSG:2360', featureProjection: 'EPSG:2360'});
					        var tpolygonextent = tcurGeometry.getExtent();
					        var tpolygoncenter = ol.extent.getCenter(tpolygonextent);
					        flyTo(tpolygoncenter,function() {});
						}
					}
				},
				error:function(e){
					
				}
	        });
		}else{
			layer.msg("无法定位到该项目用地范围！");
		}
	}
});


/*****************************************************************************
说明：点击查看属性
*****************************************************************************/
var getCoord=null;
var overlay;
var popcontentElement;
function createQueryElement() {
    if (queryElement) {
        var childs = queryElement.childNodes;
        for(var i = childs.length - 1; i >= 0; i--) {
            queryElement.removeChild(childs[i]);
        }
        queryElement.parentNode.removeChild(queryElement);
    }
    var queryElement = document.createElement("div");
    queryElement.id='popup';
    queryElement.className = 'ol-popup';

    var popcloserElement = document.createElement("a");
    popcloserElement.id='popup-closer';
    popcloserElement.className ='ol-popup-closer';
    popcloserElement.href = '#';

    popcontentElement = document.createElement("div");
    popcontentElement.id='popup-content';

    queryElement.appendChild(popcloserElement);
    queryElement.appendChild(popcontentElement);

    overlay = new ol.Overlay(({
        element: queryElement,
        autoPan: true,
        autoPanAnimation: {
            duration: 250
        }
    }));

    popcloserElement.onclick = function() {
        overlay.setPosition(undefined);
        popcloserElement.blur();
        return false;
    };

    map.addOverlay(overlay);

    map.on('singleclick', function(evt) {
        getCoord = evt.coordinate;

        var viewResolution = map.getView().getResolution();
        var url = ylxztImageLayer.getSource().getGetFeatureInfoUrl(
            evt.coordinate, viewResolution, 'EPSG:2360', {
                'INFO_FORMAT': 'text/javascript' ,
                'FEATURE_COUNT': 1,
            }
        );

        if (url) {
            $.ajax({
                url: url,
                async: false,
                dataType: 'jsonp',
                jsonp:'format_options',
                jsonpCallback:"callback:success_jsonpCallback"
            });
        }
    });
}

var geojsonFormat = new ol.format.GeoJSON({defaultDataProjection: "EPSG:2360"});
function success_jsonpCallback(res)
{
	//var polygonextent = ol.extent.boundingExtent(res.features[0].geometry.coordinates[0][0]);
	//console.info(polygonextent);
    if(res.features.length>0){
    	$.ajax({
            url: webPath+"nyd/prjBoundary/findInfoByid?id="+res.features[0].id.substring(13),
            async: false,
            type:"post",
			success:function(info){
				console.info(info);
				var coordinate = getCoord;
		        var myhtml="<table class=\"layui-table\" lay-size=\"sm\">";
		        popcontentElement.innerHTML = infotalbe(info);
		        overlay.setPosition(coordinate);
			},
			error:function(e){
				
			}
        });
    }else{

    }
}

function infotalbe(info){
	console.info(info);
    var chtml = '';
    chtml += '	<table class="layui-table" lay-size="sm">';
    chtml += '		<tr>';
    chtml += '			<td colspan="4">'+info.prjname+'</td>';
    chtml += '		</tr>';
    chtml += '		<tr>';
    chtml += '			<th>用地面积</th>';
    chtml += '			<td>'+'872176.73'+' ㎡'+'</td>';
    chtml += '		</tr>';
    chtml += '		<tr>';
    chtml += '			<th>项目状态</th>';
    chtml += '			<td>'+info.statusname+'</td>';
    chtml += '		</tr>';
    chtml += '		<tr>';
    chtml += '			<th>开始日期</th>';
    chtml += '			<td>'+milliToYMD(info.starttime)+'</td>';
    chtml += '		</tr>';
    chtml += '		<tr>';
    chtml += '			<th>结束日期</th>';
    chtml += '			<td>'+milliToYMD(info.endtime)+'</td>';
    chtml += '		</tr>';
    chtml += '	</table>';
    return chtml;
}

/*****************************************************************************
说明：图层显隐控制
*****************************************************************************/
function myLayersControl(titlestr){
    var templayer=null;
    var tempmap = map;
    var templayers =tempmap.getLayers();
    templayers.forEach(function (e) {
        if(e.getProperties().title==titlestr){
            templayer=e;
        }
    })
    return templayer;
}

$('#rad1').click(function(e){
	if(e.target.checked){
		if(myLayersControl("杨凌规划图")){
	        myLayersControl("杨凌规划图").setVisible(true);
	    }
		if(myLayersControl("杨凌现状图")){
	        myLayersControl("杨凌现状图").setVisible(false);
	    }
		$("#rad2").prop("checked", false);
	}else{
		if(myLayersControl("杨凌规划图")){
	        myLayersControl("杨凌规划图").setVisible(false);
	    }
	}
});

$('#rad2').click(function(e){
	if(e.target.checked){
		if(myLayersControl("杨凌现状图")){
	        myLayersControl("杨凌现状图").setVisible(true);
	    }
		if(myLayersControl("杨凌规划图")){
	        myLayersControl("杨凌规划图").setVisible(false);
	    }
		$("#rad1").prop("checked", false);
	}else{
		if(myLayersControl("杨凌现状图")){
	        myLayersControl("杨凌现状图").setVisible(false);
	    }
	}
});

$('#rad3').click(function(e){
	if(e.target.checked){
		if(myLayersControl("杨凌项目用地图")){
	        myLayersControl("杨凌项目用地图").setVisible(true);
	    }
	}else{
		if(myLayersControl("杨凌项目用地图")){
	        myLayersControl("杨凌项目用地图").setVisible(false);
	    }
	}
});


/*****************************************************************************
说明：显示效果
*****************************************************************************/
function flyTo(location, done) {
    var duration = 2000;
    var view = map.getView();
    var zoom = view.getZoom();
    var parts = 2;
    var called = false;
    function callback(complete) {
      --parts;
      if (called) {
        return;
      }
      if (parts === 0 || !complete) {
        called = true;
        done(complete);
      }
    }
    view.animate({
      center: location,
      duration: duration
    }, callback);
    view.animate({
      zoom: zoom - 1,
      duration: duration / 2
    }, {
      zoom: zoom,
      duration: duration / 2
    }, callback);
}

function milliToYMD(value){
	var secretdate = value;// 后台传来的为毫秒的时间
	var newsecretdate = new Date(secretdate);
	// 转为自定义时间类型
	Date.prototype.Format = function(fmt) {
		var o = {
			"M+" : this.getMonth() + 1, // 月份
			"d+" : this.getDate(), // 日
			"h+" : this.getHours(), // 小时
			"m+" : this.getMinutes(), // 分
			"s+" : this.getSeconds(), // 秒
			"q+" : Math.floor((this.getMonth() + 3) / 3), // 季度
			"S" : this.getMilliseconds() // 毫秒
		};
		if (/(y+)/.test(fmt)){
			fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
		}
		for( var k in o){
			if (new RegExp("(" + k + ")").test(fmt)){
				fmt = fmt.replace(RegExp.$1,(RegExp.$1.length == 1) ? (o[k]): (("00" + o[k]).substr(("" + o[k]).length)));
			}
		}
		return fmt;
	}
	if (secretdate == null) {
		return "";
	}
	return newsecretdate.Format("yyyy-MM-dd");
}

