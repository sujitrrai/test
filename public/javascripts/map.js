// create a map in the "map" div, set the view to a given place and zoom
var latlon = [18.975, 72.82];
var osmLink = '<a href="http://openstreetmap.org">OpenStreetMap</a>',
    thunLink = '<a href="http://thunderforest.com/">Thunderforest</a>';

var osmUrl = 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    osmAttrib = '&copy; ' + osmLink + ' Contributors',
    landUrl = 'http://{s}.tile.thunderforest.com/landscape/{z}/{x}/{y}.png',
    thunAttrib = '&copy; '+osmLink+' Contributors & '+thunLink;

var osmMap = L.tileLayer(osmUrl, {attribution: osmAttrib}),
    landMap = L.tileLayer(landUrl, {attribution: thunAttrib});

var map = L.map('map', {
        layers: [osmMap] // only add one!
    })
    .setView(latlon, 13);

var baseLayers = {
    "OSM Mapnik": osmMap,
    "Landscape": landMap
};

L.control.layers(baseLayers).addTo(map);



var group = L.layerGroup([]).addTo(map);




$( document ).ready(function(){
	$('.active').trigger("click");
});






$('.test-tab').click(function(event) {
    group.clearLayers();
    var markerarray = [];
	var dom = $(this);
	var body = dom.find('a').attr('href');
    var count = dom.find('.badge').html();
    //console.log(count);


    $(body).find('.test-body').each(function(){
		var dom = $(this);
        //console.log(count);
		var idname = dom.find('.test-id').html();
		var route = dom.find('.test-name').html();
    	var idadd = dom.find('.test-add').html();
    	var trroute ='<tr><td>ROUTE: </td><td>'+route+'</td></tr>';
    	var trbee ='<tr><td>BEE: </td><td>'+'</td></tr>';
    	var trid ='<tr><td>ROAM ID: </td><td>'+'</td></tr>';
    	var name = '<div class="test-tricontainer"><div class="test-arrow"></div><span class="test-id">'+idname+'</span></div>';
    	var address = '<p>'+idadd+'</p>';
    	var table = '<table class="table table-striped"><tbody>'+trroute+''+trbee+''+trid+'</tbody></table>';
		var ajax = $.ajax({
  			url:'http://localhost:3000/',
  			type:'post',
  			data: {"idname":idname},
  			success:function(data){
    			//console.log(data);
                //console.log(count);
    			var m =	L.marker(data)
    					.bindPopup(name+''+address+''+table);
                markerarray.push(m);
                
    			
                

                dom.click(function(){
    				map.panTo(data);
                    m.openPopup();
    			});

                count = count - 1;
    		}
		});
        

        
        $.when(ajax).then(function(){
            //console.log(count);
            if(count==0)
            {
                //console.log(markerarray);
                group = L.layerGroup(markerarray).addTo(map);
                $(body).children(":first").find('.test-body').trigger('click');
            };

        });
	});
});