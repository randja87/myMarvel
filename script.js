$(document).ready(function(){
	var message = document.getElementById('message1');
	var marvelContainer = document.getElementById('marvel-container');
	var footer = document.getElementById('footer');
	footer.innerHTML = "<a href=\"http://marvel.com\">Data provided by Marvel. © 2017 MARVEL</a>";
	var url = "http://gateway.marvel.com/v1/public/characters?ts=1&apikey=70c0d398bbc8594678509183fd25fedf&hash=89c3d272e2c01082852b557b54d3262d";
	$.ajax({
			url: url,
			type:"GET",
			beforeSend: function(){
				message.innerHTML = "Loading...";
			},
			complete: function(){
				message.innerHTML = "Sucessfully done!";
			},
			success: function(data){
				heroes = data.data.results;
				$.each( heroes, function( index, value ) {
					$('.list').append('<li><span class="bookmark glyphicon glyphicon-star-empty" aria-hidden="true" data-name="'+value.name+'"></span><p class="name">'+value.name+'</p><img class=img-thumbnail  src= "'+value.thumbnail.path+'/landscape_amazing.'+value.thumbnail.extension+'"/></li>');
				});
				var heroesList = new List('heroes-list', {
					valueNames: ['name'],
					page: 10,
					pagination: true
				});
				$('.bookmark').click(function(){
					$(this).toggleClass('glyphicon-star-empty');
					$(this).toggleClass('glyphicon-star');
					heroName = $(this).data("name");
					if($(this).hasClass('glyphicon-star-empty')) {
						$('.sticki li').each(function(){
							if(heroName == $(this).text()){
								$(this).remove();
							  localStorage.removeItem("Heroes");
							}
						});
					} else {
						$('.sticki').append('<li>'+heroName+'</li>');
						localStorage.setItem('Heroes',heroName);
					}
				});
			},
			error: function(){		
			}	
		});
	});
